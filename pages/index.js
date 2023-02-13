import Link from "next/link";
import MainLayout from "../layout/MainLayout";

export default function Home() {
  return (
    <MainLayout title='Главная'>
      <div className='pt-3' />
      <h1 className='sr-only'>Главная страница</h1>
      <div className='pt-3' />
      <div className='text--h4 text--bold'>Список страниц:</div>
      <div className='pt-2' />
      <div className='text--t1 pb-1'>Карточка товара</div>
      <div className='ml-1'>
        <Link href='/product/rp-coloristic'>
          <a href='/product/rp-coloristic' className='link'>Карточка товара - РП Колористика (для профи)</a>
        </Link>
      </div>
      <div className='ml-1'>
        <Link href='/product/pp-coloristic'>
          <a href='/product/pp-coloristic' className='link'>Карточка товара - ПП (с колористикой)</a>
        </Link>
      </div>
      <div className='ml-1'>
        <Link href='/product/rp-no-coloristic'>
          <a href='/product/rp-no-coloristic' className='link'>Карточка товара - РП  (1000 мл нет в наличии)</a>
        </Link>
      </div>
      <div className='ml-1'>
        <Link href='/product/empty'>
          <a href='/product/empty' className='link'>Карточка товара - Не авторизован (нет в наличии)</a>
        </Link>
      </div>
      <div className='ml-1'>
        <Link href='/product/color-selector'>
          <a href='/product/color-selector' className='link'>Карточка товара - РП выбор цвета</a>
        </Link>
      </div>

      <div className='text--t1 pb-1 pt-1.5'>Каталожная выдача</div>
      <div className='ml-1'>
        <Link href='/catalog/main'>
          <a href='/catalog/main' className='link'>Каталожная выдача</a>
        </Link>
      </div>

      <div className='text--t1 pb-1 pt-1.5'>Бренды</div>
      <div className='ml-1'>
        <Link href='/brands'>
          <a href='/brands' className='link'>Страница брендов</a>
        </Link>
      </div>
      <div className='ml-1'>
        <Link href='/brands/ds'>
          <a href='/brands/ds' className='link'>Каталожная выдача бренда (светлая обложка)</a>
        </Link>
      </div>
      <div className='ml-1'>
        <Link href='/brands/lock-stock-barrel'>
          <a href='/brands/lock-stock-barrel' className='link'>Каталожная выдача бренда (темная обложка)</a>
        </Link>
      </div>
      <div className='ml-1'>
        <Link href='/brands/Mr-Natty'>
          <a href='/brands/Mr-Natty' className='link'>Каталожная выдача бренда (без обложки)</a>
        </Link>
      </div>
      <div className='pt-5' />

    </MainLayout>
  )
}
