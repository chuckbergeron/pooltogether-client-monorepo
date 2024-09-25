import { PrizePool, Vault } from '@generationsoftware/hyperstructure-client-js'
import {
  usePrizeOdds,
  useUserVaultDelegationBalance,
  useUserVaultShareBalance
} from '@generationsoftware/hyperstructure-react-hooks'
import { Spinner } from '@shared/ui'
import { formatNumberForDisplay } from '@shared/utilities'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { useSupportedPrizePools } from '@hooks/useSupportedPrizePools'

interface AccountVaultDelegationOddsProps {
  vault: Vault
  address?: Address
}

export const AccountVaultDelegationOdds = (props: AccountVaultDelegationOddsProps) => {
  const { vault, address } = props

  const { address: _userAddress } = useAccount()
  const userAddress = address ?? _userAddress

  const { data: shareBalance, isFetched: isFetchedShareBalance } = useUserVaultShareBalance(
    vault,
    userAddress as Address
  )
  const { data: _delegationBalance, isFetched: isFetchedDelegationBalance } =
    useUserVaultDelegationBalance(vault, userAddress as Address)
  const delegationBalance =
    !!_delegationBalance && !!shareBalance ? _delegationBalance - shareBalance.amount : 0n

  const prizePools = useSupportedPrizePools()
  const prizePool = Object.values(prizePools).find(
    (prizePool) => prizePool.chainId === vault.chainId
  )

  const { data: prizeOdds, isFetched: isFetchedPrizeOdds } = usePrizeOdds(
    prizePool as PrizePool,
    vault,
    delegationBalance
  )

  if (!userAddress || delegationBalance <= 0n) {
    return <>-</>
  }

  if (!isFetchedShareBalance || !isFetchedDelegationBalance || !isFetchedPrizeOdds) {
    return <Spinner />
  }

  if (prizeOdds === undefined) {
    return <>?</>
  }

  return <>1 in {formatNumberForDisplay(prizeOdds.oneInX, { maximumSignificantDigits: 3 })}</>
}
