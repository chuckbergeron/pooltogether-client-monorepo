import { PrizePool, Vault } from '@generationsoftware/hyperstructure-client-js'
import {
  useTokenPermitSupport,
  useVaultExchangeRate,
  useVaultShareData,
  useVaultTokenAddress
} from '@generationsoftware/hyperstructure-react-hooks'
import { useMiscSettings } from '@shared/generic-react-hooks'
import { AlertIcon, PrizePoolBadge } from '@shared/react-components'
import { Spinner } from '@shared/ui'
import { DOLPHIN_ADDRESS, getNiceNetworkNameByChainId, lower } from '@shared/utilities'
import { useAtomValue } from 'jotai'
import { walletSupportsPermit } from 'src/utils'
import { useAccount } from 'wagmi'
import { NetworkFees, NetworkFeesProps } from '../../NetworkFees'
import { Odds } from '../../Odds'
import {
  DepositForm,
  depositFormShareAmountAtom,
  depositFormTokenAddressAtom
} from '../DepositForm'

interface MainViewProps {
  vault: Vault
  prizePool: PrizePool
}

export const MainView = (props: MainViewProps) => {
  const { vault, prizePool } = props

  const { connector } = useAccount()

  const { data: share } = useVaultShareData(vault)
  const { data: vaultTokenAddress } = useVaultTokenAddress(vault)

  const formTokenAddress = useAtomValue(depositFormTokenAddressAtom)
  const formShareAmount = useAtomValue(depositFormShareAmountAtom)

  const tokenAddress = formTokenAddress ?? vaultTokenAddress

  const { data: tokenPermitSupport } = useTokenPermitSupport(vault.chainId, tokenAddress!)

  const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  const { isActive: isPermitDepositsDisabled } = useMiscSettings('permitDepositsDisabled')

  const vaultName = vault.name ?? share?.name
  const networkName = getNiceNetworkNameByChainId(vault.chainId)

  const isZapping =
    !!vaultTokenAddress &&
    !!formTokenAddress &&
    lower(vaultTokenAddress) !== lower(formTokenAddress)

  const feesToShow: NetworkFeesProps['show'] = isZapping
    ? lower(formTokenAddress) === DOLPHIN_ADDRESS
      ? ['depositWithZap', 'withdraw']
      : ['approve', 'depositWithZap', 'withdraw']
    : tokenPermitSupport === 'eip2612' &&
      walletSupportsPermit(connector?.id) &&
      !isPermitDepositsDisabled
    ? ['depositWithPermit', 'withdraw']
    : ['approve', 'deposit', 'withdraw']

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-lg font-semibold text-center'>
        {!!vaultName && (
          <span className='hidden md:inline-block'>
            Deposit to {vaultName} on {networkName}
          </span>
        )}
        {!!vaultName && <span className='inline-block md:hidden'>Deposit to {vaultName}</span>}
        {!vaultName && <Spinner />}
      </span>
      <PrizePoolBadge
        chainId={vault.chainId}
        hideBorder={true}
        intl={undefined}
        className='!py-1 mx-auto'
      />
      {/* TODO: add flow for when exchange rate cannot be found */}
      {!!vaultExchangeRate && (
        <>
          <DepositForm vault={vault} showInputInfoRows={true} />
          {!!formShareAmount ? (
            <div className='flex flex-col gap-4 mx-auto md:flex-row md:gap-9'>
              <Odds vault={vault} prizePool={prizePool} />
              <NetworkFees vault={vault} show={feesToShow} />
            </div>
          ) : (
            <RisksDisclaimer vault={vault} />
          )}
        </>
      )}
    </div>
  )
}

interface RisksDisclaimerProps {
  vault: Vault
}

const RisksDisclaimer = (props: RisksDisclaimerProps) => {
  const { vault } = props

  const vaultHref = `/vault/${vault.chainId}/${vault.address}`

  return (
    <div className='w-full flex flex-col gap-4 p-6 text-pt-purple-100 bg-pt-transparent rounded-lg lg:items-center'>
      <div className='flex gap-2 items-center'>
        <AlertIcon className='w-5 h-5' />
        <span className='text-xs font-semibold lg:text-sm'>Learn about the risks</span>
      </div>
      <span className='text-xs lg:text-center lg:text-sm'>
        PoolTogether is a permissionless protocol. Prize vaults can be deployed by anyone. Make sure
        you know what you are depositing into.{' '}
        <a href={vaultHref} target='_blank' className='text-pt-purple-300'>
          Learn more about this prize vault.
        </a>
      </span>
    </div>
  )
}
