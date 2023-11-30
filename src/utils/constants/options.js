const holidayOptions = [
   {
      name: 'Праздник',
      placeholder: 'Выберите праздник',
      labelName: 'holiday',
      options: ['День матери', 'День рождения ', 'Новый год', 'Нооруз'],
   },
]

const stateOptions = ['Все', 'Б/У', 'Новое']

const category = [
   'Электроника',
   'Одежда',
   'Школа',
   'Дом и сад',
   'Обувь',
   'Транспорт',
]

const subcategories = {
   Электроника: [
      'Смартфоны и телефоны',
      'Аудиотехника',
      'Фото и видеокамеры',
      'Автоэлектроника',
      'ТВ и видео',
      `Компьютеры, ноутбуки и
   планшеты`,
      'Носимая электроника (умные часы, браслеты)',
      'Аксессуары для смартфонов (чехлы, защитные пленки)',
      'Игровые консоли и аксессуары',
      'Умные домашние устройства (умные лампы, термостаты)',
   ],
   Одежда: ['Мужская', 'Женская', 'Детская'],
   Школа: [
      'Рюкзаки с разными дизайнами',
      'Учебные пособия и учебники',
      'Школьные принадлежности (ручки, карандаши)',
      'Канцелярские товары для творчества (кисти, краски)',
   ],
   'Дом и сад': [
      'Декоративные элементы интерьера',
      'Садовые инструменты и оборудование',
      'Постельные принадлежности',
      'Стройматериалы (кирпич, брусчатка)',
   ],
   Обувь: ['Мужская обувь', 'Женская обувь', 'Детская обувь'],
   Транспорт: [
      'Велосипеды и аксессуары',
      'Запчасти и оборудование для автомобилей',
      'Оборудование для мотоциклов',
   ],
}

export { holidayOptions, stateOptions, category, subcategories }
