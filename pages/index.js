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
          <Link href='/product/coloristic-profi'>
            <a href='/product/coloristic-profi' className='link'>Карточка товара - колористика (профи)</a>
          </Link>
        </div>
        <div>
          <Link href='/product/rp'>
            <a href='/product/rp' className='link'>Карточка товара - РП (с колористикой)</a>
          </Link>
        </div>
        <div>
          <Link href='/product/rp-2'>
            <a href='/product/rp-2' className='link'>Карточка товара - РП (без колористики)</a>
          </Link>
        </div>
        <div>
          <Link href='/product/empty'>
            <a href='/product/empty' className='link'>Карточка товара - РП (нет в наличии)</a>
          </Link>
        </div>
        <div>
          <Link href='/product/color-selector'>
            <a href='/product/color-selector' className='link'>Карточка товара - выбор цвета</a>
          </Link>
        </div>
      </div>
      <div className='pt-5' />
    </MainLayout>
  )
}
