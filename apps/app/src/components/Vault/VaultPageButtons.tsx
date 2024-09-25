import { Vault } from '@generationsoftware/hyperstructure-client-js'
import { DelegateButton, DepositButton, WithdrawButton } from '@shared/react-components'
import classNames from 'classnames'
import * as fathom from 'fathom-client'
import { useAccount } from 'wagmi'
import { FATHOM_EVENTS } from '@constants/config'

interface VaultPageButtonsProps {
  vault: Vault
  className?: string
}

export const VaultPageButtons = (props: VaultPageButtonsProps) => {
  const { vault, className } = props

  const { address: userAddress } = useAccount()

  return (
    <div className={classNames('flex items-center gap-2 md:gap-4', className)}>
      <DepositButton
        vault={vault}
        extraOnClick={() => fathom.trackEvent(FATHOM_EVENTS.openedDepositModal)}
        intl={{ base: undefined, tooltips: undefined }}
      />
      <WithdrawButton
        vault={vault}
        extraOnClick={() => fathom.trackEvent(FATHOM_EVENTS.openedWithdrawModal)}
        color='transparent'
      >
        Withdraw
      </WithdrawButton>
      {!!userAddress && (
        <DelegateButton
          vault={vault}
          extraOnClick={() => fathom.trackEvent(FATHOM_EVENTS.openedDelegateModal)}
          color='transparent'
        >
          Delegate
        </DelegateButton>
      )}
    </div>
  )
}
