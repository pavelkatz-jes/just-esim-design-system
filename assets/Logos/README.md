# Logos

Компактный логотип Just eSIM. Контуры взяты из `/favicon.svg` прода без изменений.

- `jes-compact-dark.svg` — знак «Just / eSIM» без плитки, чёрный при .9 (на `color-main` даёт `#171717`). Для светлых фонов.
- `jes-compact-white.svg` — тот же знак белым `#FFFFFF`. Для тёмных фонов (`surface-dark`, `surface-grey`, фото).
- `jes-logo-tile.svg` — плитка 56 × 56 с радиусом 14: фон `#D4D3CE` (`surface-tile`), белая обводка .4, знак .9. Копия `/favicon.svg`.
- `jes-logo-tile@4x.webp` — та же плитка растром 192 × 192 (`logo4x.webp` шапки прода), для показа в 48 px.

Знак одноцветный и не перекрашивается через CSS `color`: в `<img>` берите нужный файл, в интерфейсе — `LogoTile` или `LogoMark`. Горизонтальной версии здесь нет — исходники в гайдлайне.
