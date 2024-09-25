import { Vault } from '@generationsoftware/hyperstructure-client-js'
import { useScreenSize } from '@shared/generic-react-hooks'
import { ExternalLink } from '@shared/ui'
import classNames from 'classnames'
import { getCleanURI } from 'src/utils'
import { VaultPageCard } from './VaultPageCard'
import { VaultPrizeYield } from './VaultPrizeYield'
import { VaultTotalDeposits } from './VaultTotalDeposits'
import { VaultWinChance } from './VaultWinChance'

interface VaultPageCardsProps {
  vault: Vault
  className?: string
}

export const VaultPageCards = (props: VaultPageCardsProps) => {
  const { vault, className } = props

  const { isDesktop } = useScreenSize()

  return (
    <div
      className={classNames(
        'w-full grid grid-cols-1 gap-3 md:grid-cols-2',
        { 'md:grid-cols-3': !!vault.yieldSourceName },
        className
      )}
    >
      <VaultPageCard title={'Total deposited'}>
        <VaultTotalDeposits
          vault={vault}
          className='gap-2'
          valueClassName='!text-2xl text-pt-purple-100 font-semibold md:!text-3xl'
          amountClassName='!text-sm text-pt-purple-300 md:!text-base'
        />
      </VaultPageCard>
      <VaultPageCard title={'Win chance'}>
        <VaultWinChance vault={vault} className='h-10 w-auto' />
        <div className='flex items-center gap-2 text-sm text-pt-purple-300 md:text-base'>
          <span>Prize yield:</span>
          <VaultPrizeYield vault={vault} label='APR' />
        </div>
      </VaultPageCard>
      {!!vault.yieldSourceName && (
        <VaultPageCard title={'Yield source'}>
          <span className='text-2xl text-pt-purple-100 font-semibold md:text-3xl'>
            {vault.yieldSourceName}
          </span>
          {!!vault.yieldSourceURI && (
            <ExternalLink
              href={vault.yieldSourceURI}
              size={isDesktop ? 'md' : 'sm'}
              className='text-pt-purple-300 hover:text-pt-purple-400'
            >
              {getCleanURI(vault.yieldSourceURI)}
            </ExternalLink>
          )}
        </VaultPageCard>
      )}
    </div>
  )
}
