# Веб

Правила для justesim.com и лендингов. Общие основы — в брендбуке (`docs/brand-book.md`); здесь сетка, ритм и техника.

## Сетка и брейкпоинты

- Брейкпоинты: `bp-sm` 640, `bp-md` 768, `bp-lg` 1024, `bp-xl` 1280. Сетки карточек и отзывов переключаются на `bp-lg`, шапка с навигацией — на `bp-xl`.
- Секция (`Section`): боковые поля `space-4` (16) и колонка `content` 1024 по центру. На 1440 колонка стоит на x = 208.
- Контейнер шапки — до `content-header` 1212, поля 8.
- Сетки карточек (`FeatureGrid`, отзывы): промежуток `space-6` 24 на desktop, `space-2` 8 на mobile. Отзывы: 12 / 16 / 24 по брейкпоинтам.

## Вертикальный ритм

- Секции отделены отступом `space-36` 144 на desktop и 16vw на mobile (62 при 390, у части секций 70). Соседние отступы схлопываются.
- От H2 до контента — `space-10` 40, на mobile 32 или 40. В отзывах от 768 — 60.
- Под H2 реферального блока — 20, затем лид и 32.

## Hero

- На mobile отступ сверху 112 под фиксированную шапку.
- Изображение, под ним 40. На desktop H1 наезжает на изображение на `overlap-hero` −200.
- Под H1 — 16, от 1280 — 48.
- Лид `text-bd` и виджет покупки стоят в ряд с промежутком 48. На mobile лид по центру, под ним 64, виджет ниже на всю ширину.

## Шапка и якоря

- Шапка фиксированная, поля 24 16 40. При прокрутке под ней проявляется подложка `menu-gra` за 150 ms.
- Якоря смещены на `anchor-offset` −40 (−120 на desktop), чтобы заголовок не прятался под шапку; `Section` с `id` делает это сам.

## Кнопки на странице

- На mobile кнопки во всю ширину (`block`), на desktop — по содержимому или до `button-max` 300.
- Пара store-кнопок — `StoreButtons`: контейнер 600, промежуток 16; на mobile столбиком.

## Техника

- Шрифты и ассеты подключаются локально (woff2), без Google Fonts и внешних зависимостей: страницы должны открываться из РФ.
- Всегда указывайте фолбэк-стек шрифта — `var(--font-primary)`.
- Контраст основного текста — не ниже AA.
- Лендинги получают `body.landing`: фон `color-bLanding`, трекинг 0, подложка шапки того же цвета.

## Токены прода и системы

Прод собран на Tailwind v4 (шаг `--spacing: .25rem`). Имена токенов системы повторяют переменные и классы прода там, где они есть:

| Прод | Система |
|---|---|
| `--color-main`, `--color-bLanding`, `--color-modalgray` | те же имена |
| `--color-primary` (`#000000e6`), `--color-secondary` (`#0009`) | те же имена |
| `--color-aqua`, `--color-good`, `--color-error` (`red`), `--color-accent1` | те же имена; `color-error` = `#ff0000` |
| `--radius-big` 40, `--radius-mid` 32 | те же имена |
| `.shadow-big`, `.shadow-white`, `.shadow-logo` | `shadow-big`, `shadow-white`, `shadow-logo` |
| `.text-big`, `.text-b`, `.text-bd`, `.text-g`, `text-xl` … `text-xs` | одноимённые классы стилей текста |
| `.gra` | `grad` + `GradientText` |
| `.rounded-block`, `.rounded-block.white` | `card-bg` + `Card`, `Card variant="white"` |
| `p-4`, `mb-10`, `my-36` | `space-4`, `space-10`, `space-36` |

Базовые стили новой страницы:

```css
html {
  font-family: var(--font-primary);
  font-weight: 500;
  letter-spacing: -.01em;            /* = −0.16px, наследуется абсолютным */
  background: var(--color-main);
  color: var(--color-primary);
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}
b, strong { font-weight: 500; color: var(--ink); }
h1, h2 { letter-spacing: -.03em; line-height: .92; color: var(--ink); }
.gra { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
```
