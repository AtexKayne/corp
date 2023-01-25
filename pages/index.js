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
        <div>
          <Link href='/product/test'>
            <a href='/product/test' className='link'>Карточка товара - авторизованный</a>
          </Link>
        </div>
        <div>
          <Link href='/product/test-1'>
            <a href='/product/test-1' className='link'>Карточка товара - для профи</a>
          </Link>
        </div>
        <div>
          <Link href='/product/test-2'>
            <a href='/product/test-2' className='link'>Карточка товара - выбор цвета</a>
          </Link>
        </div>
      </div>
      <div className='pt-5' />
    </MainLayout>
  )
}
