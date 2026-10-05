// Исходники превью компонентов: каждая запись собирается в components/<Имя>/preview.html (npm run build).
// Пути к ассетам относительно components/<Comp>/preview.html
export const B = {
  flagUs: '../../assets/Flags/us.svg',
  flagRu: '../../assets/Flags/ru.svg',
  flagDe: '../../assets/Flags/de.svg',
  flagEs: '../../assets/Flags/es.png',
  glassHero: '../../assets/Glass/glass-esim-hero.webp',
  glassSquare: '../../assets/Glass/glass-esim-square.webp',
  glassEsim: '../../assets/Glass/glass-esim.webp',
  glassUs: '../../assets/Glass/glass-us.webp',
  glassIl: '../../assets/Glass/glass-il.webp',
  glassCg: '../../assets/Glass/glass-cg.webp',
  bird: '../../assets/Photos/bird.webp',
  pizza: '../../assets/Photos/pizza.webp',
  ball: '../../assets/Photos/ball.webp',
  cardCd: '../../assets/Photos/card-cd.webp',
  cardNl: '../../assets/Photos/card-nl.webp',
};

// shared snippets (prepended to every preview script)
const COMMON = `
var J = window.JeS;
var B = ${JSON.stringify(B)};
var LINKS = [{ label: '150+ destinations', href: '#' }, { label: 'How to install', href: '#' }, { label: 'FAQ', href: '#' }];
var EN = { code: 'en', label: 'English', flag: B.flagUs };
var RU = { code: 'ru', label: 'Русский', flag: B.flagRu };
function L(props) { return <div className="pv-label">{props.children}</div>; }
`;

const BASE_CSS = `
.pv { padding: 24px; }
.pv-row { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
.pv-col { display: flex; flex-direction: column; gap: 24px; }
.pv-label { margin-bottom: 8px; color: var(--color-secondary); font-size: 14px; line-height: 20px; }
`;

export const previews = {
  Button: {
    group: 'Кнопки', height: 380, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv pv-col">
      <div>
        <L>Primary · M 48 и L 56</L>
        <div className="pv-row">
          <J.Button size="m" icon="apple">Download app</J.Button>
          <J.Button icon="google-play">Download app</J.Button>
          <J.Button>See all answers</J.Button>
        </div>
      </div>
      <div>
        <L>Secondary · белая, обводка stroke-secondary, тень shadow-white</L>
        <div className="pv-row">
          <J.Button size="m" variant="secondary">Recommended</J.Button>
          <J.Button variant="secondary" icon="lightbulb">Learn how to install</J.Button>
        </div>
      </div>
      <div>
        <L>XL 80 · store-кнопки; block — на всю ширину (mobile, карточки)</L>
        <div className="pv-row">
          <J.Button size="xl" icon="apple">App Store</J.Button>
          <div style={{ width: 300 }}><J.Button icon="download" block>Download app</J.Button></div>
        </div>
      </div>
    </div>
  );
}`,
  },

  StoreButtons: {
    group: 'Кнопки', height: 140, lang: 'en',
    jsx: `
function App() {
  return <div className="pv"><J.StoreButtons /></div>;
}`,
  },

  Card: {
    group: 'Поверхности', height: 430, lang: 'en',
    css: `.money { width: 460px; padding: 32px 16px; text-align: center; }
.money p { max-width: 500px; margin: 0 auto 30px; padding: 0 8px; color: var(--color-secondary); }
.white-note { width: 260px; padding: 24px; }`,
    jsx: `
function App() {
  return (
    <div className="pv pv-row" style={{ alignItems: 'stretch' }}>
      <J.Card className="money">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><J.Icon name="smile" /></div>
        <div className="text-big" style={{ marginBottom: 24, padding: '0 8px', color: 'var(--ink)' }}>Money Back Guarantee</div>
        <p className="text-b"><b>We will refund</b> your money if you use <b>less than 10%</b> of your data or did not activate your eSIM during a six-month period</p>
        <J.Button icon="apple" block style={{ maxWidth: 300, margin: '0 auto' }}>Download app</J.Button>
      </J.Card>
      <J.Card variant="white" className="white-note">
        <div className="text-big" style={{ marginBottom: 12, color: 'var(--ink)' }}>white</div>
        <div className="text-b" style={{ color: 'var(--color-secondary)' }}>Чистый белый без верхнего градиента — под изображение на всю ширину.</div>
      </J.Card>
    </div>
  );
}`,
  },

  DarkCard: {
    group: 'Поверхности', height: 250, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv pv-row" style={{ alignItems: 'stretch' }}>
      <div style={{ width: 420 }}>
        <J.DarkCard title="Your promo link" code={'https://app.justesim.com/?promocode=NX2025'} />
      </div>
      <div style={{ width: 300 }}>
        <J.DarkCard>
          <div className="text-big" style={{ marginBottom: 12 }}>150+ destinations</div>
          <div className="text-b" style={{ color: 'var(--text-on-dark-secondary)' }}>One eSIM for the whole world</div>
        </J.DarkCard>
      </div>
    </div>
  );
}`,
  },

  LogoTile: {
    group: 'Бренд', height: 190, lang: 'ru',
    css: `.dark-strip { display: flex; gap: 16px; align-items: center; padding: 24px; background: var(--surface-dark); border-radius: 24px; }
.dark-strip .pv-label { color: var(--text-on-dark-secondary); margin: 0 8px 0 0; }`,
    jsx: `
function App() {
  return (
    <div className="pv pv-row" style={{ gap: 32 }}>
      <div>
        <L>Плитка 48 · 56 и знак</L>
        <div className="pv-row"><J.LogoTile size={48} /><J.LogoTile size={56} /><J.LogoMark height={48} /></div>
      </div>
      <div>
        <L>На тёмном — белый знак, плитка surface-grey</L>
        <div className="dark-strip"><J.LogoTile size={48} tone="dark" /><J.LogoTile size={56} tone="dark" /><J.LogoMark tone="white" height={48} /></div>
      </div>
    </div>
  );
}`,
  },

  Icon: {
    group: 'Бренд', height: 760, lang: 'ru',
    css: `.ic-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 1fr)); gap: 8px; }
.ic-cell { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; height: 84px; padding: 8px; background: var(--surface); border-radius: 16px; color: var(--ink); }
.ic-cell span { color: var(--color-secondary); font-size: 12px; line-height: 16px; }`,
    jsx: `
var UI = ['apple','google-play','download','burger','chevron-down','chevron-circle','sparkles','lightbulb','plus-circle','dots','pie-chart','bell','first-aid','devices','clock','person','check-circle','copy','person-plus','smile','check','back','gear'];
var BRANDS = ['pay-apple-pay','pay-g-pay','pay-visa','pay-mastercard','social-telegram','social-tiktok','social-instagram'];
function App() {
  return (
    <div className="pv pv-col" style={{ gap: 16 }}>
      <div>
        <L>Заливные глифы прода · currentColor</L>
        <div className="ic-grid">{UI.map(function (n) { return <div key={n} className="ic-cell"><J.Icon name={n} /><span>{n}</span></div>; })}</div>
      </div>
      <div>
        <L>Платёжные системы и соцсети · свои цвета</L>
        <div className="ic-grid">{BRANDS.map(function (n) { return <div key={n} className="ic-cell"><J.Icon name={n} size={n.indexOf('social') === 0 ? 40 : 18} /><span>{n}</span></div>; })}</div>
      </div>
    </div>
  );
}`,
  },

  GradientText: {
    group: 'Бренд', height: 280, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv pv-col">
      <div className="h2" style={{ color: 'var(--ink)' }}><J.GradientText>Earn 3 €</J.GradientText><br />with each friend</div>
      <div className="text-big"><J.GradientText>NX2025</J.GradientText></div>
    </div>
  );
}`,
  },

  Badge: {
    group: 'Продукт', height: 110, lang: 'ru',
    jsx: `
function App() {
  return (
    <div className="pv pv-row" style={{ gap: 32 }}>
      <div><L>data · прод</L><J.Badge>11.2 GB</J.Badge></div>
      <div><L>gradient · гайд</L><J.Badge tone="gradient">25% с каждой покупки</J.Badge></div>
    </div>
  );
}`,
  },

  PlanChip: {
    group: 'Продукт', height: 100, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv">
      <div style={{ display: 'flex', gap: 4, width: 292 }}>
        <J.PlanChip label="∞" /><J.PlanChip label="10 GB" /><J.PlanChip label="5 GB" /><J.PlanChip icon="dots" />
      </div>
    </div>
  );
}`,
  },

  ProductCard: {
    group: 'Продукт', height: 520, lang: 'en',
    jsx: `
var ACTIVE = { country: 'Congo Democratic Republic', meta: 'Expires in 14 days', data: '11.2 GB', photo: B.cardCd };
var EXPIRED = { state: 'expired', country: 'Netherlands', meta: 'Expired May 23', photo: B.cardNl, plans: [{ label: '∞' }, { label: '10 GB' }, { label: '5 GB' }, { icon: 'dots' }] };
function App() {
  return (
    <div className="pv pv-row" style={{ alignItems: 'flex-start', gap: 32 }}>
      <div style={{ width: 340 }}><L>active</L><J.ProductCard {...ACTIVE} /></div>
      <div style={{ width: 340 }}><L>expired · чипы тарифов</L><J.ProductCard {...EXPIRED} /></div>
      <div style={{ width: 400 }}><L>ProductCardStack · композиция 1.5° / −3°</L><div style={{ paddingTop: 8 }}><J.ProductCardStack cards={[ACTIVE, EXPIRED]} /></div></div>
    </div>
  );
}`,
  },

  PurchaseWidget: {
    group: 'Продукт', height: 500, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv pv-row" style={{ alignItems: 'flex-start', gap: 32 }}>
      <div style={{ width: 370 }}><L>loading · скелетон</L><J.PurchaseWidget /></div>
      <div style={{ width: 370 }}>
        <L>loaded · SelectField, Segmented, Button L</L>
        <J.PurchaseWidget>
          <div style={{ marginBottom: 20 }}><J.SelectField label="Country or region" value="Andorra" /></div>
          <div style={{ marginBottom: 8 }}><J.Segmented label="Duration" options={[{ value: '7', label: '7 days' }, { value: '14', label: '14 days' }, { value: '30', label: '30 days' }]} /></div>
          <div style={{ marginBottom: 20 }}><J.Segmented label="Data" options={[{ value: '1', label: '1 GB' }, { value: '5', label: '5 GB' }, { value: '10', label: '10 GB' }]} /></div>
          <J.Button block>Purchase for €3.5</J.Button>
        </J.PurchaseWidget>
      </div>
    </div>
  );
}`,
  },

  SelectField: {
    group: 'Продукт', height: 150, lang: 'en',
    jsx: `
function App() {
  return <div className="pv" style={{ width: 386 }}><J.SelectField label="Country or region" value="Andorra" /></div>;
}`,
  },

  Segmented: {
    group: 'Продукт', height: 170, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv pv-col" style={{ width: 386, gap: 8 }}>
      <J.Segmented label="Duration" options={[{ value: '7', label: '7 days' }, { value: '14', label: '14 days' }, { value: '30', label: '30 days' }]} />
      <J.Segmented label="Data" defaultValue="5" options={[{ value: '1', label: '1 GB' }, { value: '5', label: '5 GB' }, { value: '10', label: '10 GB' }]} />
    </div>
  );
}`,
  },

  Header: {
    group: 'Навигация', height: 330, width: 1440, lang: 'en',
    css: `.mobile-frame { width: 390px; margin: 0 0 24px 24px; overflow: hidden; border-radius: 24px; outline: 1px solid var(--line); }`,
    jsx: `
function App() {
  return (
    <div>
      <J.Header position="static" layout="desktop" scrolled links={LINKS} language={{ current: EN, options: [RU] }} />
      <div style={{ padding: '0 24px' }}><L>До 1280 — бургер и кнопка M (390 px)</L></div>
      <div className="mobile-frame"><J.Header position="static" layout="mobile" links={LINKS} /></div>
    </div>
  );
}`,
  },

  LanguageSelect: {
    group: 'Навигация', height: 190, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv pv-row" style={{ alignItems: 'flex-start', gap: 48 }}>
      <div><L>closed</L><J.LanguageSelect current={EN} options={[RU]} /></div>
      <div><L>open</L><J.LanguageSelect current={EN} options={[RU]} open /></div>
    </div>
  );
}`,
  },

  MobileMenu: {
    group: 'Навигация', height: 680, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv">
      <div style={{ width: 390, height: 620, margin: '0 auto', borderRadius: 24, overflow: 'hidden' }}>
        <J.MobileMenu inline links={LINKS} languages={[{ code: 'ru', label: 'Русский', flag: B.flagRu }]} />
      </div>
    </div>
  );
}`,
  },

  Footer: {
    group: 'Навигация', height: 420, width: 1280, lang: 'en',
    jsx: `
var COLS = [
  { title: 'Helpful', links: [{ label: 'Frequently Asked Questions', href: '#' }, { label: 'List of Compatible Devices', href: '#' }, { label: 'How to Install and Activate eSIM?', href: '#' }] },
  { title: 'Legal', links: [{ label: 'Privacy policy', href: '#' }, { label: 'Terms of Service', href: '#' }, { label: 'Partnership Agreement', href: '#' }] },
  { title: 'For Partners', links: [{ label: 'Just eSIM Integrations', href: '#' }, { label: 'Become a partner', href: '#' }] },
];
function App() {
  return <J.Footer columns={COLS} copyright="2026 © All Rights Reserved" email="help@justesim.com" version="v2608.1.2" />;
}`,
  },

  SocialLinks: {
    group: 'Навигация', height: 150, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv">
      <J.SocialLinks links={[{ network: 'telegram', href: 'https://t.me/just_esim_RU' }, { network: 'tiktok', href: 'https://www.tiktok.com/@just_esim' }, { network: 'instagram', href: 'https://www.instagram.com/just.esim' }]} />
    </div>
  );
}`,
  },

  SectionTitle: {
    group: 'Контент', height: 390, width: 1280, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv" style={{ padding: '40px 128px' }}>
      <J.SectionTitle>One eSIM<br />The whole world</J.SectionTitle>
      <J.SectionTitle align="left">What our users say</J.SectionTitle>
    </div>
  );
}`,
  },

  Hero: {
    group: 'Контент', height: 1360, width: 1440, lang: 'en',
    jsx: `
function App() {
  return (
    <div style={{ paddingTop: 120 }}>
      <J.Hero image={B.glassHero} imageMobile={B.glassSquare}
        title={<>The ultimate<br />travel eSIM</>}
        lead="Travel smarter and avoid paying expensive data roaming fees. Install Just eSIM in minutes and start saving in more than 150 destinations!"
        aside={<J.PurchaseWidget />} />
    </div>
  );
}`,
  },

  FeatureCard: {
    group: 'Контент', height: 1240, width: 1280, lang: 'en',
    jsx: `
var ACTIVE = { country: 'Congo Democratic Republic', meta: 'Expires in 14 days', data: '11.2 GB', photo: B.cardCd };
var EXPIRED = { state: 'expired', country: 'Netherlands', meta: 'Expired May 23', photo: B.cardNl, plans: [{ label: '∞' }, { label: '10 GB' }, { label: '5 GB' }, { icon: 'dots' }] };
function App() {
  return (
    <div style={{ padding: '48px 16px' }}>
      <J.FeatureGrid>
        <J.FeatureCard image={B.bird} imagePosition="start" title={<>Purchase eSIM’s<br />in just one minute</>} description={<>Simple installation,<br />automatic activation</>}
          action={<J.Button variant="secondary" icon="lightbulb" block>Learn how to install</J.Button>} />
        <J.FeatureCard>
          <div style={{ marginBottom: 40 }}><J.ProductCardStack cards={[ACTIVE, EXPIRED]} /></div>
          <J.ListRows rows={[{ label: 'Track your expenses', icon: 'pie-chart' }, { label: 'Limit notifications', icon: 'bell' }, { label: '50MB lifesaver', hint: 'when out of data', icon: 'first-aid' }]} />
        </J.FeatureCard>
        <J.FeatureCard align="left" balance cornerIcon="devices" image={B.pizza} imageWidth={346} title="Share the internet with your family and friends" description="Use your laptop, tablet, or another device to access the internet" />
        <J.FeatureCard align="left" image={B.ball} imageWidth={297} overlap={60} title="Get the fastest customer support"
          features={[{ icon: 'clock', label: 'Available 24/7' }, { icon: 'person', label: 'Real people, no bots' }]}
          action={<J.Button icon="apple" block>Download app</J.Button>} />
      </J.FeatureGrid>
    </div>
  );
}`,
  },

  ListRows: {
    group: 'Контент', height: 280, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv">
      <J.Card variant="white" style={{ width: 460, padding: 16 }}>
        <J.ListRows rows={[{ label: 'Track your expenses', icon: 'pie-chart' }, { label: 'Limit notifications', icon: 'bell' }, { label: '50MB lifesaver', hint: 'when out of data', icon: 'first-aid' }]} />
      </J.Card>
    </div>
  );
}`,
  },

  Checklist: {
    group: 'Контент', height: 300, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv">
      <J.Checklist items={['Keep your regular SIM installed', 'Cannot be lost or stolen', 'Multiple plans on one device', 'Environmentally friendly']} />
    </div>
  );
}`,
  },

  Faq: {
    group: 'Контент', height: 640, lang: 'en',
    jsx: `
var ITEMS = [
  { question: 'How consistent will my internet connection be?', answer: 'We cooperate with local mobile operators with the widest coverage zone, meaning your internet connection will be stable since it is provided by our local partner.' },
  { question: 'What do I do when running out of data?', answer: 'You can easily prevent this problem by setting an automatic data increase. You will also receive a notification when you are approaching your data limit and need to update your data plan. When you have zero data left, you will still be able to have access to the internet, but the speed will be reduced to 32 KB/s.' },
  { question: 'Can I make phone calls using eSIM?', answer: 'Our technology only allows you to access the internet, but you can always make free calls over the internet.' },
  { question: 'How can I check whether my device supports an eSIM?', answer: <>eSIM is supported by all current devices. If you have any doubts, simply send us your mobile phone model via our <a href="#">online chat</a>, and we can check it for you.</> },
];
function App() {
  return (
    <div className="pv" style={{ maxWidth: 820 }}>
      <J.Faq items={ITEMS} defaultOpen={1} action={<J.Button href="#">See all answers</J.Button>} />
    </div>
  );
}`,
  },

  ReferralCards: {
    group: 'Контент', height: 470, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv" style={{ paddingTop: 40 }}>
      <J.ReferralCards balance="€62" code="NX2025" />
    </div>
  );
}`,
  },

  Review: {
    group: 'Контент', height: 470, lang: 'ru',
    css: `.rv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }`,
    jsx: `
function App() {
  return (
    <div className="pv rv-grid">
      <J.Review flag={B.flagRu} name="Екатерина" country="Россия"
        paragraphs={['Я организатор авторских туров и сама часто путешествую. Клиентам всегда рекомендую Just eSIM, так как это быстро и удобно, никогда не было проблем с подключением.', 'Перед вылетом выбираю страну в приложении, и интернет уже работает по прилёте.']}
        translation={{ name: 'Ekaterina', country: 'Russia', paragraphs: ['I’m a tour organizer and travel a lot myself. I always recommend Just eSIM to my clients because it’s quick, convenient, and I’ve never had any connection issues.', 'Before a flight, I just select the country in the app, and the internet is already working when I land.'] }} />
      <J.Review flag={B.flagUs} name="Daniela" country="USA"
        paragraphs={['The internet is fast and stable, no unexpected drop-offs. For me, eSIM is the most convenient format.', 'Setup is quick with no complications. I recommend Just eSIM to anyone who travels regularly.']} />
    </div>
  );
}`,
  },

  GlassStack: {
    group: 'Контент', height: 520, lang: 'en',
    jsx: `
function App() {
  return (
    <div className="pv" style={{ maxWidth: 720, margin: '0 auto' }}>
      <J.GlassStack images={[B.glassUs, B.glassIl, B.glassCg]} alts={['US', 'IL', 'CG']} />
    </div>
  );
}`,
  },

  Modal: {
    group: 'Оверлеи', height: 520, lang: 'en',
    css: `.md-body { padding: 32px 24px; }
.md-body h2 { margin: 8px 0 24px; color: var(--ink); }
.md-body .pv-label { margin-top: 0; }
.md-list { color: var(--color-primary); }`,
    jsx: `
function App() {
  return (
    <div style={{ height: 520 }}>
      <J.Modal inline>
        <div className="md-body">
          <h2 className="text-big">Devices that support eSIM</h2>
          <div className="pv-label">APPLE*</div>
          <div className="text-b md-list">iPhone 17 · iPhone 17 Pro · iPhone Air · iPhone 16 · iPhone 16e · iPhone 15 · iPhone 14 · iPhone 13 · iPad (from 7th gen)</div>
        </div>
      </J.Modal>
    </div>
  );
}`,
  },

  CookieBanner: {
    group: 'Оверлеи', height: 380, width: 1100, lang: 'en',
    jsx: `
function App() {
  return (
    <div style={{ height: 380 }}>
      <J.CookieBanner inline>
        <p>To make the site work properly, click “Accept All” or “Recommended”. You can also “Customize” in your own way.</p>
        <p>For more information about our cookies, please see <a href="#">Privacy Policy.</a></p>
      </J.CookieBanner>
    </div>
  );
}`,
  },
  Section: {
    group: 'Контент', height: 920, width: 1280, lang: 'ru',
    css: `.sx { outline: 1px dashed var(--line); border-radius: 8px; }
.gap-mark { display: flex; align-items: center; justify-content: center; height: 144px; margin: -144px auto 0; color: var(--color-secondary); font-size: 14px; }`,
    jsx: `
function App() {
  return (
    <div style={{ padding: '1px 0' }}>
      <J.Section>
        <div className="sx">
          <J.SectionTitle>eSIM vs<br />physical SIM</J.SectionTitle>
          <J.Checklist items={['Keep your regular SIM installed', 'Cannot be lost or stolen']} />
        </div>
      </J.Section>
      <div className="gap-mark">space-36 · 144 px между секциями (16vw на mobile)</div>
      <J.Section>
        <div className="sx" style={{ padding: 24, textAlign: 'center', color: 'var(--color-secondary)' }} >Колонка content · 1024 px, поля space-4</div>
      </J.Section>
    </div>
  );
}`,
  },

  Landing: {
    group: 'Страницы', height: 4000, width: 1440, lang: 'en', page: true,
    css: `.ref-lead { margin: 0 0 32px; color: var(--color-secondary); }
.ref-foot { margin: 0; color: var(--color-secondary); text-align: center; }
.money { padding: 32px 16px; text-align: center; }
@media (min-width: 1024px) { .money { padding-bottom: 32px; } }
.money p { max-width: 500px; margin: 0 auto 30px; padding: 0 8px; color: var(--color-secondary); }
.money .jes-btn { max-width: 300px; margin: 0 auto; }
.reviews { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 640px) { .reviews { gap: 16px; } }
@media (min-width: 768px) { .reviews { gap: 24px; } }
@media (min-width: 1024px) { .reviews { grid-template-columns: 1fr 1fr; } }
.stay { text-align: center; }
.stay img { display: block; width: 100%; max-width: 400px; margin: 0 auto 90px; }
.stay .jes-btn { margin: 0 auto 56px; }
@media (min-width: 768px) { .stay .jes-btn { margin-bottom: 80px; } }
@media (min-width: 1024px) { .ref-h2, .ref-lead { text-align: center; } }`,
    jsx: `
var ACTIVE = { country: 'Congo Democratic Republic', meta: 'Expires in 14 days', data: '11.2 GB', photo: B.cardCd };
var EXPIRED = { state: 'expired', country: 'Netherlands', meta: 'Expired May 23', photo: B.cardNl, plans: [{ label: '∞' }, { label: '10 GB' }, { label: '5 GB' }, { icon: 'dots' }] };
var FAQ = [
  { question: 'How consistent will my internet connection be?', answer: 'We cooperate with local mobile operators with the widest coverage zone, meaning your internet connection will be stable since it is provided by our local partner.' },
  { question: 'What do I do when running out of data?', answer: 'You can easily prevent this problem by setting an automatic data increase. You will also receive a notification when you are approaching your data limit and need to update your data plan.' },
  { question: 'Why is eSIM better than a physical SIM card from a local mobile operator?', answer: 'No need to waste your time at a phone company booth to obtain a physical SIM card.' },
  { question: 'Can I make phone calls using eSIM?', answer: 'Our technology only allows you to access the internet, but you can always make free calls over the internet.' },
  { question: 'How can I check whether my device supports an eSIM?', answer: 'eSIM is supported by all current devices. If you have any doubts, simply send us your mobile phone model via our online chat line, and we can check it for you.' },
];
var COLS = [
  { title: 'Helpful', links: [{ label: 'Frequently Asked Questions', href: '#' }, { label: 'List of Compatible Devices', href: '#' }, { label: 'How to Install and Activate eSIM?', href: '#' }] },
  { title: 'Legal', links: [{ label: 'Privacy policy', href: '#' }, { label: 'Terms of Service', href: '#' }, { label: 'Partnership Agreement', href: '#' }] },
  { title: 'For Partners', links: [{ label: 'Just eSIM Integrations', href: '#' }, { label: 'Become a partner', href: '#' }] },
];
function Widget() {
  return (
    <J.PurchaseWidget>
      <div style={{ marginBottom: 20 }}><J.SelectField label="Country or region" value="Andorra" /></div>
      <div style={{ marginBottom: 8 }}><J.Segmented label="Duration" options={[{ value: '7', label: '7 days' }, { value: '14', label: '14 days' }, { value: '30', label: '30 days' }]} /></div>
      <div style={{ marginBottom: 20 }}><J.Segmented label="Data" options={[{ value: '1', label: '1 GB' }, { value: '5', label: '5 GB' }, { value: '10', label: '10 GB' }]} /></div>
      <J.Button block>Purchase for €3.5</J.Button>
    </J.PurchaseWidget>
  );
}
function App() {
  return (
    <div>
      <J.Header links={LINKS} language={{ current: EN, options: [RU] }} cta={{ label: 'Download app', icon: 'download' }} />
      <J.Hero image={B.glassHero} imageMobile={B.glassSquare} title={<>The ultimate<br />travel eSIM</>}
        lead="Travel smarter and avoid paying expensive data roaming fees. Install Just eSIM in minutes and start saving in more than 150 destinations!"
        aside={<Widget />} />
      <J.Section>
        <J.GlassStack images={[B.glassUs, B.glassIl, B.glassCg]} alts={['US', 'IL', 'CG']} />
        <J.SectionTitle>One eSIM<br />The whole world</J.SectionTitle>
        <J.StoreButtons />
      </J.Section>
      <J.Section>
        <J.FeatureGrid>
          <J.FeatureCard image={B.bird} imagePosition="start" title={<>Purchase eSIM’s<br />in just one minute</>} description={<>Simple installation,<br />automatic activation</>}
            action={<J.Button variant="secondary" icon="lightbulb" block>Learn how to install</J.Button>} />
          <J.FeatureCard>
            <div style={{ marginBottom: 40 }}><J.ProductCardStack cards={[ACTIVE, EXPIRED]} /></div>
            <J.ListRows rows={[{ label: 'Track your expenses', icon: 'pie-chart' }, { label: 'Limit notifications', icon: 'bell' }, { label: '50MB lifesaver', hint: 'when out of data', icon: 'first-aid' }]} />
          </J.FeatureCard>
          <J.FeatureCard align="left" balance cornerIcon="devices" image={B.pizza} imageWidth={346} title="Share the internet with your family and friends" description="Use your laptop, tablet, or another device to access the internet" />
          <J.FeatureCard align="left" image={B.ball} imageWidth={297} overlap={60} title="Get the fastest customer support"
            features={[{ icon: 'clock', label: 'Available 24/7' }, { icon: 'person', label: 'Real people, no bots' }]}
            action={<J.Button icon="download" block>Download app</J.Button>} />
        </J.FeatureGrid>
      </J.Section>
      <J.Section>
        <J.SectionTitle>eSIM vs<br />physical SIM</J.SectionTitle>
        <J.Checklist items={['Keep your regular SIM installed', 'Cannot be lost or stolen', 'Multiple plans on one device', 'Environmentally friendly']} />
      </J.Section>
      <J.Section id="faq">
        <J.Faq items={FAQ} action={<J.Button href="#">See all answers</J.Button>} />
      </J.Section>
      <J.Section>
        <J.SectionTitle align="left" className="ref-h2"><J.GradientText>Earn 3 €</J.GradientText><br />with each friend</J.SectionTitle>
        <p className="text-b ref-lead">Copy <b>your unique referral</b> code and share it with your friends</p>
        <J.ReferralCards />
        <p className="text-lg ref-foot"><b>Log in</b> to your Just eSIM account and go to the <b>Get 3 €</b> section in your app</p>
      </J.Section>
      <J.Section>
        <J.Card className="money">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><J.Icon name="smile" /></div>
          <div className="text-big" style={{ marginBottom: 24, padding: '0 8px', color: 'var(--ink)' }}>Money Back Guarantee</div>
          <p className="text-b"><b>We will refund</b> your money if you use <b>less than 10%</b> of your data or did not activate your eSIM during a six-month period</p>
          <J.Button icon="download" block>Download app</J.Button>
        </J.Card>
      </J.Section>
      <J.Section>
        <J.SectionTitle>What our users say</J.SectionTitle>
        <div className="reviews">
          <J.Review flag={B.flagRu} name="Екатерина" country="Россия"
            paragraphs={['Я организатор авторских туров и сама часто путешествую. Клиентам всегда рекомендую Just eSIM, так как это быстро и удобно, никогда не было проблем с подключением.']}
            translation={{ name: 'Ekaterina', country: 'Russia', paragraphs: ['I’m a tour organizer and travel a lot myself. I always recommend Just eSIM to my clients because it’s quick, convenient, and I’ve never had any connection issues.'] }} />
          <J.Review flag={B.flagUs} name="Daniela" country="USA"
            paragraphs={['The internet is fast and stable, no unexpected drop-offs. For me, eSIM is the most convenient format.']} />
          <J.Review flag={B.flagDe} name="Maria" country="Deutschland"
            paragraphs={['Mir hat es richtig gut gefallen! Ich kann es nur empfehlen – alles ist verständlich und die Manager erklären Schritt für Schritt, was man machen muss.']}
            translation={{ name: 'Maria', country: 'Germany', paragraphs: ['I absolutely loved it! Highly recommend — everything is clear, and the managers guide you step by step through the whole process.'] }} />
          <J.Review flag={B.flagEs} name="Javier" country="España"
            paragraphs={['Descubrí la app Just eSIM hace un año y desde entonces siempre la uso. Es intuitiva, rápida y funciona sin complicaciones.']}
            translation={{ name: 'Javier', country: 'Spain', paragraphs: ['I discovered the Just eSIM app a year ago and have used it ever since. It is intuitive, fast and works without complications.'] }} />
        </div>
      </J.Section>
      <J.Section>
        <div className="stay">
          <img src={B.glassEsim} alt="JeS" />
          <div className="text-big" style={{ marginBottom: 20, color: 'var(--ink)' }}>Stay connected</div>
          <J.Button icon="download">Download app</J.Button>
          <J.SocialLinks links={[{ network: 'telegram', href: '#' }, { network: 'tiktok', href: '#' }, { network: 'instagram', href: '#' }]} />
        </div>
      </J.Section>
      <J.Footer columns={COLS} copyright="2026 © All Rights Reserved" email="help@justesim.com" version="v2608.1.2" />
    </div>
  );
}`,
  },

  Slides: {
    group: 'Страницы', height: 1330, width: 2048, lang: 'en', page: true,
    css: `.deck { display: grid; grid-template-columns: repeat(3, 640px); gap: 40px 32px; padding: 32px; }
.slot .pv-label { font-size: 20px; line-height: 28px; margin: 12px 0 0; }
.frame { width: 640px; height: 360px; overflow: hidden; border-radius: 12px; box-shadow: 0 0 0 1px var(--line); }
.s { position: relative; width: 1920px; height: 1080px; transform: scale(.3333333); transform-origin: 0 0; background: var(--color-main); color: var(--color-primary); overflow: hidden; }
.s-logo { position: absolute; left: 96px; top: 80px; }
.s-num { position: absolute; right: 96px; bottom: 80px; color: var(--text-caption); }
.s-ink { color: var(--ink); }
.s-sec { color: var(--color-secondary); }
.s-cap { color: var(--text-caption); }
.s-abs { position: absolute; }
.s-cards { position: absolute; left: 96px; right: 96px; top: 400px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.s-card { padding: 48px; }
.s-card .jes-icon { margin-bottom: 40px; }
.s-nums { position: absolute; left: 96px; right: 96px; top: 330px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.s-list { position: absolute; left: 96px; top: 330px; width: 1144px; }
.s-row { display: flex; align-items: center; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--line); }
.s-row:last-child { border-bottom: 0; }
.s-table { position: absolute; left: 96px; right: 96px; top: 330px; padding: 48px; }
.s-table table { width: 100%; border-collapse: collapse; }
.s-table th { padding: 0 0 24px; text-align: left; font-weight: 500; }
.s-table td { padding: 24px 0; border-top: 1px solid var(--line); }
.s-product { position: absolute; left: 96px; top: 210px; width: 400px; transform: scale(1.6); transform-origin: 0 0; }
.s-lines { position: absolute; left: 1056px; top: 330px; width: 768px; }
.s-line { display: flex; align-items: center; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--line); color: var(--ink); }
.s-line:last-child { border-bottom: 0; }
.s-store { position: absolute; left: 96px; top: 640px; display: flex; gap: 16px; }`,
    jsx: `
function Slide(props) {
  return (
    <div className="slot">
      <div className="frame"><div className="s">{props.children}{props.n && <div className="slide-caption s-num">{props.n}</div>}</div></div>
      <L>{props.label}</L>
    </div>
  );
}
var ACTIVE = { country: 'Congo Democratic Republic', meta: 'Expires in 14 days', data: '11.2 GB', photo: B.cardCd };
var EXPIRED = { state: 'expired', country: 'Netherlands', meta: 'Expired May 23', photo: B.cardNl, plans: [{ label: '∞' }, { label: '10 GB' }, { label: '5 GB' }, { icon: 'dots' }] };
function App() {
  return (
    <div className="deck">
      <Slide label="1 · Обложка — display, фирменный объект, дата и автор">
        <div className="s-logo"><J.LogoTile /></div>
        <div className="slide-display s-ink s-abs" style={{ left: 96, top: 330, width: 1000 }}>One eSIM<br />The whole world</div>
        <img className="s-abs" src={B.glassHero} alt="" style={{ right: 40, top: 150, width: 820 }} />
        <div className="slide-caption s-cap s-abs" style={{ left: 96, bottom: 80 }}>October 2026 · JeS design team</div>
      </Slide>
      <Slide label="2 · Разделитель — номер раздела и display" n="2">
        <div className="slide-caption s-cap s-abs" style={{ left: 96, top: 380 }}>01</div>
        <div className="slide-display s-ink s-abs" style={{ left: 96, top: 430 }}>Product</div>
      </Slide>
      <Slide label="3 · Тезис — title, lead .6 до 8 колонок, ключевые слова ink" n="3">
        <div className="slide-title s-ink s-abs" style={{ left: 96, top: 80 }}>The ultimate travel eSIM</div>
        <div className="slide-lead s-sec s-abs" style={{ left: 96, top: 250, width: 1144 }}>Travel smarter and avoid paying expensive data roaming fees. Install Just eSIM in minutes and start saving in <b>more than 150 destinations</b>.</div>
      </Slide>
      <Slide label="4 · Карточки — 2–4 белые карточки: иконка 32, card-title, body .6" n="4">
        <div className="slide-title s-ink s-abs" style={{ left: 96, top: 80 }}>Why travellers choose us</div>
        <div className="s-cards">
          <J.Card className="s-card"><J.Icon name="smile" size={32} /><div className="slide-card-title s-ink" style={{ marginBottom: 24 }}>Money Back Guarantee</div><div className="slide-body s-sec">We refund your money if you use less than 10% of your data</div></J.Card>
          <J.Card className="s-card"><J.Icon name="person" size={32} /><div className="slide-card-title s-ink" style={{ marginBottom: 24 }}>Real people, no bots</div><div className="slide-body s-sec">The fastest customer support, available 24/7</div></J.Card>
          <J.Card className="s-card"><J.Icon name="devices" size={32} /><div className="slide-card-title s-ink" style={{ marginBottom: 24 }}>Share the internet</div><div className="slide-body s-sec">Use your laptop, tablet or another device</div></J.Card>
        </div>
      </Slide>
      <Slide label="5 · Цифры — 1–3 number и caption .6" n="5">
        <div className="slide-title s-ink s-abs" style={{ left: 96, top: 80 }}>Just eSIM in numbers</div>
        <div className="s-nums">
          <div><div className="slide-number s-ink">150+</div><div className="slide-caption s-sec">destinations</div></div>
          <div><div className="slide-number s-ink">24/7</div><div className="slide-caption s-sec">support by real people</div></div>
          <div><div className="slide-number s-ink">1 min</div><div className="slide-caption s-sec">to purchase an eSIM</div></div>
        </div>
      </Slide>
      <Slide label="6 · Список — строки body, заливная иконка 32, разделители line" n="6">
        <div className="slide-title s-ink s-abs" style={{ left: 96, top: 80 }}>eSIM vs physical SIM</div>
        <div className="s-list">
          {['Keep your regular SIM installed', 'Cannot be lost or stolen', 'Multiple plans on one device', 'Environmentally friendly'].map(function (t) {
            return <div key={t} className="s-row slide-body"><J.Icon name="check-circle" size={32} className="s-ink" /><span>{t}</span></div>;
          })}
        </div>
      </Slide>
      <Slide label="7 · Таблица — в белой карточке: заголовки caption .45, строки body" n="7">
        <div className="slide-title s-ink s-abs" style={{ left: 96, top: 80 }}>eSIM or a local SIM card</div>
        <J.Card className="s-table">
          <table>
            <thead><tr className="slide-caption s-cap"><th></th><th>Just eSIM</th><th>Physical SIM</th></tr></thead>
            <tbody className="slide-body">
              <tr><td className="s-ink">Where to get it</td><td>In the app, in 1 min</td><td>Operator booth</td></tr>
              <tr><td className="s-ink">Your regular SIM</td><td>Stays installed</td><td>Has to be removed</td></tr>
              <tr><td className="s-ink">Plans on one device</td><td>Multiple</td><td>One</td></tr>
            </tbody>
          </table>
        </J.Card>
      </Slide>
      <Slide label="8 · Продукт — карточки продукта и 1–3 строки текста" n="8">
        <div className="s-product"><J.ProductCardStack cards={[ACTIVE, EXPIRED]} /></div>
        <div className="s-lines slide-body">
          <div className="s-line"><J.Icon name="pie-chart" size={32} /><span>Track your expenses</span></div>
          <div className="s-line"><J.Icon name="bell" size={32} /><span>Limit notifications</span></div>
          <div className="s-line"><J.Icon name="first-aid" size={32} /><span>50MB lifesaver when out of data</span></div>
        </div>
      </Slide>
      <Slide label="9 · Финал — title и XL-кнопки или контакты">
        <div className="s-logo"><J.LogoTile /></div>
        <div className="slide-title s-ink s-abs" style={{ left: 96, top: 420 }}>Stay connected</div>
        <div className="s-store"><J.Button size="xl" icon="apple">App Store</J.Button><J.Button size="xl" icon="google-play">Google Play</J.Button></div>
        <div className="slide-body s-sec s-abs" style={{ left: 96, bottom: 80 }}>help@justesim.com · t.me/just_esim_RU</div>
      </Slide>
    </div>
  );
}`,
  },

};

export { COMMON, BASE_CSS };
