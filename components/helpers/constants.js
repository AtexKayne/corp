import { title } from "process"

export const menuItems = [
    {link: '/', text: 'Главная'},
    {link: '/brands', text: 'Бренды'},
    {link: '/projects', text: 'Проекты'},
    {link: '/', text: 'Партнерам'},
    {link: '/', text: 'Поставщикам'},
    {link: '/about', text: 'Работа у нас'},
    {link: '/', text: 'Команда'},
    {link: '/contacts', text: 'Контакты'},
]

export const brandItems = {
    title: 'Бренды',
    link: 'Поделиться',
    items: [
        {
            name: 'Derby',
            text: 'Основан известным испанским косметическим производителем — компанией CAROBELS COSMETICS и принадлежит одной семье уже более 35 лет',
            logo: '/assets/img/logos/brand-1.png' // Image size min 250x192
        },
        {
            name: 'DS',
            text: 'Более 50 лет, профессиональные средства Система 4 разрабатываются лучшими учеными и специалистами по здоровью волос и кожи головы.',
            logo: '/assets/img/logos/brand-2.png'
        },
        {
            name: 'Mizutani',
            text: 'Основан известным испанским косметическим производителем — компанией CAROBELS COSMETICS и принадлежит одной семье уже более 35 лет',
            logo: '/assets/img/logos/brand-3.png'
        },
        {
            name: 'Lock Stock & Barrel',
            text: 'Более 50 лет, профессиональные средства Система 4 разрабатываются лучшими учеными и специалистами по здоровью волос и кожи головы.',
            logo: '/assets/img/logos/brand-4.png'
        },
        {
            name: 'layrite',
            text: 'Основан известным испанским косметическим производителем — компанией CAROBELS COSMETICS и принадлежит одной семье уже более 35 лет',
            logo: '/assets/img/logos/brand-5.png'
        },
        {
            name: 'Forme Essentials',
            text: 'Более 50 лет, профессиональные средства Система 4 разрабатываются лучшими учеными и специалистами по здоровью волос и кожи головы.',
            logo: '/assets/img/logos/brand-1.png'
        },
        {
            name: 'test-7',
            text: 'Основан известным испанским косметическим производителем — компанией CAROBELS COSMETICS и принадлежит одной семье уже более 35 лет',
            logo: '/assets/img/logos/brand-2.png'
        },
        {
            name: 'Feather',
            text: 'Более 50 лет, профессиональные средства Система 4 разрабатываются лучшими учеными и специалистами по здоровью волос и кожи головы.',
            logo: '/assets/img/logos/brand-3.png'
        },
        {
            name: 'Slick Gorilla',
            text: 'Основан известным испанским косметическим производителем — компанией CAROBELS COSMETICS и принадлежит одной семье уже более 35 лет',
            logo: '/assets/img/logos/brand-4.png'
        },
        {
            name: 'System4',
            text: 'Более 50 лет, профессиональные средства Система 4 разрабатываются лучшими учеными и специалистами по здоровью волос и кожи головы.',
            logo: '/assets/img/logos/brand-5.png'
        }
    ],
    'tags': [
        'Барберинг',
        'Женские стрижки',
        'Окрашивание волос',
        'Укладки и прически',
        'Барберинг-2',
        'Барберинг-3',
        'Барберинг-4',
        'Барберинг-5',
        'Барберинг-6',
        'Барберинг-7',
        'Барберинг-8',
        'Барберинг-9'
    ]
}

export const mainItems = {
    'slider': {
        stateOne: [
            {
                'text': [
                    'Будущее — это тысячи разных деталей большой картины',
                    'которую нужно сперва вообразить...'
                ],
                'image': ''
            },
            {
                'text': [
                    'Некоторые из них очень редки,',
                    'порой на их поиски уходят годы.'
                ],
                'image': ''
            },
            {
                'text': [
                    'И когда картина собрана',
                    'рождается то, чего раньше не существовало.'
                ],
                'image': ''
            },
            {
                'text': [
                    'Алексей Тришин',
                    'CEO и основатель \r\n SIMRUSSIA'
                ],
                'image': '/assets/img/main/director.png'
            }
        ],
        stateTwo: [
            {
                'text': [
                    'Продаем баночки',
                    'Организовываем мероприятия'
                ],
                'image': ''
            },
            {
                'text': [
                    'Обучаем стричь, красить, укладывать волосы',
                    'Несём ценности бренда аудитории'
                ],
                'image': ''
            },
            {
                'text': [
                    'Поддерживаем дух брендов',
                    'Создаём приложения, веб-сайты и IT-решения для ритейла'
                ],
                'image': ''
            }
        ]
    }
}

export const brandDetail = {
    image: '/assets/img/brand/main.jpg',
    imageMobile: '/assets/img/brand/main-mobile.jpg',
    about: {
        name: 'Lock Stock & Barrel',
        country: 'Финляндия',
        image: '/assets/img/logos/brand-1.png',
        description: `Независимая марка Lock Stock & Barrel — это команда энтузиастов и экспертов, которые придумывают и производят премиальную мужскую косметику. 
            Производство находится в Англии. Функциональные и качественные средства для волос и бороды изготавливаются из натуральных ингредиентов и не тестируются на животных. 
            В 2015 году был выдан международный сертификат Leaping Bunny, который подтверждает, что никакие тесты на животных не проводились при разработке продукции.`,
    },
    numbers: [
        { number: 6, text: 'Стайлингов' },
        { number: 3, text: 'Жидких стайлинга' },
        { number: 2, text: 'Шампуня' },
        { number: 3, text: 'Помады' },
        { number: 2, text: 'Средства для бороды и усов' }
    ],
    ambasadors: [
        { name: 'test-1', image: '/assets/img/brand/ambasadors/ambasador-1.png' },
        { name: 'test-2', image: '/assets/img/brand/ambasadors/ambasador-2.png' },
        { name: 'test-3', image: '/assets/img/brand/ambasadors/ambasador-3.png' },
        { name: 'test-4', image: '/assets/img/brand/ambasadors/ambasador-4.png' },
        { name: 'test-5', image: '/assets/img/brand/ambasadors/ambasador-5.png' },
        { name: 'test-6', image: '/assets/img/brand/ambasadors/ambasador-6.png' },
    ],
    history: [
        { name: 'Сид Соттунг', city: 'Москва', place: 'Салон “Персона”', image: '/assets/img/brand/history/history-1.png' },
        { name: 'Элина Хюггериён', city: 'Тюмень', place: 'Салон "test-1"', image: '/assets/img/brand/history/history-2.png' },
        { name: 'Кати Чиз', city: 'Муратпаша', place: 'Салон "test-2"', image: '/assets/img/brand/history/history-3.png' },
        { name: 'Ирина Леондова', city: 'Москва', place: 'Салон "test-3"', image: '/assets/img/brand/history/history-1.png' },
    ],
    additional: { 
        title: 'Акцент на состав', 
        description: [
            `System4 эффективно борется с выпадением и поредением волос любого типа благодаря активным компонентам в составе, без гормонов и антибиотиков.`,
            `В линии средств представлены шампуни по типу кожи головы, а также средства для решения проблем зуда, шелушения и увлажнения кожи головы и тела.`
        ]
    },
    media: [
        '/assets/img/brand/media/media-1.png',
        '/assets/img/brand/media/media-2.png',
        '/assets/img/brand/media/media-3.png',
        '/assets/img/brand/media/media-4.png',
        '/assets/img/brand/media/media-5.png',
        '/assets/img/brand/media/media-2.png',
        '/assets/img/brand/media/media-3.png',
        '/assets/img/brand/media/media-4.png',
        '/assets/img/brand/media/media-1.png',
        '/assets/img/brand/media/media-2.png',
        '/assets/img/brand/media/media-3.png',
        '/assets/img/brand/media/media-4.png',
        '/assets/img/brand/media/media-5.png',
        '/assets/img/brand/media/media-2.png',
        '/assets/img/brand/media/media-3.png',
        '/assets/img/brand/media/media-2.png',
        '/assets/img/brand/media/media-3.png',
        '/assets/img/brand/media/media-4.png',
        '/assets/img/brand/media/media-5.png',
        '/assets/img/brand/media/media-2.png',
        '/assets/img/brand/media/media-3.png',
        '/assets/img/brand/media/media-4.png',
        '/assets/img/brand/media/media-1.png',
        '/assets/img/brand/media/media-2.png',
        '/assets/img/brand/media/media-3.png',
        '/assets/img/brand/media/media-4.png',
        '/assets/img/brand/media/media-5.png',
        '/assets/img/brand/media/media-2.png',
        '/assets/img/brand/media/media-3.png',
        '/assets/img/brand/media/media-4.png'
    ],
    contacts: {
        site: 'sim.fi/en/system-4',
        markets: 'redhare market, ozon, wildberries'
    },
    documents: [
        { icon: '/assets/img/icons/icon-eps.svg', name: 'Логотип в EPS', url: '' },
        { icon: '/assets/img/icons/icon-psd.svg', name: 'Логотип в PSD', url: '' },
        { icon: '/assets/img/icons/icon-sertificate.svg', name: 'Сертификат соответствия', url: '' },
        { icon: '/assets/img/icons/icon-r.svg', name: 'Регистрация товарного знака', url: '' },
    ]

}

export const contacts = {
    pagename: 'Контакты',
    adress: {
        city: 'Москва',
        metro: 'Бауманская',
        street: 'Улица Бауманская, 6с2',
        house: 'БЦ “Виктория плаза”',
        maps: [
            {name: 'yandex', link: '/testya'},
            {name: 'google', link: '/testgg'}
        ],
        social: {
            title: 'Связаться с нами',
            icons: [
                {name: 'Telegram', link: '/testtg'},
                {name: 'Вконтакте', link: '/testvk'}
            ]
        },
        bots: {
            title: 'Бот поддержки:',
            icons: [
                {name: 'whatsapp', link: '/testwa'},
                {name: 'telegram', link: '/testtg'}
            ]
        }
    },
    departments: {
        title: 'Важные подразделения',
        items: [
            {name: 'Приёмная', phone: '+7 (495) 589-34-81', mail: 'info@simrussia.ru'},
            {name: 'Отдел оптовых продаж', phone: '+7 (495) 589-34-81', mail: 'opt@simrussia.ru'},
            {name: 'Отдел по работе с барбершопами и салонами красоты', phone: '+7 (495) 589-34-81', mail: 'info@simrussia.ru'},
            {name: 'Маркетплейс RedHare Market', phone: '+7 (495) 589-34-81', mail: 'info@simrussia.ru'},
            {name: 'Маркетинг', phone: '+7 (495) 589-34-81', mail: 'info@simrussia.ru'},
            {name: 'Поддержка приложения RedHare', phone: '+7 (495) 589-34-81', mail: 'info@simrussia.ru'}
        ]
    },
    documents: {
        title: 'Документы',
        items: [
            {name: 'Карточка ООО Константа', icon: 'sertificate'},
            {name: 'Публичная оферта', icon: 'base-doc'},
            {name: 'Политика конфиденциальности', icon: 'base-doc'}
        ]
    }
}