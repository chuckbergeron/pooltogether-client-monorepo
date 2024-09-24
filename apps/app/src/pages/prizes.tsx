import { Button } from '@shared/ui'
import Link from 'next/link'
import { CheckPrizesBanner } from '@components/Account/CheckPrizesBanner'
import { Layout } from '@components/Layout'
import { PrizePoolDisplay } from '@components/Prizes/PrizePoolDisplay'
import { PrizePoolWinners } from '@components/Prizes/PrizePoolWinners'
import { PrizesHeader } from '@components/Prizes/PrizesHeader'

export default function PrizesPage() {
  return (
    <Layout className='gap-8'>
      <CheckPrizesBanner />
      <PrizesHeader />
      <Link href='/vaults' passHref={true}>
        <Button>Deposit to win</Button>
      </Link>
      <PrizePoolDisplay className='mt-8' />
      <PrizePoolWinners className='mt-8' />
    </Layout>
  )
}
