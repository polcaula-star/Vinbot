const dashboardUrl = 'https://start.vinbot.app/';
const supportedLocales = ['es', 'ca', 'en', 'fr'];
const localeNames = { es: 'Español', ca: 'Català', en: 'English', fr: 'Français' };
const routeLocale = window.location.pathname.split('/').filter(Boolean)[0] || '';
const queryLocale = new URLSearchParams(location.search).get('lang');

let storedLocale = 'es';
try {
  storedLocale = window.localStorage.getItem('vinbot-locale') || 'es';
} catch {}

const requestedLocale = supportedLocales.includes(queryLocale)
  ? queryLocale
  : (supportedLocales.includes(routeLocale) ? routeLocale : storedLocale);
const activeLocale = supportedLocales.includes(requestedLocale) ? requestedLocale : 'es';
let selectedBillingPeriod = 'monthly';
let selectedRecommendedPlan = null;

const featureProfiles = [
  { id: 'drafts', category: 'borradores-ia', image: '/assets/vinbot/screenshots/01-borradores-ia.png', icon: 'sparkles' },
  { id: 'renewals', category: 'renovacion-visibilidad', image: '/assets/vinbot/screenshots/02-renovaciones.png', icon: 'refresh-cw' },
  { id: 'likes', category: 'respuestas-likes', image: '/assets/vinbot/screenshots/03-respuestas-likes.png', icon: 'heart' },
  { id: 'negotiator', category: 'negociacion-reglas', image: '/assets/vinbot/screenshots/04-negociador.png', icon: 'handshake' },
  { id: 'strategy', category: 'estrategia-negociacion', image: '/assets/vinbot/screenshots/05-estrategia-negociacion.png', icon: 'sliders-horizontal' },
  { id: 'inventory', category: 'inventario-actividad', image: '/assets/vinbot/screenshots/06-inventario-demo.png', icon: 'package-search' },
];

const copy = {
  es: {
    title: 'Vinbot | Automatiza tus ventas en Vinted',
    description: 'Automatiza tus ventas en Vinted con Vinbot. Gestiona tus anuncios, utiliza herramientas de inteligencia artificial y ahorra tiempo.',
    skip: 'Saltar al contenido',
    navHow: 'Cómo funciona',
    navFeatures: "Funciones y guías",
    navPlans: 'Planes',
    navGuides: 'Guías',
    navFaq: 'Preguntas',
    login: 'Iniciar sesión',
    configure: "Encontrar mi plan",
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    language: 'Cambiar idioma',
    heroEyebrow: 'TU ASISTENTE PARA VINTED',
    heroTitle: 'Automatiza tu Vinted. Incluso con el ordenador apagado.',
    heroDescription: 'Vinbot trabaja por ti las 24 horas: renueva tus anuncios, negocia con compradores y automatiza tus ventas mientras tú te dedicas a lo que realmente importa.',
    heroPrimary: 'Empieza con Vinbot',
    heroSecondary: 'Descubre cómo funciona',
    mobileCta: 'Empieza con Vinbot',
    heroNote: 'Tú decides qué automatizar y mantienes el control.',
    statusActive: 'Vinbot listo para ayudarte',
    plannerEyebrow: "ENCUENTRA TU PLAN",
    plannerTitle: 'Cuéntanos cómo vendes.',
    plannerDescription: 'Responde cuatro preguntas y te recomendaremos uno de los planes de Vinbot que cubre tus necesidades.',
    plannerTrust: 'La suscripción y los cambios de plan se gestionan en tu cuenta de Vinbot.',
    plannerStarting: '¿Estás empezando a vender en Vinted?',
    startingYes: 'Sí, estoy empezando',
    startingNo: 'No, ya vendo',
    plannerVolume: '¿Cuántos artículos tienes publicados?',
    volumeStarter: 'Hasta 150',
    volumeGrowth: 'De 151 a 500',
    volumeScale: 'Más de 500',
    plannerAccounts: '¿Gestionas una sola cuenta o varias cuentas?',
    accountsNo: 'Una cuenta',
    accountsYes: 'Varias cuentas',
    plannerAutomation: '¿Qué nivel de automatización necesitas?',
    automationBasic: 'Herramientas básicas',
    automationSales: 'Automatizar mis ventas',
    automationExclusive: 'Mensajes por favoritos o promoción avanzada',
    plannerAction: 'Ver mi recomendación',
    resultEmptyLabel: 'TU CONFIGURACIÓN',
    resultEmptyTitle: 'Encuentra el plan que cubre tus necesidades.',
    resultEmptyText: 'Responde las preguntas para ver una recomendación personalizada.',
    basicVolumeNote: 'Has indicado {volume} anuncios. Básico cubre hasta 150; Pro admite anuncios ilimitados.',
    basicAutomationNote: "Si quieres el bot negociador y las herramientas avanzadas de automatización, consulta también el plan Pro.",
    pricingEyebrow: 'PLANES VINBOT',
    pricingTitle: 'El plan adecuado para cada forma de vender.',
    pricingDescription: 'Básico para organizarte, Pro para automatizar y Enterprise para vendedores profesionales.',
    pricingNote: "Los botones abren Vinbot para consultar o gestionar tu suscripción; esta web no activa cargos ni modifica planes.",
    choosePlan: "Elegir",
    morePopular: "Más popular",
    recommendedForYou: 'Recomendado para ti',
    monthlyLabel: 'Mensual',
    annualLabel: 'Anual (20 % de descuento)',
    billingPeriodLabel: 'Periodo de facturación',
    annual: '/año',
    pricePerAccount: 'Precio para una cuenta. Las cuentas adicionales se facturan por separado.',
    enterpriseAccountNote: '2 cuentas de Vinted incluidas en el precio.',
    comingSoon: 'Próximamente',
    comparisonTitle: 'Compara todas las funcionalidades',
    comparisonRegionLabel: 'Tabla comparativa de planes',
    comparisonFeature: 'Funcionalidad',
    included: 'Incluida',
    notIncluded: 'No incluida',
    vatIncluded: 'IVA incluido',
    comparisonAccountLabel: 'Enterprise incluye dos cuentas por 69,99 €/mes, IVA incluido. Puedes añadir una tercera cuenta por 29,99 €/mes. La integración del cargo adicional se realizará más adelante.',
    comparisonGroups: [
      { title: 'Cuenta y gestión', rows: [
        { label: 'Cuentas de Vinted incluidas', values: ['1', '1', '2'] },
        { label: 'Dashboard de gestión', values: [true, true, true] },
        { label: 'Sincronización y gestión del inventario', values: [true, true, true] },
        { label: 'Renovación manual', values: ['Hasta 150 artículos', 'Ilimitada', 'Ilimitada'] },
      ] },
      { title: 'Automatización y ventas', rows: [
        { label: 'Autorrenovaciones programadas', values: [false, true, true] },
        { label: 'Creación de títulos y descripciones con IA a partir de imágenes', values: [false, true, true] },
        { label: 'Bot negociador automático', values: [false, true, true] },
        { label: 'Envío y aceptación automática de ofertas', values: [false, true, true] },
        { label: 'Estadísticas de artículos', values: [false, true, true] },
      ] },
      { title: 'Funciones exclusivas y soporte', rows: [
        { label: 'Gestión multicuenta', values: [false, false, true] },
        { label: 'Tercera cuenta adicional', values: [false, false, '29,99 €/mes'] },
        { label: 'Mensajes automáticos cuando se reciben likes', values: [false, false, 'coming-soon'] },
        { label: 'Posicionamiento de anuncios', values: [false, false, 'coming-soon'] },
        { label: 'Promoción de anuncios', values: [false, false, 'coming-soon'] },
        { label: 'Soporte', values: ['Email', 'Prioritario', 'Dedicado'] },
      ] },
    ],
    pendingFeaturesNote: 'Las próximas novedades se muestran como «Próximamente» y todavía no están disponibles.',
    monthly: '/mes',
    basedOn: 'Recomendación según tus respuestas',
    resultPlanLabel: 'PLAN RECOMENDADO',
    closeScreenshot: 'Cerrar',
    howEyebrow: 'CÓMO FUNCIONA',
    howTitle: 'Configuras una vez. Vinbot mantiene el ritmo.',
    howDescription: 'No sustituye tu criterio: ejecuta el trabajo repetitivo siguiendo las reglas que tú defines.',
    stepOneTitle: 'Marca tus reglas',
    stepOneText: 'Decide qué activar, cuándo actuar y qué límites debe respetar Vinbot.',
    stepTwoTitle: 'Activa tu asistente',
    stepTwoText: 'Deja preparada tu operativa en un solo lugar y revisa cada función.',
    stepThreeTitle: 'Dedica tiempo a vender',
    stepThreeText: 'Vinbot se ocupa de las tareas repetitivas mientras tú preparas pedidos y compras.',
    guidesEyebrow: 'GUÍAS VINBOT',
    guidesTitle: 'Configura Vinbot paso a paso.',
    guidesDescription: "Explicaciones y capturas paso a paso para configurar cada función. Los videotutoriales se añadirán próximamente.",
    videoUpcoming: 'Vídeo próximamente',
    guideExpand: 'Ver explicación',
    guideWritten: 'Abrir guía escrita',
    guideSteps: 'Pasos para configurarla',
    guideTip: 'Consejo',
    guideVideo: 'Videotutorial',
    zoomScreenshot: 'Ampliar captura',
    faqEyebrow: 'PREGUNTAS FRECUENTES',
    faqTitle: 'Todo claro antes de empezar.',
    faqDescription: "Resuelve tus dudas sobre los planes, la automatización y la gestión de tu suscripción.",
    finalEyebrow: 'VINBOT ESTÁ PREPARADO CUANDO TÚ LO ESTÉS',
    finalTitle: 'Deja que Vinbot se encargue del trabajo repetitivo.',
    finalDescription: 'Accede a la aplicación, configura tus reglas y descubre qué partes de tu operativa puedes simplificar desde hoy.',
    finalAction: "Crear cuenta",
    finalSecondary: "Encontrar mi plan",
    finalNote: 'La suscripción, los pagos y los cambios de plan se gestionan directamente desde tu cuenta de Vinbot.',
    footerTagline: 'Tu asistente de automatización para Vinted.',
    footerNotice: 'Vinbot es una herramienta independiente y no está afiliada a Vinted.',
    footerProduct: 'Producto',
    footerAccess: 'Acceso',
    footerLegal: 'Legal',
    footerPrivacy: 'Privacidad',
    footerTerms: 'Términos',
    footerContact: 'Contacto',
    plans: [
      {
        id: 'basic', name: 'Básico', price: '29,99', annualPrice: '287,90',
        description: 'Para empezar a vender de forma organizada.',
        features: [
          { label: '1 cuenta de Vinted' },
          { label: 'Renovación manual de hasta 150 artículos' },
          { label: 'Sincronización y gestión del inventario' },
          { label: 'Herramientas básicas del dashboard' },
          { label: 'Soporte por correo electrónico' },
        ],
      },
      {
        id: 'pro', name: 'Pro', price: '49,99', annualPrice: '479,90',
        description: 'Automatiza tus ventas y ahorra tiempo cada día.',
        features: [
          { label: 'Todas las funciones del Básico' },
          { label: '1 cuenta de Vinted' },
          { label: 'Renovación ilimitada de artículos' },
          { label: 'Autorrenovación ilimitada y programada' },
          { label: 'Creación de anuncios con inteligencia artificial: genera títulos y descripciones a partir de imágenes' },
          { label: 'Bot negociador y gestión automática de ofertas' },
          { label: 'Panel de analíticas y soporte prioritario' },
        ],
      },
      {
        id: 'enterprise', name: 'Enterprise', price: '69,99', annualPrice: '671,90',
        description: 'Automatización avanzada para vendedores profesionales.',
        features: [
          { label: 'Todas las funcionalidades del Pro' },
          { label: '2 cuentas de Vinted incluidas, con todas las funciones del Pro en ambas' },
          { label: 'Gestión multicuenta' },
          { label: 'Posibilidad de añadir una tercera cuenta por 29,99 €/mes' },
          { label: 'Mensajes automáticos cuando se reciben likes', comingSoon: true },
          { label: 'Posicionamiento de anuncios', comingSoon: true },
          { label: 'Promoción de anuncios', comingSoon: true },
        ],
      }
    ],
    recommendation: {
      basic: { why: 'Como estás empezando y necesitas las funciones esenciales, Básico te ayuda a organizar tus primeras ventas.' },
      pro: { why: 'Pro es la opción principal para automatizar renovaciones y ofertas en una cuenta.' },
      enterprise: { why: 'Enterprise incluye dos cuentas Vinted con todas las funciones Pro en ambas, y permite añadir una tercera por 29,99 €/mes.' },
    },
    faqs: [
      [
        '¿Qué es Vinbot?',
        'Vinbot es un asistente para organizar y automatizar tareas repetitivas de tu operativa en Vinted, como preparar publicaciones, renovar anuncios, responder a likes y gestionar negociaciones según las reglas que defines.'
      ],
      [
        '¿Cómo funciona?',
        'Configuras las funciones que necesitas, defines sus reglas y activas las automatizaciones disponibles. Las guías explican cómo configurar cada función paso a paso.'
      ],
      [
        '¿Funciona aunque apague el ordenador?',
        'Sí. Una vez configuradas y activadas, las automatizaciones funcionan en la nube siguiendo tus reglas; no necesitas dejar el ordenador encendido.'
      ],
      [
        '¿Qué diferencias hay entre los tres planes?',
        'Básico incluye una cuenta y renovaciones manuales de hasta 150 artículos. Pro añade renovaciones ilimitadas, automatizaciones y creación de títulos y descripciones con IA a partir de imágenes. Enterprise incluye dos cuentas con todas las funciones Pro en ambas y permite añadir una tercera por 29,99 €/mes. Los mensajes automáticos por likes, el posicionamiento y la promoción de anuncios estarán disponibles próximamente.'
      ],
      [
        '¿Qué plan permite gestionar varias cuentas?',
        'Enterprise incluye dos cuentas Vinted y permite añadir una tercera por 29,99 €/mes. Básico y Pro incluyen una cuenta.'
      ],
      [
        '¿Cómo funciona la renovación automática?',
        'La auto-renovación está incluida en Pro. Puedes activarla y configurar su frecuencia, límite diario, cuentas y artículos desde los ajustes de Vinbot.'
      ],
      [
        '¿Cómo puedo cancelar mi suscripción?',
        'Accede a tu cuenta de Vinbot para gestionar la suscripción. Antes de confirmar una cancelación, revisa las condiciones aplicables y cuándo tendrá efecto; si necesitas ayuda, utiliza el enlace de contacto.'
      ]
    ],
  },
  ca: {
    title: 'Vinbot | Automatitza les teves vendes a Vinted',
    description: 'Automatitza les vendes a Vinted amb Vinbot. Gestiona els anuncis, utilitza eines d’intel·ligència artificial i estalvia temps.',
    skip: 'Salta al contingut',
    navHow: 'Com funciona',
    navFeatures: "Funcions i guies",
    navPlans: 'Plans',
    navGuides: 'Guies',
    navFaq: 'Preguntes',
    login: 'Inicia sessió',
    configure: "Trobar el meu pla",
    menuOpen: 'Obre el menú',
    menuClose: 'Tanca el menú',
    language: 'Canvia l’idioma',
    heroEyebrow: 'EL TEU ASSISTENT PER A VINTED',
    heroTitle: 'Automatitza el teu Vinted. Fins i tot amb l’ordinador apagat.',
    heroDescription: 'Vinbot treballa per tu les 24 hores: renova els teus anuncis, negocia amb compradors i automatitza les vendes mentre tu et dediques al que realment importa.',
    heroPrimary: 'Comença amb Vinbot',
    heroSecondary: 'Descobreix com funciona',
    mobileCta: 'Comença amb Vinbot',
    heroNote: 'Tu decideixes què automatitzar i en mantens el control.',
    statusActive: 'Vinbot està preparat per ajudar-te',
    plannerEyebrow: "TROBA EL TEU PLA",
    plannerTitle: 'Explica’ns com vens.',
    plannerDescription: 'Respon quatre preguntes i et recomanarem un dels plans de Vinbot que cobreix les teves necessitats.',
    plannerTrust: 'La subscripció i els canvis de pla es gestionen des del teu compte de Vinbot.',
    plannerStarting: 'Estàs començant a vendre a Vinted?',
    startingYes: 'Sí, estic començant',
    startingNo: 'No, ja venc',
    plannerVolume: 'Quants articles tens publicats?',
    volumeStarter: 'Fins a 150',
    volumeGrowth: 'De 151 a 500',
    volumeScale: 'Més de 500',
    plannerAccounts: 'Gestiones un sol compte o diversos comptes?',
    accountsNo: 'Un compte',
    accountsYes: 'Diversos comptes',
    plannerAutomation: 'Quin nivell d’automatització necessites?',
    automationBasic: 'Eines bàsiques',
    automationSales: 'Automatitzar les vendes',
    automationExclusive: 'Missatges per likes o promoció avançada',
    plannerAction: 'Veure la meva recomanació',
    resultEmptyLabel: 'LA TEVA CONFIGURACIÓ',
    resultEmptyTitle: 'Troba el pla que cobreix les teves necessitats.',
    resultEmptyText: 'Respon les preguntes per veure una recomanació personalitzada.',
    basicVolumeNote: 'Has indicat {volume} anuncis. Básico en cobreix fins a 150; Pro admet anuncis il·limitats.',
    basicAutomationNote: "Si vols el bot negociador i les eines avançades d’automatització, consulta també el pla Pro.",
    pricingEyebrow: 'PLANS VINBOT',
    pricingTitle: 'El pla adequat per a cada manera de vendre.',
    pricingDescription: 'Básico per organitzar-te, Pro per automatitzar i Enterprise per a venedors professionals.',
    pricingNote: "Els botons obren Vinbot per consultar o gestionar la subscripció; aquest web no activa càrrecs ni modifica plans.",
    choosePlan: "Tria",
    morePopular: "Més popular",
    recommendedForYou: 'Recomanat per a tu',
    monthlyLabel: 'Mensual',
    annualLabel: 'Anual (20 % de descompte)',
    billingPeriodLabel: 'Període de facturació',
    annual: '/any',
    pricePerAccount: 'Preu per a un compte. Els comptes addicionals es facturen per separat.',
    enterpriseAccountNote: '2 comptes de Vinted inclosos en el preu.',
    comingSoon: 'Pròximament',
    comparisonTitle: 'Compara totes les funcionalitats',
    comparisonRegionLabel: 'Taula comparativa de plans',
    comparisonFeature: 'Funcionalitat',
    included: 'Inclosa',
    notIncluded: 'No inclosa',
    vatIncluded: 'IVA inclòs',
    comparisonAccountLabel: 'Enterprise inclou dos comptes per 69,99 €/mes, IVA inclòs. Pots afegir-hi un tercer compte per 29,99 €/mes. La integració del càrrec addicional es farà més endavant.',
    comparisonGroups: [
      { title: 'Compte i gestió', rows: [
        { label: 'Comptes de Vinted inclosos', values: ['1', '1', '2'] },
        { label: 'Tauler de gestió', values: [true, true, true] },
        { label: 'Sincronització i gestió de l’inventari', values: [true, true, true] },
        { label: 'Renovació manual', values: ['Fins a 150 articles', 'Il·limitada', 'Il·limitada'] },
      ] },
      { title: 'Automatització i vendes', rows: [
        { label: 'Autorenovacions programades', values: [false, true, true] },
        { label: 'Creació de títols i descripcions amb IA a partir d’imatges', values: [false, true, true] },
        { label: 'Bot negociador automàtic', values: [false, true, true] },
        { label: 'Enviament i acceptació automàtica d’ofertes', values: [false, true, true] },
        { label: 'Estadístiques dels articles', values: [false, true, true] },
      ] },
      { title: 'Funcions exclusives i suport', rows: [
        { label: 'Gestió multicomptes', values: [false, false, true] },
        { label: 'Tercer compte addicional', values: [false, false, '29,99 €/mes'] },
        { label: 'Missatges automàtics quan es reben likes', values: [false, false, 'coming-soon'] },
        { label: 'Posicionament d’anuncis', values: [false, false, 'coming-soon'] },
        { label: 'Promoció d’anuncis', values: [false, false, 'coming-soon'] },
        { label: 'Suport', values: ['Email', 'Prioritari', 'Dedicat'] },
      ] },
    ],
    pendingFeaturesNote: 'Les properes novetats es mostren com a «Pròximament» i encara no estan disponibles.',
    monthly: '/mes',
    basedOn: 'Recomanació segons les teves respostes',
    resultPlanLabel: 'PLA RECOMANAT',
    closeScreenshot: 'Tancar',
    howEyebrow: 'COM FUNCIONA',
    howTitle: 'Configures una vegada. Vinbot manté el ritme.',
    howDescription: 'No substitueix el teu criteri: executa la feina repetitiva seguint les regles que tu defineixes.',
    stepOneTitle: 'Marca les teves regles',
    stepOneText: 'Decideix què activar, quan actuar i quins límits ha de respectar Vinbot.',
    stepTwoTitle: 'Activa el teu assistent',
    stepTwoText: 'Deixa preparada la teva operativa en un sol lloc i revisa cada funció.',
    stepThreeTitle: 'Dedica temps a vendre',
    stepThreeText: 'Vinbot s’ocupa de les tasques repetitives mentre tu prepares comandes i compres.',
    guidesEyebrow: 'GUIES VINBOT',
    guidesTitle: 'Configura Vinbot pas a pas.',
    guidesDescription: "Explicacions i captures pas a pas per configurar cada funció. Els videotutorials s’hi afegiran pròximament.",
    videoUpcoming: 'Vídeo pròximament',
    guideExpand: 'Veure explicació',
    guideWritten: 'Obrir guia escrita',
    guideSteps: 'Passos per configurar-la',
    guideTip: 'Consell',
    guideVideo: 'Videotutorial',
    zoomScreenshot: 'Ampliar captura',
    faqEyebrow: 'PREGUNTES FREQÜENTS',
    faqTitle: 'Tot clar abans de començar.',
    faqDescription: "Resol els dubtes sobre els plans, l’automatització i la gestió de la subscripció.",
    finalEyebrow: 'VINBOT ESTÀ PREPARAT QUAN TU HO ESTIGUIS',
    finalTitle: 'Deixa que Vinbot s’encarregui de la feina repetitiva.',
    finalDescription: 'Accedeix a l’aplicació, configura les teves regles i descobreix quines parts de la teva operativa pots simplificar avui mateix.',
    finalAction: "Crear un compte",
    finalSecondary: "Trobar el meu pla",
    finalNote: 'La subscripció, els pagaments i els canvis de pla es gestionen directament des del teu compte de Vinbot.',
    footerTagline: 'El teu assistent d’automatització per a Vinted.',
    footerNotice: 'Vinbot és una eina independent i no està afiliada a Vinted.',
    footerProduct: 'Producte',
    footerAccess: 'Accés',
    footerLegal: 'Legal',
    footerPrivacy: 'Privacitat',
    footerTerms: 'Termes',
    footerContact: 'Contacte',
    plans: [
      {
        id: 'basic', name: 'Básico', price: '29,99', annualPrice: '287,90',
        description: 'Per començar a vendre de manera organitzada.',
        features: [
          { label: '1 compte de Vinted' },
          { label: 'Renovació manual de fins a 150 articles' },
          { label: 'Sincronització i gestió de l’inventari' },
          { label: 'Eines bàsiques del tauler' },
          { label: 'Suport per correu electrònic' },
        ],
      },
      {
        id: 'pro', name: 'Pro', price: '49,99', annualPrice: '479,90',
        description: 'Automatitza les vendes i estalvia temps cada dia.',
        features: [
          { label: 'Totes les funcions del Básico' },
          { label: '1 compte de Vinted' },
          { label: 'Renovació il·limitada d’articles' },
          { label: 'Autorenovació il·limitada i programada' },
          { label: 'Creació d’anuncis amb intel·ligència artificial: genera títols i descripcions a partir d’imatges' },
          { label: 'Bot negociador i gestió automàtica d’ofertes' },
          { label: 'Tauler d’analítiques i suport prioritari' },
        ],
      },
      {
        id: 'enterprise', name: 'Enterprise', price: '69,99', annualPrice: '671,90',
        description: 'Automatització avançada per a venedors professionals.',
        features: [
          { label: 'Totes les funcionalitats del Pro' },
          { label: '2 comptes de Vinted inclosos, amb totes les funcions del Pro en tots dos' },
          { label: 'Gestió multicomptes' },
          { label: 'Possibilitat d’afegir un tercer compte per 29,99 €/mes' },
          { label: 'Missatges automàtics quan es reben likes', comingSoon: true },
          { label: 'Posicionament d’anuncis', comingSoon: true },
          { label: 'Promoció d’anuncis', comingSoon: true },
        ],
      }
    ],
    recommendation: {
      basic: { why: 'Com que estàs començant i només necessites les funcions essencials, Básico t’ajuda a organitzar les primeres vendes.' },
      pro: { why: 'Pro és l’opció principal per automatitzar renovacions i ofertes en un compte.' },
      enterprise: { why: 'Enterprise inclou dos comptes de Vinted amb totes les funcions Pro en tots dos, i permet afegir un tercer compte per 29,99 €/mes.' },
    },
    faqs: [
      [
        'Què és Vinbot?',
        'Vinbot és un assistent per organitzar i automatitzar tasques repetitives de la teva operativa a Vinted, com preparar publicacions, renovar anuncis, respondre a likes i gestionar negociacions segons les regles que defineixes.'
      ],
      [
        'Com funciona?',
        'Configures les funcions que necessites, en defineixes les regles i actives les automatitzacions disponibles. Les guies expliquen com configurar cada funció pas a pas.'
      ],
      [
        'Funciona encara que apagui l’ordinador?',
        'Sí. Un cop configurades i activades, les automatitzacions funcionen al núvol seguint les teves regles; no cal que deixis l’ordinador encès.'
      ],
      [
        'Quines diferències hi ha entre els tres plans?',
        'Básico inclou un compte i renovacions manuals de fins a 150 articles. Pro afegeix renovacions il·limitades, automatitzacions i creació de títols i descripcions amb IA a partir d’imatges. Enterprise inclou dos comptes amb totes les funcions Pro en tots dos i permet afegir un tercer per 29,99 €/mes. Els missatges automàtics per likes, el posicionament i la promoció d’anuncis arribaran pròximament.'
      ],
      [
        'Quin pla permet gestionar diversos comptes?',
        'Enterprise inclou dos comptes de Vinted i permet afegir-hi un tercer per 29,99 €/mes. Básico i Pro inclouen un compte.'
      ],
      [
        'Com funciona la renovació automàtica?',
        'L’auto-renovació està inclosa a Pro. Pots activar-la i configurar-ne la freqüència, el límit diari, els comptes i els articles des dels ajustos de Vinbot.'
      ],
      [
        'Com puc cancel·lar la subscripció?',
        'Accedeix al teu compte de Vinbot per gestionar la subscripció. Abans de confirmar una cancel·lació, revisa les condicions aplicables i quan tindrà efecte; si necessites ajuda, utilitza l’enllaç de contacte.'
      ]
    ],
  },
  en: {
    title: 'Vinbot | Automate your Vinted sales',
    description: 'Automate your Vinted sales with Vinbot. Manage listings, use AI tools and save time.',
    skip: 'Skip to content',
    navHow: 'How it works',
    navFeatures: "Features and guides",
    navPlans: 'Plans',
    navGuides: 'Guides',
    navFaq: 'Questions',
    login: 'Log in',
    configure: "Find my plan",
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Change language',
    heroEyebrow: 'YOUR ASSISTANT FOR VINTED',
    heroTitle: 'Automate your Vinted shop. Even when your computer is off.',
    heroDescription: 'Vinbot works for you around the clock: renewing listings, negotiating with buyers and automating sales while you focus on what matters most.',
    heroPrimary: 'Get started with Vinbot',
    heroSecondary: 'Discover how it works',
    mobileCta: 'Get started with Vinbot',
    heroNote: 'You choose what to automate and stay in control.',
    statusActive: 'Vinbot is ready to help',
    plannerEyebrow: "FIND YOUR PLAN",
    plannerTitle: 'Tell us how you sell.',
    plannerDescription: 'Answer four questions and we will recommend a Vinbot plan that covers your needs.',
    plannerTrust: 'Subscriptions and plan changes are managed in your Vinbot account.',
    plannerStarting: 'Are you just starting to sell on Vinted?',
    startingYes: 'Yes, I am just starting',
    startingNo: 'No, I already sell',
    plannerVolume: 'How many items do you have listed?',
    volumeStarter: 'Up to 150',
    volumeGrowth: '151 to 500',
    volumeScale: 'More than 500',
    plannerAccounts: 'Do you manage one account or multiple accounts?',
    accountsNo: 'One account',
    accountsYes: 'Multiple accounts',
    plannerAutomation: 'What level of automation do you need?',
    automationBasic: 'Basic tools',
    automationSales: 'Automate my sales',
    automationExclusive: 'Favourite messages or advanced promotion',
    plannerAction: 'See my recommendation',
    resultEmptyLabel: 'YOUR SETUP',
    resultEmptyTitle: 'Find the plan that covers your needs.',
    resultEmptyText: 'Answer the questions to see a tailored recommendation.',
    basicVolumeNote: 'You indicated {volume} listings. Básico covers up to 150; Pro supports unlimited listings.',
    basicAutomationNote: "For the negotiation bot and advanced automation tools, also consider Pro.",
    pricingEyebrow: 'VINBOT PLANS',
    pricingTitle: 'The right plan for the way you sell.',
    pricingDescription: 'Básico to get organised, Pro to automate, and Enterprise for professional sellers.',
    pricingNote: "The buttons open Vinbot to review or manage your subscription; this website does not charge or change plans.",
    choosePlan: "Choose",
    morePopular: "Most popular",
    recommendedForYou: 'Recommended for you',
    monthlyLabel: 'Monthly',
    annualLabel: 'Annual (20% off)',
    billingPeriodLabel: 'Billing period',
    annual: '/year',
    pricePerAccount: 'Price for one account. Additional accounts are billed separately.',
    enterpriseAccountNote: '2 Vinted accounts included in the price.',
    comingSoon: 'Coming soon',
    comparisonTitle: 'Compare all features',
    comparisonRegionLabel: 'Plan comparison table',
    comparisonFeature: 'Feature',
    included: 'Included',
    notIncluded: 'Not included',
    vatIncluded: 'VAT included',
    comparisonAccountLabel: 'Enterprise includes two accounts for €69.99/month, VAT included. Add a third account for €29.99/month. Integration of the additional charge will be handled later.',
    comparisonGroups: [
      { title: 'Account and management', rows: [
        { label: 'Included Vinted accounts', values: ['1', '1', '2'] },
        { label: 'Management dashboard', values: [true, true, true] },
        { label: 'Inventory sync and management', values: [true, true, true] },
        { label: 'Manual renewals', values: ['Up to 150 items', 'Unlimited', 'Unlimited'] },
      ] },
      { title: 'Automation and sales', rows: [
        { label: 'Scheduled auto-renewals', values: [false, true, true] },
        { label: 'AI titles and descriptions generated from images', values: [false, true, true] },
        { label: 'Automatic negotiation bot', values: [false, true, true] },
        { label: 'Automatic offer sending and acceptance', values: [false, true, true] },
        { label: 'Item statistics', values: [false, true, true] },
      ] },
      { title: 'Exclusive features and support', rows: [
        { label: 'Multi-account management', values: [false, false, true] },
        { label: 'Additional third account', values: [false, false, '€29.99/month'] },
        { label: 'Automatic messages when items receive likes', values: [false, false, 'coming-soon'] },
        { label: 'Listing positioning', values: [false, false, 'coming-soon'] },
        { label: 'Listing promotion', values: [false, false, 'coming-soon'] },
        { label: 'Support', values: ['Email', 'Priority', 'Dedicated'] },
      ] },
    ],
    pendingFeaturesNote: 'Upcoming features are marked “Coming soon” and are not yet available.',
    monthly: '/month',
    basedOn: 'Recommended based on your answers',
    resultPlanLabel: 'RECOMMENDED PLAN',
    closeScreenshot: 'Close',
    howEyebrow: 'HOW IT WORKS',
    howTitle: 'Set it up once. Vinbot keeps the pace.',
    howDescription: 'It does not replace your judgement: it handles repetitive work according to the rules you set.',
    stepOneTitle: 'Set your rules',
    stepOneText: 'Choose what to activate, when to act and which limits Vinbot must respect.',
    stepTwoTitle: 'Activate your assistant',
    stepTwoText: 'Prepare your workflow in one place and review every feature.',
    stepThreeTitle: 'Spend time selling',
    stepThreeText: 'Vinbot handles repetitive tasks while you prepare orders and source inventory.',
    guidesEyebrow: 'VINBOT GUIDES',
    guidesTitle: 'Set up Vinbot step by step.',
    guidesDescription: "Step-by-step explanations and screenshots to set up each feature. Video tutorials are coming soon.",
    videoUpcoming: 'Video coming soon',
    guideExpand: 'See explanation',
    guideWritten: 'Open written guide',
    guideSteps: 'Setup steps',
    guideTip: 'Tip',
    guideVideo: 'Video tutorial',
    zoomScreenshot: 'Enlarge screenshot',
    faqEyebrow: 'FREQUENTLY ASKED QUESTIONS',
    faqTitle: 'Everything clear before you start.',
    faqDescription: "Answers about plans, automation and managing your subscription.",
    finalEyebrow: 'VINBOT IS READY WHEN YOU ARE',
    finalTitle: 'Let Vinbot handle the repetitive work.',
    finalDescription: 'Access the app, set your rules and discover which parts of your workflow you can simplify today.',
    finalAction: "Create an account",
    finalSecondary: "Find my plan",
    finalNote: 'Subscriptions, payments and plan changes are managed directly in your Vinbot account.',
    footerTagline: 'Your automation assistant for Vinted.',
    footerNotice: 'Vinbot is an independent tool and is not affiliated with Vinted.',
    footerProduct: 'Product',
    footerAccess: 'Access',
    footerLegal: 'Legal',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    footerContact: 'Contact',
    plans: [
      {
        id: 'basic', name: 'Básico', price: '29,99', annualPrice: '287,90',
        description: 'Get started selling in an organised way.',
        features: [
          { label: '1 Vinted account' },
          { label: 'Manual renewal for up to 150 items' },
          { label: 'Inventory sync and management' },
          { label: 'Basic dashboard tools' },
          { label: 'Email support' },
        ],
      },
      {
        id: 'pro', name: 'Pro', price: '49,99', annualPrice: '479,90',
        description: 'Automate sales and save time every day.',
        features: [
          { label: 'All Básico features' },
          { label: '1 Vinted account' },
          { label: 'Unlimited item renewals' },
          { label: 'Unlimited scheduled auto-renewals' },
          { label: 'AI listing creation: generate titles and descriptions from images' },
          { label: 'Negotiator bot and automatic offer management' },
          { label: 'Analytics dashboard and priority support' },
        ],
      },
      {
        id: 'enterprise', name: 'Enterprise', price: '69,99', annualPrice: '671,90',
        description: 'Advanced automation for professional sellers.',
        features: [
          { label: 'All Pro features' },
          { label: '2 Vinted accounts included, with all Pro features on both' },
          { label: 'Multi-account management' },
          { label: 'Option to add a third account for €29.99/month' },
          { label: 'Automatic messages when items receive likes', comingSoon: true },
          { label: 'Listing positioning', comingSoon: true },
          { label: 'Listing promotion', comingSoon: true },
        ],
      }
    ],
    recommendation: {
      basic: { why: 'Since you are new to selling and only need the essentials, Básico helps you organise your first sales.' },
      pro: { why: 'Pro is the main option for automating renewals and offers on one account.' },
      enterprise: { why: 'Enterprise includes two Vinted accounts with all Pro features on both, with the option to add a third account for €29.99/month.' },
    },
    faqs: [
      [
        'What is Vinbot?',
        'Vinbot helps organise and automate repetitive parts of your Vinted workflow, including preparing listings, renewing items, replying to likes and handling negotiations using rules you define.'
      ],
      [
        'How does it work?',
        'Configure the features you need, set their rules and activate the available automations. The guides explain how to configure each feature step by step.'
      ],
      [
        'Does it work when my computer is off?',
        'Yes. Once configured and activated, automations run in the cloud according to your rules; you do not need to leave your computer on.'
      ],
      [
        'What are the differences between the three plans?',
        'Básico includes one account and manual renewals for up to 150 items. Pro adds unlimited renewals, automation, and AI-generated listing titles and descriptions from images. Enterprise includes two accounts with all Pro features on both and lets you add a third for €29.99/month. Automatic like messages, listing positioning, and listing promotion are coming soon.'
      ],
      [
        'Which plan supports multiple accounts?',
        'Enterprise includes two Vinted accounts and lets you add a third for €29.99/month. Básico and Pro include one account.'
      ],
      [
        'How does auto-renewal work?',
        'Auto-renewal is included in Pro. You can enable it and configure its frequency, daily limit, accounts and items in Vinbot settings.'
      ],
      [
        'How can I cancel my subscription?',
        'Sign in to your Vinbot account to manage your subscription. Before confirming a cancellation, check the applicable terms and when it takes effect; use the contact link if you need help.'
      ]
    ],
  },
  fr: {
    title: 'Vinbot | Automatisez vos ventes sur Vinted',
    description: 'Automatisez vos ventes sur Vinted avec Vinbot. Gérez vos annonces, utilisez des outils d’IA et gagnez du temps.',
    skip: 'Aller au contenu',
    navHow: 'Comment ça marche',
    navFeatures: "Fonctions et guides",
    navPlans: 'Offres',
    navGuides: 'Guides',
    navFaq: 'Questions',
    login: 'Se connecter',
    configure: "Trouver mon offre",
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    language: 'Changer de langue',
    heroEyebrow: 'VOTRE ASSISTANT POUR VINTED',
    heroTitle: 'Automatisez votre activité Vinted. Même ordinateur éteint.',
    heroDescription: 'Vinbot travaille pour vous 24 h/24 : renouvellement des annonces, négociation avec les acheteurs et automatisation des ventes, pendant que vous vous consacrez à l’essentiel.',
    heroPrimary: 'Commencer avec Vinbot',
    heroSecondary: 'Découvrez comment ça marche',
    mobileCta: 'Commencer avec Vinbot',
    heroNote: 'Vous choisissez quoi automatiser et gardez le contrôle.',
    statusActive: 'Vinbot est prêt à vous aider',
    plannerEyebrow: "TROUVEZ VOTRE OFFRE",
    plannerTitle: 'Dites-nous comment vous vendez.',
    plannerDescription: 'Répondez à quatre questions et nous vous recommanderons une formule Vinbot adaptée à vos besoins.',
    plannerTrust: 'Les abonnements et changements de formule se gèrent dans votre compte Vinbot.',
    plannerStarting: 'Vous débutez sur Vinted ?',
    startingYes: 'Oui, je débute',
    startingNo: 'Non, je vends déjà',
    plannerVolume: 'Combien d’articles avez-vous publiés ?',
    volumeStarter: 'Jusqu’à 150',
    volumeGrowth: 'De 151 à 500',
    volumeScale: 'Plus de 500',
    plannerAccounts: 'Gérez-vous un seul compte ou plusieurs comptes ?',
    accountsNo: 'Un compte',
    accountsYes: 'Plusieurs comptes',
    plannerAutomation: 'Quel niveau d’automatisation vous faut-il ?',
    automationBasic: 'Outils de base',
    automationSales: 'Automatiser mes ventes',
    automationExclusive: 'Messages pour favoris ou promotion avancée',
    plannerAction: 'Voir ma recommandation',
    resultEmptyLabel: 'VOTRE CONFIGURATION',
    resultEmptyTitle: 'Trouvez la formule adaptée à vos besoins.',
    resultEmptyText: 'Répondez aux questions pour obtenir une recommandation personnalisée.',
    basicVolumeNote: 'Vous avez indiqué {volume} annonces. Básico en couvre jusqu’à 150 ; Pro accepte un nombre illimité d’annonces.',
    basicAutomationNote: "Pour le bot négociateur et les outils d’automatisation avancés, consultez aussi Pro.",
    pricingEyebrow: 'FORMULES VINBOT',
    pricingTitle: 'La formule adaptée à votre façon de vendre.',
    pricingDescription: 'Básico pour vous organiser, Pro pour automatiser et Enterprise pour les vendeurs professionnels.',
    pricingNote: "Les boutons ouvrent Vinbot pour consulter ou gérer votre abonnement ; ce site ne facture rien et ne modifie aucun forfait.",
    choosePlan: "Choisir",
    morePopular: "Le plus populaire",
    recommendedForYou: 'Recommandé pour vous',
    monthlyLabel: 'Mensuel',
    annualLabel: 'Annuel (-20 %)',
    billingPeriodLabel: 'Période de facturation',
    annual: '/an',
    pricePerAccount: 'Prix pour un compte. Les comptes supplémentaires sont facturés séparément.',
    enterpriseAccountNote: '2 comptes Vinted inclus dans le prix.',
    comingSoon: 'Prochainement',
    comparisonTitle: 'Comparer toutes les fonctionnalités',
    comparisonRegionLabel: 'Tableau comparatif des formules',
    comparisonFeature: 'Fonctionnalité',
    included: 'Incluse',
    notIncluded: 'Non incluse',
    vatIncluded: 'TVA incluse',
    comparisonAccountLabel: 'Enterprise inclut deux comptes pour 69,99 €/mois, TVA incluse. Vous pouvez ajouter un troisième compte pour 29,99 €/mois. L’intégration de la facturation supplémentaire sera réalisée ultérieurement.',
    comparisonGroups: [
      { title: 'Compte et gestion', rows: [
        { label: 'Comptes Vinted inclus', values: ['1', '1', '2'] },
        { label: 'Tableau de bord de gestion', values: [true, true, true] },
        { label: 'Synchronisation et gestion de l’inventaire', values: [true, true, true] },
        { label: 'Renouvellement manuel', values: ['Jusqu’à 150 articles', 'Illimité', 'Illimité'] },
      ] },
      { title: 'Automatisation et ventes', rows: [
        { label: 'Renouvellements automatiques programmés', values: [false, true, true] },
        { label: 'Création de titres et descriptions avec IA à partir d’images', values: [false, true, true] },
        { label: 'Bot de négociation automatique', values: [false, true, true] },
        { label: 'Envoi et acceptation automatiques des offres', values: [false, true, true] },
        { label: 'Statistiques des articles', values: [false, true, true] },
      ] },
      { title: 'Fonctions exclusives et assistance', rows: [
        { label: 'Gestion multi-comptes', values: [false, false, true] },
        { label: 'Troisième compte supplémentaire', values: [false, false, '29,99 €/mois'] },
        { label: 'Messages automatiques lors de nouveaux likes', values: [false, false, 'coming-soon'] },
        { label: 'Positionnement des annonces', values: [false, false, 'coming-soon'] },
        { label: 'Promotion des annonces', values: [false, false, 'coming-soon'] },
        { label: 'Assistance', values: ['E-mail', 'Prioritaire', 'Dédiée'] },
      ] },
    ],
    pendingFeaturesNote: 'Les nouveautés à venir sont signalées par « Prochainement » et ne sont pas encore disponibles.',
    monthly: '/mois',
    basedOn: 'Recommandation selon vos réponses',
    resultPlanLabel: 'FORMULE RECOMMANDÉE',
    closeScreenshot: 'Fermer',
    howEyebrow: 'COMMENT ÇA MARCHE',
    howTitle: 'Vous configurez une fois. Vinbot garde le rythme.',
    howDescription: 'Il ne remplace pas votre jugement : il exécute le travail répétitif selon les règles que vous définissez.',
    stepOneTitle: 'Fixez vos règles',
    stepOneText: 'Choisissez quoi activer, quand agir et quelles limites Vinbot doit respecter.',
    stepTwoTitle: 'Activez votre assistant',
    stepTwoText: 'Préparez votre activité en un seul endroit et vérifiez chaque fonction.',
    stepThreeTitle: 'Consacrez du temps à vendre',
    stepThreeText: 'Vinbot gère les tâches répétitives pendant que vous préparez les commandes et sourcez des articles.',
    guidesEyebrow: 'GUIDES VINBOT',
    guidesTitle: 'Configurez Vinbot étape par étape.',
    guidesDescription: "Des explications et captures étape par étape pour configurer chaque fonction. Les tutoriels vidéo seront ajoutés prochainement.",
    videoUpcoming: 'Vidéo prochainement',
    guideExpand: 'Voir l’explication',
    guideWritten: 'Ouvrir le guide écrit',
    guideSteps: 'Étapes de configuration',
    guideTip: 'Conseil',
    guideVideo: 'Tutoriel vidéo',
    zoomScreenshot: 'Agrandir la capture',
    faqEyebrow: 'QUESTIONS FRÉQUENTES',
    faqTitle: 'Tout est clair avant de commencer.',
    faqDescription: "Les réponses à vos questions sur les offres, l’automatisation et la gestion de votre abonnement.",
    finalEyebrow: 'VINBOT EST PRÊT QUAND VOUS L’ÊTES',
    finalTitle: 'Laissez Vinbot gérer le travail répétitif.',
    finalDescription: 'Accédez à l’application, définissez vos règles et découvrez quelles parties de votre activité vous pouvez simplifier dès aujourd’hui.',
    finalAction: "Créer un compte",
    finalSecondary: "Trouver mon offre",
    finalNote: 'Les abonnements, paiements et changements de formule sont gérés directement dans votre compte Vinbot.',
    footerTagline: 'Votre assistant d’automatisation pour Vinted.',
    footerNotice: 'Vinbot est un outil indépendant et n’est pas affilié à Vinted.',
    footerProduct: 'Produit',
    footerAccess: 'Accès',
    footerLegal: 'Légal',
    footerPrivacy: 'Confidentialité',
    footerTerms: 'Conditions',
    footerContact: 'Contact',
    plans: [
      {
        id: 'basic', name: 'Básico', price: '29,99', annualPrice: '287,90',
        description: 'Pour commencer à vendre de manière organisée.',
        features: [
          { label: '1 compte Vinted' },
          { label: 'Renouvellement manuel jusqu’à 150 articles' },
          { label: 'Synchronisation et gestion de l’inventaire' },
          { label: 'Outils de base du tableau de bord' },
          { label: 'Assistance par e-mail' },
        ],
      },
      {
        id: 'pro', name: 'Pro', price: '49,99', annualPrice: '479,90',
        description: 'Automatisez vos ventes et gagnez du temps chaque jour.',
        features: [
          { label: 'Toutes les fonctions de Básico' },
          { label: '1 compte Vinted' },
          { label: 'Renouvellement illimité des articles' },
          { label: 'Renouvellements automatiques illimités et programmés' },
          { label: 'Création d’annonces avec intelligence artificielle : générez des titres et descriptions à partir d’images' },
          { label: 'Bot négociateur et gestion automatique des offres' },
          { label: 'Tableau de bord analytique et assistance prioritaire' },
        ],
      },
      {
        id: 'enterprise', name: 'Enterprise', price: '69,99', annualPrice: '671,90',
        description: 'Automatisation avancée pour les vendeurs professionnels.',
        features: [
          { label: 'Toutes les fonctions Pro' },
          { label: '2 comptes Vinted inclus, avec toutes les fonctions Pro sur les deux comptes' },
          { label: 'Gestion multi-comptes' },
          { label: 'Possibilité d’ajouter un troisième compte pour 29,99 €/mois' },
          { label: 'Messages automatiques lors de nouveaux likes', comingSoon: true },
          { label: 'Positionnement des annonces', comingSoon: true },
          { label: 'Promotion des annonces', comingSoon: true },
        ],
      }
    ],
    recommendation: {
      basic: { why: 'Comme vous débutez et n’avez besoin que des fonctions essentielles, Básico vous aide à organiser vos premières ventes.' },
      pro: { why: 'Pro est l’offre principale pour automatiser les renouvellements et les offres sur un compte.' },
      enterprise: { why: 'Enterprise inclut deux comptes Vinted avec toutes les fonctions Pro sur chacun, et permet d’ajouter un troisième compte pour 29,99 €/mois.' },
    },
    faqs: [
      [
        'Qu’est-ce que Vinbot ?',
        'Vinbot aide à organiser et automatiser les tâches répétitives de votre activité Vinted : préparer des annonces, renouveler des articles, répondre aux likes et gérer les négociations selon les règles que vous définissez.'
      ],
      [
        'Comment ça marche ?',
        'Configurez les fonctions dont vous avez besoin, définissez leurs règles et activez les automatisations disponibles. Les guides expliquent comment configurer chaque fonction étape par étape.'
      ],
      [
        'Le service fonctionne-t-il lorsque mon ordinateur est éteint ?',
        'Oui. Une fois configurées et activées, les automatisations fonctionnent dans le cloud selon vos règles ; vous n’avez pas besoin de laisser votre ordinateur allumé.'
      ],
      [
        'Quelles sont les différences entre les trois offres ?',
        'Básico comprend un compte et les renouvellements manuels jusqu’à 150 articles. Pro ajoute les renouvellements illimités, l’automatisation et la création de titres et descriptions par IA à partir d’images. Enterprise inclut deux comptes avec toutes les fonctions Pro sur chacun et permet d’ajouter un troisième compte pour 29,99 €/mois. Les messages automatiques après un like, le positionnement et la promotion des annonces arriveront prochainement.'
      ],
      [
        'Quelle offre permet de gérer plusieurs comptes ?',
        'Enterprise inclut deux comptes Vinted et permet d’ajouter un troisième compte pour 29,99 €/mois. Básico et Pro comprennent un compte.'
      ],
      [
        'Comment fonctionne le renouvellement automatique ?',
        'Le renouvellement automatique est inclus dans Pro. Vous pouvez l’activer et configurer sa fréquence, sa limite quotidienne, les comptes et les articles dans les paramètres de Vinbot.'
      ],
      [
        'Comment résilier mon abonnement ?',
        'Connectez-vous à votre compte Vinbot pour gérer votre abonnement. Avant de confirmer une résiliation, vérifiez les conditions applicables et sa date d’effet ; utilisez le lien de contact si vous avez besoin d’aide.'
      ]
    ],
  },
};

function pathForLocale(locale) {
  const hash = window.location.hash || '';
  // Keep the landing portable across static hosts. Locale subpaths need
  // rewrite rules that are not available on every deployment target.
  return '/?lang=' + encodeURIComponent(locale) + hash;
}

function setText(element, value) {
  if (element) element.textContent = value || '';
}

function setLabel(element, value) {
  if (!element) return;
  const icon = element.querySelector(':scope > i');
  if (icon) {
    element.replaceChildren(document.createTextNode((value || '') + ' '), icon);
    return;
  }
  element.textContent = value || '';
}

function applyCopy(pageCopy) {
  document.documentElement.lang = activeLocale;
  document.title = pageCopy.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', pageCopy.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageCopy.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageCopy.description);

  document.querySelectorAll('[data-copy]').forEach(element => {
    const value = pageCopy[element.dataset.copy];
    if (typeof value !== 'string') return;
    if (element.matches('a.button, button.button')) setLabel(element, value);
    else setText(element, value);
  });

  document.querySelector('.menu-toggle')?.setAttribute('aria-label', pageCopy.menuOpen);
  document.querySelector('.language-trigger')?.setAttribute('aria-label', pageCopy.language);
  document.querySelector('.screenshot-dialog-close')?.setAttribute('aria-label', pageCopy.closeScreenshot);
  document.querySelector('.screenshot-dialog')?.setAttribute('aria-label', pageCopy.zoomScreenshot);
}

function renderLanguageSwitchers(pageCopy) {
  document.querySelectorAll('[data-language-switcher]').forEach(switcher => {
    const trigger = switcher.querySelector('.language-trigger');
    const activeName = switcher.querySelector('[data-language-current-name]');
    const activeFlag = switcher.querySelector('[data-language-current-flag]');
    if (trigger) trigger.setAttribute('aria-label', pageCopy.language);
    if (activeName) activeName.textContent = localeNames[activeLocale];
    if (activeFlag) activeFlag.src = '/assets/flags/' + activeLocale + '.svg';

    switcher.querySelectorAll('.language-option').forEach(option => {
      const selected = option.dataset.locale === activeLocale;
      option.setAttribute('aria-checked', String(selected));
      option.classList.toggle('is-active', selected);
      option.addEventListener('click', () => window.location.assign(pathForLocale(option.dataset.locale)));
    });

    const options = switcher.querySelector('.language-options');
    trigger?.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      if (options) options.hidden = isOpen;
    });
  });

  document.addEventListener('click', event => {
    document.querySelectorAll('[data-language-switcher]').forEach(switcher => {
      if (switcher.contains(event.target)) return;
      switcher.querySelector('.language-trigger')?.setAttribute('aria-expanded', 'false');
      const options = switcher.querySelector('.language-options');
      if (options) options.hidden = true;
    });
  });
}

function makeIcon(name) {
  const icon = document.createElement('i');
  icon.setAttribute('data-lucide', name);
  icon.setAttribute('aria-hidden', 'true');
  return icon;
}

function normaliseItems(landing) {
  const catalogue = Array.isArray(landing.feature_catalog) ? landing.feature_catalog : [];
  const blocks = Array.isArray(landing.feature_blocks) ? landing.feature_blocks : [];
  return featureProfiles.map((profile, index) => ({
    ...profile,
    title: catalogue[index]?.title || '',
    description: catalogue[index]?.description || '',
    longDescription: blocks[index]?.text || catalogue[index]?.description || '',
    points: Array.isArray(blocks[index]?.points) ? blocks[index].points : [],
    stepScreenshots: Array.isArray(blocks[index]?.step_screenshots) ? blocks[index].step_screenshots : [],
    closing: blocks[index]?.closing || '',
    videoUrl: blocks[index]?.video_url || '',
  }));
}

function screenshotButton(src, alt, copy) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'screenshot-button';
  button.dataset.screenshot = '';
  button.setAttribute('aria-label', `${copy.zoomScreenshot}: ${alt}`);
  const image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  image.loading = 'lazy';
  button.append(image);
  return button;
}

function renderPricing(pageCopy, recommendedPlanId = selectedRecommendedPlan) {
  const grid = document.querySelector('#pricing-grid');
  if (!grid) return;
  selectedRecommendedPlan = recommendedPlanId;
  grid.replaceChildren(...pageCopy.plans.map(plan => {
    const card = document.createElement('article');
    card.className = `pricing-card${plan.id === recommendedPlanId ? ' is-recommended' : ''}`;
    card.dataset.planId = plan.id;
    const badges = document.createElement('div');
    badges.className = 'pricing-badges';
    if (plan.id === 'pro') {
      const badge = document.createElement('p');
      badge.className = 'pricing-badge pricing-badge--popular';
      badge.textContent = pageCopy.morePopular;
      badges.append(badge);
    }
    if (plan.id === recommendedPlanId) {
      const badge = document.createElement('p');
      badge.className = 'pricing-badge pricing-badge--recommended';
      badge.textContent = pageCopy.recommendedForYou;
      badges.append(badge);
    }
    const title = document.createElement('h3');
    title.textContent = plan.name;
    const description = document.createElement('p');
    description.className = 'pricing-description';
    description.textContent = plan.description;
    const price = document.createElement('p');
    price.className = 'pricing-price';
    const isAnnual = selectedBillingPeriod === 'annual';
    price.append(document.createTextNode(`${isAnnual ? plan.annualPrice : plan.price} €`));
    const cadence = document.createElement('span');
    cadence.textContent = isAnnual ? pageCopy.annual : pageCopy.monthly;
    price.append(cadence);
    const taxNote = document.createElement('span');
    taxNote.className = 'pricing-tax-note';
    taxNote.textContent = pageCopy.vatIncluded;
    const priceNote = document.createElement('p');
    priceNote.className = 'pricing-account-note';
    priceNote.textContent = plan.id === 'enterprise' ? pageCopy.enterpriseAccountNote : pageCopy.pricePerAccount;
    const features = document.createElement('ul');
    features.className = 'pricing-features';
    plan.features.forEach(feature => {
      const item = document.createElement('li');
      if (feature.comingSoon) {
        item.classList.add('is-coming-soon');
      }
      item.append(makeIcon(feature.comingSoon ? 'clock-3' : 'check'));
      item.append(document.createTextNode(feature.label));
      if (feature.comingSoon) {
        const status = document.createElement('small');
        status.className = 'coming-soon-label';
        status.textContent = pageCopy.comingSoon;
        item.append(status);
      }
      features.append(item);
    });
    const choose = document.createElement('a');
    choose.className = plan.id === recommendedPlanId || (!recommendedPlanId && plan.id === 'pro')
      ? 'button button-primary'
      : 'button button-secondary';
    choose.href = dashboardUrl;
    choose.dataset.planId = plan.id;
    choose.setAttribute('aria-label', `${pageCopy.choosePlan}: ${plan.name}`);
    choose.append(document.createTextNode(`${pageCopy.choosePlan} ${plan.name}`), makeIcon('arrow-right'));
    card.append(badges, title, description, price, taxNote, priceNote, features, choose);
    return card;
  }));
}

function renderComparison(pageCopy) {
  const container = document.querySelector('#comparison-table');
  if (!container) return;
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', pageCopy.comparisonRegionLabel);

  const table = document.createElement('table');
  table.className = 'comparison-table';
  const head = document.createElement('thead');
  const headingRow = document.createElement('tr');
  const featureHeading = document.createElement('th');
  featureHeading.scope = 'col';
  featureHeading.textContent = pageCopy.comparisonFeature;
  headingRow.append(featureHeading);
  pageCopy.plans.forEach(plan => {
    const heading = document.createElement('th');
    heading.scope = 'col';
    heading.textContent = plan.name;
    headingRow.append(heading);
  });
  head.append(headingRow);
  table.append(head);

  pageCopy.comparisonGroups.forEach(group => {
    const body = document.createElement('tbody');
    const groupRow = document.createElement('tr');
    groupRow.className = 'comparison-group';
    const groupHeading = document.createElement('th');
    groupHeading.scope = 'rowgroup';
    groupHeading.colSpan = pageCopy.plans.length + 1;
    groupHeading.textContent = group.title;
    groupRow.append(groupHeading);
    body.append(groupRow);

    group.rows.forEach(row => {
      const tableRow = document.createElement('tr');
      const label = document.createElement('th');
      label.scope = 'row';
      label.textContent = row.label;
      tableRow.append(label);
      row.values.forEach(value => {
        const cell = document.createElement('td');
        if (value === true) {
          cell.append(makeIcon('check'));
          cell.setAttribute('aria-label', pageCopy.included);
        } else if (value === false) {
          cell.textContent = '—';
          cell.setAttribute('aria-label', pageCopy.notIncluded);
        } else if (value === 'coming-soon') {
          cell.classList.add('comparison-coming-soon');
          cell.append(makeIcon('clock-3'));
          const status = document.createElement('span');
          status.className = 'coming-soon-label';
          status.textContent = pageCopy.comingSoon;
          cell.append(status);
        } else {
          cell.textContent = value;
        }
        tableRow.append(cell);
      });
      body.append(tableRow);
    });
    table.append(body);
  });

  container.replaceChildren(table);
}

function setUpBillingToggle(pageCopy) {
  document.querySelector('.billing-toggle')?.setAttribute('aria-label', pageCopy.billingPeriodLabel);
  document.querySelectorAll('[data-billing-period]').forEach(button => {
    button.addEventListener('click', () => {
      selectedBillingPeriod = button.dataset.billingPeriod;
      document.querySelectorAll('[data-billing-period]').forEach(option => {
        const active = option === button;
        option.classList.toggle('is-active', active);
        option.setAttribute('aria-pressed', String(active));
      });
      renderPricing(pageCopy, selectedRecommendedPlan);
      const recommendationPlan = pageCopy.plans.find(plan => plan.id === selectedRecommendedPlan);
      const recommendationPrice = document.querySelector('.result-price');
      if (recommendationPlan && recommendationPrice) {
        const price = selectedBillingPeriod === 'annual' ? recommendationPlan.annualPrice : recommendationPlan.price;
        const cadence = selectedBillingPeriod === 'annual' ? pageCopy.annual : pageCopy.monthly;
        recommendationPrice.textContent = `${price} €${cadence}`;
      }
      window.lucide?.createIcons();
    });
  });
}

function renderHeroOrbit(items) {
  const orbit = document.querySelector('#hero-orbit');
  if (!orbit) return;

  orbit.replaceChildren(...items.map(item => {
    const feature = document.createElement('div');
    feature.className = 'hero-orbit-feature';

    const content = document.createElement('span');
    content.className = 'hero-orbit-content';

    const icon = document.createElement('span');
    icon.className = 'hero-orbit-icon';
    icon.append(makeIcon(item.icon));

    const label = document.createElement('span');
    label.className = 'hero-orbit-label';
    label.textContent = item.title;

    content.append(icon, label);
    feature.append(content);
    return feature;
  }));
}

function guideUrl(category) {
  return '/guide/?category=' + encodeURIComponent(category) + '&lang=' + activeLocale;
}

function renderGuides(items, pageCopy) {
  const grid = document.querySelector('#guide-grid');
  if (!grid) return;

  grid.replaceChildren(...items.map((item, index) => {
    const detail = document.createElement('details');
    detail.className = 'guide-card';
    detail.id = 'guide-' + item.id;
    detail.tabIndex = -1;

    const summary = document.createElement('summary');
    const number = document.createElement('span');
    number.className = 'guide-number';
    number.textContent = String(index + 1).padStart(2, '0');
    const icon = document.createElement('span');
    icon.className = 'guide-icon';
    icon.append(makeIcon(item.icon));
    const text = document.createElement('span');
    text.className = 'guide-summary-copy';
    const title = document.createElement('strong');
    title.textContent = item.title;
    const cue = document.createElement('small');
    cue.textContent = pageCopy.guideExpand;
    text.append(title, cue);
    summary.append(number, icon, text, makeIcon('chevron-down'));

    const body = document.createElement('div');
    body.className = 'guide-body';
    const description = document.createElement('p');
    description.className = 'guide-description';
    description.textContent = item.longDescription;
    body.append(description);

    const screenshot = document.createElement('figure');
    screenshot.className = 'guide-screenshot';
    screenshot.append(screenshotButton(item.image, item.title, pageCopy));
    body.append(screenshot);

    if (item.points.length) {
      const heading = document.createElement('h4');
      heading.className = 'guide-subheading';
      heading.textContent = pageCopy.guideSteps;
      const list = document.createElement('ol');
      list.className = 'guide-points';
      item.points.forEach((point, stepIndex) => {
        const listItem = document.createElement('li');
        listItem.textContent = point;
        const stepScreenshot = item.stepScreenshots[stepIndex];
        if (stepScreenshot?.src && stepScreenshot?.alt) {
          listItem.append(screenshotButton(stepScreenshot.src, stepScreenshot.alt, pageCopy));
        }
        list.append(listItem);
      });
      body.append(heading, list);
    }

    if (item.closing) {
      const tip = document.createElement('aside');
      tip.className = 'guide-tip';
      const heading = document.createElement('strong');
      heading.textContent = pageCopy.guideTip;
      tip.append(heading, document.createTextNode(item.closing));
      body.append(tip);
    }

    body.append(createGuideVideo(item, pageCopy));

    const link = document.createElement('a');
    link.className = 'guide-link';
    link.href = guideUrl(item.category);
    link.append(document.createTextNode(pageCopy.guideWritten + ' '), makeIcon('arrow-up-right'));
    body.append(link);

    detail.append(summary, body);
    return detail;
  }));
}

function createGuideVideo(item, pageCopy) {
  const section = document.createElement('section');
  section.className = 'guide-video-slot';
  section.setAttribute('aria-label', `${pageCopy.guideVideo}: ${item.title}`);
  const heading = document.createElement('h4');
  heading.textContent = pageCopy.guideVideo;
  section.append(heading);

  if (item.videoUrl) {
    let videoUrl;
    try {
      const parsedUrl = new URL(item.videoUrl);
      if (parsedUrl.protocol !== 'https:' || !['www.youtube-nocookie.com', 'www.youtube.com', 'player.vimeo.com'].includes(parsedUrl.hostname)) {
        throw new Error('Unsupported video host');
      }
      videoUrl = parsedUrl.href;
    } catch (error) {
      console.error('Vinbot guide video URL must use a supported HTTPS video host.', error);
    }
    if (!videoUrl) {
      const placeholder = document.createElement('p');
      placeholder.textContent = pageCopy.videoUpcoming;
      section.append(placeholder);
      return section;
    }
    const frame = document.createElement('iframe');
    frame.src = videoUrl;
    frame.title = `${pageCopy.guideVideo}: ${item.title}`;
    frame.loading = 'lazy';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    section.append(frame);
  } else {
    const placeholder = document.createElement('p');
    placeholder.textContent = pageCopy.videoUpcoming;
    section.append(placeholder);
  }
  return section;
}

function renderFaq(pageCopy) {
  const list = document.querySelector('#faq-list');
  if (!list) return;
  list.replaceChildren(...pageCopy.faqs.map(([question, answer]) => {
    const item = document.createElement('details');
    item.className = 'faq-item';
    const summary = document.createElement('summary');
    summary.append(document.createTextNode(question), makeIcon('plus'));
    const body = document.createElement('p');
    body.textContent = answer;
    item.append(summary, body);
    return item;
  }));
}

function recommendPlan(answers) {
  if (answers.accounts === 'yes' || answers.automation === 'exclusive') return 'enterprise';
  if (answers.starting === 'yes' && answers.automation === 'basic') return 'basic';
  return 'pro';
}

function setUpPlanner(pageCopy) {
  const form = document.querySelector('#planner-form');
  const result = document.querySelector('#planner-result');
  if (!form || !result) return;
  const answers = {};
  const questions = [...form.querySelectorAll('.planner-question')];

  function showRecommendation() {
    if (questions.some(question => !answers[question.dataset.question])) return;
    const planId = recommendPlan(answers);
    const plan = pageCopy.plans.find(item => item.id === planId);
    const recommendation = pageCopy.recommendation[planId];
    if (!plan || !recommendation) {
      console.error('Vinbot could not find the selected subscription plan.');
      return;
    }

    const reason = recommendation.why;
    if (typeof reason !== 'string' || !reason) {
      console.error('Vinbot could not explain the selected subscription plan.');
      return;
    }

    result.replaceChildren();
    const icon = document.createElement('span');
    icon.className = 'result-icon';
    icon.append(makeIcon(planId === 'basic' ? 'sparkles' : planId === 'pro' ? 'rocket' : 'layers-3'));
    const label = document.createElement('p');
    label.className = 'result-label';
    label.textContent = pageCopy.resultPlanLabel;
    const title = document.createElement('h3');
    title.textContent = `Plan ${plan.name}`;
    const price = document.createElement('p');
    price.className = 'result-price';
    price.textContent = `${selectedBillingPeriod === 'annual' ? plan.annualPrice : plan.price} €${selectedBillingPeriod === 'annual' ? pageCopy.annual : pageCopy.monthly}`;
    const description = document.createElement('p');
    description.className = 'result-why';
    const explanation = [reason];
    if (planId === 'basic' && answers.volume !== 'starter') {
      const selectedVolume = questions.find(question => question.dataset.question === 'volume')
        .querySelector('.choice.is-selected').textContent;
      explanation.push(pageCopy.basicVolumeNote.replace('{volume}', selectedVolume));
    }
    if (planId === 'basic' && answers.automation === 'sales') {
      explanation.push(pageCopy.basicAutomationNote);
    }
    description.textContent = explanation.join(' ');
    const features = document.createElement('ul');
    features.className = 'result-features';
    plan.features.filter(feature => !feature.comingSoon).slice(0, 3).forEach(feature => {
      const item = document.createElement('li');
      item.append(makeIcon('check'), document.createTextNode(feature.label));
      features.append(item);
    });
    const link = document.createElement('a');
    link.className = 'result-link';
    link.href = dashboardUrl;
    link.dataset.planId = plan.id;
    link.setAttribute('aria-label', `${pageCopy.choosePlan} ${plan.name}`);
    link.append(document.createTextNode(`${pageCopy.choosePlan} ${plan.name} `), makeIcon('arrow-right'));
    result.append(icon, label, title, price, description, features, link);

    renderPricing(pageCopy, planId);
    window.lucide?.createIcons();
  }

  questions.forEach(question => {
    const key = question.dataset.question;
    question.querySelectorAll('.choice').forEach(choice => {
      choice.addEventListener('click', () => {
        answers[key] = choice.dataset.value;
        question.querySelectorAll('.choice').forEach(button => {
          const selected = button === choice;
          button.classList.toggle('is-selected', selected);
          button.setAttribute('aria-pressed', String(selected));
        });
        showRecommendation();
      });
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const unanswered = questions.find(question => !answers[question.dataset.question]);
    if (unanswered) {
      unanswered.querySelector('.choice')?.focus();
      return;
    }
    showRecommendation();
    const planId = recommendPlan(answers);
    document.querySelector(`[data-plan-id="${planId}"].pricing-card`)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center',
    });
  });
}

function setUpScreenshotDialog() {
  const dialog = document.querySelector('#screenshot-dialog');
  const image = dialog?.querySelector('img');
  if (!dialog || !image) return;
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-screenshot]');
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

function setUpMenu(pageCopy) {
  const toggle = document.querySelector('#menu-toggle');
  const nav = document.querySelector('#main-navigation');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? pageCopy.menuClose : pageCopy.menuOpen);
    nav.classList.toggle('is-open', open);
    toggle.replaceChildren(makeIcon(open ? 'x' : 'menu'));
    window.lucide?.createIcons();
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', pageCopy.menuOpen);
    toggle.replaceChildren(makeIcon('menu'));
    window.lucide?.createIcons();
  }));
}

async function loadLanding() {
  const pageCopy = copy[activeLocale];
  applyCopy(pageCopy);
  renderLanguageSwitchers(pageCopy);
  setUpMenu(pageCopy);
  setUpPlanner(pageCopy);
  setUpBillingToggle(pageCopy);
  renderPricing(pageCopy);
  renderComparison(pageCopy);
  setUpScreenshotDialog();
  renderFaq(pageCopy);

  try {
    const path = activeLocale === 'es' ? '/content/landing.json' : '/locales/' + activeLocale + '.json';
    const response = await fetch(path, { cache: 'no-cache' });
    if (!response.ok) throw new Error('Could not load content');
    const landing = await response.json();
    const items = normaliseItems(landing);
    renderGuides(items, pageCopy);
    renderHeroOrbit(items);
  } catch (error) {
    console.error('Vinbot content could not be loaded.', error);
    const fallbackItems = featureProfiles.map(profile => ({ ...profile, title: profile.id, description: '', longDescription: '', points: [] }));
    renderGuides(fallbackItems, pageCopy);
    renderHeroOrbit(fallbackItems);
  }

  try {
    window.localStorage.setItem('vinbot-locale', activeLocale);
  } catch {}
  window.lucide?.createIcons();
}

loadLanding();
