import * as React from 'react';
import { ICONS, LOGO, STAR_PATHS } from './icons';

/* Just eSIM — компоненты сайта justesim.com, собранные по design.md и проду.
 * Стили — components/bundle.css, значения — tokens.css (tokens.json). */

type Children = React.ReactNode;
const cx = (...a: unknown[]) => a.filter((x) => typeof x === 'string' && x !== '').join(' ');
const px = (v: number | string | undefined) => (typeof v === 'number' ? v + 'px' : v);

/* ------------------------------------------------------------------ Icon */
export type IconName =
  | 'apple' | 'google-play' | 'download' | 'burger' | 'chevron-down' | 'sparkles' | 'lightbulb'
  | 'plus-circle' | 'dots' | 'pie-chart' | 'bell' | 'first-aid' | 'devices' | 'clock' | 'person'
  | 'check-circle' | 'copy' | 'person-plus' | 'smile' | 'check' | 'back' | 'gear' | 'chevron-circle'
  | 'pay-apple-pay' | 'pay-g-pay' | 'pay-visa' | 'pay-mastercard'
  | 'social-telegram' | 'social-tiktok' | 'social-instagram';

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
export function Icon({ name, size, title, className, style }: IconProps) {
  const ic = ICONS[name];
  if (!ic) return null;
  let w = ic.w, h = ic.h;
  if (size) { w = Math.round((ic.w * size) / ic.h * 100) / 100; h = size; }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" viewBox={ic.vb} width={w} height={h} fill="none"
      className={cx('jes-icon', className)} style={style}
      role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}
      focusable="false" dangerouslySetInnerHTML={{ __html: ic.body }}
    />
  );
}

/* ------------------------------------------------------------------ Logo */
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
export function LogoTile({ size = 48, tone = 'light', href, label = 'Just eSIM', className }: LogoTileProps) {
  const r = size === 56 ? 14 : 16;
  const rx = (r * 56) / size;
  const svg = (
    <svg viewBox="0 0 56 56" width={size} height={size} aria-hidden="true" focusable="false">
      <rect width="56" height="56" rx={rx} className="jes-logo-tile__bg" />
      <rect x="0.25" y="0.25" width="55.5" height="55.5" rx={rx - 0.25} className="jes-logo-tile__ring" fill="none" strokeWidth="0.5" />
      {LOGO.paths.map((d, i) => <path key={i} d={d} className="jes-logo-tile__mark" />)}
    </svg>
  );
  const cls = cx('jes-logo-tile', 'jes-logo-tile--' + size, tone === 'dark' && 'jes-logo-tile--dark', className);
  return href
    ? <a href={href} className={cls} aria-label={label}>{svg}</a>
    : <span className={cls} role="img" aria-label={label}>{svg}</span>;
}

export interface LogoMarkProps {
  /** dark — чёрный при .9 (на светлом фоне), white — белый (на тёмном). */
  tone?: 'dark' | 'white';
  /** Высота знака в px. */
  height?: number;
  className?: string;
}

/** Компактный знак «Just / eSIM» без плитки. */
export function LogoMark({ tone = 'dark', height = 48, className }: LogoMarkProps) {
  const w = Math.round((LOGO.w * height) / LOGO.h * 100) / 100;
  return (
    <svg viewBox={LOGO.vb} width={w} height={height} role="img" aria-label="Just eSIM" className={cx('jes-logo-mark', 'jes-logo-mark--' + tone, className)}>
      {LOGO.paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* ------------------------------------------------------------------ Gradient text */
export interface GradientTextProps {
  as?: 'span' | 'div' | 'strong';
  className?: string;
  children?: Children;
}

/** Заливка текста фирменным градиентом `grad` (класс прода `.gra`). Один элемент на экран. */
export function GradientText({ as: Tag = 'span', className, children }: GradientTextProps) {
  return <Tag className={cx('jes-gra', className)}>{children}</Tag>;
}

/* ------------------------------------------------------------------ Button */
export type ButtonIcon = 'apple' | 'google-play' | 'download' | 'lightbulb' | 'person-plus';
const BTN_ICON_H: Record<string, number> = { apple: 21, 'google-play': 23, download: 23, lightbulb: 21, 'person-plus': 27 };
const BTN_ICON_H_XL: Record<string, number> = { apple: 40, 'google-play': 32, download: 40, lightbulb: 40, 'person-plus': 32 };

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
export function Button({ variant = 'primary', size = 'l', icon, href, block, type = 'button', disabled, onClick, className, style, children }: ButtonProps) {
  let ic: React.ReactNode = null;
  if (typeof icon === 'string') {
    const h = size === 'xl' ? BTN_ICON_H_XL[icon] : BTN_ICON_H[icon];
    ic = <Icon name={icon} size={h} className="jes-btn__icon" />;
  } else if (icon) ic = <span className="jes-btn__icon">{icon}</span>;
  const cls = cx('jes-btn', 'jes-btn--' + variant, 'jes-btn--' + size, block && 'jes-btn--block', className);
  const inner = <>{ic}<span className="jes-btn__label">{children}</span></>;
  return href
    ? <a href={href} className={cls} style={style} onClick={onClick}>{inner}</a>
    : <button type={type} className={cls} style={style} disabled={disabled} onClick={onClick}>{inner}</button>;
}

export interface StoreButtonsProps {
  appStoreHref?: string;
  googlePlayHref?: string;
  appStoreLabel?: string;
  googlePlayLabel?: string;
  className?: string;
}

/** Пара XL-кнопок App Store и Google Play в контейнере 600: в ряд от 640, столбиком на mobile. */
export function StoreButtons({
  appStoreHref = 'https://apps.apple.com/app/just-esim-internet-travel/id1672277209',
  googlePlayHref = 'https://play.google.com/store/apps/details?id=com.justesim',
  appStoreLabel = 'App Store', googlePlayLabel = 'Google Play', className,
}: StoreButtonsProps) {
  return (
    <div className={cx('jes-store', className)}>
      <Button size="xl" icon="apple" href={appStoreHref} className="jes-store__btn">{appStoreLabel}</Button>
      <Button size="xl" icon="google-play" href={googlePlayHref} className="jes-store__btn">{googlePlayLabel}</Button>
    </div>
  );
}

/* ------------------------------------------------------------------ Surfaces */
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
export function Card({ variant = 'default', padding, as: Tag = 'div', className, style, children }: CardProps) {
  const st = padding !== undefined ? { padding: px(padding), ...style } : style;
  return <Tag className={cx('jes-card', variant === 'white' && 'jes-card--white', className)} style={st}>{children}</Tag>;
}

export interface DarkCardProps {
  /** Подпись сверху, `text-on-dark-secondary`. */
  title?: Children;
  /** Код или команда — моноширинным, с сохранением переносов. */
  code?: string;
  className?: string;
  children?: Children;
}

/** Тёмная поверхность `surface-dark` для кода, терминала и тёмных карточек на слайдах. */
export function DarkCard({ title, code, className, children }: DarkCardProps) {
  return (
    <div className={cx('jes-dark', className)}>
      {title && <div className="jes-dark__title">{title}</div>}
      {code !== undefined ? <pre className="jes-dark__code"><code>{code}</code></pre> : children}
    </div>
  );
}

/* ------------------------------------------------------------------ Badges & chips */
export interface BadgeProps {
  /** data — бейдж объёма данных (прод), gradient — бейдж-пилюля из гайда. */
  tone?: 'data' | 'gradient';
  className?: string;
  children?: Children;
}

/** Пилюля высотой 36 с текстом 22 px: объём данных `accent-green` на `accent-green-dark` или белый текст на `grad-solid`. */
export function Badge({ tone = 'data', className, children }: BadgeProps) {
  return <span className={cx('jes-badge', 'jes-badge--' + tone, className)}>{children}</span>;
}

export interface PlanChipProps {
  /** Текст тарифа ("10 GB"); "∞" рисуется градиентом. Без label — чип только с иконкой. */
  label?: string;
  /** plus — добавить тариф, dots — ещё варианты, null — без иконки. */
  icon?: 'plus' | 'dots' | null;
  className?: string;
}

/** Белый чип тарифа высотой 40 с тенью `shadow-big` — под истёкшей карточкой продукта. */
export function PlanChip({ label, icon = 'plus', className }: PlanChipProps) {
  const unlimited = label === '∞';
  return (
    <span className={cx('jes-chip', !label && 'jes-chip--icon', unlimited && 'jes-chip--unlimited', className)}>
      {icon && <Icon name={icon === 'dots' ? 'dots' : 'plus-circle'} />}
      {label && (unlimited ? <span className="jes-gra jes-chip__inf">∞</span> : <span>{label}</span>)}
    </span>
  );
}

/* ------------------------------------------------------------------ Product card */
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
export function ProductCard({ country, meta, data, state = 'active', photo, tilt, plans, onClick, className, style }: ProductCardProps) {
  const expired = state === 'expired';
  const deg = tilt === true ? (expired ? -3 : 1.5) : typeof tilt === 'number' ? tilt : 0;
  const st: React.CSSProperties = { ...(deg ? { rotate: deg + 'deg' } as any : null), ...style };
  return (
    <div className={cx('jes-product', expired ? 'jes-product--expired' : 'jes-product--active', className)} style={st} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {photo && <div className="jes-product__photo" style={{ backgroundImage: 'url(' + photo + ')' }} />}
      {expired && <div className="jes-product__fade" />}
      {data && !expired && <Badge className="jes-product__badge">{data}</Badge>}
      <div className="jes-product__country">{country}</div>
      {meta && <div className="jes-product__meta">{meta}</div>}
      {expired && plans && plans.length > 0 && (
        <div className="jes-product__plans">{plans.map((p, i) => <PlanChip key={i} {...p} />)}</div>
      )}
    </div>
  );
}

export interface ProductCardStackProps {
  /** Две карточки: активная сверху (слева, 1.5°) и истёкшая под ней (справа, −3°). */
  cards: [ProductCardProps, ProductCardProps];
  className?: string;
}

/** Композиция «предметов» из двух карточек продукта, как в карточке преимуществ на главной. */
export function ProductCardStack({ cards, className }: ProductCardStackProps) {
  const [a, b] = cards;
  return (
    <div className={cx('jes-product-stack', className)}>
      <ProductCard tilt {...a} className={cx('jes-product-stack__top', a.className)} />
      <ProductCard tilt {...b} className={cx('jes-product-stack__bottom', b.className)} />
    </div>
  );
}

/* ------------------------------------------------------------------ Purchase widget */
export interface PaymentLogosProps { className?: string }

/** Apple Pay, G Pay, Visa, Mastercard цветом `payment-gray`, промежуток 12. */
export function PaymentLogos({ className }: PaymentLogosProps) {
  return (
    <div className={cx('jes-pay', className)} aria-label="Apple Pay, Google Pay, Visa, Mastercard">
      <Icon name="pay-apple-pay" /><Icon name="pay-g-pay" /><Icon name="pay-visa" /><Icon name="pay-mastercard" />
    </div>
  );
}

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
export function PurchaseWidget({ caption = 'More than 150 destinations', children, loading, className }: PurchaseWidgetProps) {
  const sk = loading ?? !children;
  return (
    <Card className={cx('jes-widget', className)}>
      <div className="jes-widget__caption"><span>{caption}</span><Icon name="sparkles" /></div>
      {sk ? (
        <div className="jes-widget__skeleton" aria-busy="true" aria-label="Loading">
          <div className="jes-skel jes-skel--field" />
          <div className="jes-skel jes-skel--option" />
          <div className="jes-skel jes-skel--option jes-skel--last" />
          <div className="jes-skel jes-skel--button" />
        </div>
      ) : children}
      <PaymentLogos />
    </Card>
  );
}

/* ------------------------------------------------------------------ Form controls (purchase widget) */
export interface SelectFieldProps {
  /** Подпись сверху, 14 px `color-secondary`: "Country or region". */
  label: Children;
  /** Выбранное значение, 32 px `ink`: "Andorra". */
  value: Children;
  onClick?: () => void;
  className?: string;
}

/** Поле выбора виджета покупки: белое, обводка `stroke-field`, радиус 24, от 88 в высоту, справа chevron-circle `text-service`. */
export function SelectField({ label, value, onClick, className }: SelectFieldProps) {
  return (
    <button type="button" className={cx('jes-select', className)} onClick={onClick}>
      <span className="jes-select__text">
        <span className="jes-select__label">{label}</span>
        <span className="jes-select__value">{value}</span>
      </span>
      <Icon name="chevron-circle" className="jes-select__icon" />
    </button>
  );
}

export interface SegmentedOption { value: string; label: Children }
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
export function Segmented({ options, value, defaultValue, onChange, label, className }: SegmentedProps) {
  const [inner, setInner] = React.useState(defaultValue ?? (options[0] && options[0].value));
  const cur = value ?? inner;
  return (
    <div className={cx('jes-segmented', className)} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={cur === o.value}
          className={cx('jes-segmented__option', cur === o.value && 'is-selected')}
          onClick={() => { setInner(o.value); onChange && onChange(o.value); }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ Navigation */
export interface NavLink { label: Children; href: string }
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
export function LanguageSelect({ current, options = [], open, defaultOpen = false, onSelect, className }: LanguageSelectProps) {
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open ?? inner;
  return (
    <div className={cx('jes-lang', isOpen && 'is-open', className)}>
      <button type="button" className="jes-lang__current" aria-expanded={isOpen} onClick={() => setInner(!isOpen)}>
        {current.flag && <img className="jes-lang__flag" src={current.flag} alt="" width={16} height={16} />}
        <span>{current.label}</span>
        <Icon name="chevron-down" className="jes-lang__chevron" />
      </button>
      <div className="jes-lang__menu" role="menu">
        {options.map((o) => (
          <a key={o.code} role="menuitem" href={o.href ?? '#'} className="jes-lang__option" onClick={(e) => { if (onSelect) { e.preventDefault(); onSelect(o); } setInner(false); }}>
            {o.flag && <img className="jes-lang__flag" src={o.flag} alt="" width={16} height={16} />}
            <span>{o.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export interface HeaderProps {
  links: NavLink[];
  language?: LanguageSelectProps;
  /** Кнопка M справа. */
  cta?: { label: Children; href?: string; icon?: ButtonIcon };
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
export function Header({ links, language, cta = { label: 'Download app', icon: 'apple' }, scrolled, position = 'fixed', layout = 'auto', logoHref = '/', onMenu, className }: HeaderProps) {
  return (
    <header className={cx('jes-header', position === 'static' && 'jes-header--static', layout !== 'auto' && 'jes-header--' + layout, scrolled && 'is-scrolled', className)}>
      <div className="jes-header__fade" />
      <div className="jes-header__bar">
        <button type="button" className="jes-header__burger" aria-label="Menu" onClick={onMenu}><Icon name="burger" /></button>
        <div className="jes-header__left">
          <LogoTile size={48} href={logoHref} />
          {language && <LanguageSelect {...language} />}
        </div>
        <div className="jes-header__nav-wrap">
          <nav className="jes-nav">{links.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}</nav>
        </div>
        {cta && <Button size="m" icon={cta.icon} href={cta.href ?? '#'} className="jes-header__cta">{cta.label}</Button>}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ Overlays */
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
export function Modal({ open = true, size = 'default', sheet, surface = 'modalgray', closable = true, onClose, inline, className, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className={cx('jes-overlay', inline && 'jes-overlay--inline', sheet && 'jes-overlay--sheet')} onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <div role="dialog" aria-modal="true" className={cx('jes-modal', size !== 'default' && 'jes-modal--' + size, sheet && 'jes-modal--sheet', surface === 'main' && 'jes-modal--main', closable && 'jes-modal--closable', className)}>
        {closable && <button type="button" className="jes-modal__close" aria-label="Close" onClick={onClose} />}
        {children}
      </div>
    </div>
  );
}

export interface MobileMenuProps {
  links: NavLink[];
  languages?: Language[];
  cta?: { label: Children; href?: string; icon?: ButtonIcon };
  open?: boolean;
  onClose?: () => void;
  inline?: boolean;
}

/** Мобильное меню — bottom sheet на `color-main`: плитка логотипа 56, ссылки `text-big`, коды языков, кнопка M. */
export function MobileMenu({ links, languages = [], cta = { label: 'Download app', icon: 'apple' }, open = true, onClose, inline }: MobileMenuProps) {
  return (
    <Modal open={open} sheet size="wide" surface="main" onClose={onClose} inline={inline} className="jes-mobile-menu">
      <div className="jes-mobile-menu__body">
        <div className="jes-mobile-menu__logo"><LogoTile size={56} href="/" /></div>
        <div className="jes-mobile-menu__links">
          {links.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}
          {languages.length > 0 && (
            <div className="jes-mobile-menu__langs">
              {languages.map((l) => (
                <a key={l.code} href={l.href ?? '#'}>
                  {l.flag && <img src={l.flag} alt="" width={32} height={32} />}
                  <span>{l.code}</span>
                </a>
              ))}
            </div>
          )}
        </div>
        {cta && <Button size="m" icon={cta.icon} href={cta.href ?? '#'} block>{cta.label}</Button>}
      </div>
    </Modal>
  );
}

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
export function CookieBanner({
  title = "Hi! Let's deal with the cookies", children, customizeLabel = 'Customize', onCustomize,
  secondaryLabel = 'Recommended', primaryLabel = 'Accept all', onSecondary, onPrimary, inline,
}: CookieBannerProps) {
  return (
    <div className={cx('jes-cookie-overlay', inline && 'jes-cookie-overlay--inline')}>
      <div className="jes-cookie" role="dialog" aria-label="Cookies">
        <div className="jes-cookie__title">{title}</div>
        <div className="jes-cookie__text">{children}</div>
        <div className="jes-cookie__customize">
          <a href="#" onClick={(e) => { e.preventDefault(); onCustomize && onCustomize(); }}><Icon name="gear" size={18} /><span>{customizeLabel}</span></a>
        </div>
        <div className="jes-cookie__actions">
          <Button size="m" variant="secondary" block onClick={onSecondary}>{secondaryLabel}</Button>
          <Button size="m" block onClick={onPrimary}>{primaryLabel}</Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Content blocks */
export interface SectionProps {
  /** id для якоря; смещение под фиксированную шапку задаёт `anchor-offset`. */
  id?: string;
  className?: string;
  children?: Children;
}

/** Секция страницы: поля `space-4` по бокам, колонка `content` 1024 по центру, отступы 144 на desktop и 16vw на mobile. */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section className={cx('jes-section', className)}>
      {id && <div id={id} className="jes-section__anchor" />}
      <div className="jes-section__inner">{children}</div>
    </section>
  );
}

export interface SectionTitleProps {
  as?: 'h1' | 'h2' | 'h3' | 'div';
  align?: 'center' | 'left';
  className?: string;
  children?: Children;
}

/** H2 секции: 80 px на desktop, 8vw от 640, 48 на mobile; интерлиньяж 92%, трекинг −0.03em, до контента 40. */
export function SectionTitle({ as: Tag = 'h2', align = 'center', className, children }: SectionTitleProps) {
  return <Tag className={cx('jes-h2', align === 'left' && 'jes-h2--left', className)}>{children}</Tag>;
}

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
export function Hero({ image, imageMobile, imageAlt = 'Just eSIM', title, lead, aside, className }: HeroProps) {
  return (
    <section className={cx('jes-hero', className)}>
      <div className="jes-hero__inner">
        {(imageMobile || image) && <img className="jes-hero__img jes-hero__img--mobile" src={imageMobile || image} alt={imageAlt} />}
        {image && <img className="jes-hero__img jes-hero__img--desktop" src={image} alt={imageAlt} />}
        <h1 className="jes-hero__title">{title}</h1>
        <div className="jes-hero__row">
          {lead && <div className="jes-hero__lead">{lead}</div>}
          {aside}
        </div>
      </div>
    </section>
  );
}

export interface FeatureItem { icon?: IconName; label: Children }

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
export function FeatureCard({ image, imageAlt = '', imageWidth = 370, imagePosition = 'center', overlap = 80, balance, title, description, features, align = 'center', action, cornerIcon, variant, children, className }: FeatureCardProps) {
  return (
    <Card variant={variant ?? (align === 'left' ? 'white' : 'default')} className={cx('jes-feature', 'jes-feature--' + align, balance && 'jes-feature--balance', className)}>
      {cornerIcon && <Icon name={cornerIcon} className="jes-feature__corner" />}
      {image && <figure className={cx('jes-feature__media', imagePosition === 'start' && 'jes-feature__media--start')}><img src={image} alt={imageAlt} style={{ maxWidth: imageWidth }} /></figure>}
      {children && <div className="jes-feature__custom">{children}</div>}
      {(title || description || features) && (
        <div className="jes-feature__text" style={image ? { marginTop: -overlap } : undefined}>
          {title && <div className="jes-feature__title">{title}</div>}
          {description && <div className="jes-feature__desc">{description}</div>}
          {features && (
            <div className="jes-feature__items">
              {features.map((f, i) => <div key={i} className="jes-feature__item">{f.icon && <Icon name={f.icon} />}<span>{f.label}</span></div>)}
            </div>
          )}
        </div>
      )}
      {action && <div className="jes-feature__action">{action}</div>}
    </Card>
  );
}

export interface FeatureGridProps { className?: string; children?: Children }

/** Сетка карточек преимуществ: 2 колонки от 1024 с промежутком 24, столбик на mobile с промежутком 8. */
export function FeatureGrid({ className, children }: FeatureGridProps) {
  return <div className={cx('jes-feature-grid', className)}>{children}</div>;
}

export interface ListRow { label: Children; hint?: Children; icon?: IconName }
export interface ListRowsProps { rows: ListRow[]; className?: string }

/** Строки внутри карточки: `text-xl`, глиф 20 справа, разделители `line`, отступы 20; пояснение 14 px `text-caption`. */
export function ListRows({ rows, className }: ListRowsProps) {
  return (
    <div className={cx('jes-rows', className)}>
      {rows.map((r, i) => (
        <div key={i} className={cx('jes-rows__row', r.hint && 'jes-rows__row--hint')}>
          <div>
            <div className="jes-rows__label">{r.label}</div>
            {r.hint && <div className="jes-rows__hint">{r.hint}</div>}
          </div>
          {r.icon && <Icon name={r.icon} />}
        </div>
      ))}
    </div>
  );
}

export interface ChecklistProps { items: Children[]; className?: string }

/** Чек-лист до 360 по центру: строки `text-b` .9, заливной check-circle 20, разделители `line`. */
export function Checklist({ items, className }: ChecklistProps) {
  return (
    <ul className={cx('jes-check', className)}>
      {items.map((t, i) => <li key={i} className="jes-check__item"><Icon name="check-circle" className="jes-check__icon" /><span>{t}</span></li>)}
    </ul>
  );
}

export interface FaqEntry { question: Children; answer: Children }
export interface FaqProps {
  title?: Children;
  items: FaqEntry[];
  /** Индекс открытого по умолчанию пункта; −1 — все закрыты. */
  defaultOpen?: number;
  /** Под списком — primary-кнопка L «See all answers». */
  action?: Children;
  className?: string;
}

function FaqItem({ question, answer, open, onToggle }: FaqEntry & { open: boolean; onToggle: () => void }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [h, setH] = React.useState(0);
  React.useLayoutEffect(() => { if (ref.current) setH(ref.current.scrollHeight); }, [answer, open]);
  return (
    <div className={cx('jes-faq__item', open && 'is-open')}>
      <button type="button" className="jes-faq__q" aria-expanded={open} onClick={onToggle}>
        {question}<span className="jes-faq__plus" aria-hidden="true" />
      </button>
      <div className="jes-faq__a" style={{ height: open ? h : 0 }} aria-hidden={!open}>
        <div ref={ref} className="jes-faq__a-inner">{answer}</div>
      </div>
    </div>
  );
}

/** FAQ в карточке: вопросы `text-b` `ink`, plus поворачивается на 225° в крестик за .5s, ответы `text-muted`. */
export function Faq({ title = 'FAQ', items, defaultOpen = -1, action, className }: FaqProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <Card className={cx('jes-faq', className)}>
      <div className="jes-faq__title">{title}</div>
      <div className="jes-faq__list">
        {items.map((it, i) => <FaqItem key={i} {...it} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
      </div>
      {action}
    </Card>
  );
}

export interface BalanceTileProps { label?: Children; amount: Children; tilt?: number; className?: string }

/** Плитка баланса 200 × 200: «Your balance» 12 px и сумма 90 px с трекингом −0.04em. */
export function BalanceTile({ label = 'Your balance', amount, tilt = 6, className }: BalanceTileProps) {
  return (
    <div className={cx('jes-balance', className)} style={{ rotate: tilt + 'deg' } as any}>
      <div className="jes-balance__label">{label}</div>
      <div className="jes-balance__amount">{amount}</div>
    </div>
  );
}

export interface PromoCodeCardProps { label?: Children; code: string; onCopy?: (code: string) => void; tilt?: number; className?: string }

/** Карточка промокода 370: подпись 14 px .6, код градиентом `text-big`, кнопка копирования на `fill-icon-button`. */
export function PromoCodeCard({ label = 'Your code', code, onCopy, tilt = 7, className }: PromoCodeCardProps) {
  return (
    <div className={cx('jes-code', className)} style={{ rotate: tilt + 'deg' } as any}>
      <button type="button" className="jes-code__copy" aria-label="Copy code" onClick={() => onCopy && onCopy(code)}><Icon name="copy" /></button>
      <div className="jes-code__label">{label}</div>
      <div className="jes-gra jes-code__value">{code}</div>
    </div>
  );
}

export interface ReferralCardsProps {
  balance?: Children;
  code?: string;
  inviteLabel?: Children;
  onInvite?: () => void;
  onCopy?: (code: string) => void;
  className?: string;
}

/** Композиция «предметов» реферального блока: плитка баланса (6°), карточка кода (7°) и кнопка «Invite by link» (−5°). */
export function ReferralCards({ balance = '€62', code = 'NX2025', inviteLabel = 'Invite by link', onInvite, onCopy, className }: ReferralCardsProps) {
  return (
    <figure className={cx('jes-referral', className)}>
      <BalanceTile amount={balance} />
      <PromoCodeCard code={code} onCopy={onCopy} />
      <Button icon="person-plus" className="jes-referral__invite" onClick={onInvite}>{inviteLabel}</Button>
    </figure>
  );
}

export interface ReviewText { paragraphs: Children[]; name: Children; country: Children }
export interface ReviewProps extends ReviewText {
  /** URL круглого флага 16 px слева от страны. */
  flag?: string;
  /** Перевод: появится ссылка «View Translation» / «View Original». */
  translation?: ReviewText & { label?: Children; backLabel?: Children };
  className?: string;
}

/** Отзыв в карточке: пять звёзд `color-star`, текст 16 / 140% .6, имя 32 px, страна с флагом и ссылка перевода. */
export function Review({ paragraphs, name, country, flag, translation, className }: ReviewProps) {
  const [t, setT] = React.useState(false);
  const cur: ReviewText = t && translation ? translation : { paragraphs, name, country };
  return (
    <Card className={cx('jes-review', className)}>
      <div className="jes-review__body">
        <svg className="jes-review__stars" viewBox="0 0 120 24" width="120" height="24" role="img" aria-label="5 out of 5">
          {STAR_PATHS.map((d, i) => <path key={i} d={d} />)}
        </svg>
        {cur.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        <footer className="jes-review__footer">
          <div>
            <div className="jes-review__name">{cur.name}</div>
            <div className={cx('jes-review__country', flag && 'jes-review__country--flag')} style={flag ? { backgroundImage: 'url(' + flag + ')' } : undefined}>{cur.country}</div>
          </div>
          {translation && (
            <button type="button" className="jes-review__switch" onClick={() => setT(!t)}>
              {t ? (translation.backLabel ?? 'View Original') : (translation.label ?? 'View Translation')}
            </button>
          )}
        </footer>
      </div>
    </Card>
  );
}

export interface GlassStackProps {
  /** Три стеклянных изображения: верхнее, нижнее левое (−10°), нижнее правое (15°). */
  images: [string, string, string];
  alts?: [string, string, string];
  className?: string;
}

/** Стопка из трёх стеклянных изображений над «One eSIM / The whole world»: два нижних повёрнуты на −10° и 15°. */
export function GlassStack({ images, alts = ['', '', ''], className }: GlassStackProps) {
  return (
    <figure className={cx('jes-glass-stack', className)}>
      <div className="jes-glass-stack__inner">
        <img className="jes-glass-stack__top" src={images[0]} alt={alts[0]} />
        <div className="jes-glass-stack__left"><img src={images[1]} alt={alts[1]} /></div>
        <div className="jes-glass-stack__right"><img src={images[2]} alt={alts[2]} /></div>
      </div>
    </figure>
  );
}

export interface SocialLinksProps {
  title?: Children;
  links: Array<{ network: 'telegram' | 'tiktok' | 'instagram'; href: string }>;
  className?: string;
}

const NETWORK: Record<string, string> = { telegram: 'Telegram', tiktok: 'TikTok', instagram: 'Instagram' };

/** «Follow us on social media» (27 px, 20 на mobile) и круги соцсетей 50 в цветах площадок, промежуток 16. */
export function SocialLinks({ title = 'Follow us on social media', links, className }: SocialLinksProps) {
  return (
    <div className={cx('jes-social', className)}>
      {title && <div className="jes-social__title">{title}</div>}
      <div className="jes-social__row">
        {links.map((l, i) => (
          <a key={i} href={l.href} className="jes-social__link" aria-label={NETWORK[l.network]}>
            <Icon name={('social-' + l.network) as IconName} />
          </a>
        ))}
      </div>
    </div>
  );
}

export interface FooterColumn { title: Children; links: NavLink[] }
export interface FooterProps {
  columns: FooterColumn[];
  copyright?: Children;
  email?: string;
  version?: Children;
  className?: string;
}

/** Футер: три колонки от 1024 (заголовок 14 px `text-caption`, ссылки `text-b` `ink` с разделителями), снизу копирайт, почта и версия. */
export function Footer({ columns, copyright, email, version, className }: FooterProps) {
  return (
    <footer className={cx('jes-footer', className)}>
      <div className="jes-footer__inner">
        <div className="jes-footer__cols">
          {columns.map((c, i) => (
            <div key={i} className="jes-footer__col">
              <div className="jes-footer__title">{c.title}</div>
              <div className="jes-footer__links">
                {c.links.map((l, j) => <div key={j} className="jes-footer__link"><a href={l.href}>{l.label}</a></div>)}
              </div>
            </div>
          ))}
        </div>
        <div className="jes-footer__meta">
          {copyright && <div>{copyright}</div>}
          {email && <div className="jes-footer__email"><a href={'mailto:' + email}>{email}</a></div>}
          {version && <div className="jes-footer__version">{version}</div>}
        </div>
      </div>
    </footer>
  );
}
