import { Vault } from '@generationsoftware/hyperstructure-client-js'
import { DelegateButton, DepositButton, WithdrawButton } from '@shared/react-components'
import classNames from 'classnames'
import { useAccount } from 'wagmi'

interface VaultPageButtonsProps {
  vault: Vault
  className?: string
}

export const VaultPageButtons = (props: VaultPageButtonsProps) => {
  const { vault, className } = props

  const { address: userAddress } = useAccount()

  return (
    <div className={classNames('flex items-center gap-2 md:gap-4', className)}>
      <DepositButton vault={vault} intl={undefined} />
      <WithdrawButton vault={vault} color='transparent'>
        Withdraw
      </WithdrawButton>
      {!!userAddress && (
        <DelegateButton vault={vault} color='transparent'>
          Delegate
        </DelegateButton>
      )}
    </div>
  )
}
