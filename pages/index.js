import Link from "next/link";
import MainLayout from "../layout/MainLayout";

export default function Home() {
  return (
    <MainLayout title='Главная'>
      <div className='pt-3' />
      <h1>Главная страница</h1>
      <div className='pt-3' />
      <div className='pl-2'>
        <div className='text--t1'>Список страниц:</div>
        <div className='pt-1' />
        <Link href='/product/test'>
          <a className='link'>Карточка товара</a>
        </Link>
      </div>
      <div className='pt-5' />
    </MainLayout>
  )
}
