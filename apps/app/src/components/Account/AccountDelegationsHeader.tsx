import { CurrencyValue } from '@shared/react-components'
import { Spinner } from '@shared/ui'
import { lower, NETWORK, shorten } from '@shared/utilities'
import classNames from 'classnames'
import { Address } from 'viem'
import { useAccount, useEnsName } from 'wagmi'
import { WALLET_NAMES } from '@constants/config'
import { useUserTotalDelegations } from '@hooks/useUserTotalDelegations'

interface AccountDelegationsHeaderProps {
  address?: Address
  className?: string
}

export const AccountDelegationsHeader = (props: AccountDelegationsHeaderProps) => {
  const { address, className } = props

  const { address: _userAddress } = useAccount()
  const userAddress = address ?? _userAddress

  const isExternalUser = !!address && address.toLowerCase() !== _userAddress?.toLowerCase()

  const { data: totalDelegations, isFetched: isFetchedTotalDelegations } = useUserTotalDelegations(
    userAddress!
  )

  const { data: ensName } = useEnsName({ chainId: NETWORK.mainnet, address: userAddress })

  return (
    <div className={classNames('flex flex-col items-center gap-1 md:gap-2', className)}>
      <span className='text-sm text-pt-purple-100 md:text-base'>
        {isExternalUser ? (
          <>Delegations to {WALLET_NAMES[lower(address)]?.name ?? ensName ?? shorten(address)}</>
        ) : (
          'Delegated to You'
        )}
      </span>
      <span className='text-[1.75rem] font-grotesk font-medium md:text-4xl'>
        {isFetchedTotalDelegations && !!userAddress && totalDelegations !== undefined ? (
          <CurrencyValue baseValue={totalDelegations} countUp={true} fallback={<Spinner />} />
        ) : (
          <Spinner />
        )}
      </span>
    </div>
  )
}
