import { Button } from '@shared/ui'
import { LINKS } from '@shared/utilities'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { HomeHeader } from '@components/HomeHeader'
import { Layout } from '@components/Layout'
import { PrizePoolCards } from '@components/Prizes/PrizePoolCards'


export default function HomePage() {
  return (
    <Layout className='gap-8'>
      <HomeHeader />
      <Link href='/vaults' passHref={true}>
        <Button>Deposit to win</Button>
      </Link>
      <PrizePoolCards />
      <CabanaPoweredBy />
    </Layout>
  )
}

const CabanaPoweredBy = (props: { className?: string }) => {
  const { className } = props

  return (
    <div className={classNames('flex gap-2 items-center', className)}>
      Cabana is powered by
      <Link href={LINKS.protocolLandingPage} target='_blank'>
        <Image
          src='/pooltogether-logo.svg'
          alt='PoolTogether Logo'
          width={183}
          height={72}
          className='w-24 h-auto'
        />
      </Link>
    </div>
  )
}
