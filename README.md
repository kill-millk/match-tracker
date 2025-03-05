# Match Tracker

Приложение для отслеживания матчей в реальном времени с возможностью фильтрации по статусу и просмотра детальной информации о командах.

## Демо

[Посмотреть демо](https://app.ftoyd.com) 

## Особенности

- 🔄 Автоматическое обновление данных
- 🎯 Фильтрация матчей по статусу
- 📊 Детальная статистика команд и игроков
- 💾 Сохранение настроек фильтров
- 🎨 Современный UI с анимациями
- 📱 Адаптивный дизайн

## Технологии

- React
- TypeScript
- Redux Toolkit (RTK Query)
- Emotion (CSS-in-JS)
- Vite

## Установка и запуск

```bash
# Клонирование репозитория
git clone [URL репозитория]
cd match-tracker

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview
```

## Структура проекта (Feature-Sliced Design)

```
src/
├── app/               # Инициализация приложения
│   ├── store/         # Конфигурация Redux store
│   └── App.tsx        # Корневой компонент
│
├── pages/             # Страницы приложения
│   └── main/          # Главная страница
│
├── widgets/           # Композиционные блоки
│   └── matches-list/  # Виджет списка матчей
│
├── features/          # Интерактивные функции
│   └── match-refresh/ # Функционал обновления матчей
│
├── entities/          # Бизнес-сущности
│   └── match/         # Сущность матча
│       ├── model/     # Типы и модели
│       └── ui/        # UI компоненты
│
└── shared/            # Переиспользуемый код
    ├── api/          # API клиент
    ├── config/       # Конфигурация
    ├── lib/          # Утилиты и хуки
    └── ui/           # UI компоненты
```

## API

Приложение использует API с следующими эндпоинтами:

- `GET /fronttemp` - Получение списка матчей

## Кеширование

- Данные кешируются на 5 минут
- При обновлении через кнопку "Refresh" показывается анимация
- Состояние фильтров сохраняется в localStorage

## Разработка

### Команды

- `npm run dev` - Запуск сервера разработки
- `npm run build` - Сборка для продакшена
- `npm run preview` - Предпросмотр продакшен сборки
- `npm run lint` - Проверка кода линтером
- `npm run format` - Форматирование кода

### Архитектура

Проект построен по методологии Feature-Sliced Design (FSD), что обеспечивает:

- Масштабируемость
- Переиспользуемость компонентов
- Изолированность фич
- Удобную навигацию по коду

