import { Vault } from '@generationsoftware/hyperstructure-client-js'
import {
  useVaultExchangeRate,
  useVaultShareData,
  useVaultTokenAddress
} from '@generationsoftware/hyperstructure-react-hooks'
import { PrizePoolBadge } from '@shared/react-components'
import { Spinner } from '@shared/ui'
import { getNiceNetworkNameByChainId, lower } from '@shared/utilities'
import { useAtomValue } from 'jotai'
import { NetworkFees, NetworkFeesProps } from '../../NetworkFees'
import { WithdrawForm, withdrawFormTokenAddressAtom } from '../WithdrawForm'

interface MainViewProps {
  vault: Vault
}

export const MainView = (props: MainViewProps) => {
  const { vault } = props

  const { data: shareData } = useVaultShareData(vault)
  const { data: vaultTokenAddress } = useVaultTokenAddress(vault)

  const formTokenAddress = useAtomValue(withdrawFormTokenAddressAtom)

  const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  const vaultName = vault.name ?? `"${shareData?.name}"`
  const networkName = getNiceNetworkNameByChainId(vault.chainId)

  const isZapping =
    !!vaultTokenAddress &&
    !!formTokenAddress &&
    lower(vaultTokenAddress) !== lower(formTokenAddress)

  const feesToShow: NetworkFeesProps['show'] = isZapping
    ? ['approve', 'withdrawWithZap']
    : ['withdraw']

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-lg font-semibold text-center'>
        {!!vaultName && (
          <span className='hidden md:inline-block'>
            Withdraw from {vaultName} on {networkName}
          </span>
        )}
        {!!vaultName && <span className='inline-block md:hidden'>Withdraw from {vaultName}</span>}
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
          <WithdrawForm vault={vault} showInputInfoRows={true} />
          <NetworkFees vault={vault} show={feesToShow} />
        </>
      )}
    </div>
  )
}
