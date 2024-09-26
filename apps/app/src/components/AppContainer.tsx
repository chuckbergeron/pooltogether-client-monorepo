import { Flowbite, Toaster } from '@shared/ui'
import { AppProps } from 'next/app'
import { ReactNode, useEffect, useState } from 'react'
import { CustomAppProps } from '@pages/_app'
import { AccountFrame } from './Frames/AccountFrame'
import { DefaultFrame } from './Frames/DefaultFrame'
import { VaultFrame } from './Frames/VaultFrame'

export const AppContainer = (props: AppProps & CustomAppProps) => {
  const { Component, pageProps, serverProps, router } = props
  const { pathname } = router

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
  }, [])

  const pageFrames: { [href: string]: ReactNode } = {
    account: <AccountFrame user={serverProps.params['user']} />,
    vault: (
      <VaultFrame
        chainId={serverProps.params['chainId']}
        vaultAddress={serverProps.params['vaultAddress']}
      />
    )
  }

  const pageFrame = pageFrames[pathname.split('/')[1]]

  return (
    <>
      {pageFrame ?? <DefaultFrame />}
      <Flowbite>
        <Toaster expand={false} />
        <div id='modal-root' />
        <Component {...pageProps} />
      </Flowbite>
    </>
  )
}
