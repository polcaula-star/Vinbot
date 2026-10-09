const dashboardUrl = 'https://start.vinbot.app/';
const supportedLocales = ['es', 'ca', 'en', 'fr'];
const routeLocale = window.location.pathname.split('/').filter(Boolean)[0] || '';
const queryLocale = new URLSearchParams(window.location.search).get('lang');
let storedLocale = 'es';
try {
  storedLocale = window.localStorage.getItem('vinbot-locale') || 'es';
} catch {}
const requestedLocale = supportedLocales.includes(queryLocale) ? queryLocale : routeLocale === 'es' ? 'es' : supportedLocales.includes(routeLocale) ? routeLocale : storedLocale;
const activeLocale = supportedLocales.includes(requestedLocale) ? requestedLocale : 'es';
let uiStrings = {};
let activeSection = '#inicio';
const localeLoadErrors = {
  es: 'No se pudo cargar el contenido en español. Recarga la página para intentarlo de nuevo.',
  ca: 'No s’ha pogut carregar el contingut en català. Torna a carregar la pàgina per provar-ho de nou.',
  en: 'The English content could not be loaded. Reload the page to try again.',
  fr: 'Le contenu en français n’a pas pu être chargé. Rechargez la page pour réessayer.'
};

function pathForLocale(locale) {
  const hash = window.location.hash || activeSection;
  const path = locale === 'es' ? '/' : `/${locale}`;
  return `${path}?lang=${locale}${hash || ''}`;
}

function setLink(element, url) {
  if (element && url) element.href = url;
}

function setText(element, value) {
  if (element) element.textContent = typeof value === 'string' ? value : '';
}

function setButtonLabel(element, label) {
  if (element?.firstChild) element.firstChild.textContent = typeof label === 'string' ? `${label} ` : '';
}

function renderHeroTitle(title) {
  const heading = document.querySelector('#hero-title');
  if (!heading) return;
  if (typeof title !== 'string' || !title) {
    heading.textContent = '';
    return;
  }
  const breakAt = title.indexOf('. ');
  if (breakAt < 0) {
    heading.textContent = title;
    return;
  }
  const accent = document.createElement('span');
  accent.textContent = title.slice(breakAt + 2);
  heading.replaceChildren(document.createTextNode(title.slice(0, breakAt + 1)), document.createElement('br'), accent);
}

const featureVisualFallbacks = new WeakMap();

function renderBenefits(items) {
  const grid = document.querySelector('#benefit-grid');
  if (!grid) return;

  grid.replaceChildren(...(Array.isArray(items) ? items : []).map((item, index) => {
    const article = document.createElement('article');
    article.className = 'benefit-item';
    const icon = document.createElement('span');
    icon.className = `benefit-icon ${['', 'icon-turquoise', 'icon-coral', 'icon-lime'][index % 4]}`;
    const iconGlyph = document.createElement('i');
    iconGlyph.setAttribute('data-lucide', item.icon || 'circle');
    icon.append(iconGlyph);
    const title = document.createElement('h3');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    article.append(icon, title, description);
    return article;
  }));
}

function renderQuickFeatures(items) {
  const grid = document.querySelector('#feature-mini-grid');
  if (!grid) return;

  grid.replaceChildren(...(Array.isArray(items) ? items : []).map(item => {
    const link = document.createElement('a');
    link.className = 'feature-mini-card';
    link.href = '#funciones';
    const badge = document.createElement('span');
    badge.className = 'mini-badge';
    badge.textContent = item.tag || 'VINBOT';
    const title = document.createElement('h3');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    const arrow = document.createElement('span');
    arrow.className = 'mini-arrow';
    const arrowIcon = document.createElement('i');
    arrowIcon.setAttribute('data-lucide', 'arrow-right');
    arrowIcon.setAttribute('aria-hidden', 'true');
    arrow.append(arrowIcon);
    link.append(badge, title, description, arrow);
    return link;
  }));
  window.lucide?.createIcons();
}

function renderFeatureStory(story = {}) {
  setText(document.querySelector('#feature-story-eyebrow'), story.eyebrow);
  setText(document.querySelector('#feature-story-title'), story.title);
  setText(document.querySelector('#feature-story-intro'), story.intro);
}

function renderEcosystemSection(section = {}) {
  setText(document.querySelector('#ecosystem-eyebrow'), section.eyebrow);
  setText(document.querySelector('#ecosystem-title'), section.title);
  setText(document.querySelector('#ecosystem-description'), section.description);
  const diagram = document.querySelector('#ecosystem-diagram');
  const nodes = document.querySelector('#ecosystem-nodes');
  if (diagram) diagram.setAttribute('aria-label', typeof section.diagram_label === 'string' ? section.diagram_label : '');
  if (!nodes) return;

  nodes.replaceChildren(...(Array.isArray(section.nodes) ? section.nodes : []).map((item, index) => {
    const node = document.createElement('div');
    node.className = `ecosystem-node ecosystem-node-${index + 1}`;
    const iconWrap = document.createElement('span');
    iconWrap.className = 'ecosystem-node-icon';
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', item.icon);
    icon.setAttribute('aria-hidden', 'true');
    iconWrap.append(icon);
    const label = document.createElement('span');
    label.className = 'ecosystem-node-label';
    label.textContent = item.label;
    node.append(iconWrap, label);
    return node;
  }));
  window.lucide?.createIcons();
}

function renderFeatureCatalog(items = []) {
  const grid = document.querySelector('#feature-catalog-grid');
  if (!grid) return;

  grid.replaceChildren(...(Array.isArray(items) ? items : []).map((item, index) => {
    const link = document.createElement('a');
    link.className = 'feature-catalog-card';
    link.href = item.href || '#funciones';
    const counter = document.createElement('span');
    counter.className = 'feature-counter';
    counter.textContent = `0${index + 1}`;
    const tag = document.createElement('span');
    tag.className = 'catalog-tag';
    tag.textContent = item.tag || 'VINBOT';
    const title = document.createElement('h3');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    const arrow = document.createElement('span');
    arrow.className = 'catalog-arrow';
    const arrowIcon = document.createElement('i');
    arrowIcon.setAttribute('data-lucide', 'arrow-right');
    arrowIcon.setAttribute('aria-hidden', 'true');
    arrow.append(arrowIcon);
    link.append(counter, tag, title, description, arrow);
    return link;
  }));
  window.lucide?.createIcons();
}

function renderFeatureBlocks(items = [], catalogItems = [], exploreLabel = '') {
  const container = document.querySelector('#feature-detail-stack');
  if (!container) return;

  container.replaceChildren(...(Array.isArray(items) ? items : []).map((item, index) => {
    const catalogItem = Array.isArray(catalogItems) ? catalogItems[index] || {} : {};
    const article = document.createElement('article');
    const isReverse = item.side === 'right';
    article.className = `feature-detail ${isReverse ? 'feature-detail--reverse' : ''}`.trim();
    article.id = item.id || `feature-detail-${index}`;

    const copy = document.createElement('div');
    copy.className = 'feature-detail-copy';
    const kicker = document.createElement('div');
    kicker.className = 'feature-detail-kicker';
    const counter = document.createElement('span');
    counter.className = 'feature-counter';
    counter.textContent = String(index + 1).padStart(2, '0');
    const tag = document.createElement('span');
    tag.className = 'feature-detail-tag';
    tag.textContent = catalogItem.tag || '';
    kicker.append(counter, tag);
    const title = document.createElement('h3');
    title.textContent = catalogItem.title || '';
    const text = document.createElement('p');
    text.className = 'feature-detail-summary';
    text.textContent = catalogItem.description || '';
    const cta = document.createElement('a');
    cta.className = 'feature-detail-cta';
    cta.href = 'https://start.vinbot.app/';
    cta.append(document.createTextNode(exploreLabel || ''));
    const ctaIcon = document.createElement('i');
    ctaIcon.setAttribute('data-lucide', 'arrow-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    cta.append(ctaIcon);
    copy.append(kicker, title, text, cta);

    const media = document.createElement('div');
    media.className = 'feature-detail-media';
    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.image_alt || catalogItem.title || '';
      media.append(img);
    }

    article.append(copy, media);
    return article;
  }));
  window.lucide?.createIcons();
  const cards = [...container.children];
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach(card => card.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .14 });
  cards.forEach(card => observer.observe(card));
}

function renderAudience(audience = {}) {
  setText(document.querySelector('#audience-eyebrow'), audience.eyebrow);
  setText(document.querySelector('#audience-title'), audience.title);
  setText(document.querySelector('#audience-description'), audience.description);
  const grid = document.querySelector('#audience-grid');
  if (!grid) return;
  grid.replaceChildren(...(Array.isArray(audience.cards) ? audience.cards : []).map((card, index) => {
    const article = document.createElement('article');
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    const title = document.createElement('h3');
    title.textContent = card.title;
    const description = document.createElement('p');
    description.textContent = card.description;
    article.append(number, title, description);
    return article;
  }));
}

function renderFeatures(items) {
  const grid = document.querySelector('#feature-grid');
  if (!grid || !Array.isArray(items)) return;

  for (const [index, item] of items.entries()) {
    const card = grid.children[index];
    if (!card) continue;
    card.querySelector('.feature-index').textContent = `${String(index + 1).padStart(2, '0')} / ${item.category || 'VINBOT'}`;
    const title = card.querySelector('.feature-copy h3');
    const description = card.querySelector('.feature-copy > p:not(.feature-lead)');
    title.textContent = item.title;
    description.textContent = item.description;
    const visual = card.querySelector('.feature-visual');
    if (!featureVisualFallbacks.has(visual)) featureVisualFallbacks.set(visual, visual.innerHTML);
    const currentImage = visual.querySelector('.cms-feature-image');
    if (item.image) {
      const image = currentImage || document.createElement('img');
      image.className = 'cms-feature-image';
      image.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:contain';
      const sizeVisualToImage = () => {
        if (image.naturalWidth && image.naturalHeight) visual.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
      };
      image.addEventListener('load', sizeVisualToImage, { once: true });
      image.src = item.image;
      image.alt = item.image_alt || item.title;
      if (image.complete) sizeVisualToImage();
      if (!currentImage) visual.append(image);
    } else if (currentImage) visual.innerHTML = featureVisualFallbacks.get(visual);
  }
}

function renderSteps(items) {
  const grid = document.querySelector('#steps-grid');
  if (!grid) return;

  grid.replaceChildren(...(Array.isArray(items) ? items : []).map((item, index) => {
    const article = document.createElement('article');
    article.className = 'step-item';
    const number = document.createElement('span');
    number.className = 'step-number';
    number.textContent = String(index + 1).padStart(2, '0');
    const icon = document.createElement('span');
    icon.className = `step-icon step-icon-${index + 1}`;
    const glyph = document.createElement('i');
    glyph.setAttribute('data-lucide', item.icon || 'circle');
    glyph.setAttribute('aria-hidden', 'true');
    icon.append(glyph);
    const title = document.createElement('h3');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    article.append(number, icon, title, description);
    return article;
  }));
}

function renderDashboard(copy = {}) {
  const elements = {
    'dashboard-kicker': copy.kicker,
    'dashboard-title': copy.title,
    'dashboard-active-items': copy.active_items,
    'dashboard-catalog': copy.catalog,
    'dashboard-organized': copy.organized,
    'dashboard-activity': copy.activity,
    'dashboard-view-all': copy.view_all,
    'dashboard-draft': copy.draft,
    'dashboard-ready': copy.ready,
    'dashboard-review': copy.review,
    'dashboard-renewal': copy.renewal,
    'dashboard-upcoming': copy.upcoming,
    'dashboard-scheduled': copy.scheduled,
    'dashboard-conversation': copy.conversation,
    'dashboard-tracking': copy.tracking,
    'dashboard-uptodate': copy.uptodate,
    'dashboard-note-title': copy.note_title,
    'dashboard-note-body': copy.note_body,
    'dashboard-caption': copy.caption,
  };
  for (const [id, value] of Object.entries(elements)) setText(document.getElementById(id), value);
}

function renderFaq(items) {
  const list = document.querySelector('#faq-list');
  if (!list) return;

  list.replaceChildren(...(Array.isArray(items) ? items : []).map(item => {
    const details = document.createElement('details');
    details.className = 'faq-item';
    const summary = document.createElement('summary');
    summary.append(document.createTextNode(item.question));
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', 'plus');
    icon.setAttribute('aria-hidden', 'true');
    summary.append(icon);
    const answer = document.createElement('p');
    answer.textContent = item.answer;
    details.append(summary, answer);
    return details;
  }));
}

const languageNames = { es: 'Español', ca: 'Català', en: 'English', fr: 'Français' };

function renderLanguageSwitchers(label) {
  document.querySelectorAll('[data-language-switcher]').forEach(switcher => {
    const trigger = switcher.querySelector('.language-trigger');
    const activeName = switcher.querySelector('[data-language-current-name]');
    const activeFlag = switcher.querySelector('[data-language-current-flag]');
    if (trigger && label) trigger.setAttribute('aria-label', label);
    if (activeName) activeName.textContent = languageNames[activeLocale];
    if (activeFlag) activeFlag.src = `/assets/flags/${activeLocale}.svg`;
    switcher.querySelectorAll('.language-option').forEach(option => {
      const selected = option.dataset.locale === activeLocale;
      option.setAttribute('aria-checked', String(selected));
      option.classList.toggle('is-active', selected);
    });
  });
}

function renderTestimonials(content, locale) {
  const section = document.querySelector('#opinions-content');
  if (!section) return;

  const fallback = content.testimonials_fallback || {};
  const testimonials = Array.isArray(content.testimonials)
    ? content.testimonials.filter(item => item?.approved === true && item.locale === locale
      && [item.quote, item.author, item.role, item.date].every(value => typeof value === 'string' && value.trim()))
      .slice(0, 10)
    : [];
  section.replaceChildren();

  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow opinions-eyebrow';
  const heading = document.createElement('h2');
  heading.id = 'opinions-title';
  const description = document.createElement('p');
  description.className = 'opinions-description';

  if (testimonials.length >= 3) {
    eyebrow.textContent = fallback.testimonials_eyebrow;
    heading.textContent = fallback.testimonials_title;
    description.textContent = fallback.testimonials_description;
    const grid = document.createElement('div');
    grid.className = 'testimonials-grid';
    grid.setAttribute('aria-label', heading.textContent);
    grid.replaceChildren(...testimonials.map(item => {
      const card = document.createElement('article');
      card.className = 'testimonial-card';
      const quoteMark = document.createElement('span');
      quoteMark.className = 'testimonial-quote-mark';
      quoteMark.setAttribute('aria-hidden', 'true');
      quoteMark.textContent = '“';
      const quote = document.createElement('blockquote');
      quote.textContent = item.quote;
      const author = document.createElement('p');
      author.className = 'testimonial-author';
      author.textContent = item.author;
      const role = document.createElement('p');
      role.className = 'testimonial-role';
      role.textContent = item.role;
      const date = document.createElement('time');
      date.className = 'testimonial-date';
      date.textContent = item.date;
      card.append(quoteMark, quote, author, role, date);
      return card;
    }));
    section.append(eyebrow, heading, description, grid);
  } else {
    eyebrow.textContent = fallback.eyebrow;
    heading.textContent = fallback.title;
    description.textContent = fallback.description;
    const points = document.createElement('ul');
    points.className = 'opinions-points';
    points.replaceChildren(...(fallback.points || []).map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    section.append(eyebrow, heading, description, points);
  }
}

function renderHighlights(items) {
  const strip = document.querySelector('#capabilities-strip');
  if (!strip || !Array.isArray(items)) return;

  strip.replaceChildren(...items.flatMap((item, index) => {
    const label = document.createElement('span');
    label.textContent = item;
    if (index === items.length - 1) return [label];
    const separator = document.createElement('i');
    separator.setAttribute('aria-hidden', 'true');
    return [label, separator];
  }));
}

async function loadLandingContent() {
  try {
    const contentPath = activeLocale === 'es' ? '/content/landing.json' : `/locales/${activeLocale}.json`;
    const response = await fetch(contentPath, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`No se pudo cargar ${contentPath}.`);
    const content = await response.json();
    uiStrings = content.ui || {};
    const header = content.header || {};
    const featureCatalogue = content.featureCatalogue || {};
    const ecosystemSection = content.ecosystem_section || {};
    const hero = content.hero || {};
    const dashboard = content.dashboard || {};
    const benefits = content.benefit_section || {};
    const audience = content.audience || {};
    const how = content.how_section || {};
    const featuresSection = content.features_section || {};
    const featureStory = content.feature_story || {};
    const quickCatalogItems = content.feature_catalog || [];
    const featureBlocks = content.feature_blocks || [];
    const closing = content.closing || {};
    const footer = content.footer || {};
    const faq = content.faq_section || {};

    document.documentElement.lang = activeLocale;
    document.title = content.seo?.title || 'Vinbot';
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.seo?.description || '');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', content.seo?.title || 'Vinbot');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', content.seo?.description || '');
    document.querySelector('#main-navigation')?.setAttribute('aria-label', uiStrings.navigation);
    document.querySelector('#brand-home')?.setAttribute('aria-label', uiStrings.brand_home);
    document.querySelector('#footer-product-nav')?.setAttribute('aria-label', footer.product_heading);
    document.querySelector('#footer-access-nav')?.setAttribute('aria-label', footer.access_heading);
    document.querySelector('#footer-language-nav')?.setAttribute('aria-label', footer.language_heading);
    document.querySelector('#footer-legal-nav')?.setAttribute('aria-label', footer.legal_heading);
    document.querySelector('#locale-error').hidden = true;
    renderLanguageSwitchers(uiStrings.language_switch);
    document.querySelector('#hero-visual')?.setAttribute('aria-label', uiStrings.hero_visual);
    setText(document.querySelector('#scroll-cue-text'), uiStrings.scroll_cue);
    renderHeroTitle(hero.title);
    setText(document.querySelector('#hero-eyebrow'), hero.eyebrow);
    setText(document.querySelector('#hero-description'), hero.description);
    setText(document.querySelector('.hero-note span'), hero.note);
    setText(document.querySelector('.main-nav a[href="#como-funciona"]'), header.workflow_label);
    setText(document.querySelector('.main-nav a[href="#funciones"]'), header.features_label);
    setText(document.querySelector('#header-guide'), header.guide_label);
    setLink(document.querySelector('#header-guide'), `/guia?lang=${activeLocale}`);
    setText(document.querySelector('.main-nav a[href="#preguntas"]'), header.faq_label);
    setButtonLabel(document.querySelector('.header-login'), header.login_label);
    setLink(document.querySelector('.header-login'), dashboardUrl);
    setButtonLabel(document.querySelector('#header-access'), hero.primary_label);
    setLink(document.querySelector('#header-access'), dashboardUrl);
    setText(document.querySelector('#catalog-eyebrow'), featureCatalogue.eyebrow);
    setText(document.querySelector('#catalog-title'), featureCatalogue.title);
    setText(document.querySelector('#catalog-description'), featureCatalogue.description);
    renderEcosystemSection(ecosystemSection);
    setText(document.querySelector('.benefits-heading .eyebrow'), benefits.eyebrow);
    setText(document.querySelector('.benefits-heading h2'), benefits.title);
    setText(document.querySelector('.benefits-heading .section-intro'), benefits.description);
    setText(document.querySelector('.how-section .workflow-top .eyebrow'), how.eyebrow);
    setText(document.querySelector('.how-section .workflow-top h2'), how.title);
    setText(document.querySelector('.how-section .workflow-top .section-intro'), how.description);
    renderFeatureStory(featureStory);
    setText(document.querySelector('.features-section .workflow-top .eyebrow'), featuresSection.eyebrow);
    setText(document.querySelector('.features-section .workflow-top h2'), featuresSection.title);
    setText(document.querySelector('.features-section .workflow-top .section-intro'), featuresSection.description);
    renderFeatureCatalog(quickCatalogItems);
    renderFeatureBlocks(featureBlocks, quickCatalogItems, uiStrings.feature_explore);
    renderAudience(audience);
    setText(document.querySelector('#closing-eyebrow'), closing.eyebrow);
    setText(document.querySelector('#closing-title'), closing.title);
    setText(document.querySelector('#closing-description'), closing.description);
    setText(document.querySelector('#faq-eyebrow'), faq.eyebrow);
    setText(document.querySelector('#faq-title'), faq.title);
    setText(document.querySelector('#faq-description'), faq.description);
    setButtonLabel(document.querySelector('#faq-contact'), faq.contact_label);
    setLink(document.querySelector('#faq-contact'), dashboardUrl);
    setButtonLabel(document.querySelector('#hero-primary'), hero.primary_label);
    setButtonLabel(document.querySelector('#hero-secondary'), hero.secondary_label);
    setButtonLabel(document.querySelector('#closing-primary'), closing.primary_label);
    setText(document.querySelector('#closing-secondary'), closing.secondary_text);
    setLink(document.querySelector('#hero-primary'), dashboardUrl);
    setLink(document.querySelector('#hero-secondary'), hero.secondary_url || '#como-funciona');
    setLink(document.querySelector('#closing-primary'), dashboardUrl);
    setText(document.querySelector('.footer-copy'), footer.tagline);
    setText(document.querySelector('#footer-product-heading'), footer.product_heading);
    setText(document.querySelector('#footer-access-heading'), footer.access_heading);
    setText(document.querySelector('#footer-language-heading'), footer.language_heading);
    setText(document.querySelector('#footer-legal-heading'), footer.legal_heading);
    setButtonLabel(document.querySelector('#footer-privacy'), footer.privacy_label);
    setButtonLabel(document.querySelector('#footer-terms'), footer.terms_label);
    setButtonLabel(document.querySelector('#footer-contact'), footer.contact_label);
    setButtonLabel(document.querySelector('#footer-benefits'), footer.benefits_label);
    setLink(document.querySelector('#footer-benefits'), '#beneficios');
    setButtonLabel(document.querySelector('#footer-how'), footer.how_label);
    setLink(document.querySelector('#footer-how'), '#como-funciona');
    setButtonLabel(document.querySelector('#footer-guide'), footer.guide_label);
    setLink(document.querySelector('#footer-guide'), `/guia?lang=${activeLocale}`);
    setButtonLabel(document.querySelector('#footer-features'), footer.features_label);
    setLink(document.querySelector('#footer-features'), '#funciones');
    setButtonLabel(document.querySelector('#footer-audience'), footer.audience_label);
    setLink(document.querySelector('#footer-audience'), '#para-quien');
    setButtonLabel(document.querySelector('#footer-login'), footer.login_label);
    setLink(document.querySelector('#footer-login'), dashboardUrl);
    setButtonLabel(document.querySelector('#footer-faq'), footer.faq_label);
    setLink(document.querySelector('#footer-faq'), '#preguntas');
    setButtonLabel(document.querySelector('#footer-request'), footer.request_label);
    setLink(document.querySelector('#footer-request'), dashboardUrl);
    setText(document.querySelector('.footer-notice'), footer.notice);
    renderDashboard(dashboard);
    renderBenefits(content.benefits);
    renderQuickFeatures(content.quick_features || content.features);
    renderFeatures(content.features);
    renderSteps(content.steps);
    renderFaq(content.faq);
    renderTestimonials(content, activeLocale);
    window.lucide?.createIcons();
    document.querySelector('#menu-toggle')?.setAttribute('aria-label', uiStrings.menu_open || 'Open menu');
    try {
      window.localStorage.setItem('vinbot-locale', activeLocale);
    } catch {}
    const canonicalPath = pathForLocale(activeLocale);
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== canonicalPath) {
      window.history.replaceState({}, '', canonicalPath);
    }
    document.documentElement.classList.remove('i18n-loading');
  } catch (error) {
    console.error('No se pudo cargar el contenido de Vinbot.', error);
    const errorMessage = document.querySelector('#locale-error');
    if (errorMessage) {
      errorMessage.textContent = localeLoadErrors[activeLocale];
      errorMessage.hidden = false;
    }
    document.body.classList.add('locale-load-error');
    document.documentElement.classList.remove('i18n-loading');
  }
}

const menuToggle = document.querySelector('.menu-toggle');
function setMenuOpen(open) {
  if (!menuToggle) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? uiStrings.menu_close : uiStrings.menu_open);
  const icon = document.createElement('i');
  icon.setAttribute('data-lucide', open ? 'x' : 'menu');
  icon.setAttribute('aria-hidden', 'true');
  menuToggle.replaceChildren(icon);
  window.lucide?.createIcons();
  document.querySelector('.main-nav')?.classList.toggle('is-open', open);
}

menuToggle?.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

document.querySelectorAll('[data-language-switcher]').forEach(switcher => {
  const trigger = switcher.querySelector('.language-trigger');
  const options = switcher.querySelector('.language-options');
  trigger?.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') !== 'true';
    trigger.setAttribute('aria-expanded', String(open));
    if (options) options.hidden = !open;
  });
  switcher.querySelectorAll('.language-option').forEach(option => option.addEventListener('click', () => {
    window.location.assign(pathForLocale(option.dataset.locale));
  }));
  switcher.addEventListener('keydown', event => {
    if (!trigger || !options) return;
    if (event.key === 'Escape') {
      options.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
      return;
    }
    const menuOptions = [...switcher.querySelectorAll('.language-option')];
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) || !menuOptions.length) return;
    event.preventDefault();
    options.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    const currentIndex = menuOptions.indexOf(document.activeElement);
    const nextIndex = event.key === 'Home' ? 0
      : event.key === 'End' ? menuOptions.length - 1
        : currentIndex < 0 ? (event.key === 'ArrowDown' ? 0 : menuOptions.length - 1)
          : (currentIndex + (event.key === 'ArrowDown' ? 1 : menuOptions.length - 1)) % menuOptions.length;
    menuOptions[nextIndex].focus();
  });
});

document.addEventListener('click', event => {
  document.querySelectorAll('[data-language-switcher]').forEach(switcher => {
    if (switcher.contains(event.target)) return;
    const trigger = switcher.querySelector('.language-trigger');
    const options = switcher.querySelector('.language-options');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (options) options.hidden = true;
  });
});

if ('IntersectionObserver' in window) {
  const sections = ['#beneficios', '#funciones', '#como-funciona', '#para-quien', '#preguntas', '#opiniones', '#acceso']
    .map(selector => document.querySelector(selector))
    .filter(Boolean);
  const activeObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      activeSection = `#${entry.target.id}`;
      const activeLink = document.querySelector(`.nav-links a[href="${activeSection}"]`);
      document.querySelectorAll('.nav-links a').forEach(link => {
        if (link === activeLink) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-14% 0px -68% 0px', threshold: 0 });
  sections.forEach(section => activeObserver.observe(section));

  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.benefits-section, .features-section .workflow-top, .feature-card, .how-section, .audience-section, .closing-section, .faq-section').forEach(section => {
    section.classList.add('reveal-on-scroll');
    revealObserver.observe(section);
  });
}

window.lucide?.createIcons();
loadLandingContent();