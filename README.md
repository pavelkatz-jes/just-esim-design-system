# Just eSIM — дизайн-система

Токены, шрифт, ассеты, React-компоненты и правила бренда Just eSIM для сайтов, лендингов и презентаций. Вся система одним файлом — [design.md](design.md).

> **Шрифт Haffer в репозиторий не входит** — он лицензионный (Displaay), раздавать файл нельзя. Шрифт выдаёт дизайн-команда: установите его в систему или положите `HafferMedium.woff2` в `fonts/` — он в `.gitignore` и не попадёт в коммит. Без шрифта всё показывается запасным системным шрифтом.

## С чего начать

- **Макеты, презентации, тексты:** [design.md](design.md) или те же правила по разделам — [брендбук](docs/brand-book.md), [веб](docs/web.md), [презентации](docs/presentations.md).
- **Посмотреть всё вживую:** витрина https://pavelkatz-jes.github.io/just-esim-design-system/ — цвета, типографика и превью всех компонентов, главной страницы и слайдов. Локально — откройте `index.html` в Chrome или выполните `npm run preview` и откройте http://localhost:5173.
- **Разработка:** подключите токены и компоненты — ниже.

## Что где лежит

| Путь | Что |
|---|---|
| `design.md` | вся система одним файлом — для передачи подрядчикам и в другие инструменты |
| `docs/` | брендбук, веб, презентации |
| `tokens/tokens.json` | все токены: цвета, типографика, отступы, радиусы, тени, градиенты, движение, наклоны, раскладка, размеры |
| `tokens/tokens.css` | `@font-face`, CSS-переменные и классы стилей текста — собирается из `tokens.json` |
| `fonts/` | место для `HafferMedium.woff2` — файл в репозиторий не входит |
| `assets/` | логотипы, иконки, стекло, фото, флаги, платёжные системы, соцсети; в каждой папке README с правилами |
| `components/src/` | исходники компонентов (React 18, TypeScript) |
| `components/bundle.js`, `bundle.css`, `index.d.ts` | собранная библиотека `window.JeS`, её стили и типы |
| `components/lib/` | React 18 и ReactDOM для превью и страниц без сборщика |
| `components/<Имя>/` | `README.md` — правила и пропсы, `preview.html` — живое превью |
| `components/Landing/`, `components/Slides/` | главная страница и девять типовых слайдов, собранные из компонентов |
| `index.html` | витрина всей системы |
| `scripts/` | сборка `build.mjs`, исходники превью `previews.mjs`, обложка `cover.html`, локальный сервер `serve.mjs` |

## Подключение

**Только токены** — переменные, классы текста и шрифт:

```html
<link rel="stylesheet" href="tokens/tokens.css">
```

`tokens.css` берёт Haffer, установленный в системе, или файл `../fonts/HafferMedium.woff2`. Дальше пишите `var(--color-main)`, `var(--shadow-big)`, `var(--radius-big)` и классы `.h2`, `.text-b`. Базовые стили страницы (`html`, `b`, `h1`, `h2`, `.gra`) — в разделе 10 design.md.

**Компоненты на странице без сборщика:**

```html
<link rel="stylesheet" href="tokens/tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<script src="components/lib/react.production.min.js"></script>
<script src="components/lib/react-dom.production.min.js"></script>
<script src="components/bundle.js"></script>

<div id="root"></div>
<script>
  const { Button } = window.JeS;
  ReactDOM.createRoot(document.getElementById('root')).render(
    React.createElement(Button, { variant: 'primary', size: 'l', icon: 'download' }, 'Download app')
  );
</script>
```

**В React-проекте** можно взять исходники `components/src/` (React 18, TypeScript) и подключить `components/bundle.css` после `tokens/tokens.css`. Пропсы описаны в `components/index.d.ts` и в README каждого компонента.

## Как вносить изменения

1. Один раз: установите Node.js 18+ и выполните `npm install`.
2. Правьте источники:
   - токены — `tokens/tokens.json`;
   - компоненты — `components/src/`, их стили — `components/bundle.css`;
   - превью — `scripts/previews.mjs`;
   - правила — `docs/`, README компонентов и ассетов, текст `design.md`.
3. Выполните `npm run build`. Сборка обновит `tokens/tokens.css`, `components/bundle.js`, `components/index.d.ts`, все `preview.html`, `index.html` и блок CSS-токенов в `design.md`, а заодно проверит типы.
4. Проверьте результат в витрине и закоммитьте исходники вместе с собранными файлами. Собранные файлы лежат в репозитории, чтобы дизайнерам не нужна была сборка.

Не правьте руками собранные файлы и блок между `<!-- tokens-css:start -->` и `<!-- tokens-css:end -->` в `design.md` — следующая сборка их перезапишет. Первая строка каждого `preview.html` — служебный комментарий `@dsCard` с группой и размером превью для витрины.

Если правило меняется, обновите его в обоих местах: в `design.md` и в соответствующем файле `docs/`.

## Доступ

Репозиторий открытый — ссылкой можно делиться с кем угодно. Витрина https://pavelkatz-jes.github.io/just-esim-design-system/ обновляется сама после каждого пуша в `main` (GitHub Pages). Подрядчикам, которым нужны только правила, достаточно передать `design.md`. Вносить изменения могут те, кого владелец добавил в Settings → Collaborators.
