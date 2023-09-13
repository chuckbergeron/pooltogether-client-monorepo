import { PrizePool } from '@generationsoftware/hyperstructure-client-js'
import { useCountup } from '@shared/generic-react-hooks'
import classNames from 'classnames'
import { useDrawStatus } from '@hooks/useDrawStatus'
import { DrawCardItemTitle } from './DrawCardItemTitle'

interface DrawTimerProps {
  prizePool: PrizePool
  drawId: number
  className?: string
}

// TODO: handle cases where closedAt is in the future (may not be necessary depending on how the subgraph is setup)
export const DrawTimer = (props: DrawTimerProps) => {
  const { prizePool, drawId, className } = props

  const { status, openedAt, closedAt } = useDrawStatus(prizePool, drawId)

  const { days, hours, minutes } = useCountup(closedAt ?? openedAt ?? 0)
  const _hours = days * 24 + hours

  return (
    <div className={classNames('flex flex-col gap-3', className)}>
      {!!status && status !== 'finalized' && (
        <>
          <DrawCardItemTitle>Time since {status}</DrawCardItemTitle>
          <div className='flex gap-1 items-center text-sm text-pt-purple-700'>
            {!!_hours && (
              <span className='flex items-center'>
                <span className='text-xl font-semibold'>{_hours}</span>Hr{_hours > 1 ? 's' : ''}
              </span>
            )}
            {!!minutes && (
              <span className='flex items-center'>
                <span className='text-xl font-semibold'>{minutes}</span>Min{minutes > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
