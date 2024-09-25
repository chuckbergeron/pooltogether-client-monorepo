import { Button } from '@shared/ui'
import classNames from 'classnames'
import Lottie from 'lottie-react'
import { noWinAnimation } from '../animations'

interface NoWinViewProps {
  onGoToAccount: () => void
}

export const NoWinView = (props: NoWinViewProps) => {
  const { onGoToAccount } = props

  return (
    <div className='flex flex-col items-center'>
      <span className='text-center text-3xl font-grotesk font-medium text-gray-100'>
        Sorry, no prizes this time.
      </span>
      <Lottie
        animationData={noWinAnimation}
        loop={true}
        className='w-full max-w-xs h-auto pointer-events-none'
      />
      <Button onClick={onGoToAccount} className={classNames('mx-auto')}>
        View Your Account
      </Button>
    </div>
  )
}
