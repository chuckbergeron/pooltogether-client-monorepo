import { Vault } from '@generationsoftware/hyperstructure-client-js'
import {
  useUserVaultDelegate,
  useVaultShareData,
  useVaultTokenAddress
} from '@generationsoftware/hyperstructure-react-hooks'
import { NetworkIcon, TokenIcon } from '@shared/react-components'
import { TokenWithLogo } from '@shared/types'
import { Spinner } from '@shared/ui'
import { getNiceNetworkNameByChainId } from '@shared/utilities'
import { useAccount } from 'wagmi'
import { DelegateForm } from './DelegateForm'
import { DelegateModalView } from './index'

interface DelegateModalBodyProps {
  vault: Vault
  modalView: DelegateModalView
}

export const DelegateModalBody = (props: DelegateModalBodyProps) => {
  const { vault, modalView } = props

  const { address: userAddress } = useAccount()

  const { data: shareData } = useVaultShareData(vault)

  const { data: delegate } = useUserVaultDelegate(vault, userAddress!, {
    refetchOnWindowFocus: true
  })

  const vaultName = vault.name ?? `"${shareData?.name}"`
  const vaultToken = vault.tokenData?.symbol ?? `"${shareData?.name}"`
  const networkName = getNiceNetworkNameByChainId(vault.chainId)

  const isDelegatedToSelf = !delegate || delegate?.toLowerCase() === userAddress?.toLowerCase()

  const { data: tokenAddress } = useVaultTokenAddress(vault)

  const token: Partial<TokenWithLogo> = {
    chainId: vault.chainId,
    address: !!vault.logoURI ? vault.address : vault.tokenAddress ?? tokenAddress,
    name: vault.name ?? shareData?.name,
    symbol: vault.shareData?.symbol ?? shareData?.symbol,
    logoURI: vault.logoURI ?? vault.tokenLogoURI
  }

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-lg font-semibold text-center'>
        {!!vaultName && (
          <div className='flex flex-col items-center'>
            <div className='relative pb-3 shrink-0'>
              <TokenIcon token={token} />
              <NetworkIcon chainId={vault.chainId} className='absolute top-4 left-4 h-3 w-3' />
            </div>
            <span className='hidden md:inline-block'>
              Delegate your {vaultName} on {networkName}
            </span>
            <span className='inline-block md:hidden text-sm'>Delegate your {vaultName}</span>
          </div>
        )}

        <span className='text-xs sm:text-sm my-2 font-normal text-pt-purple-200 block'>
          {!!vaultName && isDelegatedToSelf
            ? `You are delegating to yourself. Any prize your ${vaultToken} deposit wins will go to your wallet.`
            : `The delegated address receives any prizes your ${vaultToken} deposit wins.`}
        </span>

        {!vaultName && <Spinner />}
      </span>

      <DelegateForm modalView={modalView} vault={vault} />
    </div>
  )
}
