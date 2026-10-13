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
    title: 'Vinbot | Automatización inteligente para Vinted',
    description: 'Configura Vinbot una vez y deja que se encargue del trabajo repetitivo de tu operativa de Vinted.',
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
    heroPrimary: "Encontrar mi plan",
    heroSecondary: 'Ver funciones',
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
    plannerAction: 'Ver mi recomendación',
    resultEmptyLabel: 'TU CONFIGURACIÓN',
    resultEmptyTitle: 'Encuentra el plan que cubre tus necesidades.',
    resultEmptyText: 'Responde las preguntas para ver una recomendación personalizada.',
    basicVolumeNote: 'Has indicado {volume} anuncios. Básico cubre hasta 150; Pro admite anuncios ilimitados.',
    basicAutomationNote: "Si quieres el bot negociador y las herramientas avanzadas de automatización, consulta también el plan Pro.",
    pricingEyebrow: 'PLANES VINBOT',
    pricingTitle: 'Compara los tres planes y encuentra el tuyo.',
    pricingDescription: 'Básico para empezar, Pro como recomendado para la mayoría de vendedores con una cuenta y Enterprise para gestionar varias.',
    pricingNote: "Elige y confirma tu plan dentro de Vinbot. Los botones te llevan a la aplicación; no activan una suscripción.",
    choosePlan: "Continuar en Vinbot",
    recommendedPlan: 'Recomendado para la mayoría de vendedores con una cuenta',
    morePopular: "Recomendado",
    recommendedForYou: 'Recomendado para ti',
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
        "id": "basic",
        "name": "Básico",
        "price": "29,99",
        "features": [
          "Hasta 150 anuncios activos",
          "Una cuenta",
          "Herramientas básicas",
          "Soporte por email"
        ]
      },
      {
        "id": "pro",
        "name": "Pro",
        "price": "49,99",
        "features": [
          "Anuncios ilimitados",
          "Una cuenta",
          "Precios con IA",
          "Bot negociador",
          "Auto-renovación",
          "Panel de analíticas",
          "Soporte prioritario"
        ]
      },
      {
        "id": "enterprise",
        "name": "Enterprise",
        "price": "69,99",
        "features": [
          "Todas las funciones del Pro",
          "Multicuenta",
          "Analíticas avanzadas",
          "Soporte dedicado"
        ]
      }
    ],
    recommendation: {
      basic: { why: '¡Empieza con buen pie! Como estás empezando en Vinted, el Plan Básico es una forma sencilla de descubrir Vinbot y gestionar tus primeros anuncios.' },
      pro: {
        whyAutomation: 'Has indicado que quieres automatizar tus ventas. El Plan Pro incluye esas funciones para tu única cuenta y admite anuncios ilimitados.',
        whyVolume: 'Con más de 150 anuncios, el límite del Plan Básico no cubriría tu catálogo. Pro admite anuncios ilimitados.',
        whyBoth: 'El Plan Pro cubre tu catálogo de más de 150 anuncios y la automatización de ventas que necesitas en una sola cuenta.',
        whyEstablished: 'Como ya vendes en Vinted, el Plan Pro te da margen para crecer con anuncios ilimitados y sus herramientas de automatización.',
      },
      enterprise: { why: '¡Gestiona todas tus cuentas desde un solo lugar! Enterprise reúne las funciones del Pro con multicuenta y herramientas avanzadas para trabajar con varios perfiles.' },
    },
    faqs: [
      [
        "¿Qué hace Vinbot?",
        "Vinbot reúne herramientas para preparar publicaciones, renovar artículos, responder al interés y organizar reglas de negociación según tu forma de vender."
      ],
      [
        "¿Tengo que activar todas las funciones?",
        "No. Puedes empezar por las funciones que más tiempo te ahorran y activar el resto cuando encajen con tu operativa."
      ],
      [
        "¿Puedo decidir qué hace cada automatización?",
        "Sí. Tú defines mensajes, límites y criterios antes de activar cada función. Vinbot ejecuta las reglas que has marcado."
      ],
      [
        "¿Vinbot está vinculado a Vinted?",
        "No. Vinbot es una herramienta independiente y no está afiliada, asociada ni respaldada por Vinted."
      ],
      [
        "¿Qué plan encaja conmigo?",
        "Básico está pensado para quien empieza con una cuenta y hasta 150 anuncios activos. Pro es la opción recomendada si ya vendes con una cuenta o tienes más anuncios. Para gestionar varias cuentas, elige Enterprise."
      ],
      [
        "¿Tengo que dejar el ordenador encendido?",
        "No. Una vez configuradas y activadas, las automatizaciones trabajan en la nube siguiendo tus reglas, aunque cierres el ordenador."
      ],
      [
        "¿Qué significa el límite de 150 anuncios?",
        "Se refiere a los anuncios activos al mismo tiempo, no al total de artículos que has vendido. Si tu catálogo supera ese límite, consulta Pro."
      ],
      [
        "¿Anuncios ilimitados significa IA ilimitada?",
        "No son lo mismo. El tamaño del catálogo y el consumo de IA son conceptos distintos. Confirma los límites de uso y el número de cuentas incluidos antes de contratar."
      ],
      [
        "¿Cómo gestiono mi plan o solicito una cancelación?",
        "Accede a tu cuenta de Vinbot para gestionar la suscripción y los cambios de plan. Antes de confirmar una cancelación, revisa las condiciones aplicables y cuándo tendrá efecto. Si necesitas ayuda, utiliza el enlace de contacto."
      ]
    ],
  },
  ca: {
    title: 'Vinbot | Automatització intel·ligent per a Vinted',
    description: 'Configura Vinbot una vegada i deixa que s’encarregui de la feina repetitiva de la teva operativa a Vinted.',
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
    heroPrimary: "Trobar el meu pla",
    heroSecondary: 'Veure funcions',
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
    plannerAction: 'Veure la meva recomanació',
    resultEmptyLabel: 'LA TEVA CONFIGURACIÓ',
    resultEmptyTitle: 'Troba el pla que cobreix les teves necessitats.',
    resultEmptyText: 'Respon les preguntes per veure una recomanació personalitzada.',
    basicVolumeNote: 'Has indicat {volume} anuncis. Básico en cobreix fins a 150; Pro admet anuncis il·limitats.',
    basicAutomationNote: "Si vols el bot negociador i les eines avançades d’automatització, consulta també el pla Pro.",
    pricingEyebrow: 'PLANS VINBOT',
    pricingTitle: 'Compara els tres plans i troba el teu.',
    pricingDescription: 'Básico per començar, Pro com a recomanat per a la majoria de venedors amb un compte i Enterprise per gestionar-ne diversos.',
    pricingNote: "Tria i confirma el teu pla dins de Vinbot. Els botons et porten a l’aplicació; no activen cap subscripció.",
    choosePlan: "Continuar a Vinbot",
    recommendedPlan: 'Recomanat per a la majoria de venedors amb un compte',
    morePopular: "Recomanat",
    recommendedForYou: 'Recomanat per a tu',
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
        "id": "basic",
        "name": "Básico",
        "price": "29,99",
        "features": [
          "Fins a 150 anuncis actius",
          "Un compte",
          "Eines bàsiques",
          "Suport per email"
        ]
      },
      {
        "id": "pro",
        "name": "Pro",
        "price": "49,99",
        "features": [
          "Anuncis il·limitats",
          "Un compte",
          "Preus amb IA",
          "Bot negociador",
          "Auto-renovació",
          "Panell d’analítiques",
          "Suport prioritari"
        ]
      },
      {
        "id": "enterprise",
        "name": "Enterprise",
        "price": "69,99",
        "features": [
          "Totes les funcions del Pro",
          "Multicompte",
          "Analítiques avançades",
          "Suport dedicat"
        ]
      }
    ],
    recommendation: {
      basic: { why: 'Comença amb bon peu! Com que estàs començant a Vinted, el pla Básico és una manera senzilla de descobrir Vinbot i gestionar els teus primers anuncis.' },
      pro: {
        whyAutomation: 'Has indicat que vols automatitzar les vendes. El pla Pro inclou aquestes funcions per al teu únic compte i admet anuncis il·limitats.',
        whyVolume: 'Amb més de 150 anuncis, el límit del pla Básico no cobriria el teu catàleg. Pro admet anuncis il·limitats.',
        whyBoth: 'El pla Pro cobreix el teu catàleg de més de 150 anuncis i l’automatització de vendes que necessites en un sol compte.',
        whyEstablished: 'Com que ja vens a Vinted, el pla Pro et dona marge per créixer amb anuncis il·limitats i les seves eines d’automatització.',
      },
      enterprise: { why: 'Gestiona tots els teus comptes des d’un sol lloc! Enterprise reuneix les funcions del Pro amb multicompte i eines avançades per treballar amb diversos perfils.' },
    },
    faqs: [
      [
        "Què fa Vinbot?",
        "Vinbot reuneix eines per preparar publicacions, renovar articles, respondre a l’interès i organitzar regles de negociació segons la teva manera de vendre."
      ],
      [
        "He d’activar totes les funcions?",
        "No. Pots començar per les funcions que més temps t’estalvien i activar la resta quan encaixin amb la teva operativa."
      ],
      [
        "Puc decidir què fa cada automatització?",
        "Sí. Tu defineixes missatges, límits i criteris abans d’activar cada funció. Vinbot executa les regles que has marcat."
      ],
      [
        "Vinbot està vinculat a Vinted?",
        "No. Vinbot és una eina independent i no està afiliada, associada ni avalada per Vinted."
      ],
      [
        "Quin pla em convé?",
        "Bàsic està pensat per a qui comença amb un compte i fins a 150 anuncis actius. Pro és l’opció recomanada si ja vens amb un compte o tens més anuncis. Per gestionar diversos comptes, tria Enterprise."
      ],
      [
        "He de deixar l’ordinador encès?",
        "No. Un cop configurades i activades, les automatitzacions treballen al núvol seguint les teves regles, encara que tanquis l’ordinador."
      ],
      [
        "Què significa el límit de 150 anuncis?",
        "Fa referència als anuncis actius al mateix temps, no al total d’articles que has venut. Si el teu catàleg supera aquest límit, consulta Pro."
      ],
      [
        "Anuncis il·limitats vol dir IA il·limitada?",
        "No són el mateix. La mida del catàleg i el consum d’IA són conceptes diferents. Confirma els límits d’ús i el nombre de comptes inclosos abans de contractar."
      ],
      [
        "Com gestiono el meu pla o sol·licito una cancel·lació?",
        "Accedeix al teu compte de Vinbot per gestionar la subscripció i els canvis de pla. Abans de confirmar una cancel·lació, revisa les condicions aplicables i quan tindrà efecte. Si necessites ajuda, utilitza l’enllaç de contacte."
      ]
    ],
  },
  en: {
    title: 'Vinbot | Smart automation for Vinted',
    description: 'Set up Vinbot once and let it handle the repetitive work in your Vinted workflow.',
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
    heroPrimary: "Find my plan",
    heroSecondary: 'See features',
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
    plannerAction: 'See my recommendation',
    resultEmptyLabel: 'YOUR SETUP',
    resultEmptyTitle: 'Find the plan that covers your needs.',
    resultEmptyText: 'Answer the questions to see a tailored recommendation.',
    basicVolumeNote: 'You indicated {volume} listings. Básico covers up to 150; Pro supports unlimited listings.',
    basicAutomationNote: "For the negotiation bot and advanced automation tools, also consider Pro.",
    pricingEyebrow: 'VINBOT PLANS',
    pricingTitle: 'Compare the three plans and find your fit.',
    pricingDescription: 'Básico to get started, Pro recommended for most sellers with one account, and Enterprise for multiple accounts.',
    pricingNote: "Choose and confirm your plan inside Vinbot. These buttons open the app; they do not activate a subscription.",
    choosePlan: "Continue to Vinbot",
    recommendedPlan: 'Recommended for most sellers with one account',
    morePopular: "Recommended",
    recommendedForYou: 'Recommended for you',
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
        "id": "basic",
        "name": "Básico",
        "price": "29,99",
        "features": [
          "Up to 150 active listings",
          "One account",
          "Basic tools",
          "Email support"
        ]
      },
      {
        "id": "pro",
        "name": "Pro",
        "price": "49,99",
        "features": [
          "Unlimited listings",
          "One account",
          "AI pricing",
          "Negotiator bot",
          "Auto-renewal",
          "Analytics dashboard",
          "Priority support"
        ]
      },
      {
        "id": "enterprise",
        "name": "Enterprise",
        "price": "69,99",
        "features": [
          "All Pro features",
          "Multiple accounts",
          "Advanced analytics",
          "Dedicated support"
        ]
      }
    ],
    recommendation: {
      basic: { why: 'Start on the right foot! Since you are new to Vinted, the Básico plan is a simple way to discover Vinbot and manage your first listings.' },
      pro: {
        whyAutomation: 'You said you want to automate sales. Pro includes those features for your single account and supports unlimited listings.',
        whyVolume: 'With more than 150 listings, the Básico plan limit would not cover your catalogue. Pro supports unlimited listings.',
        whyBoth: 'Pro covers your catalogue of more than 150 listings and the sales automation you need for one account.',
        whyEstablished: 'Since you already sell on Vinted, Pro gives you room to grow with unlimited listings and sales automation tools.',
      },
      enterprise: { why: 'Manage all your accounts in one place! Enterprise combines Pro features with multi-account management and advanced tools for multiple profiles.' },
    },
    faqs: [
      [
        "What can Vinbot do?",
        "Vinbot brings together tools to prepare listings, renew items, reply to interest and organise negotiation rules around the way you sell."
      ],
      [
        "Do I need to activate every feature?",
        "No. Start with the features that save you the most time and activate the rest when they fit your workflow."
      ],
      [
        "Can I decide what each automation does?",
        "Yes. You define messages, limits and criteria before activating each feature. Vinbot follows the rules you set."
      ],
      [
        "Is Vinbot linked to Vinted?",
        "No. Vinbot is an independent tool and is not affiliated with, associated with or endorsed by Vinted."
      ],
      [
        "Which plan is right for me?",
        "Basic is designed for new sellers with one account and up to 150 active listings. Pro is recommended if you already sell with one account or have more listings. Choose Enterprise to manage multiple accounts."
      ],
      [
        "Does my computer need to stay on?",
        "No. Once configured and activated, automations run in the cloud following your rules, even when your computer is off."
      ],
      [
        "What does the 150-listing limit mean?",
        "It refers to listings active at the same time, not the total number of items you have sold. If your catalogue exceeds this limit, consider Pro."
      ],
      [
        "Do unlimited listings mean unlimited AI?",
        "They are different things. Catalogue size and AI usage are separate. Confirm usage limits and the number of included accounts before subscribing."
      ],
      [
        "How do I manage my plan or request cancellation?",
        "Sign in to your Vinbot account to manage your subscription and plan changes. Before confirming cancellation, check the applicable terms and when it takes effect. Use the contact link if you need help."
      ]
    ],
  },
  fr: {
    title: 'Vinbot | Automatisation intelligente pour Vinted',
    description: 'Configurez Vinbot une fois et laissez-le gérer le travail répétitif de votre activité sur Vinted.',
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
    heroPrimary: "Trouver mon offre",
    heroSecondary: 'Voir les fonctions',
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
    plannerAction: 'Voir ma recommandation',
    resultEmptyLabel: 'VOTRE CONFIGURATION',
    resultEmptyTitle: 'Trouvez la formule adaptée à vos besoins.',
    resultEmptyText: 'Répondez aux questions pour obtenir une recommandation personnalisée.',
    basicVolumeNote: 'Vous avez indiqué {volume} annonces. Básico en couvre jusqu’à 150 ; Pro accepte un nombre illimité d’annonces.',
    basicAutomationNote: "Pour le bot négociateur et les outils d’automatisation avancés, consultez aussi Pro.",
    pricingEyebrow: 'FORMULES VINBOT',
    pricingTitle: 'Comparez les trois formules et trouvez la vôtre.',
    pricingDescription: 'Básico pour débuter, Pro recommandé à la plupart des vendeurs avec un compte, et Enterprise pour plusieurs comptes.',
    pricingNote: "Choisissez et confirmez votre offre dans Vinbot. Ces boutons ouvrent l’application ; ils n’activent aucun abonnement.",
    choosePlan: "Continuer sur Vinbot",
    recommendedPlan: 'Recommandé à la plupart des vendeurs avec un compte',
    morePopular: "Recommandé",
    recommendedForYou: 'Recommandé pour vous',
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
        "id": "basic",
        "name": "Básico",
        "price": "29,99",
        "features": [
          "Jusqu’à 150 annonces actives",
          "Un compte",
          "Outils de base",
          "Assistance par e-mail"
        ]
      },
      {
        "id": "pro",
        "name": "Pro",
        "price": "49,99",
        "features": [
          "Annonces illimitées",
          "Un compte",
          "Prix avec IA",
          "Bot négociateur",
          "Renouvellement automatique",
          "Tableau de bord analytique",
          "Assistance prioritaire"
        ]
      },
      {
        "id": "enterprise",
        "name": "Enterprise",
        "price": "69,99",
        "features": [
          "Toutes les fonctions Pro",
          "Comptes multiples",
          "Analyses avancées",
          "Assistance dédiée"
        ]
      }
    ],
    recommendation: {
      basic: { why: 'Partez du bon pied ! Comme vous débutez sur Vinted, la formule Básico vous permet de découvrir Vinbot et de gérer vos premières annonces.' },
      pro: {
        whyAutomation: 'Vous souhaitez automatiser vos ventes. Pro inclut ces fonctions pour votre compte unique et accepte un nombre illimité d’annonces.',
        whyVolume: 'Avec plus de 150 annonces, la limite de Básico ne couvrirait pas votre catalogue. Pro accepte un nombre illimité d’annonces.',
        whyBoth: 'Pro couvre votre catalogue de plus de 150 annonces et l’automatisation des ventes nécessaire pour un compte.',
        whyEstablished: 'Comme vous vendez déjà sur Vinted, Pro vous permet de développer votre catalogue sans limite et d’automatiser vos ventes.',
      },
      enterprise: { why: 'Gérez tous vos comptes au même endroit ! Enterprise réunit les fonctions Pro, la gestion multi-comptes et des outils avancés pour plusieurs profils.' },
    },
    faqs: [
      [
        "Que peut faire Vinbot ?",
        "Vinbot réunit des outils pour préparer des annonces, renouveler des articles, répondre à l’intérêt et organiser des règles de négociation selon votre façon de vendre."
      ],
      [
        "Dois-je activer toutes les fonctions ?",
        "Non. Commencez par les fonctions qui vous font gagner le plus de temps et activez les autres lorsqu’elles correspondent à votre activité."
      ],
      [
        "Puis-je décider de ce que fait chaque automatisation ?",
        "Oui. Vous définissez les messages, les limites et les critères avant d’activer chaque fonction. Vinbot suit les règles que vous avez fixées."
      ],
      [
        "Vinbot est-il lié à Vinted ?",
        "Non. Vinbot est un outil indépendant et n’est ni affilié à Vinted, ni associé à Vinted, ni approuvé par Vinted."
      ],
      [
        "Quelle offre me convient ?",
        "Básico convient aux débutants avec un compte et jusqu’à 150 annonces actives. Pro est recommandé si vous vendez déjà avec un compte ou avez davantage d’annonces. Choisissez Enterprise pour gérer plusieurs comptes."
      ],
      [
        "Mon ordinateur doit-il rester allumé ?",
        "Non. Une fois configurées et activées, les automatisations fonctionnent dans le cloud selon vos règles, même lorsque votre ordinateur est éteint."
      ],
      [
        "Que signifie la limite de 150 annonces ?",
        "Il s’agit des annonces actives simultanément, et non du nombre total d’articles vendus. Si votre catalogue dépasse cette limite, consultez Pro."
      ],
      [
        "Annonces illimitées signifie-t-il IA illimitée ?",
        "Ce sont deux notions différentes. La taille du catalogue et l’utilisation de l’IA sont distinctes. Confirmez les limites d’utilisation et le nombre de comptes inclus avant de vous abonner."
      ],
      [
        "Comment gérer mon offre ou demander une résiliation ?",
        "Connectez-vous à votre compte Vinbot pour gérer votre abonnement et les changements d’offre. Avant de confirmer une résiliation, vérifiez les conditions applicables et sa date d’effet. Utilisez le lien de contact si vous avez besoin d’aide."
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

function renderPricing(pageCopy, recommendedPlanId = null) {
  const grid = document.querySelector('#pricing-grid');
  if (!grid) return;
  grid.replaceChildren(...pageCopy.plans.map(plan => {
    const card = document.createElement('article');
    card.className = `pricing-card${plan.id === recommendedPlanId ? ' is-recommended' : ''}`;
    card.dataset.planId = plan.id;
    if (plan.id === recommendedPlanId || (!recommendedPlanId && plan.id === 'pro')) {
      const badge = document.createElement('p');
      badge.className = 'pricing-badge';
      badge.textContent = recommendedPlanId ? pageCopy.recommendedForYou : pageCopy.morePopular;
      card.append(badge);
    }
    const title = document.createElement('h3');
    title.textContent = plan.name;
    const price = document.createElement('p');
    price.className = 'pricing-price';
    price.append(document.createTextNode(`${plan.price} €`));
    const cadence = document.createElement('span');
    cadence.textContent = pageCopy.monthly;
    price.append(cadence);
    const features = document.createElement('ul');
    features.className = 'pricing-features';
    plan.features.forEach(feature => {
      const item = document.createElement('li');
      item.append(makeIcon('check'), document.createTextNode(feature));
      features.append(item);
    });
    const choose = document.createElement('a');
    choose.className = plan.id === recommendedPlanId || (!recommendedPlanId && plan.id === 'pro')
      ? 'button button-primary'
      : 'button button-secondary';
    choose.href = dashboardUrl;
    choose.dataset.planId = plan.id;
    choose.setAttribute('aria-label', `${pageCopy.choosePlan}: ${plan.name}`);
    choose.append(document.createTextNode(pageCopy.choosePlan), makeIcon('arrow-right'));
    card.append(title, price, features, choose);
    return card;
  }));
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
  if (answers.accounts === 'yes') return 'enterprise';
  if (answers.volume !== 'starter') return 'pro';
  if (answers.starting === 'yes') return 'basic';
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

    const reason = planId === 'pro'
      ? (answers.volume !== 'starter' && answers.automation === 'sales'
        ? recommendation.whyBoth
        : answers.volume !== 'starter' ? recommendation.whyVolume
          : answers.automation === 'sales' ? recommendation.whyAutomation : recommendation.whyEstablished)
      : recommendation.why;
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
    price.textContent = `${plan.price} €${pageCopy.monthly}`;
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
    plan.features.slice(0, 3).forEach(feature => {
      const item = document.createElement('li');
      item.append(makeIcon('check'), document.createTextNode(feature));
      features.append(item);
    });
    const link = document.createElement('a');
    link.className = 'result-link';
    link.href = dashboardUrl;
    link.dataset.planId = plan.id;
    link.setAttribute('aria-label', `${pageCopy.choosePlan}: ${plan.name}`);
    link.append(document.createTextNode(pageCopy.choosePlan + ' '), makeIcon('arrow-right'));
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
  renderPricing(pageCopy);
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
