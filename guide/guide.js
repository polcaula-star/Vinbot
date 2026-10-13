const supportedLocales = ['es', 'ca', 'en', 'fr'];
const languageNames = { es: 'Español', ca: 'Català', en: 'English', fr: 'Français' };
const params = new URLSearchParams(window.location.search);
const requestedLocale = params.get('lang');
const locale = supportedLocales.includes(requestedLocale) ? requestedLocale : 'es';
const routeSlug = window.location.pathname.replace(new RegExp("^/(?:guia|guide)/?"), "").split("/")[0];
const slug = params.get("category") || routeSlug;
// Query-based links work even on static hosts without a /guia/:slug rewrite.
const guideUrl = category => `/guide/?${category ? `category=${encodeURIComponent(category)}&` : ""}lang=${locale}`;
const page = document.querySelector('#guide-app');

function isCompleteTranslation(article, localeCode) {
  const copy = article.locales?.[localeCode];
  return article.status === 'published'
    && typeof copy?.title === 'string' && copy.title.trim()
    && typeof copy?.summary === 'string' && copy.summary.trim()
    && typeof copy?.introduction === 'string' && copy.introduction.trim()
    && Array.isArray(copy.steps) && copy.steps.length > 0
    && copy.steps.every(step => typeof step.title === 'string' && step.title.trim()
      && typeof step.body === 'string' && step.body.trim());
}

function make(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function text(copy, key) {
  return copy[key] || '';
}

function screenshotButton(image, copy) {
  const button = make('button', 'article-screenshot-button');
  button.type = 'button';
  button.dataset.guideScreenshot = '';
  button.setAttribute('aria-label', `${text(copy, 'zoom_screenshot')}: ${image.alt}`);
  const img = document.createElement('img');
  img.src = image.src;
  img.alt = image.alt;
  img.loading = 'lazy';
  button.append(img);
  return button;
}

function createVideoSlot(article, title, copy) {
  const slot = make('section', 'article-video-slot');
  slot.append(make('h2', '', text(copy, 'video_heading')));
  if (article.video_url) {
    let videoUrl;
    try {
      const parsedUrl = new URL(article.video_url);
      if (parsedUrl.protocol !== 'https:' || !['www.youtube-nocookie.com', 'www.youtube.com', 'player.vimeo.com'].includes(parsedUrl.hostname)) {
        throw new Error('Unsupported video host');
      }
      videoUrl = parsedUrl.href;
    } catch (error) {
      console.error('Vinbot guide video URL must use a supported HTTPS video host.', error);
    }
    if (videoUrl) {
      const frame = document.createElement('iframe');
      frame.src = videoUrl;
      frame.title = `${text(copy, 'video_heading')}: ${title}`;
      frame.loading = 'lazy';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      slot.append(frame);
      return slot;
    }
  }
  slot.append(make('p', '', text(copy, 'video_upcoming')));
  return slot;
}

function wireScreenshotDialog() {
  const dialog = document.querySelector('#guide-screenshot-dialog');
  const image = dialog?.querySelector('img');
  if (!dialog || !image) return;
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-guide-screenshot]');
    if (!trigger) return;
    const source = trigger.querySelector('img');
    if (!source) return;
    image.src = source.src;
    image.alt = source.alt;
    dialog.showModal();
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}

function categoryFor(guide, article) {
  return guide.categories.find(category => category.id === article.category);
}

function articleLink(article, copy) {
  const link = document.createElement('a');
  link.className = 'guide-article-card';
  link.href = guideUrl(article.slug);
  const category = categoryFor(window.guideData, article);
  const categoryName = category?.locales?.[locale]?.title || '';
  const label = make('span', 'card-category', categoryName);
  if (category?.icon) {
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', category.icon);
    icon.setAttribute('aria-hidden', 'true');
    label.prepend(icon);
  }
  const title = make('h3', '', article.locales[locale].title);
  const summary = make('p', '', article.locales[locale].summary);
  const arrow = document.createElement('i');
  arrow.className = 'card-arrow';
  arrow.setAttribute('data-lucide', 'arrow-right');
  arrow.setAttribute('aria-hidden', 'true');
  link.append(label, title, summary, arrow);
  return link;
}

function renderHeaderAndFooter(copy, home) {
  document.documentElement.lang = locale;
  document.title = home?.page_title || '';
  document.querySelector('meta[name="description"]')?.setAttribute('content', home?.description || '');
  document.querySelectorAll('[data-copy]').forEach(element => {
    const value = copy[element.dataset.copy];
    element.textContent = typeof value === 'string' ? value : '';
  });
  const brand = document.querySelector('.guide-brand');
  if (brand) brand.href = `/?lang=${locale}`;
  const footerHome = document.querySelector('.guide-footer a');
  if (footerHome) footerHome.href = `/?lang=${locale}`;
  const access = document.querySelector('.access-button');
  if (access) access.href = 'https://start.vinbot.app/';
  const trigger = document.querySelector('.language-trigger');
  if (trigger) trigger.setAttribute('aria-label', copy.language_switch);
  const screenshotClose = document.querySelector('.guide-screenshot-close');
  if (screenshotClose) {
    screenshotClose.textContent = text(copy, 'close_screenshot');
    screenshotClose.setAttribute('aria-label', text(copy, 'close_screenshot'));
  }
  document.querySelector('.guide-screenshot-dialog')?.setAttribute('aria-label', text(copy, 'zoom_screenshot'));
  document.querySelector('[data-current-language]').textContent = languageNames[locale];
  document.querySelector('[data-current-flag]').src = `/assets/flags/${locale}.svg`;
  document.querySelectorAll('.language-menu [data-locale]').forEach(option => {
    const selected = option.dataset.locale === locale;
    option.setAttribute('aria-checked', String(selected));
    option.classList.toggle('is-active', selected);
  });
}

function renderGuideHome(guide, copy) {
  page.replaceChildren();
  const intro = make('header', 'guide-intro');
  intro.append(make('p', 'guide-eyebrow', guide.home[locale].eyebrow));
  intro.append(make('h1', '', guide.home[locale].title));
  intro.append(make('p', '', guide.home[locale].description));

  const grid = make('section', 'guide-category-grid');
  grid.setAttribute('aria-label', text(copy, 'category_heading'));
  guide.categories.forEach((category, index) => {
    const categoryCopy = category.locales[locale];
    const link = document.createElement('a');
    link.className = 'guide-category-card';
    link.href = guideUrl(category.id);
    const number = make('span', 'guide-category-number', String(index + 1).padStart(2, '0'));
    const iconWrap = make('span', 'guide-category-icon');
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', category.icon);
    icon.setAttribute('aria-hidden', 'true');
    iconWrap.append(icon);
    const categoryText = make('span', 'guide-category-copy');
    categoryText.append(make('span', 'guide-category-title', categoryCopy.title));
    categoryText.append(make('span', 'guide-category-description', categoryCopy.description));
    const arrow = document.createElement('i');
    arrow.className = 'guide-category-arrow';
    arrow.setAttribute('data-lucide', 'arrow-up-right');
    arrow.setAttribute('aria-hidden', 'true');
    link.append(number, iconWrap, categoryText, arrow);
    grid.append(link);
  });
  page.append(intro, grid);
  window.lucide?.createIcons();
}

function renderGuideCategory(guide, category, copy) {
  page.replaceChildren();
  const categoryCopy = category.locales[locale];
  document.title = `${categoryCopy.title} | ${copy.guide_label}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', categoryCopy.description);
  const wrapper = make('section', 'guide-category-page');
  const breadcrumb = make('nav', 'breadcrumbs');
  breadcrumb.setAttribute('aria-label', copy.breadcrumb_guide);
  const homeLink = make('a', '', copy.breadcrumb_guide);
  homeLink.href = guideUrl('');
  const separator = document.createElement('i');
  separator.setAttribute('data-lucide', 'chevron-right');
  separator.setAttribute('aria-hidden', 'true');
  breadcrumb.append(homeLink, separator, make('span', '', categoryCopy.title));

  const heading = make('header', 'guide-category-heading');
  const backLink = make('a', 'guide-back-link', copy.back_label);
  backLink.href = guideUrl('');
  heading.append(backLink, make('h1', '', categoryCopy.title), make('p', '', categoryCopy.description));

  const published = guide.articles.filter(article => article.category === category.id && isCompleteTranslation(article, locale));
  wrapper.append(breadcrumb, heading);
  if (published.length) {
    const articleList = make('div', 'guide-article-list');
    published.forEach(article => articleList.append(articleLink(article, copy)));
    wrapper.append(articleList);
  } else {
    const empty = make('div', 'guide-preparing');
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', 'notebook-pen');
    icon.setAttribute('aria-hidden', 'true');
    empty.append(icon, make('h2', '', text(copy, 'empty_category')));
    wrapper.append(empty);
  }
  page.append(wrapper);
  window.lucide?.createIcons();
}

function renderNotFound(copy) {
  page.replaceChildren();
  document.title = `${copy.not_found_title} | ${copy.guide_label}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', copy.not_found_text);
  const section = make('section', 'not-found');
  section.append(make('h1', '', text(copy, 'not_found_title')));
  section.append(make('p', '', text(copy, 'not_found_text')));
  const link = make('a', '', text(copy, 'back_label'));
  link.href = guideUrl('');
  section.append(link);
  page.append(section);
}

function renderArticle(guide, article, copy) {
  const articleCopy = article.locales[locale];
  const category = categoryFor(guide, article);
  const categoryCopy = category.locales[locale];
  page.replaceChildren();
  document.title = `${articleCopy.title} | ${copy.guide_label}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', articleCopy.summary);
  const wrapper = make('article', 'article-page');

  const crumbs = make('nav', 'breadcrumbs');
  crumbs.setAttribute('aria-label', copy.breadcrumb_guide);
  const guideCrumb = make('a', '', copy.breadcrumb_guide);
  guideCrumb.href = guideUrl('');
  const separatorOne = document.createElement('i');
  separatorOne.setAttribute('data-lucide', 'chevron-right');
  separatorOne.setAttribute('aria-hidden', 'true');
  const categoryCrumb = make('a', '', categoryCopy.title);
  categoryCrumb.href = guideUrl(category.id);
  const separatorTwo = document.createElement('i');
  separatorTwo.setAttribute('data-lucide', 'chevron-right');
  separatorTwo.setAttribute('aria-hidden', 'true');
  const currentCrumb = make('span', '', articleCopy.title);
  crumbs.append(guideCrumb, separatorOne, categoryCrumb, separatorTwo, currentCrumb);

  const header = make('header', 'article-header');
  header.append(make('p', 'article-category', categoryCopy.title));
  header.append(make('h1', '', articleCopy.title));
  header.append(make('p', 'article-summary', articleCopy.summary));
  if (article.date) {
    const updated = make('p', 'article-updated', `${copy.updated_label}: ${article.date}`);
    header.append(updated);
  }
  if (article.reading_time_minutes) {
    header.append(make('p', 'article-reading-time', `${article.reading_time_minutes} ${copy.reading_time_suffix}`));
  }

  const columns = make('div', 'article-columns');
  const toc = make('nav', 'article-toc');
  toc.setAttribute('aria-label', copy.toc_heading);
  toc.append(make('h2', '', copy.toc_heading));
  const tocList = document.createElement('ol');
  const introductionItem = document.createElement('li');
  const introductionLink = make('a', '', copy.introduction_heading);
  introductionLink.href = '#guide-introduction';
  introductionItem.append(introductionLink);
  tocList.append(introductionItem);
  const body = make('div', 'article-body');
  const introduction = make('p', '', articleCopy.introduction);
  introduction.id = 'guide-introduction';
  body.append(introduction);
  const screenshots = [...(articleCopy.screenshots || [])];
  const localizedImage = article.image_by_locale?.[locale];
  if (localizedImage && articleCopy.image_alt) screenshots.unshift({ src: localizedImage, alt: articleCopy.image_alt });
  screenshots.filter(image => image?.src && image?.alt).forEach(image => {
    const figure = make('figure', 'article-figure');
    figure.append(screenshotButton(image, copy));
    if (image.caption) figure.append(make('figcaption', '', image.caption));
    body.append(figure);
  });
  articleCopy.steps.forEach((step, index) => {
    const id = `guide-step-${index + 1}`;
    const tocItem = document.createElement('li');
    const tocLink = make('a', '', step.title);
    tocLink.href = `#${id}`;
    tocItem.append(tocLink);
    tocList.append(tocItem);
    const section = make('section', 'article-step');
    section.id = id;
    section.append(make('h2', '', `${index + 1}. ${step.title}`));
    section.append(make('p', '', step.body));
    if (step.screenshot?.src && step.screenshot?.alt) {
      section.append(screenshotButton(step.screenshot, copy));
    }
    body.append(section);
  });
  if (articleCopy.tip?.text) {
    const tip = make('aside', 'article-callout article-tip');
    tip.append(make('h2', '', articleCopy.tip.title || copy.tip_heading));
    tip.append(make('p', '', articleCopy.tip.text));
    body.append(tip);
  }
  if (articleCopy.notice?.text) {
    const notice = make('aside', 'article-callout article-notice');
    notice.append(make('h2', '', articleCopy.notice.title || copy.notice_heading));
    notice.append(make('p', '', articleCopy.notice.text));
    body.append(notice);
  }
  body.append(createVideoSlot(article, articleCopy.title, copy));
  toc.append(tocList);
  columns.append(toc, body);

  const cta = make('section', 'guide-cta');
  cta.append(make('h2', '', articleCopy.cta_title || copy.cta_title));
  const ctaButton = make('a', 'access-button', text(copy, 'cta_button'));
  ctaButton.href = 'https://start.vinbot.app/';
  cta.append(ctaButton);
  wrapper.append(crumbs, header, columns, cta);

  const related = (article.related || []).map(relatedSlug => guide.articles.find(item => item.slug === relatedSlug))
    .filter(item => item && isCompleteTranslation(item, locale));
  if (related.length) {
    const relatedSection = make('section', 'related-guides');
    relatedSection.append(make('h2', '', copy.related_heading));
    const relatedList = document.createElement('ul');
    related.forEach(item => {
      const li = document.createElement('li');
      const link = make('a', '', item.locales[locale].title);
      link.href = guideUrl(item.slug);
      li.append(link);
      relatedList.append(li);
    });
    relatedSection.append(relatedList);
    wrapper.append(relatedSection);
  }

  const allPublished = guide.articles.filter(item => isCompleteTranslation(item, locale));
  const articleIndex = allPublished.findIndex(item => item.slug === article.slug);
  const previous = allPublished[articleIndex - 1];
  const next = allPublished[articleIndex + 1];
  if (previous || next) {
    const navigation = make('nav', 'article-navigation');
    navigation.setAttribute('aria-label', copy.steps_heading);
    if (previous) {
      const link = make('a', 'previous-link', previous.locales[locale].title);
      link.href = guideUrl(previous.slug);
      link.prepend(make('span', '', copy.previous_label));
      navigation.append(link);
    }
    if (next) {
      const link = make('a', 'next-link', next.locales[locale].title);
      link.href = guideUrl(next.slug);
      link.append(make('span', '', copy.next_label));
      navigation.append(link);
    }
    wrapper.append(navigation);
  }
  page.append(wrapper);
  window.lucide?.createIcons();
}

function wireLanguageMenu() {
  const switcher = document.querySelector('[data-language-switcher]');
  const trigger = switcher?.querySelector('.language-trigger');
  const menu = switcher?.querySelector('.language-menu');
  trigger?.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') !== 'true';
    trigger.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  });
  switcher?.querySelectorAll('[data-locale]').forEach(option => option.addEventListener('click', () => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('lang', option.dataset.locale);
    window.location.assign(`${nextUrl.pathname}${nextUrl.search}`);
  }));
  switcher?.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu && trigger) {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
      return;
    }
    const options = [...(switcher?.querySelectorAll('[data-locale]') || [])];
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) || !options.length) return;
    event.preventDefault();
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    const currentIndex = options.indexOf(document.activeElement);
    const targetIndex = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1
      : currentIndex < 0 ? (event.key === 'ArrowDown' ? 0 : options.length - 1)
        : (currentIndex + (event.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length;
    options[targetIndex].focus();
  });
  document.addEventListener('click', event => {
    if (switcher?.contains(event.target)) return;
    if (menu) menu.hidden = true;
    trigger?.setAttribute('aria-expanded', 'false');
  });
}

async function startGuide() {
  wireLanguageMenu();
  wireScreenshotDialog();
  try {
    const response = await fetch('/content/guide.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Guide data could not be loaded');
    const guide = await response.json();
    window.guideData = guide;
    const copy = guide.interface[locale];
    const currentHome = guide.home[locale];
    renderHeaderAndFooter(copy, currentHome);
    if (!slug) {
      renderGuideHome(guide, copy);
      document.documentElement.classList.remove('i18n-loading');
      return;
    }
    const category = guide.categories.find(item => item.id === slug);
    if (category) {
      renderGuideCategory(guide, category, copy);
      document.documentElement.classList.remove('i18n-loading');
      return;
    }
    const article = guide.articles.find(item => item.slug === slug && isCompleteTranslation(item, locale));
    if (!article) {
      renderNotFound(copy);
      document.documentElement.classList.remove('i18n-loading');
      return;
    }
    renderArticle(guide, article, copy);
    document.documentElement.classList.remove('i18n-loading');
  } catch (error) {
    console.error('Vinbot guide could not be loaded.', error);
    const errorCopy = {
      es: 'No se ha podido cargar la guía. Vuelve a intentarlo más tarde.',
      ca: 'No s’ha pogut carregar la guia. Torna-ho a provar més tard.',
      en: 'The guide could not be loaded. Please try again later.',
      fr: 'Le guide n’a pas pu être chargé. Veuillez réessayer plus tard.'
    };
    page.replaceChildren(make('p', 'guide-error', errorCopy[locale]));
    document.documentElement.classList.remove('i18n-loading');
  }
}

startGuide();
