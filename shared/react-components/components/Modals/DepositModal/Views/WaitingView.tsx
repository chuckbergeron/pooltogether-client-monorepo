import { formatNumberForDisplay, Vault } from '@pooltogether/hyperstructure-client-js'
import { useVaultTokenData } from '@pooltogether/hyperstructure-react-hooks'
import { Intl } from '@shared/types'
import { Button, Spinner } from '@shared/ui'
import { useAtomValue } from 'jotai'
import { PrizePoolBadge } from '../../../Badges/PrizePoolBadge'
import { depositFormTokenAmountAtom } from '../../../Form/DepositForm'

interface WaitingViewProps {
  vault: Vault
  closeModal: () => void
  intl?: { base?: Intl<'confirmNotice' | 'depositing'>; common?: Intl<'prizePool' | 'close'> }
}

export const WaitingView = (props: WaitingViewProps) => {
  const { vault, closeModal, intl } = props

  const formTokenAmount = useAtomValue(depositFormTokenAmountAtom)

  const { data: tokenData } = useVaultTokenData(vault)

  const tokens = `${formatNumberForDisplay(formTokenAmount)} ${tokenData?.symbol}`

  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      <span className='text-lg font-semibold text-center'>
        {intl?.base?.('confirmNotice') ?? 'Confirm Transaction in Wallet'}
      </span>
      <PrizePoolBadge
        chainId={vault.chainId}
        hideBorder={true}
        intl={intl?.common}
        className='!py-1 mx-auto'
      />
      <span className='text-sm text-center md:text-base'>
        {intl?.base?.('depositing', { tokens }) ?? `Depositing ${tokens}...`}
      </span>
      <Spinner size='lg' className='mx-auto after:border-y-pt-teal' />
      <div className='flex items-end h-24 md:h-36'>
        <Button fullSized={true} color='transparent' onClick={closeModal}>
          {intl?.common?.('close') ?? 'Close'}
        </Button>
      </div>
    </div>
  )
}
