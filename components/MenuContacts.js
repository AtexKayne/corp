import A from "./A";

export default function MenuContacts() {

    return (
        <div className='search'>
            <div className='search__results pt-1'>
                <a href='tel:+7 (495) 589-34-81' className='search__item c-hover mt-0.5'>
                    <div className='search__item__sub text--p3'>Приёмная</div>
                    <div className='search__item__main text--t1'>+7 (495) 589-34-81</div>
                    <svg width='61' height='16' viewBox='0 0 61 16' fill='none' >
                        <line y1='10' x2='30' y2='10' stroke='currentColor' strokeWidth='2' />
                        <line x1='30' y1='8' x2='60' y2='8' stroke='currentColor' strokeWidth='2' />
                        <path d='M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3431 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3431 15.0711L60.7071 8.70711ZM59 9H60V7H59V9Z' fill='currentColor' />
                    </svg>
                </a>

                <a href='tel:+7 (495) 589-34-81' className='search__item c-hover mt-0.5'>
                    <div className='search__item__sub text--p3'>Отдел персонала</div>
                    <div className='search__item__main text--t1'>+7 (495) 589-34-81</div>
                    <svg width='61' height='16' viewBox='0 0 61 16' fill='none' >
                        <line y1='10' x2='30' y2='10' stroke='currentColor' strokeWidth='2' />
                        <line x1='30' y1='8' x2='60' y2='8' stroke='currentColor' strokeWidth='2' />
                        <path d='M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3431 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3431 15.0711L60.7071 8.70711ZM59 9H60V7H59V9Z' fill='currentColor' />
                    </svg>
                </a>

                <a href='tel:+7 (495) 589-34-81' className='search__item c-hover mt-0.5'>
                    <div className='search__item__sub text--p3'>Отдел продаж</div>
                    <div className='search__item__main text--t1'>+7 (495) 589-34-81</div>
                    <svg width='61' height='16' viewBox='0 0 61 16' fill='none' >
                        <line y1='10' x2='30' y2='10' stroke='currentColor' strokeWidth='2' />
                        <line x1='30' y1='8' x2='60' y2='8' stroke='currentColor' strokeWidth='2' />
                        <path d='M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3431 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3431 15.0711L60.7071 8.70711ZM59 9H60V7H59V9Z' fill='currentColor' />
                    </svg>
                </a>

                <a href='mail:info@simrussia.ru' className='search__item search__item--single c-hover my-1'>
                    <div className='search__item__main text--t1'>info@simrussia.ru</div>
                    <svg width='61' height='16' viewBox='0 0 61 16' fill='none' >
                        <line y1='10' x2='30' y2='10' stroke='currentColor' strokeWidth='2' />
                        <line x1='30' y1='8' x2='60' y2='8' stroke='currentColor' strokeWidth='2' />
                        <path d='M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3431 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3431 15.0711L60.7071 8.70711ZM59 9H60V7H59V9Z' fill='currentColor' />
                    </svg>
                </a>

                <A text='Все контакты' href='/contacts' externalClass='mt-0.5 text--t2 link link--underline'/>
            </div>
        </div>
    )
}