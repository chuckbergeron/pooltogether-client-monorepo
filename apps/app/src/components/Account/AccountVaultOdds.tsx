import { PrizePool, Vault } from '@generationsoftware/hyperstructure-client-js'
import {
  usePrizeOdds,
  useUserVaultDelegationBalance,
  useUserVaultShareBalance
} from '@generationsoftware/hyperstructure-react-hooks'
import { Spinner } from '@shared/ui'
import { formatNumberForDisplay } from '@shared/utilities'
import { useTranslations } from 'next-intl'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { useSupportedPrizePools } from '@hooks/useSupportedPrizePools'

interface AccountVaultOddsProps {
  vault: Vault
  address?: Address
}

export const AccountVaultOdds = (props: AccountVaultOddsProps) => {
  const { vault, address } = props

  const t = useTranslations('Account')

  const { address: _userAddress } = useAccount()
  const userAddress = address ?? _userAddress

  const { data: shareBalance, isFetched: isFetchedShareBalance } = useUserVaultShareBalance(
    vault,
    userAddress as Address
  )

  const { data: delegatedAmount, isFetched: isFetchedDelegatedAmount } =
    useUserVaultDelegationBalance(vault, userAddress as Address)

  const prizePools = useSupportedPrizePools()
  const prizePool = Object.values(prizePools).find(
    (prizePool) => prizePool.chainId === vault.chainId
  )

  const { data: prizeOdds, isFetched: isFetchedPrizeOdds } = usePrizeOdds(
    prizePool as PrizePool,
    vault,
    shareBalance?.amount ?? 0n
  )

  if (!userAddress || shareBalance?.amount === 0n || delegatedAmount === 0n) {
    return <>-</>
  }

  if (!isFetchedShareBalance || !isFetchedDelegatedAmount || !isFetchedPrizeOdds) {
    return <Spinner />
  }

  if (prizeOdds === undefined) {
    return <>?</>
  }

  return (
    <>
      {t('oneInXChance', {
        number: formatNumberForDisplay(prizeOdds.oneInX, { maximumSignificantDigits: 3 })
      })}
    </>
  )
}
