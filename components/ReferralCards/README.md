# ReferralCards

Композиция «предметов» реферального блока: плитка баланса 200 × 200 (6°), карточка промокода 370 (7°) и кнопка «Invite by link» (−5°) с тенью `shadow-big`.

**Что передаёт потребитель:** `balance` («€62»), `code` («NX2025»), `inviteLabel`, `onInvite`, `onCopy`.

**Части:**
- `BalanceTile` — радиус 24, паддинг 20; «Your balance» 12 px и сумма 90 px с трекингом −0.04em.
- `PromoCodeCard` — радиус 28, поля 16 16 16 24; «Your code» 14 px `color-secondary`, код `text-big` градиентом, иконка-кнопка копирования на `fill-icon-button`.

Над композицией — `SectionTitle` с «Earn 3 €» градиентом и лид `text-b` (отступ 20, затем 32); под ней — пояснение `text-lg` `color-secondary`. Наклон — только здесь и в карточках продукта.
