import { XMarkIcon } from '@heroicons/react/24/solid'
import { useIsDismissed } from '@shared/generic-react-hooks'
import { AlertIcon } from '@shared/react-components'
import { Button, ExternalLink } from '@shared/ui'
import { LINKS } from '@shared/utilities'
import classNames from 'classnames'

interface VaultsDisclaimerProps {
  className?: string
}

export const VaultsDisclaimer = (props: VaultsDisclaimerProps) => {
  const { className } = props

  const { isDismissed, dismiss } = useIsDismissed('vaultsDisclaimer')

  if (isDismissed) {
    return <></>
  }

  return (
    <div
      className={classNames(
        'relative w-full max-w-[36rem] flex flex-col gap-4 p-4 bg-pt-transparent text-pt-purple-100 rounded-lg',
        'lg:max-w-none lg:flex-row lg:items-center lg:px-10',
        className
      )}
    >
      <div className='flex gap-2 items-center'>
        <AlertIcon className='w-5 h-5' />
        <span className='text-base font-semibold whitespace-nowrap'>
          Learn about the risks
        </span>
        <XMarkIcon
          className='w-7 h-7 shrink-0 ml-auto cursor-pointer lg:hidden'
          onClick={dismiss}
        />
      </div>
      <span className='inline-block grow text-xs lg:text-base'>
        PoolTogether prize vaults can be deployed by anyone. <ExternalLink
              href={LINKS.risks}
              className='text-xs text-pt-purple-300 lg:text-base'
              iconClassName='!h-4 !w-4'
            >Know what you are depositing into</ExternalLink>
      </span>
      <a
        href={LINKS.termsOfService}
        target='_blank'
        className='mx-auto text-xs text-blue-500 whitespace-nowrap lg:hidden'
      >
        Terms of Service
      </a>
      <Button
        href={LINKS.termsOfService}
        target='_blank'
        color='transparent'
        className='hidden lg:block'
      >
        <span className='text-sm whitespace-nowrap'>Terms of Service</span>
      </Button>
      <XMarkIcon className='hidden w-7 h-7 shrink-0 cursor-pointer lg:block' onClick={dismiss} />
    </div>
  )
}
