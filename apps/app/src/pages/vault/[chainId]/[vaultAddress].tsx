import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Layout } from '@components/Layout'
import { VaultPageContent } from '@components/Vault/VaultPageContent'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  }
}

export default function VaultPage() {
  const router = useRouter()

  const [vaultName, setVaultName] = useState<string>('')

  if (router.isReady && !router.isFallback) {
    return (
      <Layout overrides={{ pageTitle: vaultName }} className='gap-8'>
        <VaultPageContent queryParams={router.query} onFetchedVaultName={setVaultName} />
      </Layout>
    )
  }
}
