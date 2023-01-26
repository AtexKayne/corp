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
          <Link href='/product/rp-coloristic'>
            <a href='/product/rp-coloristic' className='link'>Карточка товара - РП Колористика (для профи)</a>
          </Link>
        </div>
        <div>
          <Link href='/product/pp-coloristic'>
            <a href='/product/pp-coloristic' className='link'>Карточка товара - ПП (с колористикой)</a>
          </Link>
        </div>
        <div>
          <Link href='/product/rp-no-coloristic'>
            <a href='/product/rp-no-coloristic' className='link'>Карточка товара - РП</a>
          </Link>
        </div>
        <div>
          <Link href='/product/empty'>
            <a href='/product/empty' className='link'>Карточка товара - РП (нет в наличии)</a>
          </Link>
        </div>
        <div>
          <Link href='/product/color-selector'>
            <a href='/product/color-selector' className='link'>Карточка товара - РП выбор цвета</a>
          </Link>
        </div>
      </div>
      <div className='pt-5' />
    </MainLayout>
  )
}
