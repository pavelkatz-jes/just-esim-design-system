# Button

Кнопка-пилюля бренда: обводка 1 px, иконка слева, три высоты; нажатие — `scale-press` .95 и `opacity-press` .8 за 75 ms, hover нет.

**Что передаёт потребитель:** текст (`children`), `variant` (`primary` — чёрная, `secondary` — белая), `size` (`m` 48, `l` 56, `xl` 80), `icon` — `apple`, `google-play`, `download`, `lightbulb`, `person-plus` или свой узел, `href` (тогда рендерится ссылка), `block` — на всю ширину.

**Размеры (прод):** поля `0 20px 0 16px` (`pl-4 pr-5`); M — 18 / 28 (шапка, cookie-баннер, мобильное меню); L — 20 / 120% (секции и карточки); XL — 32 / 105% (App Store / Google Play). Глиф M/L около 17 × 21 и 10 px до текста, XL — 32 × 40 и 8 px.

**Варианты:**
- Primary — фон `ink`, текст белый, обводка `stroke-primary`. Главное действие экрана.
- Secondary — фон `surface`, текст `color-primary`, обводка `stroke-secondary`, тень `shadow-white`.

**Правила:**
- Текст начинается с глагола, 2–4 слова: «Download app», «See all answers».
- На mobile — `block` на всю ширину; на desktop — по содержимому или до 300 (`button-max`).
- Не красьте кнопки в градиент и дополнительные цвета.
- Фокус в новых макетах — кольцо `focus` 2 px с отступом 3 (компонент рисует его на `:focus-visible`).
