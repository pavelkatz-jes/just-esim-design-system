// Сборка дизайн-системы Just eSIM: npm run build
// 1. tokens/tokens.json → tokens/tokens.css (@font-face, CSS-переменные, классы стилей текста)
// 2. components/src → components/bundle.js (window.JeS; React 18 берётся из window.React)
// 3. components/src → components/index.d.ts (типы) — если установлен typescript
// 4. scripts/previews.mjs + scripts/cover.html → components/<Имя>/preview.html
// 5. витрина index.html
// 6. блок CSS-токенов в design.md (между маркерами tokens-css)
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { previews, COMMON, BASE_CSS } from './previews.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const p = (...a) => path.join(ROOT, ...a);
const read = (f) => fs.readFileSync(p(f), 'utf8');
const write = (f, s) => { fs.mkdirSync(path.dirname(p(f)), { recursive: true }); fs.writeFileSync(p(f), s); };

// Порядок компонентов в каталоге (заголовок bundle.js и витрина)
const COMPONENTS = [
  'LogoTile', 'Icon', 'GradientText', 'Button', 'StoreButtons', 'Card', 'DarkCard',
  'ProductCard', 'Badge', 'PlanChip', 'PurchaseWidget', 'SelectField', 'Segmented',
  'Header', 'LanguageSelect', 'MobileMenu', 'Footer', 'SocialLinks',
  'Section', 'SectionTitle', 'Hero', 'FeatureCard', 'ListRows', 'Checklist', 'Faq',
  'ReferralCards', 'Review', 'GlassStack', 'Modal', 'CookieBanner',
];
const PAGES = ['Landing', 'Slides'];
// Ссылки на .md в витрине ведут на GitHub: там Markdown читается, а GitHub Pages отдаёт его сырым текстом
const PKG = JSON.parse(read('package.json'));
const BLOB = PKG.repository.url.replace(/\.git$/, '') + '/blob/main/';

/* ---------------------------------------------------------------- 1. tokens.css */
const tokens = JSON.parse(read('tokens/tokens.json'));
const esc = (n) => n.replace(/\./g, '\\.');
const val = (v) => {
  if (typeof v === 'object') v = v[tokens.color.themes[0].id];
  const m = /^\{(.+)\}$/.exec(v);
  return m ? `var(--${esc(m[1])})` : v;
};
const EXTRA = Object.keys(tokens).filter((k) => !['name', 'version', 'color', 'type', 'spacing', 'radius', 'shadow'].includes(k));

// Подзаголовки в :root — перед первым токеном группы
const COLOR_GROUPS = {
  'color-main': 'фон и поверхности',
  'ink': 'текст',
  'solid-primary-on-main': 'сплошные эквиваленты текста (слайды, печать)',
  'line': 'линии, обводки, подложки, оверлеи',
  'grad-pink': 'акценты',
  'color-aqua': 'служебные (прод)',
  'chart-1': 'графики',
};
const FAMILY_LABELS = {
  shadow: 'тени', spacing: 'отступы', radius: 'радиусы', gradient: 'градиенты', motion: 'движение',
  opacity: 'прозрачность состояний', tilt: 'наклоны «предметов»', layout: 'раскладка', size: 'размеры',
};

function rootBlock() {
  const out = [];
  const head = (label) => { if (out.length) out.push(''); out.push(`  /* ${label} */`); };
  const add = (t) => out.push(`  --${esc(t.name)}: ${val(t.value)};`);
  for (const t of tokens.color.tokens) { if (COLOR_GROUPS[t.name]) head(COLOR_GROUPS[t.name]); add(t); }
  for (const fam of ['shadow', 'spacing', 'radius', ...EXTRA]) { head(FAMILY_LABELS[fam] || fam); tokens[fam].tokens.forEach(add); }
  head('шрифты');
  for (const [k, v] of Object.entries(tokens.type.families)) out.push(`  --font-${k}: ${v};`);
  return out;
}

function tokensCss(fontBase) {
  const out = ['/* Just eSIM — tokens.css. Собирается из tokens/tokens.json командой npm run build, руками не править. */', ''];
  for (const f of tokens.type.fonts) {
    const src = [...(f.local || []).map((n) => `local("${n}")`), `url("${fontBase}${path.basename(f.file)}") format("woff2")`].join(', ');
    out.push('@font-face {', `  font-family: "${f.family}";`, `  src: ${src};`,
      `  font-weight: ${f.weight};`, `  font-style: ${f.style || 'normal'};`, '  font-display: swap;', '}', '');
  }
  out.push(':root {', ...rootBlock(), '}');
  for (const g of tokens.type.groups) {
    out.push('', `/* стили текста — ${g.name} */`);
    for (const s of g.styles) {
      const props = [`font-family: var(--font-${s.family || g.family})`, `font-size: ${s.fontSize}`, `line-height: ${s.lineHeight}`, `font-weight: ${s.fontWeight}`];
      if (s.letterSpacing !== undefined) props.push(`letter-spacing: ${s.letterSpacing}`);
      out.push(`.${esc(s.name)} { ${props.join('; ')}; }`);
    }
  }
  return out.join('\n') + '\n';
}
write('tokens/tokens.css', tokensCss('../fonts/'));

/* ---------------------------------------------------------------- 2. bundle.js */
const reactGlobal = {
  name: 'react-global',
  setup(b) {
    b.onResolve({ filter: /^react$/ }, () => ({ path: 'react', namespace: 'g' }));
    b.onLoad({ filter: /.*/, namespace: 'g' }, () => ({ contents: 'module.exports = window.React;', loader: 'js' }));
  },
};
const entry = `import * as C from ${JSON.stringify(p('components/src/index.tsx'))};\n(window as any).JeS = Object.assign((window as any).JeS || {}, C);\n`;
const built = await esbuild.build({
  stdin: { contents: entry, loader: 'tsx', resolveDir: p('components/src') },
  bundle: true, format: 'iife', minify: true, write: false, target: ['es2019'],
  jsx: 'transform', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment',
  plugins: [reactGlobal], define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'none',
});
let js = new TextDecoder().decode(built.outputFiles[0].contents);
js = '/* @ds-bundle: ' + JSON.stringify({ format: 4, namespace: 'JeS', components: COMPONENTS.map((name) => ({ name })) }) + ' */\n' + js;
if (/<\/script/i.test(js) || js.includes('<!--')) throw new Error('bundle.js содержит </script или <!--');
write('components/bundle.js', js);

/* ---------------------------------------------------------------- 3. index.d.ts */
let ts = null;
try { ts = (await import('typescript')).default; } catch { /* нет typescript — пропускаем */ }
let typesNote = 'index.d.ts не пересобран (нет typescript — выполните npm install)';
if (ts) {
  const program = ts.createProgram([p('components/src/index.tsx')], {
    target: ts.ScriptTarget.ES2019, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.React, strict: true, declaration: true, emitDeclarationOnly: true, skipLibCheck: true, outDir: p('.types'),
  });
  const diags = ts.getPreEmitDiagnostics(program);
  if (diags.length) {
    console.error(ts.formatDiagnostics(diags, { getCanonicalFileName: (f) => f, getCurrentDirectory: () => ROOT, getNewLine: () => '\n' }));
    throw new Error('Ошибки типов в components/src');
  }
  const out = {};
  program.emit(undefined, (name, text) => { out[path.basename(name)] = text; });
  let dts = out['index.d.ts']
    .replace(/export declare function (\w+)\(\{[^)]*\}: (\w+)\)/g, 'export declare function $1(props: $2)')
    .replace(/React\.JSX\.Element/g, 'React.ReactElement');
  const names = [...dts.matchAll(/^export declare function (\w+)\(/gm)].map((m) => m[1]);
  dts = '/* Just eSIM — компоненты window.JeS (React 18). Документация типов; стили — components/bundle.css, значения — tokens/tokens.css. Собирается npm run build. */\n'
    + dts.trimEnd() + '\n\ndeclare global {\n  interface Window {\n    JeS: {\n' + names.map((n) => `      ${n}: typeof ${n};`).join('\n') + '\n    };\n  }\n}\n';
  write('components/index.d.ts', dts);
  typesNote = `index.d.ts (${names.length} компонентов)`;
}

/* ---------------------------------------------------------------- 4. previews */
const HEAD = [
  '<link rel="stylesheet" href="../../tokens/tokens.css">',
  '<link rel="stylesheet" href="../bundle.css">',
  '<script src="../lib/react.production.min.js"></script>',
  '<script src="../lib/react-dom.production.min.js"></script>',
  '<script src="../bundle.js"></script>',
].join('\n');

const markers = {};
for (const [name, pv] of Object.entries(previews)) {
  const src = COMMON + '\n' + pv.jsx + '\nReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));\n';
  const code = esbuild.transformSync(src, { loader: 'jsx', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment', target: 'es2019' }).code;
  const attrs = [`group="${pv.group}"`, `height=${pv.height}`];
  if (pv.width) attrs.push(`width=${pv.width}`);
  if (pv.page) attrs.push('page');
  markers[name] = { group: pv.group, height: pv.height, width: pv.width, page: !!pv.page };
  write(`components/${name}/preview.html`, `<!-- @dsCard ${attrs.join(' ')} -->
<!doctype html>
<html lang="${pv.lang || 'en'}" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${name} — Just eSIM</title>
${HEAD}
<style>${BASE_CSS}${pv.css ? pv.css + '\n' : ''}</style>
</head>
<body>
<div id="root"></div>
<script>
${code}</script>
</body>
</html>
`);
}
const cover = read('scripts/cover.html').replace('<head>', '<head>\n' + HEAD).replace('<html lang="ru">', '<html lang="ru" data-theme="light">');
write('components/Cover/preview.html', cover);
markers.Cover = { group: 'Обложка', height: 288, width: 960 };

/* ---------------------------------------------------------------- 5. index.html */
const color = tokens.color.tokens.filter((t) => !/^\{/.test(typeof t.value === 'string' ? t.value : ''));
const swatches = color.map((t) => `<div class="sw"><div class="chip" style="background:var(--${esc(t.name)})"></div><code>${t.name}</code><span>${val(t.value)}</span></div>`).join('\n');
const typeRows = tokens.type.groups.flatMap((g) => g.styles.map((s) => `<div class="ty"><div class="ty-meta"><code>${s.name}</code><span>${s.fontSize} / ${s.lineHeight}</span></div><div class="${esc(s.name)} ty-sample">${(s.sample || 'Just eSIM').replace(/</g, '&lt;')}</div></div>`)).join('\n');
const groups = {};
for (const name of [...COMPONENTS, ...PAGES]) {
  const m = markers[name];
  if (!m) continue;
  (groups[m.group] ||= []).push(name);
}
const cards = Object.entries(groups).map(([g, names]) => `<h3>${g}</h3>\n` + names.map((n) => {
  const m = markers[n];
  return `<section class="card" id="${n}"><div class="card-head"><b>${n}</b><span><a href="${BLOB}components/${n}/README.md">README</a> · <a href="components/${n}/preview.html">открыть отдельно</a></span></div>` +
    `<div class="frame" data-w="${m.width || 0}" data-h="${m.height}"><iframe src="components/${n}/preview.html" loading="lazy" title="${n}"></iframe></div></section>`;
}).join('\n')).join('\n');

write('index.html', `<!doctype html>
<html lang="ru" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Just eSIM — дизайн-система</title>
<link rel="stylesheet" href="tokens/tokens.css">
<style>
  body { margin: 0; background: var(--color-main); color: var(--color-primary); font-family: var(--font-primary); font-weight: 500; letter-spacing: -0.16px; -webkit-font-smoothing: antialiased; }
  main { max-width: 1120px; margin: 0 auto; padding: 48px 24px 96px; }
  a { color: var(--ink); }
  code { font-family: var(--font-mono); font-size: 13px; letter-spacing: 0; }
  h1 { margin: 0 0 16px; color: var(--ink); font-size: 80px; font-weight: 500; line-height: 92%; letter-spacing: -0.03em; }
  h2 { margin: 72px 0 24px; color: var(--ink); font-size: 32px; font-weight: 500; line-height: 105%; }
  h3 { margin: 40px 0 16px; color: var(--color-secondary); font-size: 18px; font-weight: 500; }
  .lead { max-width: 720px; margin: 0 0 24px; color: var(--color-secondary); font-size: 22px; line-height: 120%; }
  .links { display: flex; flex-wrap: wrap; gap: 8px 24px; font-size: 18px; }
  .cover { margin: 40px 0 0; border-radius: 24px; overflow: hidden; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px; }
  .sw { display: flex; flex-direction: column; gap: 4px; padding: 8px 8px 12px; background: var(--surface); border-radius: 16px; font-size: 12px; color: var(--color-secondary); }
  .sw .chip { height: 56px; border-radius: 10px; box-shadow: inset 0 0 0 1px var(--line); margin-bottom: 4px; }
  .sw code { color: var(--ink); }
  .ty { display: grid; grid-template-columns: 180px 1fr; gap: 24px; align-items: baseline; padding: 16px 0; border-bottom: 1px solid var(--line); }
  .ty-meta { display: flex; flex-direction: column; gap: 2px; color: var(--color-secondary); font-size: 13px; }
  .ty-meta code { color: var(--ink); }
  .ty-sample { color: var(--ink); overflow-wrap: anywhere; }
  .card { margin: 0 0 24px; background: var(--surface); border-radius: 24px; box-shadow: var(--shadow-white); overflow: hidden; }
  .card-head { display: flex; justify-content: space-between; gap: 16px; padding: 14px 20px; border-bottom: 1px solid var(--line); font-size: 16px; }
  .card-head span { color: var(--color-secondary); font-size: 14px; }
  .frame { position: relative; overflow: hidden; background: var(--color-main); }
  .frame iframe { display: block; border: 0; transform-origin: 0 0; }
  @media (max-width: 640px) { h1 { font-size: 48px; } .ty { grid-template-columns: 1fr; gap: 8px; } }
</style>
</head>
<body>
<main>
  <h1>Just eSIM —<br>дизайн-система</h1>
  <p class="lead">Токены, компоненты и правила бренда. Описание целиком — в design.md, правила по разделам — в docs/.</p>
  <div class="links"><a href="${BLOB}design.md">design.md</a><a href="${BLOB}docs/brand-book.md">Брендбук</a><a href="${BLOB}docs/web.md">Веб</a><a href="${BLOB}docs/presentations.md">Презентации</a><a href="tokens/tokens.css">tokens.css</a><a href="${PKG.repository.url.replace(/\.git$/, '')}">GitHub</a></div>
  <div class="cover frame" data-w="960" data-h="288"><iframe src="components/Cover/preview.html" title="Обложка"></iframe></div>
  <h2>Цвета</h2>
  <div class="grid">
${swatches}
  </div>
  <h2>Типографика</h2>
${typeRows}
  <h2>Компоненты</h2>
${cards}
</main>
<script>
  // Превью шире колонки уменьшаются целиком: ширина макета задана в первой строке preview.html (@dsCard).
  function fit() {
    document.querySelectorAll('.frame').forEach(function (f) {
      var ifr = f.querySelector('iframe'), w = +f.dataset.w, h = +f.dataset.h, box = f.clientWidth;
      var lw = w || box, k = Math.min(1, box / lw);
      ifr.style.width = lw + 'px'; ifr.style.height = h + 'px'; ifr.style.transform = 'scale(' + k + ')';
      f.style.height = Math.round(h * k) + 'px';
    });
  }
  window.addEventListener('resize', fit); fit();
  document.querySelectorAll('.frame iframe').forEach(function (ifr) {
    ifr.addEventListener('load', function () {
      try {
        var d = ifr.contentDocument, f = ifr.parentElement, need = d.documentElement.scrollHeight;
        if (need > +f.dataset.h) { f.dataset.h = need; fit(); }
      } catch (e) {}
    });
  });
</script>
</body>
</html>
`);

/* ---------------------------------------------------------------- 6. design.md */
const START = '<!-- tokens-css:start -->', END = '<!-- tokens-css:end -->';
let mdNote = 'design.md: маркеры tokens-css не найдены';
if (fs.existsSync(p('design.md'))) {
  const md = read('design.md');
  const a = md.indexOf(START), b = md.indexOf(END);
  if (a >= 0 && b > a) {
    const css = tokensCss('fonts/').replace(/^\/\*.*\*\/\n\n/, '').trimEnd();
    write('design.md', md.slice(0, a + START.length) + '\n```css\n' + css + '\n```\n' + md.slice(b));
    mdNote = 'блок токенов в design.md';
  }
}

console.log(`Готово: tokens.css, bundle.js (${js.length} байт), ${typesNote}, ${Object.keys(previews).length + 1} превью, index.html, ${mdNote}`);
