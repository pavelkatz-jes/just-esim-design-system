# Modal

Модальное окно: оверлей `overlay-modal`, содержимое на `color-modalgray` с радиусом 30 и тенью `shadow-modal`; ширина до 560, `medium` 768 или `wide` 1160.

**Что передаёт потребитель:** содержимое, `size`, `sheet` — bottom sheet (радиус 44 сверху, выезд снизу), `surface`, `closable`, `onClose`, `open`, `inline` — для макетов.

**Кнопка закрытия:** круг 56 `surface-tile`, крест из линий 24 × 2 цветом `color-secondary`, позиция top и right 16; стоит под 45° и при hover поворачивается до 225° за .3s. Заголовкам внутри оставлен отступ 50 справа.

На mobile окно делайте bottom sheet (`sheet`).
