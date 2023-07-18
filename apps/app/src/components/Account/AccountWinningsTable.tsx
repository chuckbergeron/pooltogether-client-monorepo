import { PrizePool, SubgraphPrizePoolAccount } from '@pooltogether/hyperstructure-client-js'
import { PrizePoolBadge } from '@shared/react-components'
import { Table, TableProps } from '@shared/ui'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { AccountWinAmount } from './AccountWinAmount'
import { AccountWinButtons } from './AccountWinButtons'

interface AccountWinningsTableProps extends Omit<TableProps, 'data' | 'keyPrefix'> {
  wins: (SubgraphPrizePoolAccount['prizesReceived'][0] & { chainId: number })[]
  prizePools: PrizePool[]
}

export const AccountWinningsTable = (props: AccountWinningsTableProps) => {
  const { wins, prizePools, className, ...rest } = props

  const router = useRouter()

  const t_common = useTranslations('Common')
  const t_account = useTranslations('Account')

  const tableData: TableProps['data'] = {
    headers: {
      draw: { content: t_account('winHeaders.draw') },
      prizePool: { content: t_account('winHeaders.prizePool'), position: 'center' },
      winnings: { content: t_account('winHeaders.winnings'), position: 'center' },
      info: { content: t_account('winHeaders.moreInfo'), position: 'center' }
    },
    rows: wins
      .map((win) => {
        const prizePool = prizePools.find((prizePool) => prizePool.chainId === win.chainId)

        if (!!prizePool) {
          const cells: TableProps['data']['rows'][0]['cells'] = {
            draw: { content: `Draw #${win.draw.id}` },
            prizePool: {
              content: (
                <PrizePoolBadge
                  chainId={win.chainId}
                  onClick={() => router.push(`/prizes?network=${win.chainId}`)}
                  intl={t_common}
                />
              ),
              position: 'center'
            },
            winnings: {
              content: (
                <AccountWinAmount
                  prizePool={
                    prizePools.find((prizePool) => prizePool.chainId === win.chainId) as PrizePool
                  }
                  amount={BigInt(win.payout)}
                  amountClassName='text-sm'
                />
              ),
              position: 'center'
            },
            info: { content: <AccountWinButtons win={win} />, position: 'center' }
          }
          return { id: win.id, cells }
        } else {
          return { id: win.id, cells: {} }
        }
      })
      .filter((row) => Object.keys(row.cells).length > 0)
  }

  return (
    <Table
      data={tableData}
      keyPrefix='accountWinningsTable'
      className={classNames('w-full', className)}
      {...rest}
    />
  )
}
