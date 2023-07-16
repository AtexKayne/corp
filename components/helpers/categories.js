export const _filters = {
    colors: [
        { value: 'Белый', isSelected: false },
        { value: 'Синий', isSelected: false },
        { value: 'Черный', isSelected: false },
        { value: 'Желтый', isSelected: false },
        { value: 'Красный', isSelected: false },
        { value: 'Серебристый', isSelected: false },
        { value: 'Разноцветный', isSelected: false },
    ],
    brands: [
        { value: 'ANDIS', isSelected: false },
        { value: 'CANWAY', isSelected: false },
        { value: 'DAYO 1', isSelected: false },
        { value: 'DAYO 2', isSelected: false },
        { value: 'ANDIS 1', isSelected: false },
        { value: 'ANDIS 2', isSelected: false },
        { value: 'BEUY PRO', isSelected: false },
        { value: 'CANWAY 1', isSelected: false },
        { value: 'CANWAY 2', isSelected: false },
        { value: 'BEUY PRO 2', isSelected: false },
        { value: 'BEUY PRO 1', isSelected: false },
        { value: 'BEARDBURYS', isSelected: false },
        { value: 'BEARDBURYS 1', isSelected: false },
        { value: 'BEARDBURYS 2', isSelected: false },
        { value: 'BABYLISS PRO', isSelected: false },
        { value: 'CLIPPER СAMO', isSelected: false },
        { value: 'BABYLISS PRO 1', isSelected: false },
        { value: 'CLIPPER СAMO 1', isSelected: false },
        { value: 'BABYLISS PRO 2', isSelected: false },
        { value: 'CLIPPER СAMO 2', isSelected: false },
    ],
    pitanie: [
        { value: 'Проводные', isSelected: false },
        { value: 'Беспроводные', isSelected: false },
        { value: 'Комбинированные', isSelected: false },
    ],
    proizvodstvo: [
        { value: 'Китай', isSelected: false },
        { value: 'Япония', isSelected: false },
        { value: 'Америка', isSelected: false },
        { value: 'Тайвань', isSelected: false },
        { value: 'Германия', isSelected: false },
        { value: 'Швейцария', isSelected: false },
    ],
    ves: [
        { value: '150 г', isSelected: false },
        { value: '170 г', isSelected: false },
        { value: '200 г', isSelected: false },
        { value: '250 г', isSelected: false },
    ],
    type: [
        { value: 'Вид 1', isSelected: false },
        { value: 'Вид 2', isSelected: false },
        { value: 'Вид 3', isSelected: false },
        { value: 'Вид 4', isSelected: false },
        { value: 'Вид 5', isSelected: false },
    ],
    vid: [
        { value: 'Вид 1', isSelected: false },
        { value: 'Вид 2', isSelected: false },
        { value: 'Вид 3', isSelected: false },
        { value: 'Вид 4', isSelected: false },
        { value: 'Вид 5', isSelected: false },
    ],
    cats: [
        { value: 'Категория 1', isSelected: false, include: null },
        {
            value: 'Категория 2', isSelected: false, include: [
                { value: 'Категория 2-1', isSelected: false, include: null },
                { value: 'Категория 2-2', isSelected: false, include: null },
                { value: 'Категория 2-3', isSelected: false, include: null },
                { value: 'Категория 2-4', isSelected: false, include: null },
                { value: 'Категория 2-5', isSelected: false, include: null },
            ]
        },
        { value: 'Категория 3', isSelected: false, include: null },
        {
            value: 'Категория 4', isSelected: false, include: [
                { value: 'Категория 4-1', isSelected: false, include: null },
                { value: 'Категория 4-2', isSelected: false, include: null },
                { value: 'Категория 4-3', isSelected: false, include: null },
                { value: 'Категория 4-4', isSelected: false, include: null },
            ]
        },
        { value: 'Категория 5', isSelected: false, include: null },
        {
            value: 'Категория 6', isSelected: false, include: [
                { value: 'Категория 6-1', isSelected: false, include: null },
                { value: 'Категория 6-2', isSelected: false, include: null },
            ]
        },
        { value: 'Категория 7', isSelected: false, include: null },
    ]
}

export const filters = [
    { id: 0, code: "category", name: "Категории", values: [..._filters.cats] },
    { id: 1, code: "price", name: "Цена", values: [450, 10000] },
    { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
    { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
    { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
    { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
    { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
    { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
    { id: 8, code: 'market', name: 'Новинки' },
    { id: 9, code: 'hits', name: 'Хиты' },
    { id: 10, code: 'discont', name: 'Со скидкой' },
]

export const cats = {
    "success": true,
    "data": [
        {
            id: 1,
            filter: [
                { id: 0, code: "category", name: "Категории", values: [..._filters.cats] },
                { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                { id: 8, code: 'market', name: 'Новинки' },
                { id: 9, code: 'hits', name: 'Хиты' },
                { id: 10, code: 'discont', name: 'Со скидкой' },
            ],
            coloristic: null,
            url: "1-level",
            name: "Первый уровень 1",
            parent_id: null,
            include_sections: [
                {
                    id: 11,
                    filter: [
                        { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                        { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                        { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                        { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                        { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                        { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                        { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                        { id: 8, code: 'market', name: 'Новинки' },
                        { id: 9, code: 'hits', name: 'Хиты' },
                        { id: 10, code: 'discont', name: 'Со скидкой' },
                    ],
                    coloristic: null,
                    url: "1-2-level-1",
                    name: "Второй уровень 1",
                    depth_level: 2,
                    parent_id: 1,
                    include_sections: [
                        {
                            id: 111,
                            filter: [
                                { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                                { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                                { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                                { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                                { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                                { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                                { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                                { id: 8, code: 'market', name: 'Новинки' },
                                { id: 9, code: 'hits', name: 'Хиты' },
                                { id: 10, code: 'discont', name: 'Со скидкой' },
                            ],
                            coloristic: null,
                            url: "1-3-level-1",
                            name: "Третий уровень 1",
                            depth_level: 3,
                            parent_id: 11,
                        },
                        {
                            id: 112,
                            filter: [
                                { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                                { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                                { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                                { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                                { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                                { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                                { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                                { id: 8, code: 'market', name: 'Новинки' },
                                { id: 9, code: 'hits', name: 'Хиты' },
                                { id: 10, code: 'discont', name: 'Со скидкой' },
                            ],
                            coloristic: null,
                            url: "1-3-level-2",
                            name: "Третий уровень 2",
                            depth_level: 3,
                            parent_id: 11
                        },
                    ]
                },
                {
                    id: 12,
                    filter: [
                        { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                        { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                        { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                        { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                        { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                        { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                        { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                        { id: 8, code: 'market', name: 'Новинки' },
                        { id: 9, code: 'hits', name: 'Хиты' },
                        { id: 10, code: 'discont', name: 'Со скидкой' },
                    ],
                    coloristic: null,
                    url: "1-2-level-2",
                    name: "Второй уровень 2",
                    depth_level: 2,
                    parent_id: 1
                },
                {
                    id: 13,
                    filter: [
                        { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                        { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                        { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                        { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                        { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                        { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                        { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                        { id: 8, code: 'market', name: 'Новинки' },
                        { id: 9, code: 'hits', name: 'Хиты' },
                        { id: 10, code: 'discont', name: 'Со скидкой' },
                    ],
                    coloristic: null,
                    url: "1-2-level-3",
                    name: "Второй уровень 3",
                    depth_level: 2,
                    parent_id: 1
                },
            ]
        },
        {
            id: 2,
            filter: [
                { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                { id: 8, code: 'market', name: 'Новинки' },
                { id: 9, code: 'hits', name: 'Хиты' },
                { id: 10, code: 'discont', name: 'Со скидкой' },
            ],
            coloristic: null,
            url: "2-level",
            name: "Первый уровень 2",
            parent_id: null,
            include_sections: [
                {
                    id: 21,
                    filter: [
                        { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                        { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                        { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                        { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                        { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                        { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                        { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                        { id: 8, code: 'market', name: 'Новинки' },
                        { id: 9, code: 'hits', name: 'Хиты' },
                        { id: 10, code: 'discont', name: 'Со скидкой' },
                    ],
                    coloristic: null,
                    url: "2-2-level-1",
                    name: "Второй уровень 1",
                    depth_level: 2,
                    parent_id: 2,
                    include_sections: [
                        {
                            id: 211,
                            filter: [
                                { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                                { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                                { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                                { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                                { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                                { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                                { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                                { id: 8, code: 'market', name: 'Новинки' },
                                { id: 9, code: 'hits', name: 'Хиты' },
                                { id: 10, code: 'discont', name: 'Со скидкой' },
                            ],
                            coloristic: null,
                            url: "2-3-level-1",
                            name: "Третий уровень 1",
                            depth_level: 3,
                            parent_id: 21,
                        },
                        {
                            id: 212,
                            filter: [
                                { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                                { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                                { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                                { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                                { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                                { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                                { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                                { id: 8, code: 'market', name: 'Новинки' },
                                { id: 9, code: 'hits', name: 'Хиты' },
                                { id: 10, code: 'discont', name: 'Со скидкой' },
                            ],
                            coloristic: null,
                            url: "2-3-level-2",
                            name: "Третий уровень 2",
                            depth_level: 3,
                            parent_id: 21
                        },
                    ]
                },
                {
                    id: 22,
                    filter: [
                        { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                        { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                        { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                        { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                        { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                        { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                        { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                        { id: 8, code: 'market', name: 'Новинки' },
                        { id: 9, code: 'hits', name: 'Хиты' },
                        { id: 10, code: 'discont', name: 'Со скидкой' },
                    ],
                    coloristic: null,
                    url: "2-2-level-2",
                    name: "Второй уровень 2",
                    depth_level: 2,
                    parent_id: 2
                },
                {
                    id: 23,
                    filter: [
                        { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                        { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                        { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                        { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                        { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                        { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                        { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                        { id: 8, code: 'market', name: 'Новинки' },
                        { id: 9, code: 'hits', name: 'Хиты' },
                        { id: 10, code: 'discont', name: 'Со скидкой' },
                    ],
                    coloristic: null,
                    url: "2-2-level-3",
                    name: "Второй уровень 3",
                    depth_level: 2,
                    parent_id: 2
                },
            ]
        },
        {
            id: 3,
            filter: [
                { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                { id: 8, code: 'market', name: 'Новинки' },
                { id: 9, code: 'hits', name: 'Хиты' },
                { id: 10, code: 'discont', name: 'Со скидкой' },
            ],
            coloristic: null,
            url: "3-level",
            name: "Первый уровень 3",
            parent_id: null,
            include_sections: [
                {
                    id: 31,
                    filter: [
                        { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                        { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                        { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                        { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                        { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                        { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                        { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                        { id: 8, code: 'market', name: 'Новинки' },
                        { id: 9, code: 'hits', name: 'Хиты' },
                        { id: 10, code: 'discont', name: 'Со скидкой' },
                    ],
                    coloristic: null,
                    url: "3-2-level-1",
                    name: "Второй уровень 1",
                    depth_level: 2,
                    parent_id: 3,
                    include_sections: [
                        {
                            id: 311,
                            filter: [
                                { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                                { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                                { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                                { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                                { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                                { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                                { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                                { id: 8, code: 'market', name: 'Новинки' },
                                { id: 9, code: 'hits', name: 'Хиты' },
                                { id: 10, code: 'discont', name: 'Со скидкой' },
                            ],
                            coloristic: null,
                            url: "3-3-level-1",
                            name: "Третий уровень 1",
                            depth_level: 3,
                            parent_id: 31,
                        },
                        {
                            id: 312,
                            filter: [
                                { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                                { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                                { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                                { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                                { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                                { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                                { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                                { id: 8, code: 'market', name: 'Новинки' },
                                { id: 9, code: 'hits', name: 'Хиты' },
                                { id: 10, code: 'discont', name: 'Со скидкой' },
                            ],
                            coloristic: null,
                            url: "3-3-level-2",
                            name: "Третий уровень 2",
                            depth_level: 3,
                            parent_id: 31
                        },
                    ]
                },
                {
                    id: 22,
                    filter: [
                        { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                        { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                        { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                        { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                        { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                        { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                        { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                        { id: 8, code: 'market', name: 'Новинки' },
                        { id: 9, code: 'hits', name: 'Хиты' },
                        { id: 10, code: 'discont', name: 'Со скидкой' },
                    ],
                    coloristic: null,
                    url: "3-2-level-2",
                    name: "Второй уровень 2",
                    depth_level: 2,
                    parent_id: 3
                },
                {
                    id: 23,
                    filter: [
                        { id: 1, code: "price", name: "Цена", values: [450, 10000] },
                        { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
                        { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
                        { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
                        { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
                        { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
                        { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
                        { id: 8, code: 'market', name: 'Новинки' },
                        { id: 9, code: 'hits', name: 'Хиты' },
                        { id: 10, code: 'discont', name: 'Со скидкой' },
                    ],
                    coloristic: null,
                    url: "3-2-level-3",
                    name: "Второй уровень 3",
                    depth_level: 2,
                    parent_id: 3
                },
            ]
        },
    ]
}

export const cat = {
    "success": true,
    "data": {
        id: 1,
        filter: [
            { id: 0, code: "category", name: "Категории", values: [..._filters.cats] },
            { id: 1, code: "price", name: "Цена", values: [450, 10000] },
            { id: 2, code: "brand", name: "Бренд", values: [..._filters.brands] },
            { id: 3, code: "vid", name: "Вид товара", values: [..._filters.vid] },
            { id: 4, code: "proizvodstvo", name: "Производство", values: [..._filters.proizvodstvo] },
            { id: 5, code: "ves", name: "Вес", values: [..._filters.ves] },
            { id: 6, code: "pitanie", name: "Питание", values: [..._filters.pitanie] },
            { id: 7, code: "colors", name: "Цвет", values: [..._filters.colors] },
            { id: 8, code: 'market', name: 'Новинки' },
            { id: 9, code: 'hits', name: 'Хиты' },
            { id: 10, code: 'discont', name: 'Со скидкой' },
        ],
        coloristic: null,
        url: "1-level",
        name: "Первый уровень 1",
        parent_id: null,
    },
}

export const catalogNav = {
    "success": true,
    "data": [
        {
            "id": 1932,
            "name": "Машинки",
            "url": "/professionalnye-mashinki-dlia-strizhki/",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 1933,
                    "url": "/parikmakherskie-mashinki-dlia-strizhki-i-trimmery/",
                    "name": "Машинки для стрижки, триммеры",
                    "depth_level": 2,
                    "parent_id": 1932
                },
                {
                    "id": 1934,
                    "url": "/nozhevye-bloki-dlia-mashinok-i-trimmerov/",
                    "name": "Ножевые блоки",
                    "depth_level": 2,
                    "parent_id": 1932
                },
                {
                    "id": 1935,
                    "url": "/nasadki-na-mashinki-dlia-strizhki-i-trimmery/",
                    "name": "Насадки на машинки",
                    "depth_level": 2,
                    "parent_id": 1932
                },
                {
                    "id": 1936,
                    "url": "/sprei-i-zhidkost-dlia-nozhei/",
                    "name": "Спрей и жидкость для ножей",
                    "depth_level": 2,
                    "parent_id": 1932
                }
            ]
        },
        {
            "id": 1938,
            "url": "/professionalnye-feny-dlia-volos/",
            "name": "Фены и стайлеры",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 1939,
                    "url": "/professionalnye-feny-dlia-parikmakherov/",
                    "name": "Профессиональные фены",
                    "depth_level": 2,
                    "parent_id": 1938
                },
                {
                    "id": 1940,
                    "url": "/professionalnye-ploiki-i-stailery/",
                    "name": "Плойки, стайлеры",
                    "depth_level": 2,
                    "parent_id": 1938
                },
                {
                    "id": 1941,
                    "url": "/professionalnye-shchiptcy-i-vypriamiteli-dlia-volos/",
                    "name": "Щипцы - выпрямители",
                    "depth_level": 2,
                    "parent_id": 1938
                },
                {
                    "id": 1943,
                    "url": "/elektrobigudi/",
                    "name": "Электробигуди",
                    "depth_level": 2,
                    "parent_id": 1938
                }
            ]
        },
        {
            "id": 1944,
            "url": "/professionalnye-nozhnitcy-dlia-strizhki/",
            "name": "Ножницы",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 1945,
                    "url": "/parikmakherskie-nozhnitcy/",
                    "name": "Парикмахерские ножницы",
                    "depth_level": 2,
                    "parent_id": 1944
                },
                {
                    "id": 1946,
                    "url": "/professionalnye-filirovochnye-nozhnitcy/",
                    "name": "Филировочные ножницы",
                    "depth_level": 2,
                    "parent_id": 1944
                },
                {
                    "id": 1947,
                    "url": "/nozhnitcy-dlia-obucheniia/",
                    "name": "Ножницы для обучения",
                    "depth_level": 2,
                    "parent_id": 1944
                },
                {
                    "id": 1948,
                    "url": "/parikmakherskie-zazhimy/",
                    "name": "Зажимы для волос",
                    "depth_level": 2,
                    "parent_id": 1944
                },
                {
                    "id": 1949,
                    "url": "/raspyliteli-dlia-vody-dlia-parikmakherskikh/",
                    "name": "Распылители для воды",
                    "depth_level": 2,
                    "parent_id": 1944
                },
                {
                    "id": 2301,
                    "url": "/professionalnye-britvy-dlia-strizhki-volos/",
                    "name": "Бритвы для стрижки",
                    "depth_level": 2,
                    "parent_id": 1944
                }
            ]
        },
        {
            "id": 1950,
            "url": "/instrumenty-dlia-stailinga/",
            "name": "Стайлинг",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 1951,
                    "url": "/ploiki-i-stailery-dlia-ucladki-volos/",
                    "name": "Плойки, стайлеры",
                    "depth_level": 2,
                    "parent_id": 1950
                },
                {
                    "id": 1952,
                    "url": "/parikmakherskie-shchiptcy-i-vypriamiteli/",
                    "name": "Щипцы - выпрямители",
                    "depth_level": 2,
                    "parent_id": 1950
                },
                {
                    "id": 1953,
                    "url": "/professionalnye-elektrobigudi/",
                    "name": "Электробигуди",
                    "depth_level": 2,
                    "parent_id": 1950
                },
                {
                    "id": 1954,
                    "url": "/parikmakherskie-raspyliteli-dlia-vody/",
                    "name": "Распылители для воды",
                    "depth_level": 2,
                    "parent_id": 1950
                },
                {
                    "id": 1955,
                    "url": "/parikmakherskie-brashingi-rascheski-shchetki-zazhimy/",
                    "name": "Брашинги, расчески, щетки, зажимы",
                    "depth_level": 2,
                    "parent_id": 1950,
                    "include_sections": [
                        {
                            "id": 1956,
                            "url": "/brashingi-dlia-uladki-volos/",
                            "name": "Брашинги",
                            "depth_level": 3,
                            "parent_id": 1955,
                        },
                        {
                            "id": 1957,
                            "url": "/professionalnye-rascheski-i-shchetki-dlia-volos/",
                            "name": "Расчески и щетки",
                            "depth_level": 3,
                            "parent_id": 1955
                        },
                        {
                            "id": 1958,
                            "url": "/zazhimy-dlia-ucladki-volos/",
                            "name": "Зажимы для волос",
                            "depth_level": 3,
                            "parent_id": 1955
                        },
                        {
                            "id": 1959,
                            "url": "/shchetki-smetki-dlia-volos/",
                            "name": "Щетки - сметки",
                            "depth_level": 3,
                            "parent_id": 1955
                        }
                    ]
                },
                {
                    "id": 1960,
                    "url": "/professionalnye-sredstva-dlia-ucladki-volos/",
                    "name": "Средства для укладки",
                    "depth_level": 2,
                    "parent_id": 1950,
                    "include_sections": [
                        {
                            "id": 1961,
                            "url": "/tverdye-sredstva-dlia-ucladki-volos/",
                            "name": "Твердые средства",
                            "depth_level": 3,
                            "parent_id": 1960
                        },
                        {
                            "id": 1962,
                            "url": "/kremoobraznye-sredstva-dlia-ucladki-volos/",
                            "name": "Кремообразные средства",
                            "depth_level": 3,
                            "parent_id": 1960
                        },
                        {
                            "id": 1963,
                            "url": "/zhidkie-sredstva-dlia-ucladki-volos/",
                            "name": "Жидкие средства",
                            "depth_level": 3,
                            "parent_id": 1960
                        },
                        {
                            "id": 1965,
                            "url": "/sprei-i-laki-dlia-ucladki-volos/",
                            "name": "Спреи и лаки для укладки",
                            "depth_level": 3,
                            "parent_id": 1960
                        },
                        {
                            "id": 1966,
                            "url": "/mussy-i-geli-dlia-ucladki-volos/",
                            "name": "Муссы и гели для укладки",
                            "depth_level": 3,
                            "parent_id": 1960
                        },
                        {
                            "id": 1967,
                            "url": "/professionalnaia-termozashchita-dlia-volos/",
                            "name": "Термозащита для волос",
                            "depth_level": 3,
                            "parent_id": 1960
                        }
                    ]
                },
                {
                    "id": 1969,
                    "url": "/sredstva-dlia-muzhskoi-ucladki/",
                    "name": "Мужская укладка",
                    "depth_level": 2,
                    "parent_id": 1950,
                    "include_sections": [
                        {
                            "id": 1970,
                            "url": "/tverdye-sredstva-dlia-muzhskoi-ucladki/",
                            "name": "Твердые средства",
                            "depth_level": 3,
                            "parent_id": 1969
                        },
                        {
                            "id": 1971,
                            "url": "/kremoobraznye-sredstva-dlia-muzhskoi-ucladki/",
                            "name": "Кремообразные средства",
                            "depth_level": 3,
                            "parent_id": 1969
                        },
                        {
                            "id": 1972,
                            "url": "/zhidkie-sredstva-dlia-muzhskoi-ucladki/",
                            "name": "Жидкие средства",
                            "depth_level": 3,
                            "parent_id": 1969
                        },
                        {
                            "id": 1973,
                            "url": "/pomady-dlia-muzhskoi-ucladki/",
                            "name": "Помады для мужской укладки",
                            "depth_level": 3,
                            "parent_id": 1969
                        },
                        {
                            "id": 1974,
                            "url": "/pudry-dlia-muzhskoi-ucladki/",
                            "name": "Пудры для мужской укладки",
                            "depth_level": 3,
                            "parent_id": 1969
                        },
                        {
                            "id": 1975,
                            "url": "/sprei-i-laki-dlia-muzhskoi-ucladki/",
                            "name": "Спреи и лаки для мужской укладки",
                            "depth_level": 3,
                            "parent_id": 1969
                        },
                        {
                            "id": 1976,
                            "url": "/mussy-i-geli-dlia-muzhskoi-ucladki/",
                            "name": "Муссы и гели для мужской укладки",
                            "depth_level": 3,
                            "parent_id": 1969
                        },
                        {
                            "id": 1978,
                            "url": "/sredstva-dlia-ucladki-usov-i-borody/",
                            "name": "Для усов и бороды",
                            "depth_level": 3,
                            "parent_id": 1969
                        }
                    ]
                }
            ]
        },
        {
            "id": 1979,
            "url": "/kosmetika-dlya-volos/",
            "name": "Косметика для волос",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 1980,
                    "url": "/professionalnaia-kosmetika-po-uhodu-za-volosami/",
                    "name": "Уход за волосами",
                    "depth_level": 2,
                    "parent_id": 1979,
                    "include_sections": [
                        {
                            "id": 1981,
                            "url": "/professionalnye-shampuni-dlia-uhoda-za-volosami/",
                            "name": "Шампуни",
                            "depth_level": 3,
                            "parent_id": 1980
                        },
                        {
                            "id": 1982,
                            "url": "/professionalnye-suhie-shampuni/",
                            "name": "Сухие шампуни",
                            "depth_level": 3,
                            "parent_id": 1980
                        },
                        {
                            "id": 1983,
                            "url": "/balzamy-i-konditcionery-dlia-uhoda-za-volosami/",
                            "name": "Бальзамы и кондиционеры",
                            "depth_level": 3,
                            "parent_id": 1980
                        },
                        {
                            "id": 1984,
                            "url": "/professionalnye-ottenochnye-shampuni-i-balzamy/",
                            "name": "Оттеночные шампуни и бальзамы",
                            "depth_level": 3,
                            "parent_id": 1980
                        },
                        {
                            "id": 1985,
                            "url": "/professionalnye-maski-dlia-uhoda-za-volosami/",
                            "name": "Маски",
                            "depth_level": 3,
                            "parent_id": 1980
                        },
                        {
                            "id": 1986,
                            "url": "/professionalnye-masla-dlia-uhoda-za-volosami/",
                            "name": "Масло",
                            "depth_level": 3,
                            "parent_id": 1980
                        },
                        {
                            "id": 1987,
                            "url": "/professionalnye-syvorotki-dlia-uhoda-za-volosami/",
                            "name": "Сыворотки и эликсиры",
                            "depth_level": 3,
                            "parent_id": 1980
                        },
                        {
                            "id": 1988,
                            "url": "/professionalnye-sprei-dlia-uhoda-za-volosami/",
                            "name": "Спреи для волос",
                            "depth_level": 3,
                            "parent_id": 1980
                        },
                        {
                            "id": 2450,
                            "url": "/kremy-dlia-uhoda-za-volosami/",
                            "name": "Кремы",
                            "depth_level": 3,
                            "parent_id": 1980
                        }
                    ]
                },
                {
                    "id": 1989,
                    "url": "/professionalnye-sredstva-dlia-lecheniia-volos/",
                    "name": "Лечение волос",
                    "depth_level": 2,
                    "parent_id": 1979,
                    "include_sections": [
                        {
                            "id": 1990,
                            "url": "/kompleksy-dlia-lecheniia-volos-i-kozhi-golovy/",
                            "name": "Комплексный подход к лечению волос",
                            "depth_level": 3,
                            "parent_id": 1989
                        },
                        {
                            "id": 1991,
                            "url": "/shampuni-dlia-lecheniia-volos-i-kozhi-golovy/",
                            "name": "Шампуни",
                            "depth_level": 3,
                            "parent_id": 1989
                        },
                        {
                            "id": 1992,
                            "url": "/balzamy-i-konditcionery-dlia-lecheniia-volos/",
                            "name": "Бальзамы и кондиционеры",
                            "depth_level": 3,
                            "parent_id": 1989
                        },
                        {
                            "id": 1993,
                            "url": "/losony-dlia-lecheniia-kozhi-golovy/",
                            "name": "Лосьоны для кожи",
                            "depth_level": 3,
                            "parent_id": 1989
                        },
                        {
                            "id": 1994,
                            "url": "/maski-dlia-lecheniia-kozhi-golovy/",
                            "name": "Пилинги для кожи головы",
                            "depth_level": 3,
                            "parent_id": 1989
                        },
                        {
                            "id": 1996,
                            "url": "/syvorotki-i-toniki-dlia-lecheniia-volos/",
                            "name": "Сыворотки и тоники",
                            "depth_level": 3,
                            "parent_id": 1989
                        }
                    ]
                },
                {
                    "id": 1999,
                    "url": "/podarochnye-nabory-kosmetiki-dlia-volos/",
                    "name": "Подарочные наборы",
                    "depth_level": 2,
                    "parent_id": 1979
                },
                {
                    "id": 2000,
                    "url": "/muzhskie-sredstva-dlia-volos/",
                    "name": "Мужские средства для волос",
                    "depth_level": 2,
                    "parent_id": 1979,
                    "include_sections": [
                        {
                            "id": 2001,
                            "url": "/professionalnye-muzhskie-shampuni/",
                            "name": "Шампуни",
                            "depth_level": 3,
                            "parent_id": 2000
                        },
                        {
                            "id": 2002,
                            "url": "/muzhskie-konditcionery-dlia-volos/",
                            "name": "Бальзамы и кондиционеры",
                            "depth_level": 3,
                            "parent_id": 2000
                        },
                        {
                            "id": 2003,
                            "url": "/muzhskie-ottenochnye-shampuni-i-pomady/",
                            "name": "Оттеночные шампуни и помады",
                            "depth_level": 3,
                            "parent_id": 2000
                        },
                        {
                            "id": 2004,
                            "url": "/muzhskie-toniki-dlia-kozhi-golovy/",
                            "name": "Тоник для лысой головы",
                            "depth_level": 3,
                            "parent_id": 2000
                        }
                    ]
                },
                {
                    "id": 2005,
                    "url": "/sredstva-dlia-uhoda-za-borodoi-i-usami/",
                    "name": "Уход за бородой и усами",
                    "depth_level": 2,
                    "parent_id": 1979,
                    "include_sections": [
                        {
                            "id": 2006,
                            "url": "/shampuni-dlia-uhoda-za-borodoi/",
                            "name": "Шампунь для бороды",
                            "depth_level": 3,
                            "parent_id": 2005
                        },
                        {
                            "id": 2007,
                            "url": "/balzamy-i-konditcionery-dlia-uhoda-za-borodoi/",
                            "name": "Бальзамы и кондиционеры для бороды",
                            "depth_level": 3,
                            "parent_id": 2005
                        },
                        {
                            "id": 2008,
                            "url": "/vosk-dlia-ucladki-usov/",
                            "name": "Воск для укладки усов",
                            "depth_level": 3,
                            "parent_id": 2005
                        },
                        {
                            "id": 2009,
                            "url": "/pena-dlia-uhoda-za-borodoi/",
                            "name": "Пена для бороды",
                            "depth_level": 3,
                            "parent_id": 2005
                        }
                    ]
                }
            ]
        },
        {
            "id": 2010,
            "url": "/rashodnye-materialy-dlia-parikmakherov/",
            "name": "Расходные материалы",
            "depth_level": 1,
            "parent_id": null
        },
        {
            "id": 2018,
            "url": "/professionalnye-sredstva-dlia-okrashivaniia-volos/",
            "name": "Окрашивание волос",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 2019,
                    "url": "/instrumenty-dlia-okrashivaniia-volos/",
                    "name": "Инструменты для окрашивания",
                    "depth_level": 2,
                    "parent_id": 2018,
                    "include_sections": [
                        {
                            "id": 2020,
                            "url": "/professionalnye-kisti-dlia-okrashivaniia-volos/",
                            "name": "Кисти для окрашивания",
                            "depth_level": 3,
                            "parent_id": 2019
                        },
                        {
                            "id": 2021,
                            "url": "/miski-dlia-okrashivaniia-volos/",
                            "name": "Миски для окрашивания",
                            "depth_level": 3,
                            "parent_id": 2019
                        },
                        {
                            "id": 2022,
                            "url": "/nabory-instrumentov-dlia-okrashivaniia-volos/",
                            "name": "Наборы для окрашивания",
                            "depth_level": 3,
                            "parent_id": 2019
                        }
                    ]
                },
                {
                    "id": 2023,
                    "url": "/professionalnye-kraski-dlia-okrashivaniia-volos/",
                    "name": "Краска для волос",
                    "depth_level": 2,
                    "parent_id": 2018,
                    "include_sections": [
                        {
                            "id": 2352,
                            "url": "/krasiteli-dlia-volos-wella-professionals/",
                            "name": "Wella Professionals",
                            "depth_level": 3,
                            "parent_id": 2023
                        },
                        {
                            "id": 2353,
                            "url": "/krasiteli-dlia-volos-londa-professional/",
                            "name": "Londa Professional",
                            "depth_level": 3,
                            "parent_id": 2023
                        },
                        {
                            "id": 2354,
                            "url": "/krasiteli-dlia-volos-sensido/",
                            "name": "SensiDO",
                            "depth_level": 3,
                            "parent_id": 2023
                        },
                        {
                            "id": 2355,
                            "url": "/krasiteli-dlia-volos-matrix/",
                            "name": "Matrix",
                            "depth_level": 3,
                            "parent_id": 2023
                        },
                        {
                            "id": 2394,
                            "url": "/krasiteli-dlia-volos-estel-professional/",
                            "name": "Estel Professional",
                            "depth_level": 3,
                            "parent_id": 2023
                        }
                    ]
                },
                {
                    "id": 2024,
                    "url": "/professionalnye-okisliteli-dlia-volos/",
                    "name": "Окислители",
                    "depth_level": 2,
                    "parent_id": 2018
                },
                {
                    "id": 2025,
                    "url": "/osvetliaiushchie-pasty-i-poroshki-dlia-volos/",
                    "name": "Паста, порошок осветляющие",
                    "depth_level": 2,
                    "parent_id": 2018
                },
                {
                    "id": 2026,
                    "url": "/ottenochnye-shampuni-i-balzamy-dlia-okrashivaniia-volos/",
                    "name": "Бальзамы и шампуни оттеночные",
                    "depth_level": 2,
                    "parent_id": 2018
                },
                {
                    "id": 2027,
                    "url": "/professionalnye-tonery-dlia-volos/",
                    "name": "Тонер",
                    "depth_level": 2,
                    "parent_id": 2018
                },
                {
                    "id": 2028,
                    "url": "/sredstva-dlia-neitralizatcii-zheltizny/",
                    "name": "Средства для нейтрализации желтизны",
                    "depth_level": 2,
                    "parent_id": 2018
                },
                {
                    "id": 2029,
                    "url": "/sredstva-dlia-dekapirovaniia/",
                    "name": "Средства для декапирования",
                    "depth_level": 2,
                    "parent_id": 2018
                },
                {
                    "id": 2030,
                    "url": "/parikmakherskie-aksessuary-i-rashodniki/",
                    "name": "Аксессуары и расходники",
                    "depth_level": 2,
                    "parent_id": 2018,
                    "include_sections": [
                        {
                            "id": 2033,
                            "url": "/parikmakherskie-fartuki/",
                            "name": "Фартуки",
                            "depth_level": 3,
                            "parent_id": 2030
                        },
                        {
                            "id": 2034,
                            "url": "/parikmakherskie-peniuary/",
                            "name": "Пеньюары",
                            "depth_level": 3,
                            "parent_id": 2030
                        }
                    ]
                },
                {
                    "id": 2357,
                    "url": "/kraska-dlia-resnitc-i-brovei/",
                    "name": "Краска для бровей и ресниц",
                    "depth_level": 2,
                    "parent_id": 2018,
                    "include_sections": [
                        {
                            "id": 2395,
                            "url": "/estel-kraska-dlia-brovei-i-resnitc/",
                            "name": "Estel Professional",
                            "depth_level": 3,
                            "parent_id": 2357
                        }
                    ]
                }
            ]
        },
        {
            "id": 2039,
            "url": "/parikmakherskie-rascheski-i-brashingi-dlia-volos/",
            "name": "Расчески и брашинги",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 2040,
                    "url": "/brashingi-dlia-parikmakherov/",
                    "name": "Брашинги",
                    "depth_level": 2,
                    "parent_id": 2039
                },
                {
                    "id": 2041,
                    "url": "/rascheski-i-shchetki-dlia-parikmakherov/",
                    "name": "Расчески и щетки",
                    "depth_level": 2,
                    "parent_id": 2039
                },
                {
                    "id": 2042,
                    "url": "/zazhimy-dlia-volos-dlia-parikmakherov/",
                    "name": "Зажимы для волос",
                    "depth_level": 2,
                    "parent_id": 2039
                },
                {
                    "id": 2043,
                    "url": "/parikmakherskie-shchetki-smetki/",
                    "name": "Щетки-сметки",
                    "depth_level": 2,
                    "parent_id": 2039
                }
            ]
        },
        {
            "id": 2044,
            "url": "/instrumenty-i-kosmetika-dlia-barberov/",
            "name": "Для барберов",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 2045,
                    "url": "/muzhskie-sredstva-dlia-ucladki-volos/",
                    "name": "Мужская укладка волос",
                    "depth_level": 2,
                    "parent_id": 2044,
                    "include_sections": [
                        {
                            "id": 2046,
                            "url": "/muzhskie-tverdye-sredstva-dlia-volos/",
                            "name": "Твердые средства",
                            "depth_level": 3,
                            "parent_id": 2045
                        },
                        {
                            "id": 2047,
                            "url": "/muzhskie-kremoobraznye-sredstva-dlia-volos/",
                            "name": "Кремообразные средства",
                            "depth_level": 3,
                            "parent_id": 2045
                        },
                        {
                            "id": 2048,
                            "url": "/muzhskie-zhidkie-sredstva-dlia-volos/",
                            "name": "Жидкие средства",
                            "depth_level": 3,
                            "parent_id": 2045
                        },
                        {
                            "id": 2049,
                            "url": "/muzhskaia-pomada-dlia-ucladki-volos/",
                            "name": "Помада для волос",
                            "depth_level": 3,
                            "parent_id": 2045
                        },
                        {
                            "id": 2050,
                            "url": "/muzhskie-pudry-dlia-ucladki-volos/",
                            "name": "Пудры для укладки",
                            "depth_level": 3,
                            "parent_id": 2045
                        },
                        {
                            "id": 2051,
                            "url": "/muzhskie-sprei-i-laki-dlia-volos/",
                            "name": "Спреи и лаки",
                            "depth_level": 3,
                            "parent_id": 2045
                        },
                        {
                            "id": 2052,
                            "url": "/muzhskie-mussy-i-geli-dlia-ucladki-volos/",
                            "name": "Муссы и гели",
                            "depth_level": 3,
                            "parent_id": 2045
                        },
                        {
                            "id": 2053,
                            "url": "/zagustiteli-dlia-volos/",
                            "name": "Для загущения волос",
                            "depth_level": 3,
                            "parent_id": 2045
                        },
                        {
                            "id": 2054,
                            "url": "/kosmetika-dlia-usov-i-borody/",
                            "name": "Для усов и бороды",
                            "depth_level": 3,
                            "parent_id": 2045
                        }
                    ]
                },
                {
                    "id": 2055,
                    "url": "/muzhskie-sredstva-dlia-uhoda-za-volosami/",
                    "name": "Мужские средства для волос",
                    "depth_level": 2,
                    "parent_id": 2044,
                    "include_sections": [
                        {
                            "id": 2056,
                            "url": "/professionalnye-muzhskie-shampuni-dlia-volos/",
                            "name": "Шампуни",
                            "depth_level": 3,
                            "parent_id": 2055
                        },
                        {
                            "id": 2057,
                            "url": "/muzhskie-ottenochnye-shampuni-dlia-volos/",
                            "name": "Оттеночные шампуни",
                            "depth_level": 3,
                            "parent_id": 2055
                        },
                        {
                            "id": 2058,
                            "url": "/maslo-dlia-muzhskikh-volos/",
                            "name": "Масло",
                            "depth_level": 3,
                            "parent_id": 2055
                        },
                        {
                            "id": 2059,
                            "url": "/ottenochnye-pomady-dlia-volos/",
                            "name": "Помады оттеночные для волос",
                            "depth_level": 3,
                            "parent_id": 2055
                        },
                        {
                            "id": 2060,
                            "url": "/tonik-dlia-lysoi-golovy/",
                            "name": "Тоник для лысой головы",
                            "depth_level": 3,
                            "parent_id": 2055
                        },
                        {
                            "id": 2121,
                            "url": "/balzamy-i-konditcionery-dlia-muzhskikh-volos/",
                            "name": "Бальзамы и кондиционеры",
                            "depth_level": 3,
                            "parent_id": 2055
                        }
                    ]
                },
                {
                    "id": 2061,
                    "url": "/kosmetika-dlia-uhoda-za-borodoi-i-usami/",
                    "name": "Уход за бородой и усами",
                    "depth_level": 2,
                    "parent_id": 2044,
                    "include_sections": [
                        {
                            "id": 2062,
                            "url": "/muzhskoi-shampun-dlia-borody/",
                            "name": "Шампунь для бороды",
                            "depth_level": 3,
                            "parent_id": 2061
                        },
                        {
                            "id": 2063,
                            "url": "/balzamy-dlia-borody/",
                            "name": "Бальзамы для бороды",
                            "depth_level": 3,
                            "parent_id": 2061
                        },
                        {
                            "id": 2064,
                            "url": "/vosk-dlia-usov/",
                            "name": "Воск для укладки усов",
                            "depth_level": 3,
                            "parent_id": 2061
                        },
                        {
                            "id": 2065,
                            "url": "/konditcionery-dlia-borody/",
                            "name": "Кондиционер для бороды",
                            "depth_level": 3,
                            "parent_id": 2061
                        }
                    ]
                },
                {
                    "id": 2067,
                    "url": "/instrumenty-i-prinadlezhnosti-dlia-britia/",
                    "name": "Бритье",
                    "depth_level": 2,
                    "parent_id": 2044,
                    "include_sections": [
                        {
                            "id": 2068,
                            "url": "/professionalnye-britvy/",
                            "name": "Бритвы",
                            "depth_level": 3,
                            "parent_id": 2067
                        },
                        {
                            "id": 2072,
                            "url": "/professionalnye-sheivery/",
                            "name": "Шейверы",
                            "depth_level": 3,
                            "parent_id": 2067
                        },
                        {
                            "id": 2073,
                            "url": "/professionalnye-lezviia-dlia-britia/",
                            "name": "Лезвия",
                            "depth_level": 3,
                            "parent_id": 2067
                        },
                        {
                            "id": 2074,
                            "url": "/britvennye-setki/",
                            "name": "Бритвенные сетки",
                            "depth_level": 3,
                            "parent_id": 2067
                        },
                        {
                            "id": 2075,
                            "url": "/naturalnye-pomazki-dlia-britia/",
                            "name": "Помазки",
                            "depth_level": 3,
                            "parent_id": 2067
                        },
                        {
                            "id": 2076,
                            "url": "/professionalnye-sredstva-dlia-britia/",
                            "name": "Средства для бритья",
                            "depth_level": 3,
                            "parent_id": 2067
                        },
                        {
                            "id": 2303,
                            "url": "/professionalnye-sredstva-posle-britia/",
                            "name": "Средства после бритья",
                            "depth_level": 3,
                            "parent_id": 2067
                        }
                    ]
                },
                {
                    "id": 2082,
                    "url": "/odezhda-dlia-barberov-i-parikmakherov/",
                    "name": "Одежда для работы",
                    "depth_level": 2,
                    "parent_id": 2044,
                    "include_sections": [
                        {
                            "id": 2083,
                            "url": "/keipy-i-peniuary-dlia-barberov/",
                            "name": "Пеньюары, кейпы",
                            "depth_level": 3,
                            "parent_id": 2082
                        },
                        {
                            "id": 2085,
                            "url": "/fartuki-dlia-barberov-i-parikmakherov/",
                            "name": "Фартуки",
                            "depth_level": 3,
                            "parent_id": 2082
                        }
                    ]
                },
                {
                    "id": 2086,
                    "url": "/mashinki-dlia-strizhki-dlia-barberov/",
                    "name": "Машинки",
                    "depth_level": 2,
                    "parent_id": 2044,
                    "include_sections": [
                        {
                            "id": 2087,
                            "url": "/trimmery-dlia-barberov-barberskie-mashinki/",
                            "name": "Машинки, триммеры",
                            "depth_level": 3,
                            "parent_id": 2086
                        },
                        {
                            "id": 2088,
                            "url": "/nozhevye-bloki-dlia-mashinok-dlia-strizhki/",
                            "name": "Ножевые блоки",
                            "depth_level": 3,
                            "parent_id": 2086
                        },
                        {
                            "id": 2089,
                            "url": "/nasadki-na-professionalnye-mashinki-i-trimmery/",
                            "name": "Насадки на машинки",
                            "depth_level": 3,
                            "parent_id": 2086
                        },
                        {
                            "id": 2090,
                            "url": "/sprei-i-zhidkost-dlia-mashinok-dlia-strizhki/",
                            "name": "Спрей и жидкость для ножей",
                            "depth_level": 3,
                            "parent_id": 2086
                        }
                    ]
                },
                {
                    "id": 2092,
                    "url": "/feny-dlia-barberov/",
                    "name": "Фены",
                    "depth_level": 2,
                    "parent_id": 2044,
                    "include_sections": [
                        {
                            "id": 2093,
                            "url": "/feny-dlia-sushki-i-ucladki-volos/",
                            "name": "Профессиональные фены",
                            "depth_level": 3,
                            "parent_id": 2092
                        }
                    ]
                },
                {
                    "id": 2095,
                    "url": "/nozhnitcy-dlia-barberov/",
                    "name": "Ножницы",
                    "depth_level": 2,
                    "parent_id": 2044,
                    "include_sections": [
                        {
                            "id": 2297,
                            "url": "/professionalnye-nozhnitcy-dlia-parikmakherov/",
                            "name": "Парикмахерские ножницы",
                            "depth_level": 3,
                            "parent_id": 2095
                        },
                        {
                            "id": 2298,
                            "url": "/filirovochnye-nozhnitcy-dlia-strizhki-volos/",
                            "name": "Филировочные ножницы",
                            "depth_level": 3,
                            "parent_id": 2095
                        },
                        {
                            "id": 2302,
                            "url": "/parikmakherskie-britvy-dlia-strizhki-volos/",
                            "name": "Бритвы для стрижки",
                            "depth_level": 3,
                            "parent_id": 2095
                        }
                    ]
                },
                {
                    "id": 2101,
                    "url": "/brashingi-rascheski-shchetki-zazhimy-dlia-strizhki-volos/",
                    "name": "Брашинги, расчески, щетки, зажимы",
                    "depth_level": 2,
                    "parent_id": 2044,
                    "include_sections": [
                        {
                            "id": 2102,
                            "url": "/professionalnye-brashingi-dlia-volos/",
                            "name": "Брашинги",
                            "depth_level": 3,
                            "parent_id": 2101
                        },
                        {
                            "id": 2103,
                            "url": "/professionalnye-rascheski-i-shchetki-dlia-barberov/",
                            "name": "Расчески и щетки для волос",
                            "depth_level": 3,
                            "parent_id": 2101
                        },
                        {
                            "id": 2104,
                            "url": "/professionalnye-zazhimy-dlia-volos/",
                            "name": "Зажимы для волос",
                            "depth_level": 3,
                            "parent_id": 2101
                        },
                        {
                            "id": 2105,
                            "url": "/rascheski-i-shchetki-dlia-borody-i-usov/",
                            "name": "Расчески и щетки для бороды и усов",
                            "depth_level": 3,
                            "parent_id": 2101
                        },
                        {
                            "id": 2106,
                            "url": "/shchetki-smetki-dlia-barberov/",
                            "name": "Щетки-сметки",
                            "depth_level": 3,
                            "parent_id": 2101
                        },
                        {
                            "id": 2107,
                            "url": "/shchetki-dlia-feida/",
                            "name": "Щетки для фейда",
                            "depth_level": 3,
                            "parent_id": 2101
                        }
                    ]
                },
                {
                    "id": 2108,
                    "url": "/muzhskie-podarochnye-nabory-dlia-volos/",
                    "name": "Подарочные наборы",
                    "depth_level": 2,
                    "parent_id": 2044
                }
            ]
        },
        {
            "id": 2109,
            "url": "/professionalnye-peniuary-i-fartuki/",
            "name": "Пеньюары и фартуки",
            "depth_level": 1,
            "parent_id": null
        },
        {
            "id": 2110,
            "url": "/predmety-interera-dlia-salonov-i-barbershopov/",
            "name": "Интерьер для бизнеса",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 2111,
                    "url": "/detali-interera-dlia-salonov-i-barbershopov/",
                    "name": "Детали интерьера",
                    "depth_level": 2,
                    "parent_id": 2110
                },
                {
                    "id": 2112,
                    "url": "/merch-dlia-salonov-i-barbershopov/",
                    "name": "Мерч",
                    "depth_level": 2,
                    "parent_id": 2110
                }
            ]
        },
        {
            "id": 2113,
            "url": "/instrumenty-i-oborudovanie-dlia-obucheniia-parikmakherov/",
            "name": "Оборудование для обучения",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 2114,
                    "url": "/manekeny-dlia-obucheniia-parikmakherov/",
                    "name": "Манекены",
                    "depth_level": 2,
                    "parent_id": 2113
                },
                {
                    "id": 2116,
                    "url": "/uchebnye-parikmakherskie-nozhnitcy/",
                    "name": "Учебные ножницы",
                    "depth_level": 2,
                    "parent_id": 2113
                }
            ]
        },
        {
            "id": 2117,
            "url": "/sredstva-dlia-dezinfektcii-instrumentov/",
            "name": "Дезинфекция и гигиена",
            "depth_level": 1,
            "parent_id": null,
            "include_sections": [
                {
                    "id": 2118,
                    "url": "/zhidkosti-dlia-ochistki-i-promyvki-instrumenta/",
                    "name": "Жидкость для промывки",
                    "depth_level": 2,
                    "parent_id": 2117
                },
                {
                    "id": 2119,
                    "url": "/okhlazhdaiushchii-sprei-dlia-nozhei/",
                    "name": "Спрей для ножей",
                    "depth_level": 2,
                    "parent_id": 2117
                }
            ]
        }
    ]
}

export const brands = {
    "success": true,
    "data": [
        {
            "id": 2117,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                },
                { id: 566, code: 'market', name: 'Новинки' },
                { id: 466, code: 'available', name: 'Наборы' },
                { id: 5633, code: 'hits', name: 'Хиты' },
                { id: 4663, code: 'discont', name: 'Со скидкой' },
            ],
            "coloristic": null,
            "logo": "/images/brands/logos/image-1.png",
            "url": "https://redharemarket.ru/catalog/ds/",
            "name": "DS",
            "description": "Финская косметика для волос без отдушек",
            "depth_level": 1,
            "img_mini": "/images/brands/overlays/image-1.jpg",
            "img_big": "/images/brands/overlays/image-1.jpg",
            "theme": "light",
            "parent_id": null,
        },
        {
            "id": 1932,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                }
            ],
            "coloristic": null,
            "logo": "/images/brands/logos/image-1.png",
            "url": "https://redharemarket.ru/catalog/lock-stock-barrel/",
            "name": "Lock Stock & Barrel",
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "/images/brands/overlays/image-2.jpg",
            "img_big": "/images/brands/overlays/image-2.jpg",
            "theme": "dark",
            "parent_id": null,
            "include_sections": [
                {
                    "id": 2118,
                    "filter": [
                        {
                            "id": 666,
                            "code": "price",
                            "name": "Цена"
                        },
                        {
                            "id": 981,
                            "code": "vid",
                            "name": "Вид товара"
                        },
                        {
                            "id": 751,
                            "code": "proizvodstvo",
                            "name": "Производство"
                        }
                    ],
                    "coloristic": null,
                    "logo": "",
                    "url": "https://redharemarket.ru/catalog/lsb-balzam/",
                    "name": "Бальзам",
                    "depth_level": 2,
                    "img_mini": null,
                    "img_big": null,
                    "parent_id": 1932
                },
                {
                    "id": 2119,
                    "filter": [
                        {
                            "id": 666,
                            "code": "price",
                            "name": "Цена"
                        },
                        {
                            "id": 981,
                            "code": "vid",
                            "name": "Вид товара"
                        },
                        {
                            "id": 751,
                            "code": "proizvodstvo",
                            "name": "Производство"
                        }
                    ],
                    "coloristic": null,
                    "logo": "",
                    "url": "https://redharemarket.ru/catalog/lsb-vosk/",
                    "name": "Воск",
                    "depth_level": 2,
                    "img_mini": null,
                    "img_big": null,
                    "parent_id": 1932
                },
                {
                    "id": 2120,
                    "filter": [
                        {
                            "id": 666,
                            "code": "price",
                            "name": "Цена"
                        },
                        {
                            "id": 981,
                            "code": "vid",
                            "name": "Вид товара"
                        },
                        {
                            "id": 751,
                            "code": "proizvodstvo",
                            "name": "Производство"
                        }
                    ],
                    "coloristic": null,
                    "logo": "",
                    "url": "https://redharemarket.ru/catalog/lsb-konditioner/",
                    "name": "Кондиционер",
                    "depth_level": 2,
                    "img_mini": null,
                    "img_big": null,
                    "parent_id": 1932
                }
            ]
        },
        {
            "id": 1938,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                },
                {
                    "id": 753,
                    "code": "color",
                    "name": "Цвет"
                }
            ],
            "coloristic": null,
            "logo": "/images/brands/logos/image-1.png",
            "url": "https://redharemarket.ru/catalog/Mr-Natty/",
            "name": "Mr. Natty",
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null,
            // "include_sections": [
            //     {
            //         "id": 2118,
            //         "filter": [
            //             {
            //                 "id": 666,
            //                 "code": "price",
            //                 "name": "Цена"
            //             },
            //             {
            //                 "id": 981,
            //                 "code": "vid",
            //                 "name": "Вид товара"
            //             },
            //             {
            //                 "id": 751,
            //                 "code": "proizvodstvo",
            //                 "name": "Производство"
            //             }
            //         ],
            //         "coloristic": null,
            //         "logo": "",
            //         "url": "https://redharemarket.ru/catalog/mr-natty-balzam/",
            //         "name": "Бальзам",
            //         "depth_level": 2,
            //         "img_mini": null,
            //         "img_big": null,
            //         "parent_id": 1938
            //     },
            //     {
            //         "id": 2119,
            //         "filter": [
            //             {
            //                 "id": 666,
            //                 "code": "price",
            //                 "name": "Цена"
            //             },
            //             {
            //                 "id": 981,
            //                 "code": "vid",
            //                 "name": "Вид товара"
            //             },
            //             {
            //                 "id": 751,
            //                 "code": "proizvodstvo",
            //                 "name": "Производство"
            //             }
            //         ],
            //         "coloristic": null,
            //         "logo": "",
            //         "url": "https://redharemarket.ru/catalog/mr-natty-vosk/",
            //         "name": "Воск",
            //         "depth_level": 2,
            //         "img_mini": null,
            //         "img_big": null,
            //         "parent_id": 1938
            //     },
            //     {
            //         "id": 2120,
            //         "filter": [
            //             {
            //                 "id": 666,
            //                 "code": "price",
            //                 "name": "Цена"
            //             },
            //             {
            //                 "id": 981,
            //                 "code": "vid",
            //                 "name": "Вид товара"
            //             },
            //             {
            //                 "id": 751,
            //                 "code": "proizvodstvo",
            //                 "name": "Производство"
            //             }
            //         ],
            //         "coloristic": null,
            //         "logo": "",
            //         "url": "https://redharemarket.ru/catalog/mr-natty-konditioner/",
            //         "name": "Кондиционер",
            //         "depth_level": 2,
            //         "img_mini": null,
            //         "img_big": null,
            //         "parent_id": 1938
            //     }
            // ]
        },
        {
            "id": 1944,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                },
                {
                    "id": 753,
                    "code": "color",
                    "name": "Цвет"
                }
            ],
            "coloristic": null,
            "logo": "",
            "url": "https://redharemarket.ru/catalog/Beardbyrus/",
            "name": "Beardbyrus",
            "depth_level": 1,
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null,
        },
        {
            "id": 1950,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                }
            ],
            "coloristic": null,
            "logo": "",
            "url": "https://redharemarket.ru/catalog/Oster/",
            "name": "Oster",
            "depth_level": 1,
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null,
        },
        {
            "id": 1979,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                }
            ],
            "coloristic": null,
            "logo": "",
            "url": "https://redharemarket.ru/catalog/Canway/",
            "name": "Canway",
            "depth_level": 1,
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null,
        },
        {
            "id": 2010,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                }
            ],
            "coloristic": null,
            "logo": "",
            "url": "https://redharemarket.ru/catalog/Denman/",
            "name": "Denman",
            "depth_level": 1,
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null
        },
        {
            "id": 2018,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                },
                {
                    "id": 1240,
                    "code": "color_number",
                    "name": "Уровень тона"
                },
                {
                    "id": 1241,
                    "code": "product_type",
                    "name": "Тип продукта"
                },
            ],
            "coloristic": null,
            "logo": "",
            "url": "https://redharemarket.ru/catalog/Eurosteel/",
            "name": "Eurosteel",
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null,
        },
        {
            "id": 2039,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                }
            ],
            "coloristic": null,
            "logo": "",
            "url": "https://redharemarket.ru/catalog/Feather/",
            "name": "Feather",
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null,
        },
        {
            "id": 2044,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                }
            ],
            "coloristic": null,
            "logo": "",
            "url": "https://redharemarket.ru/catalog/Gamma Piu/",
            "name": "Gamma Piu",
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null,
        },
        {
            "id": 2109,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 710,
                    "code": "size",
                    "name": "Размер"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                },
                {
                    "id": 753,
                    "code": "color",
                    "name": "Цвет"
                }
            ],
            "coloristic": null,
            "logo": "",
            "url": "https://redharemarket.ru/catalog/Hairbrained-Pro/",
            "name": "Hairbrained Pro",
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null
        },
        {
            "id": 2110,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                },
                { id: 566, code: 'market', name: 'Новинки' },
                { id: 466, code: 'available', name: 'Наборы' },
                { id: 5633, code: 'hits', name: 'Хиты' },
                { id: 4663, code: 'discont', name: 'Со скидкой' },
            ],
            "coloristic": null,
            "logo": "/images/brands/logos/image-1.png",
            "url": "https://redharemarket.ru/catalog/Sensido/",
            "name": "Sensido",
            "depth_level": 1,
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null,
        },
        {
            "id": 2113,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                }
            ],
            "coloristic": null,
            "logo": "",
            "url": "https://redharemarket.ru/catalog/System-4/",
            "name": "System 4",
            "depth_level": 1,
            "description": "Мужская косметика для волос",
            "depth_level": 1,
            "img_mini": "",
            "img_big": "",
            "parent_id": null,
        },
    ]
}

export const promo = {
    "success": true,
    "data": [
        {
            "id": 2117,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                },
                { id: 566, code: 'market', name: 'Новинки' },
                { id: 466, code: 'available', name: 'Наборы' },
                { id: 5633, code: 'hits', name: 'Хиты' },
                { id: 4663, code: 'discont', name: 'Со скидкой' },
            ],
            "coloristic": null,
            "logo": null,
            "url": "https://redharemarket.ru/catalog/test/",
            "name": "Lock Stock & Barrel - 35%",
            "description": "Только с 1 по 31 октября",
            "depth_level": 1,
            "img_mini": "/images/promo/image-2-sm.jpg",
            "img_big": "/images/promo/image-2-xl.jpg",
            "theme": "dark",
            "parent_id": null,
        },
    ]
}

export const set = {
    "success": true,
    "data": [
        {
            "id": 2117,
            "filter": [
                {
                    "id": 666,
                    "code": "price",
                    "name": "Цена"
                },
                {
                    "id": 981,
                    "code": "vid",
                    "name": "Вид товара"
                },
                {
                    "id": 751,
                    "code": "proizvodstvo",
                    "name": "Производство"
                },
                { id: 566, code: 'market', name: 'Новинки' },
                { id: 466, code: 'available', name: 'Наборы' },
                { id: 5633, code: 'hits', name: 'Хиты' },
                { id: 4663, code: 'discont', name: 'Со скидкой' },
            ],
            "coloristic": null,
            "logo": null,
            "url": "https://redharemarket.ru/catalog/test/",
            "name": "Профессиональный барбер",
            "description": "Все, что нужно для рабочего стола профессионала",
            "depth_level": 1,
            "img_mini": "/images/set/image-1-xs.jpg",
            "img_big": "/images/set/image-1-xl.jpg",
            "theme": "dark",
            "parent_id": null,
        },
    ]
}