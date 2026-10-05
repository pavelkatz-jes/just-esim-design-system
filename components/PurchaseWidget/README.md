# PurchaseWidget

Виджет покупки в hero: карточка с паддингом 16, ширина 370 на desktop (до 640 на sm, на всю ширину на mobile), сверху подпись с искрами, снизу логотипы платёжных систем.

**Что передаёт потребитель:** `caption` (по умолчанию «More than 150 destinations», 16 px `color-secondary`), форму в `children`, `loading`.

**Состояния:**
- Загрузка — скелетон на белом с пульсацией 2s до .5: поле 88 (радиус 24), две опции 52 (пилюли), кнопка 56 (радиус 32).
- Готово — как на проде: `SelectField` «Country or region», отступ 20, два `Segmented` (срок и объём) через 8, отступ 20, `Button` L `block` «Purchase for €3.5».

`PaymentLogos` — Apple Pay, G Pay, Visa, Mastercard цветом `payment-gray`, промежуток 12, отступ сверху 24.
