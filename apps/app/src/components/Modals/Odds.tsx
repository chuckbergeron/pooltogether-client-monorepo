import { PrizePool, Vault } from '@generationsoftware/hyperstructure-client-js'
import {
  useDrawPeriod,
  usePrizeOdds,
  useSelectedVaults,
  useVaultShareData,
  useVaultTokenData
} from '@generationsoftware/hyperstructure-react-hooks'
import { Spinner } from '@shared/ui'
import {
  calculateUnionProbability,
  formatNumberForDisplay,
  getVaultId,
  SECONDS_PER_MONTH,
  SECONDS_PER_WEEK
} from '@shared/utilities'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { parseUnits } from 'viem'
import {
  depositFormShareAmountAtom,
  depositFormTokenAddressAtom,
  depositFormTokenAmountAtom
} from './DepositModal/DepositForm'

interface OddsProps {
  vault: Vault
  prizePool: PrizePool
}

export const Odds = (props: OddsProps) => {
  const { vault, prizePool } = props

  const formTokenAddress = useAtomValue(depositFormTokenAddressAtom)
  const formTokenAmount = useAtomValue(depositFormTokenAmountAtom)
  const formShareAmount = useAtomValue(depositFormShareAmountAtom)

  const { data: share } = useVaultShareData(vault)
  const { data: vaultToken } = useVaultTokenData(vault)

  const inputTokenAddress = formTokenAddress ?? vaultToken?.address

  const { vaults } = useSelectedVaults()

  const inputVault = useMemo(() => {
    if (!!vault && !!inputTokenAddress) {
      const vaultId = getVaultId({ chainId: vault.chainId, address: inputTokenAddress })
      return Object.values(vaults.vaults).find((v) => getVaultId(v) === vaultId)
    }
  }, [vault, inputTokenAddress, vaults])

  const { data: inputShare } = useVaultShareData(inputVault!)

  const { data: inputPrizeOdds } = usePrizeOdds(
    prizePool,
    inputVault!,
    !!inputShare && !!formTokenAmount ? parseUnits(formTokenAmount, inputShare.decimals) : 0n
  )

  const { data: outputPrizeOdds } = usePrizeOdds(
    prizePool,
    vault,
    !!share && !!formShareAmount ? parseUnits(formShareAmount, share.decimals) : 0n,
    { isCumulative: true }
  )

  const { data: drawPeriod } = useDrawPeriod(prizePool)

  const chance = useMemo(() => {
    if (!!outputPrizeOdds && !!drawPeriod) {
      const input = !!inputPrizeOdds
        ? `1 in ${calculateOneInXChance(inputPrizeOdds, drawPeriod)}`
        : undefined
      const output = `1 in ${calculateOneInXChance(outputPrizeOdds, drawPeriod)}`
      return { input, output }
    }
  }, [inputPrizeOdds, outputPrizeOdds, drawPeriod])

  return (
    <div className='flex flex-col items-center font-semibold'>
      <span className='mb-2 text-xs text-pt-purple-100 md:text-sm'>
        {!!drawPeriod && drawPeriod > SECONDS_PER_WEEK
          ? 'Monthly Chance of Winning'
          : 'Weekly Chance of Winning'}
      </span>
      {!!chance ? (
        <>
          {!!chance.input ? (
            <>
              <div className='flex gap-2 items-center'>
                <span className='text-xs text-pt-purple-100'>Before</span>
                <span className='text-pt-purple-50 md:text-xl'>
                  {formTokenAmount !== '0' ? chance.input : '-'}
                </span>
              </div>
              <div className='flex gap-2 items-center'>
                <span className='text-xs text-pt-purple-100'>After</span>
                <span className='text-pt-purple-50 md:text-xl'>
                  {formTokenAmount !== '0' ? chance.output : '-'}
                </span>
              </div>
            </>
          ) : (
            <span className='text-pt-purple-50 md:text-xl'>
              {formTokenAmount !== '0' ? chance.output : '-'}
            </span>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

const calculateOneInXChance = (
  odds: NonNullable<ReturnType<typeof usePrizeOdds>['data']>,
  drawPeriod: number
) => {
  const timeframe = drawPeriod > SECONDS_PER_WEEK ? SECONDS_PER_MONTH : SECONDS_PER_WEEK
  const numEvents = Math.floor(timeframe / drawPeriod)
  const events = Array<number>(numEvents).fill(odds.percent)
  const value = 1 / calculateUnionProbability(events)
  return formatNumberForDisplay(value, { maximumSignificantDigits: 3 })
}
