/* Just eSIM — компоненты window.JeS (React 18). Документация типов; стили — components/bundle.css, значения — tokens/tokens.css. Собирается npm run build. */
import * as React from 'react';
type Children = React.ReactNode;
export type IconName = 'apple' | 'google-play' | 'download' | 'burger' | 'chevron-down' | 'sparkles' | 'lightbulb' | 'plus-circle' | 'dots' | 'pie-chart' | 'bell' | 'first-aid' | 'devices' | 'clock' | 'person' | 'check-circle' | 'copy' | 'person-plus' | 'smile' | 'check' | 'back' | 'gear' | 'chevron-circle' | 'pay-apple-pay' | 'pay-g-pay' | 'pay-visa' | 'pay-mastercard' | 'social-telegram' | 'social-tiktok' | 'social-instagram';
export interface IconProps {
    /** Имя глифа из набора прода. */
    name: IconName;
    /** Высота в px; ширина масштабируется. По умолчанию — родной размер глифа (около 20 × 21). */
    size?: number;
    /** Подпись для скринридера. Без неё иконка декоративная (aria-hidden). */
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}
/** Заливной глиф из набора прода; красится через CSS `color` (currentColor). */
export declare function Icon(props: IconProps): React.ReactElement | null;
export interface LogoTileProps {
    /** 48 — шапка (радиус 16), 56 — мобильное меню (радиус 14). */
    size?: 48 | 56;
    /** light — плитка `surface-tile` с тёмным знаком, как в файлах прода; dark — `surface-grey` с белым знаком (гайд). */
    tone?: 'light' | 'dark';
    /** Ссылка на главную. Без неё плитка рендерится как картинка. */
    href?: string;
    label?: string;
    className?: string;
}
/** Компактный логотип Just eSIM на плитке с тенью `shadow-logo` — точные контуры из /favicon.svg. */
export declare function LogoTile(props: LogoTileProps): React.ReactElement;
export interface LogoMarkProps {
    /** dark — чёрный при .9 (на светлом фоне), white — белый (на тёмном). */
    tone?: 'dark' | 'white';
    /** Высота знака в px. */
    height?: number;
    className?: string;
}
/** Компактный знак «Just / eSIM» без плитки. */
export declare function LogoMark(props: LogoMarkProps): React.ReactElement;
export interface GradientTextProps {
    as?: 'span' | 'div' | 'strong';
    className?: string;
    children?: Children;
}
/** Заливка текста фирменным градиентом `grad` (класс прода `.gra`). Один элемент на экран. */
export declare function GradientText(props: GradientTextProps): React.ReactElement;
export type ButtonIcon = 'apple' | 'google-play' | 'download' | 'lightbulb' | 'person-plus';
export interface ButtonProps {
    /** primary — чёрная, secondary — белая с тенью. */
    variant?: 'primary' | 'secondary';
    /** m 48 / 18 px, l 56 / 20 px, xl 80 / 32 px (store-кнопки). */
    size?: 'm' | 'l' | 'xl';
    /** Глиф слева: имя из набора или свой узел. */
    icon?: ButtonIcon | React.ReactElement;
    /** Есть href — рендерится ссылка `<a>`, иначе `<button>`. */
    href?: string;
    /** На всю ширину контейнера (mobile, карточки). */
    block?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: Children;
}
/** Кнопка-пилюля с обводкой 1 px и иконкой слева; нажатие — scale .95 и opacity .8 за 75 ms, hover нет. */
export declare function Button(props: ButtonProps): React.ReactElement;
export interface StoreButtonsProps {
    appStoreHref?: string;
    googlePlayHref?: string;
    appStoreLabel?: string;
    googlePlayLabel?: string;
    className?: string;
}
/** Пара XL-кнопок App Store и Google Play в контейнере 600: в ряд от 640, столбиком на mobile. */
export declare function StoreButtons(props: StoreButtonsProps): React.ReactElement;
export interface CardProps {
    /** default — белая с верхним градиентом `card-tint`; white — чистый белый (карточки с изображением на всю ширину). */
    variant?: 'default' | 'white';
    /** Паддинг: число (px) или CSS-строка ("40px 24px"). */
    padding?: number | string;
    as?: 'div' | 'section' | 'article' | 'aside' | 'li';
    className?: string;
    style?: React.CSSProperties;
    children?: Children;
}
/** Карточка `rounded-block`: радиус 40, тень `shadow-big`, блик по верхнему контуру. */
export declare function Card(props: CardProps): React.ReactElement;
export interface DarkCardProps {
    /** Подпись сверху, `text-on-dark-secondary`. */
    title?: Children;
    /** Код или команда — моноширинным, с сохранением переносов. */
    code?: string;
    className?: string;
    children?: Children;
}
/** Тёмная поверхность `surface-dark` для кода, терминала и тёмных карточек на слайдах. */
export declare function DarkCard(props: DarkCardProps): React.ReactElement;
export interface BadgeProps {
    /** data — бейдж объёма данных (прод), gradient — бейдж-пилюля из гайда. */
    tone?: 'data' | 'gradient';
    className?: string;
    children?: Children;
}
/** Пилюля высотой 36 с текстом 22 px: объём данных `accent-green` на `accent-green-dark` или белый текст на `grad-solid`. */
export declare function Badge(props: BadgeProps): React.ReactElement;
export interface PlanChipProps {
    /** Текст тарифа ("10 GB"); "∞" рисуется градиентом. Без label — чип только с иконкой. */
    label?: string;
    /** plus — добавить тариф, dots — ещё варианты, null — без иконки. */
    icon?: 'plus' | 'dots' | null;
    className?: string;
}
/** Белый чип тарифа высотой 40 с тенью `shadow-big` — под истёкшей карточкой продукта. */
export declare function PlanChip(props: PlanChipProps): React.ReactElement;
export interface ProductCardProps {
    /** Страна или регион. */
    country: Children;
    /** Срок: "Expires in 14 days", "Expired May 23". */
    meta?: Children;
    /** Остаток данных для бейджа (только активная карточка): "11.2 GB". */
    data?: Children;
    state?: 'active' | 'expired';
    /** Фото, связанное со страной: кадрируется в правый верхний угол, ширина 270, multiply. */
    photo?: string;
    /** Наклон в градусах; true — как в композиции прода (1.5° активная, −3° истёкшая). */
    tilt?: number | boolean;
    /** Чипы тарифов под истёкшей карточкой. */
    plans?: PlanChipProps[];
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
/** Карточка eSIM из приложения: радиус 24, обводка 0.5 px, поля 16 24, до 340 в ширину. */
export declare function ProductCard(props: ProductCardProps): React.ReactElement;
export interface ProductCardStackProps {
    /** Две карточки: активная сверху (слева, 1.5°) и истёкшая под ней (справа, −3°). */
    cards: [ProductCardProps, ProductCardProps];
    className?: string;
}
/** Композиция «предметов» из двух карточек продукта, как в карточке преимуществ на главной. */
export declare function ProductCardStack(props: ProductCardStackProps): React.ReactElement;
export interface PaymentLogosProps {
    className?: string;
}
/** Apple Pay, G Pay, Visa, Mastercard цветом `payment-gray`, промежуток 12. */
export declare function PaymentLogos(props: PaymentLogosProps): React.ReactElement;
export interface PurchaseWidgetProps {
    /** Подпись сверху, `color-secondary`, с иконкой-искрами. */
    caption?: Children;
    /** Форма выбора направления и тарифа. Пока её нет — показывается скелетон. */
    children?: Children;
    /** Принудительно показать скелетон. */
    loading?: boolean;
    className?: string;
}
/** Виджет покупки в hero: карточка с паддингом 16, ширина 370 на desktop, скелетон и логотипы платёжных систем. */
export declare function PurchaseWidget(props: PurchaseWidgetProps): React.ReactElement;
export interface SelectFieldProps {
    /** Подпись сверху, 14 px `color-secondary`: "Country or region". */
    label: Children;
    /** Выбранное значение, 32 px `ink`: "Andorra". */
    value: Children;
    onClick?: () => void;
    className?: string;
}
/** Поле выбора виджета покупки: белое, обводка `stroke-field`, радиус 24, от 88 в высоту, справа chevron-circle `text-service`. */
export declare function SelectField(props: SelectFieldProps): React.ReactElement;
export interface SegmentedOption {
    value: string;
    label: Children;
}
export interface SegmentedProps {
    options: SegmentedOption[];
    /** Выбранное значение; без onChange переключается само. */
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Подпись для скринридера. */
    label?: string;
    className?: string;
}
/** Сегментированный переключатель (срок, объём): дорожка `fill-track` с обводкой, сегменты 44 × радиус 24, выбранный — `glass`. */
export declare function Segmented(props: SegmentedProps): React.ReactElement;
export interface NavLink {
    label: Children;
    href: string;
}
export interface Language {
    /** Код: "en", "ru". В мобильном меню выводится капсом. */
    code: string;
    label: Children;
    /** URL круглого флага 16 px. */
    flag?: string;
    href?: string;
}
export interface LanguageSelectProps {
    current: Language;
    options?: Language[];
    /** Управляемое состояние; без него переключается по клику. */
    open?: boolean;
    defaultOpen?: boolean;
    onSelect?: (lang: Language) => void;
    className?: string;
}
/** Выбор языка: текущий язык с флагом и шевроном, белый выпадающий список (радиус 12) с анимацией .3s. */
export declare function LanguageSelect(props: LanguageSelectProps): React.ReactElement;
export interface HeaderProps {
    links: NavLink[];
    language?: LanguageSelectProps;
    /** Кнопка M справа. */
    cta?: {
        label: Children;
        href?: string;
        icon?: ButtonIcon;
    };
    /** Показать подложку `menu-gra` (появляется при прокрутке). */
    scrolled?: boolean;
    /** fixed — как на сайте; static — в потоке (превью, макеты). */
    position?: 'fixed' | 'static';
    /** auto — переключение на 1280; desktop / mobile — принудительно (макеты). */
    layout?: 'auto' | 'desktop' | 'mobile';
    logoHref?: string;
    onMenu?: () => void;
    className?: string;
}
/** Шапка: от 1280 — плитка логотипа, язык, пилюля навигации по центру и «Download app»; до 1280 — бургер и кнопка. */
export declare function Header(props: HeaderProps): React.ReactElement;
export interface ModalProps {
    open?: boolean;
    /** default 560, medium 768, wide 1160. */
    size?: 'default' | 'medium' | 'wide';
    /** Bottom sheet: прижато к низу, радиус 44 сверху, выезд снизу .3s ease-out. */
    sheet?: boolean;
    /** Фон содержимого; по умолчанию `color-modalgray`, у мобильного меню — `color-main`. */
    surface?: 'modalgray' | 'main';
    closable?: boolean;
    onClose?: () => void;
    /** Рендерить в потоке, без position: fixed (превью, макеты). */
    inline?: boolean;
    className?: string;
    children?: Children;
}
/** Модальное окно: оверлей `overlay-modal`, содержимое на `color-modalgray` с радиусом 30, круглая кнопка закрытия 56. */
export declare function Modal(props: ModalProps): React.ReactElement | null;
export interface MobileMenuProps {
    links: NavLink[];
    languages?: Language[];
    cta?: {
        label: Children;
        href?: string;
        icon?: ButtonIcon;
    };
    open?: boolean;
    onClose?: () => void;
    inline?: boolean;
}
/** Мобильное меню — bottom sheet на `color-main`: плитка логотипа 56, ссылки `text-big`, коды языков, кнопка M. */
export declare function MobileMenu(props: MobileMenuProps): React.ReactElement;
export interface CookieBannerProps {
    title?: Children;
    /** Абзацы текста; ссылки внутри — `color-aqua`. */
    children?: Children;
    customizeLabel?: Children;
    onCustomize?: () => void;
    secondaryLabel?: Children;
    primaryLabel?: Children;
    onSecondary?: () => void;
    onPrimary?: () => void;
    inline?: boolean;
}
/** Cookie-баннер: оверлей .6, белая карточка с радиусом 20 и паддингом 24, до 910; на mobile прижата к низу. */
export declare function CookieBanner(props: CookieBannerProps): React.ReactElement;
export interface SectionProps {
    /** id для якоря; смещение под фиксированную шапку задаёт `anchor-offset`. */
    id?: string;
    className?: string;
    children?: Children;
}
/** Секция страницы: поля `space-4` по бокам, колонка `content` 1024 по центру, отступы 144 на desktop и 16vw на mobile. */
export declare function Section(props: SectionProps): React.ReactElement;
export interface SectionTitleProps {
    as?: 'h1' | 'h2' | 'h3' | 'div';
    align?: 'center' | 'left';
    className?: string;
    children?: Children;
}
/** H2 секции: 80 px на desktop, 8vw от 640, 48 на mobile; интерлиньяж 92%, трекинг −0.03em, до контента 40. */
export declare function SectionTitle(props: SectionTitleProps): React.ReactElement;
export interface HeroProps {
    /** Изображение для desktop (до 700). */
    image?: string;
    /** Изображение для mobile (80% ширины, до 400); по умолчанию — image. */
    imageMobile?: string;
    imageAlt?: string;
    /** H1, обычно в две строки через <br/>. */
    title: Children;
    lead?: Children;
    /** Справа от лида — обычно PurchaseWidget. */
    aside?: Children;
    className?: string;
}
/** Hero: изображение по центру, H1 148 px наезжает на него на −200, ниже лид 42 px и виджет в ряд. */
export declare function Hero(props: HeroProps): React.ReactElement;
export interface FeatureItem {
    icon?: IconName;
    label: Children;
}
export interface FeatureCardProps {
    /** Изображение сверху; текстовый блок наезжает на него на −80. */
    image?: string;
    imageAlt?: string;
    /** Максимальная ширина изображения, px. */
    imageWidth?: number;
    /** center — по центру; start — прижато влево (карточка с колибри на главной). */
    imagePosition?: 'center' | 'start';
    /** На сколько текст наезжает на изображение, px: 80 по умолчанию, 60 у карточки поддержки. */
    overlap?: number;
    /** text-wrap: balance для заголовка и описания. */
    balance?: boolean;
    title?: Children;
    description?: Children;
    /** Пункты с иконками слева (поддержка 24/7 и т. п.). */
    features?: FeatureItem[];
    align?: 'center' | 'left';
    /** Кнопка L на всю ширину внизу. */
    action?: Children;
    /** Глиф в правом верхнем углу цветом `text-service`. */
    cornerIcon?: IconName;
    variant?: 'default' | 'white';
    /** Своё наполнение над текстом: карточки продукта, список строк. */
    children?: Children;
    className?: string;
}
/** Карточка преимуществ: изображение или «предметы» сверху, заголовок `text-big`, описание `text-b` .6 и кнопка L. */
export declare function FeatureCard(props: FeatureCardProps): React.ReactElement;
export interface FeatureGridProps {
    className?: string;
    children?: Children;
}
/** Сетка карточек преимуществ: 2 колонки от 1024 с промежутком 24, столбик на mobile с промежутком 8. */
export declare function FeatureGrid(props: FeatureGridProps): React.ReactElement;
export interface ListRow {
    label: Children;
    hint?: Children;
    icon?: IconName;
}
export interface ListRowsProps {
    rows: ListRow[];
    className?: string;
}
/** Строки внутри карточки: `text-xl`, глиф 20 справа, разделители `line`, отступы 20; пояснение 14 px `text-caption`. */
export declare function ListRows(props: ListRowsProps): React.ReactElement;
export interface ChecklistProps {
    items: Children[];
    className?: string;
}
/** Чек-лист до 360 по центру: строки `text-b` .9, заливной check-circle 20, разделители `line`. */
export declare function Checklist(props: ChecklistProps): React.ReactElement;
export interface FaqEntry {
    question: Children;
    answer: Children;
}
export interface FaqProps {
    title?: Children;
    items: FaqEntry[];
    /** Индекс открытого по умолчанию пункта; −1 — все закрыты. */
    defaultOpen?: number;
    /** Под списком — primary-кнопка L «See all answers». */
    action?: Children;
    className?: string;
}
/** FAQ в карточке: вопросы `text-b` `ink`, plus поворачивается на 225° в крестик за .5s, ответы `text-muted`. */
export declare function Faq(props: FaqProps): React.ReactElement;
export interface BalanceTileProps {
    label?: Children;
    amount: Children;
    tilt?: number;
    className?: string;
}
/** Плитка баланса 200 × 200: «Your balance» 12 px и сумма 90 px с трекингом −0.04em. */
export declare function BalanceTile(props: BalanceTileProps): React.ReactElement;
export interface PromoCodeCardProps {
    label?: Children;
    code: string;
    onCopy?: (code: string) => void;
    tilt?: number;
    className?: string;
}
/** Карточка промокода 370: подпись 14 px .6, код градиентом `text-big`, кнопка копирования на `fill-icon-button`. */
export declare function PromoCodeCard(props: PromoCodeCardProps): React.ReactElement;
export interface ReferralCardsProps {
    balance?: Children;
    code?: string;
    inviteLabel?: Children;
    onInvite?: () => void;
    onCopy?: (code: string) => void;
    className?: string;
}
/** Композиция «предметов» реферального блока: плитка баланса (6°), карточка кода (7°) и кнопка «Invite by link» (−5°). */
export declare function ReferralCards(props: ReferralCardsProps): React.ReactElement;
export interface ReviewText {
    paragraphs: Children[];
    name: Children;
    country: Children;
}
export interface ReviewProps extends ReviewText {
    /** URL круглого флага 16 px слева от страны. */
    flag?: string;
    /** Перевод: появится ссылка «View Translation» / «View Original». */
    translation?: ReviewText & {
        label?: Children;
        backLabel?: Children;
    };
    className?: string;
}
/** Отзыв в карточке: пять звёзд `color-star`, текст 16 / 140% .6, имя 32 px, страна с флагом и ссылка перевода. */
export declare function Review(props: ReviewProps): React.ReactElement;
export interface GlassStackProps {
    /** Три стеклянных изображения: верхнее, нижнее левое (−10°), нижнее правое (15°). */
    images: [string, string, string];
    alts?: [string, string, string];
    className?: string;
}
/** Стопка из трёх стеклянных изображений над «One eSIM / The whole world»: два нижних повёрнуты на −10° и 15°. */
export declare function GlassStack(props: GlassStackProps): React.ReactElement;
export interface SocialLinksProps {
    title?: Children;
    links: Array<{
        network: 'telegram' | 'tiktok' | 'instagram';
        href: string;
    }>;
    className?: string;
}
/** «Follow us on social media» (27 px, 20 на mobile) и круги соцсетей 50 в цветах площадок, промежуток 16. */
export declare function SocialLinks(props: SocialLinksProps): React.ReactElement;
export interface FooterColumn {
    title: Children;
    links: NavLink[];
}
export interface FooterProps {
    columns: FooterColumn[];
    copyright?: Children;
    email?: string;
    version?: Children;
    className?: string;
}
/** Футер: три колонки от 1024 (заголовок 14 px `text-caption`, ссылки `text-b` `ink` с разделителями), снизу копирайт, почта и версия. */
export declare function Footer(props: FooterProps): React.ReactElement;
export {};

declare global {
  interface Window {
    JeS: {
      Icon: typeof Icon;
      LogoTile: typeof LogoTile;
      LogoMark: typeof LogoMark;
      GradientText: typeof GradientText;
      Button: typeof Button;
      StoreButtons: typeof StoreButtons;
      Card: typeof Card;
      DarkCard: typeof DarkCard;
      Badge: typeof Badge;
      PlanChip: typeof PlanChip;
      ProductCard: typeof ProductCard;
      ProductCardStack: typeof ProductCardStack;
      PaymentLogos: typeof PaymentLogos;
      PurchaseWidget: typeof PurchaseWidget;
      SelectField: typeof SelectField;
      Segmented: typeof Segmented;
      LanguageSelect: typeof LanguageSelect;
      Header: typeof Header;
      Modal: typeof Modal;
      MobileMenu: typeof MobileMenu;
      CookieBanner: typeof CookieBanner;
      Section: typeof Section;
      SectionTitle: typeof SectionTitle;
      Hero: typeof Hero;
      FeatureCard: typeof FeatureCard;
      FeatureGrid: typeof FeatureGrid;
      ListRows: typeof ListRows;
      Checklist: typeof Checklist;
      Faq: typeof Faq;
      BalanceTile: typeof BalanceTile;
      PromoCodeCard: typeof PromoCodeCard;
      ReferralCards: typeof ReferralCards;
      Review: typeof Review;
      GlassStack: typeof GlassStack;
      SocialLinks: typeof SocialLinks;
      Footer: typeof Footer;
    };
  }
}
