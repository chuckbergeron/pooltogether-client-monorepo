import {
  useAllUserVaultBalances,
  useSelectedVaults
} from '@generationsoftware/hyperstructure-react-hooks'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { MODAL_KEYS, useIsModalOpen } from '@shared/generic-react-hooks'
import { Button } from '@shared/ui'
import classNames from 'classnames'
import Link from 'next/link'
import { useMemo } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { PrizePoolCards } from '@components/Prizes/PrizePoolCards'
import { useSettingsModalView } from '@hooks/useSettingsModalView'
import { AccountDepositsCards } from './AccountDepositsCards'
import { AccountDepositsHeader } from './AccountDepositsHeader'
import { AccountDepositsTable } from './AccountDepositsTable'

interface AccountDepositsProps {
  address?: Address
  className?: string
}

export const AccountDeposits = (props: AccountDepositsProps) => {
  const { address, className } = props

  const { address: _userAddress } = useAccount()
  const userAddress = address ?? _userAddress

  const { vaults } = useSelectedVaults()

  const { data: vaultBalances } = useAllUserVaultBalances(vaults, userAddress as Address)

  const isEmpty = useMemo(() => {
    return !!vaultBalances && Object.values(vaultBalances).every((token) => token.amount === 0n)
  }, [vaultBalances])

  const isExternalUser = useMemo(() => {
    return !!address && address.toLowerCase() !== _userAddress?.toLowerCase()
  }, [address, _userAddress])

  if (typeof window !== 'undefined' && userAddress === undefined) {
    return (
      <div className='w-full flex flex-col items-center gap-8'>
        <NoWalletCard />
        <PrizePoolCards />
      </div>
    )
  }

  const isEmptyVaultLists = !vaults.allVaultInfo.length

  return (
    <div
      className={classNames(
        'w-full max-w-xl flex flex-col gap-2 items-center md:gap-4 lg:max-w-none',
        className
      )}
    >
      <AccountDepositsHeader address={userAddress} />
      {isEmpty && !isEmptyVaultLists && !isExternalUser && <NoDepositsCard />}
      {isEmpty && isEmptyVaultLists && <NoVaultListsCard />}
      {!isEmpty && <AccountDepositsTable address={userAddress} className='hidden mt-4 lg:block' />}
      {!isEmpty && <AccountDepositsCards address={userAddress} className='lg:hidden' />}
    </div>
  )
}

const NoWalletCard = (props: { className?: string }) => {
  const { className } = props

  const { openConnectModal } = useConnectModal()

  return (
    <div className={classNames('flex flex-col max-w-md gap-6 items-center', className)}>
      <span className='text-center text-3xl font-grotesk font-medium md:text-5xl'>
        Connect wallet
      </span>
      <Button onClick={openConnectModal}>
        <div className='inline-flex gap-3 font-medium'>
          <span>Connect wallet</span>
          <ArrowRightIcon className='h-5 w-5' />
        </div>
      </Button>
    </div>
  )
}

const NoDepositsCard = (props: { className?: string }) => {
  const { className } = props

  return (
    <div className={classNames('w-full rounded-lg lg:p-4 lg:bg-pt-bg-purple', className)}>
      <div className='flex flex-col w-full gap-2 items-center justify-center p-3 text-sm bg-pt-transparent rounded-lg lg:flex-row lg:gap-3 lg:text-lg lg:font-medium'>
        <span className='text-pt-purple-100'>You don't have any prize tokens.</span>
        <Link href='/vaults' className='text-pt-teal'>
          Deposit now.
        </Link>
      </div>
    </div>
  )
}

const NoVaultListsCard = (props: { className?: string }) => {
  const { className } = props

  const { setIsModalOpen } = useIsModalOpen(MODAL_KEYS.settings)
  const { setView } = useSettingsModalView()

  return (
    <div className={classNames('w-full rounded-lg lg:p-4 lg:bg-pt-bg-purple', className)}>
      <div className='flex flex-col w-full gap-2 items-center justify-center p-3 text-sm bg-pt-transparent rounded-lg lg:flex-row lg:gap-3 lg:text-lg lg:font-medium'>
        <span className='text-pt-purple-100'>You don't have any vault lists selected.</span>
        <button
          onClick={() => {
            setView('vaultLists')
            setIsModalOpen(true)
          }}
          className='text-pt-teal cursor-pointer hover:text-pt-teal-dark'
        >
          Manage Vault Lists
        </button>
      </div>
    </div>
  )
}
