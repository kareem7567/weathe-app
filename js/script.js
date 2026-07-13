(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     THEME TOGGLE
  --------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'kh-portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }

  (function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage unavailable */ }
    applyTheme(saved === 'light' || saved === 'dark' ? saved : 'dark');
  })();

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage unavailable */ }
  });

  /* ---------------------------------------------------------
     LANGUAGE TOGGLE
  --------------------------------------------------------- */
  const langToggle = document.getElementById('langToggle');
  const LANG_KEY = 'kh-portfolio-lang';
  let currentLang = 'en';

  const formStatusText = {
    en: 'Opening your email app to send this…',
    ar: 'جارٍ فتح تطبيق البريد لإرسال الرسالة…',
  };

  function applyLang(lang) {
    currentLang = lang === 'ar' ? 'ar' : 'en';
    root.setAttribute('lang', currentLang);
    root.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-en]').forEach((el) => {
      const value = currentLang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (value !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = value;
        } else {
          el.textContent = value;
        }
      }
    });

    document.querySelectorAll('[data-en-placeholder]').forEach((el) => {
      const value = currentLang === 'ar' ? el.getAttribute('data-ar-placeholder') : el.getAttribute('data-en-placeholder');
      if (value !== null) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-en-aria]').forEach((el) => {
      const value = currentLang === 'ar' ? el.getAttribute('data-ar-aria') : el.getAttribute('data-en-aria');
      if (value !== null) el.setAttribute('aria-label', value);
    });

    langToggle.textContent = currentLang === 'ar' ? 'EN' : 'AR';
    langToggle.setAttribute('aria-pressed', currentLang === 'ar' ? 'true' : 'false');
    langToggle.setAttribute('aria-label', currentLang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');

    restartTerminal();

    if (typeof refreshOpenModal === 'function') refreshOpenModal();
  }

  /* ---------------------------------------------------------
     INTRO SPLASH
  --------------------------------------------------------- */
  const introSplash = document.getElementById('introSplash');
  const introName = document.getElementById('introName');
  const introBarFill = document.getElementById('introBarFill');
  let introStarted = false;

  function hideIntro() {
    if (!introSplash) return;
    introSplash.classList.add('intro-hidden');
    document.body.style.overflow = '';
    setTimeout(() => { 
      if (introSplash.style.display !== 'none') {
        introSplash.style.display = 'none'; 
      }
    }, 650);
  }

  function runIntro() {
    if (!introSplash) return;
    if (introSplash.classList.contains('intro-hidden')) return;
    if (introStarted) return;
    introStarted = true;
    
    const lang = root.getAttribute('lang') || 'en';
    const nameText = lang === 'ar' ? 'كريم هاني' : 'Kareem Hany';

    if (reducedMotion) {
      introName.textContent = nameText;
      introBarFill.style.width = '100%';
      setTimeout(hideIntro, 400);
      return;
    }

    let i = 0;
    function typeName() {
      if (i <= nameText.length) {
        introName.textContent = nameText.slice(0, i);
        i++;
        setTimeout(typeName, 55);
      }
    }
    typeName();

    requestAnimationFrame(() => {
      setTimeout(() => { 
        introBarFill.style.width = '100%'; 
      }, 120);
    });

    setTimeout(hideIntro, 2000);
  }

  function initIntro() {
    setTimeout(() => {
      if (introSplash && !introSplash.classList.contains('intro-hidden')) {
        runIntro();
      } else {
        document.body.style.overflow = '';
        if (introSplash) {
          introSplash.style.display = 'none';
        }
      }
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntro);
  } else {
    initIntro();
  }

  window.addEventListener('load', () => {
    if (introSplash && !introSplash.classList.contains('intro-hidden') && !introStarted) {
      runIntro();
    }
  });

  setTimeout(() => {
    if (introSplash && !introSplash.classList.contains('intro-hidden')) {
      hideIntro();
    }
  }, 5000);

  (function initLang() {
    let saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) { /* storage unavailable */ }
    setTimeout(() => {
      applyLang(saved === 'ar' ? 'ar' : 'en');
    }, 100);
  })();

  langToggle.addEventListener('click', () => {
    const next = currentLang === 'ar' ? 'en' : 'ar';
    applyLang(next);
    try { localStorage.setItem(LANG_KEY, next); } catch (e) { /* storage unavailable */ }
  });

  /* ---------------------------------------------------------
     HERO TERMINAL TYPING EFFECT
  --------------------------------------------------------- */
  const terminalOutput = document.getElementById('terminalOutput');
  let terminalToken = 0;

  const buildLines = {
    en: [
      { text: '$ whoami', cls: '' },
      { text: 'kareem-hany · senior full-stack developer', cls: 'tl-amber' },
      { text: '$ status --check', cls: '' },
      { text: '✓ systems operational', cls: 'tl-ok' },
      { text: '✓ open to new opportunities', cls: 'tl-ok' },
    ],
    ar: [
      { text: '$ whoami', cls: '' },
      { text: 'كريم هاني · مطوّر برمجيات متكامل أول', cls: 'tl-amber' },
      { text: '$ status --check', cls: '' },
      { text: '✓ الأنظمة تعمل بكفاءة', cls: 'tl-ok' },
      { text: '✓ متاح لفرص عمل جديدة', cls: 'tl-ok' },
    ],
  };

  function typeLines(lines, container, token) {
    let lineIndex = 0;
    let charIndex = 0;

    function typeChar() {
      if (token !== terminalToken) return;
      if (lineIndex >= lines.length) return;
      const current = lines[lineIndex];
      if (charIndex === 0) {
        const span = document.createElement('div');
        span.className = current.cls;
        span.setAttribute('data-line', lineIndex);
        container.appendChild(span);
      }
      const activeSpan = container.querySelector(`[data-line="${lineIndex}"]`);
      if (charIndex <= current.text.length) {
        activeSpan.textContent = current.text.slice(0, charIndex);
        charIndex++;
        setTimeout(typeChar, current.text.startsWith('$') ? 34 : 16);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeChar, 260);
      }
    }
    typeChar();
  }

  function restartTerminal() {
    if (!terminalOutput) return;
    terminalToken++;
    terminalOutput.innerHTML = '';
    const lines = buildLines[currentLang] || buildLines.en;
    if (reducedMotion) {
      lines.forEach((line) => {
        const div = document.createElement('div');
        div.className = line.cls;
        div.textContent = line.text;
        terminalOutput.appendChild(div);
      });
    } else {
      typeLines(lines, terminalOutput, terminalToken);
    }
  }

  /* ---------------------------------------------------------
     PROJECT MODAL
  --------------------------------------------------------- */
  const PROJECTS = {
    nimbus: {
      title: 'Nimbus',
      tagline: {
        en: 'A cloud cost analytics platform that surfaces spend anomalies across AWS accounts in real time.',
        ar: 'منصة تحليل تكاليف سحابية تكتشف الإنفاق غير الطبيعي عبر حسابات AWS لحظيًا.',
      },
      stack: ['React', 'Go', 'AWS'],
      overview: {
        en: 'Nimbus began as an internal script for flagging runaway AWS bills and grew into a full analytics platform used by finance and engineering teams across the company.',
        ar: 'بدأ Nimbus كسكربت داخلي لرصد فواتير AWS غير المتوقعة، وتطوّر ليصبح منصة تحليلات كاملة.',
      },
      impact: {
        en: [
          'Cut monthly cloud spend by 30% within the first quarter',
          'Reduced anomaly detection time from days to under 15 minutes',
          'Adopted by 4 engineering teams as the default cost dashboard',
        ],
        ar: [
          'خفض الإنفاق السحابي الشهري بنسبة 30% خلال أول ربع سنة',
          'قلّص وقت اكتشاف الأنماط الشاذة من أيام إلى أقل من 15 دقيقة',
          'اعتمدته 4 فرق هندسية كلوحة التكلفة الافتراضية',
        ],
      },
    },
    'ledger-flow': {
      title: 'Ledger Flow',
      tagline: {
        en: 'A real-time payments reconciliation engine with sub-second consistency guarantees.',
        ar: 'محرك تسوية مدفوعات لحظي بضمان اتساق أقل من ثانية.',
      },
      stack: ['Node.js', 'PostgreSQL', 'Kafka'],
      overview: {
        en: 'Built to replace a fragile spreadsheet-based reconciliation process, Ledger Flow matches incoming payment events against internal ledgers in real time.',
        ar: 'بُني ليحل محل عملية تسوية يدوية تعتمد على جداول بيانات هشة، ويقوم بمطابقة أحداث الدفع لحظيًا.',
      },
      impact: {
        en: [
          'Processes over 2M transactions monthly with sub-second matching',
          'Eliminated 90% of manual reconciliation work',
          'Zero missed-payment incidents since launch',
        ],
        ar: [
          'يعالج أكثر من 2 مليون معاملة شهريًا بمطابقة أقل من ثانية',
          'ألغى 90% من العمل اليدوي في التسوية',
          'صفر حوادث دفع مفقودة منذ الإطلاق',
        ],
      },
    },
    'pulse-crm': {
      title: 'Pulse CRM',
      tagline: {
        en: 'A lightweight customer-engagement platform built for SMBs.',
        ar: 'منصة إدارة علاقات عملاء خفيفة مصممة للشركات الصغيرة والمتوسطة.',
      },
      stack: ['Next.js', 'Django', 'Redis'],
      overview: {
        en: 'Pulse CRM consolidates leads, follow-ups, and support tickets into a single pipeline for small teams.',
        ar: 'يجمع Pulse CRM بين العملاء المحتملين والمتابعات وتذاكر الدعم في مسار واحد.',
      },
      impact: {
        en: [
          'Replaced 3 disconnected tools with one workflow',
          'Cut average lead response time from 8 hours to 45 minutes',
          'Onboarded 200+ SMB accounts in the first year',
        ],
        ar: [
          'استبدل 3 أدوات منفصلة بمسار عمل واحد',
          'خفّض متوسط زمن الرد على العملاء المحتملين من 8 ساعات إلى 45 دقيقة',
          'استقطب أكثر من 200 حساب من الشركات الصغيرة في العام الأول',
        ],
      },
    },
    devdeck: {
      title: 'DevDeck',
      tagline: {
        en: 'An internal developer platform and CLI toolkit for fast service scaffolding.',
        ar: 'منصة تطوير داخلية وأدوات سطر أوامر لتجهيز الخدمات بسرعة.',
      },
      stack: ['TypeScript', 'Docker', 'Terraform'],
      overview: {
        en: 'DevDeck scaffolds new services with sane defaults — logging, health checks, CI config — so engineers write features, not boilerplate.',
        ar: 'تنشئ DevDeck خدمات جديدة بإعدادات جاهزة — تسجيل الأحداث، فحوصات الصحة، إعدادات CI.',
      },
      impact: {
        en: [
          'Cut new-service setup time from 2 days to under 15 minutes',
          'Standardized tooling across 12+ internal services',
          'Became the default onboarding step for new engineers',
        ],
        ar: [
          'خفّض وقت تجهيز خدمة جديدة من يومين إلى أقل من 15 دقيقة',
          'وحّد الأدوات المستخدمة عبر أكثر من 12 خدمة داخلية',
          'أصبح الخطوة الافتراضية لتهيئة المهندسين الجدد',
        ],
      },
    },
    'marketplace-api': {
      title: 'Marketplace API',
      tagline: {
        en: 'A public GraphQL API powering a multi-vendor marketplace at scale.',
        ar: 'واجهة GraphQL عامة تشغّل سوقًا إلكترونيًا متعدد البائعين.',
      },
      stack: ['GraphQL', 'Kubernetes', 'Python'],
      overview: {
        en: 'A public GraphQL layer sitting in front of a multi-vendor marketplace\'s core services, built to absorb seasonal traffic spikes.',
        ar: 'طبقة GraphQL عامة أمام الخدمات الأساسية لسوق إلكتروني متعدد البائعين، صُممت لاستيعاب ذروة الطلب الموسمية.',
      },
      impact: {
        en: [
          'Handled a 6x traffic spike during peak season with no downtime',
          'Reduced average API response time by 38%',
          'Cut integration time for new vendor partners from weeks to days',
        ],
        ar: [
          'استوعب ارتفاعًا في الطلب بمقدار 6 أضعاف في موسم الذروة دون أي تعطل',
          'خفّض متوسط زمن استجابة الواجهة بنسبة 38%',
          'قلّص وقت دمج شركاء بائعين جدد من أسابيع إلى أيام',
        ],
      },
    },
    aegis: {
      title: 'Aegis',
      tagline: {
        en: 'A zero-trust authentication and identity platform for B2B SaaS products.',
        ar: 'منصة مصادقة وهوية بنموذج الثقة الصفرية لمنتجات B2B SaaS.',
      },
      stack: ['TypeScript', 'Redis', 'OAuth2'],
      overview: {
        en: 'Aegis centralizes authentication for a portfolio of B2B products under one zero-trust identity layer.',
        ar: 'يوحّد Aegis عمليات المصادقة لمجموعة من منتجات B2B ضمن طبقة هوية واحدة بنموذج الثقة الصفرية.',
      },
      impact: {
        en: [
          'Cut customer security-review cycles by 60%',
          'Consolidated 5 legacy login systems into one',
          'Passed SOC 2 Type II audit on first attempt',
        ],
        ar: [
          'خفّض دورات مراجعة الأمان لدى العملاء بنسبة 60%',
          'دمج 5 أنظمة دخول قديمة في نظام واحد',
          'اجتاز تدقيق SOC 2 Type II من أول محاولة',
        ],
      },
    },
  };

  const projectModal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTagline = document.getElementById('modalTagline');
  const modalStack = document.getElementById('modalStack');
  const modalOverview = document.getElementById('modalOverview');
  const modalImpact = document.getElementById('modalImpact');
  const modalClose = document.getElementById('modalClose');
  let activeProjectId = null;
  let lastFocusedEl = null;

  function renderModal(id) {
    const data = PROJECTS[id];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalTagline.textContent = data.tagline[currentLang] || data.tagline.en;
    modalOverview.textContent = data.overview[currentLang] || data.overview.en;
    modalStack.innerHTML = '';
    data.stack.forEach((tech) => {
      const span = document.createElement('span');
      span.textContent = tech;
      modalStack.appendChild(span);
    });
    modalImpact.innerHTML = '';
    (data.impact[currentLang] || data.impact.en).forEach((point) => {
      const li = document.createElement('li');
      li.textContent = point;
      modalImpact.appendChild(li);
    });
  }

  function openModal(id) {
    if (!PROJECTS[id] || !projectModal) return;
    activeProjectId = id;
    lastFocusedEl = document.activeElement;
    renderModal(id);
    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeProjectId = null;
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus();
  }

  function refreshOpenModal() {
    if (activeProjectId) renderModal(activeProjectId);
  }

  document.querySelectorAll('.project-link[data-project]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(link.getAttribute('data-project'));
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeProjectId) closeModal();
  });

  /* ---------------------------------------------------------
     MOBILE NAV
  --------------------------------------------------------- */
  const navBurger = document.getElementById('navBurger');
  const siteNav = document.getElementById('siteNav');

  navBurger.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navBurger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navBurger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------
     SCROLL-TRIGGERED FADE-INS
  --------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------
     UPTIME COUNTER
  --------------------------------------------------------- */
  const uptimeEl = document.getElementById('uptimeCounter');
  if (uptimeEl) {
    let seconds = 0;
    function pad(n) { return String(n).padStart(2, '0'); }
    function tick() {
      seconds++;
      const h = pad(Math.floor(seconds / 3600));
      const m = pad(Math.floor((seconds % 3600) / 60));
      const s = pad(seconds % 60);
      uptimeEl.textContent = `${h}:${m}:${s}`;
    }
    setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------
     CONTACT FORM
  --------------------------------------------------------- */
  const CONTACT_EMAIL = 'karim5761476@gamil.com';
  const CONTACT_PHONE = '201501088476';
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(
        `${message}\n\n---\nName: ${name}\nEmail: ${email}\nPhone: +20 ${CONTACT_PHONE}`
      );
      const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

      formStatus.textContent = formStatusText[currentLang] || formStatusText.en;
      window.location.href = mailtoLink;

      contactForm.reset();
      setTimeout(() => { formStatus.textContent = ''; }, 6000);
    });
  }

  /* ---------------------------------------------------------
     FOOTER YEAR
  --------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     THEME TOGGLE
  --------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'kh-portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }
  }

  (function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage unavailable */ }
    applyTheme(saved === 'light' || saved === 'dark' ? saved : 'dark');
  })();

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------------------------------------------------------
     LANGUAGE TOGGLE
  --------------------------------------------------------- */
  const langToggle = document.getElementById('langToggle');
  const LANG_KEY = 'kh-portfolio-lang';
  let currentLang = 'en';

  const formStatusText = {
    en: 'Opening your email app to send this…',
    ar: 'جارٍ فتح تطبيق البريد لإرسال الرسالة…',
  };

  function applyLang(lang) {
    currentLang = lang === 'ar' ? 'ar' : 'en';
    root.setAttribute('lang', currentLang);
    root.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-en]').forEach(function(el) {
      const value = currentLang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (value !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = value;
        } else {
          el.textContent = value;
        }
      }
    });

    document.querySelectorAll('[data-en-placeholder]').forEach(function(el) {
      const value = currentLang === 'ar' ? el.getAttribute('data-ar-placeholder') : el.getAttribute('data-en-placeholder');
      if (value !== null) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-en-aria]').forEach(function(el) {
      const value = currentLang === 'ar' ? el.getAttribute('data-ar-aria') : el.getAttribute('data-en-aria');
      if (value !== null) el.setAttribute('aria-label', value);
    });

    if (langToggle) {
      langToggle.textContent = currentLang === 'ar' ? 'EN' : 'AR';
      langToggle.setAttribute('aria-pressed', currentLang === 'ar' ? 'true' : 'false');
      langToggle.setAttribute('aria-label', currentLang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    }

    restartTerminal();

    if (typeof refreshOpenModal === 'function') refreshOpenModal();
  }

  /* ---------------------------------------------------------
     INTRO SPLASH
  --------------------------------------------------------- */
  const introSplash = document.getElementById('introSplash');
  const introName = document.getElementById('introName');
  const introBarFill = document.getElementById('introBarFill');
  let introStarted = false;

  function hideIntro() {
    if (!introSplash) return;
    introSplash.classList.add('intro-hidden');
    document.body.style.overflow = '';
    setTimeout(function() { 
      if (introSplash.style.display !== 'none') {
        introSplash.style.display = 'none'; 
      }
    }, 650);
  }

  function runIntro() {
    if (!introSplash) return;
    if (introSplash.classList.contains('intro-hidden')) return;
    if (introStarted) return;
    introStarted = true;
    
    const lang = root.getAttribute('lang') || 'en';
    const nameText = lang === 'ar' ? 'كريم هاني' : 'Kareem Hany';

    if (reducedMotion) {
      if (introName) introName.textContent = nameText;
      if (introBarFill) introBarFill.style.width = '100%';
      setTimeout(hideIntro, 400);
      return;
    }

    let i = 0;
    function typeName() {
      if (!introName) return;
      if (i <= nameText.length) {
        introName.textContent = nameText.slice(0, i);
        i++;
        setTimeout(typeName, 55);
      }
    }
    typeName();

    requestAnimationFrame(function() {
      setTimeout(function() { 
        if (introBarFill) introBarFill.style.width = '100%'; 
      }, 120);
    });

    setTimeout(hideIntro, 2000);
  }

  function initIntro() {
    setTimeout(function() {
      if (introSplash && !introSplash.classList.contains('intro-hidden')) {
        runIntro();
      } else {
        document.body.style.overflow = '';
        if (introSplash) {
          introSplash.style.display = 'none';
        }
      }
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntro);
  } else {
    initIntro();
  }

  window.addEventListener('load', function() {
    if (introSplash && !introSplash.classList.contains('intro-hidden') && !introStarted) {
      runIntro();
    }
  });

  setTimeout(function() {
    if (introSplash && !introSplash.classList.contains('intro-hidden')) {
      hideIntro();
    }
  }, 5000);

  (function initLang() {
    let saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) { /* storage unavailable */ }
    setTimeout(function() {
      applyLang(saved === 'ar' ? 'ar' : 'en');
    }, 100);
  })();

  if (langToggle) {
    langToggle.addEventListener('click', function() {
      const next = currentLang === 'ar' ? 'en' : 'ar';
      applyLang(next);
      try { localStorage.setItem(LANG_KEY, next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------------------------------------------------------
     HERO TERMINAL TYPING EFFECT
  --------------------------------------------------------- */
  const terminalOutput = document.getElementById('terminalOutput');
  let terminalToken = 0;

  const buildLines = {
    en: [
      { text: '$ whoami', cls: '' },
      { text: 'kareem-hany · senior full-stack developer', cls: 'tl-amber' },
      { text: '$ status --check', cls: '' },
      { text: '✓ systems operational', cls: 'tl-ok' },
      { text: '✓ open to new opportunities', cls: 'tl-ok' },
    ],
    ar: [
      { text: '$ whoami', cls: '' },
      { text: 'كريم هاني · مطوّر برمجيات متكامل أول', cls: 'tl-amber' },
      { text: '$ status --check', cls: '' },
      { text: '✓ الأنظمة تعمل بكفاءة', cls: 'tl-ok' },
      { text: '✓ متاح لفرص عمل جديدة', cls: 'tl-ok' },
    ],
  };

  function typeLines(lines, container, token) {
    let lineIndex = 0;
    let charIndex = 0;

    function typeChar() {
      if (token !== terminalToken) return;
      if (lineIndex >= lines.length) return;
      var current = lines[lineIndex];
      if (charIndex === 0) {
        var span = document.createElement('div');
        span.className = current.cls;
        span.setAttribute('data-line', lineIndex);
        container.appendChild(span);
      }
      var activeSpan = container.querySelector('[data-line="' + lineIndex + '"]');
      if (charIndex <= current.text.length) {
        activeSpan.textContent = current.text.slice(0, charIndex);
        charIndex++;
        setTimeout(typeChar, current.text.startsWith('$') ? 34 : 16);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeChar, 260);
      }
    }
    typeChar();
  }

  function restartTerminal() {
    if (!terminalOutput) return;
    terminalToken++;
    terminalOutput.innerHTML = '';
    var lines = buildLines[currentLang] || buildLines.en;
    if (reducedMotion) {
      lines.forEach(function(line) {
        var div = document.createElement('div');
        div.className = line.cls;
        div.textContent = line.text;
        terminalOutput.appendChild(div);
      });
    } else {
      typeLines(lines, terminalOutput, terminalToken);
    }
  }

  /* ---------------------------------------------------------
     PROJECT MODAL
  --------------------------------------------------------- */
  var PROJECTS = {
    nimbus: {
      title: 'Nimbus',
      tagline: {
        en: 'A cloud cost analytics platform that surfaces spend anomalies across AWS accounts in real time.',
        ar: 'منصة تحليل تكاليف سحابية تكتشف الإنفاق غير الطبيعي عبر حسابات AWS لحظيًا.',
      },
      stack: ['React', 'Go', 'AWS'],
      overview: {
        en: 'Nimbus began as an internal script for flagging runaway AWS bills and grew into a full analytics platform.',
        ar: 'بدأ Nimbus كسكربت داخلي لرصد فواتير AWS غير المتوقعة، وتطوّر ليصبح منصة تحليلات كاملة.',
      },
      impact: {
        en: [
          'Cut monthly cloud spend by 30% within the first quarter',
          'Reduced anomaly detection time from days to under 15 minutes',
          'Adopted by 4 engineering teams as the default cost dashboard',
        ],
        ar: [
          'خفض الإنفاق السحابي الشهري بنسبة 30% خلال أول ربع سنة',
          'قلّص وقت اكتشاف الأنماط الشاذة من أيام إلى أقل من 15 دقيقة',
          'اعتمدته 4 فرق هندسية كلوحة التكلفة الافتراضية',
        ],
      },
    },
    'ledger-flow': {
      title: 'Ledger Flow',
      tagline: {
        en: 'A real-time payments reconciliation engine with sub-second consistency guarantees.',
        ar: 'محرك تسوية مدفوعات لحظي بضمان اتساق أقل من ثانية.',
      },
      stack: ['Node.js', 'PostgreSQL', 'Kafka'],
      overview: {
        en: 'Built to replace a fragile spreadsheet-based reconciliation process.',
        ar: 'بُني ليحل محل عملية تسوية يدوية تعتمد على جداول بيانات هشة.',
      },
      impact: {
        en: [
          'Processes over 2M transactions monthly with sub-second matching',
          'Eliminated 90% of manual reconciliation work',
          'Zero missed-payment incidents since launch',
        ],
        ar: [
          'يعالج أكثر من 2 مليون معاملة شهريًا بمطابقة أقل من ثانية',
          'ألغى 90% من العمل اليدوي في التسوية',
          'صفر حوادث دفع مفقودة منذ الإطلاق',
        ],
      },
    },
    'pulse-crm': {
      title: 'Pulse CRM',
      tagline: {
        en: 'A lightweight customer-engagement platform built for SMBs.',
        ar: 'منصة إدارة علاقات عملاء خفيفة مصممة للشركات الصغيرة والمتوسطة.',
      },
      stack: ['Next.js', 'Django', 'Redis'],
      overview: {
        en: 'Pulse CRM consolidates leads, follow-ups, and support tickets into a single pipeline.',
        ar: 'يجمع Pulse CRM بين العملاء المحتملين والمتابعات وتذاكر الدعم في مسار واحد.',
      },
      impact: {
        en: [
          'Replaced 3 disconnected tools with one workflow',
          'Cut average lead response time from 8 hours to 45 minutes',
          'Onboarded 200+ SMB accounts in the first year',
        ],
        ar: [
          'استبدل 3 أدوات منفصلة بمسار عمل واحد',
          'خفّض متوسط زمن الرد على العملاء المحتملين من 8 ساعات إلى 45 دقيقة',
          'استقطب أكثر من 200 حساب من الشركات الصغيرة في العام الأول',
        ],
      },
    },
    devdeck: {
      title: 'DevDeck',
      tagline: {
        en: 'An internal developer platform and CLI toolkit for fast service scaffolding.',
        ar: 'منصة تطوير داخلية وأدوات سطر أوامر لتجهيز الخدمات بسرعة.',
      },
      stack: ['TypeScript', 'Docker', 'Terraform'],
      overview: {
        en: 'DevDeck scaffolds new services with sane defaults.',
        ar: 'تنشئ DevDeck خدمات جديدة بإعدادات جاهزة.',
      },
      impact: {
        en: [
          'Cut new-service setup time from 2 days to under 15 minutes',
          'Standardized tooling across 12+ internal services',
          'Became the default onboarding step for new engineers',
        ],
        ar: [
          'خفّض وقت تجهيز خدمة جديدة من يومين إلى أقل من 15 دقيقة',
          'وحّد الأدوات المستخدمة عبر أكثر من 12 خدمة داخلية',
          'أصبح الخطوة الافتراضية لتهيئة المهندسين الجدد',
        ],
      },
    },
    'marketplace-api': {
      title: 'Marketplace API',
      tagline: {
        en: 'A public GraphQL API powering a multi-vendor marketplace at scale.',
        ar: 'واجهة GraphQL عامة تشغّل سوقًا إلكترونيًا متعدد البائعين.',
      },
      stack: ['GraphQL', 'Kubernetes', 'Python'],
      overview: {
        en: 'A public GraphQL layer built to absorb seasonal traffic spikes.',
        ar: 'طبقة GraphQL عامة صُممت لاستيعاب ذروة الطلب الموسمية.',
      },
      impact: {
        en: [
          'Handled a 6x traffic spike during peak season with no downtime',
          'Reduced average API response time by 38%',
          'Cut integration time for new vendor partners from weeks to days',
        ],
        ar: [
          'استوعب ارتفاعًا في الطلب بمقدار 6 أضعاف في موسم الذروة دون أي تعطل',
          'خفّض متوسط زمن استجابة الواجهة بنسبة 38%',
          'قلّص وقت دمج شركاء بائعين جدد من أسابيع إلى أيام',
        ],
      },
    },
    aegis: {
      title: 'Aegis',
      tagline: {
        en: 'A zero-trust authentication and identity platform for B2B SaaS products.',
        ar: 'منصة مصادقة وهوية بنموذج الثقة الصفرية لمنتجات B2B SaaS.',
      },
      stack: ['TypeScript', 'Redis', 'OAuth2'],
      overview: {
        en: 'Aegis centralizes authentication under one zero-trust identity layer.',
        ar: 'يوحّد Aegis عمليات المصادقة ضمن طبقة هوية واحدة بنموذج الثقة الصفرية.',
      },
      impact: {
        en: [
          'Cut customer security-review cycles by 60%',
          'Consolidated 5 legacy login systems into one',
          'Passed SOC 2 Type II audit on first attempt',
        ],
        ar: [
          'خفّض دورات مراجعة الأمان لدى العملاء بنسبة 60%',
          'دمج 5 أنظمة دخول قديمة في نظام واحد',
          'اجتاز تدقيق SOC 2 Type II من أول محاولة',
        ],
      },
    },
  };

  var projectModal = document.getElementById('projectModal');
  var modalTitle = document.getElementById('modalTitle');
  var modalTagline = document.getElementById('modalTagline');
  var modalStack = document.getElementById('modalStack');
  var modalOverview = document.getElementById('modalOverview');
  var modalImpact = document.getElementById('modalImpact');
  var modalClose = document.getElementById('modalClose');
  var activeProjectId = null;
  var lastFocusedEl = null;

  function renderModal(id) {
    var data = PROJECTS[id];
    if (!data) return;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalTagline) modalTagline.textContent = data.tagline[currentLang] || data.tagline.en;
    if (modalOverview) modalOverview.textContent = data.overview[currentLang] || data.overview.en;
    if (modalStack) {
      modalStack.innerHTML = '';
      data.stack.forEach(function(tech) {
        var span = document.createElement('span');
        span.textContent = tech;
        modalStack.appendChild(span);
      });
    }
    if (modalImpact) {
      modalImpact.innerHTML = '';
      (data.impact[currentLang] || data.impact.en).forEach(function(point) {
        var li = document.createElement('li');
        li.textContent = point;
        modalImpact.appendChild(li);
      });
    }
  }

  function openModal(id) {
    if (!PROJECTS[id] || !projectModal) return;
    activeProjectId = id;
    lastFocusedEl = document.activeElement;
    renderModal(id);
    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeProjectId = null;
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus();
  }

  function refreshOpenModal() {
    if (activeProjectId) renderModal(activeProjectId);
  }

  document.querySelectorAll('.project-link[data-project]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(link.getAttribute('data-project'));
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', function(e) {
      if (e.target === projectModal) closeModal();
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && activeProjectId) closeModal();
  });

  /* ---------------------------------------------------------
     MOBILE NAV
  --------------------------------------------------------- */
  var navBurger = document.getElementById('navBurger');
  var siteNav = document.getElementById('siteNav');

  if (navBurger && siteNav) {
    navBurger.addEventListener('click', function() {
      var isOpen = siteNav.classList.toggle('is-open');
      navBurger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    siteNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        siteNav.classList.remove('is-open');
        navBurger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------
     SCROLL-TRIGGERED FADE-INS
  --------------------------------------------------------- */
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(function(el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function(el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------
     UPTIME COUNTER
  --------------------------------------------------------- */
  var uptimeEl = document.getElementById('uptimeCounter');
  if (uptimeEl) {
    var seconds = 0;
    function pad(n) { return String(n).padStart(2, '0'); }
    function tick() {
      seconds++;
      var h = pad(Math.floor(seconds / 3600));
      var m = pad(Math.floor((seconds % 3600) / 60));
      var s = pad(seconds % 60);
      uptimeEl.textContent = h + ':' + m + ':' + s;
    }
    setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------
     CONTACT FORM
  --------------------------------------------------------- */
  var CONTACT_EMAIL = 'karim5761476@gamil.com';
  var CONTACT_PHONE = '201501088476';
  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      var subject = encodeURIComponent('Portfolio contact from ' + name);
      var body = encodeURIComponent(
        message + '\n\n---\nName: ' + name + '\nEmail: ' + email + '\nPhone: +20 ' + CONTACT_PHONE
      );
      var mailtoLink = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;

      if (formStatus) {
        formStatus.textContent = formStatusText[currentLang] || formStatusText.en;
      }
      window.location.href = mailtoLink;

      contactForm.reset();
      setTimeout(function() { if (formStatus) formStatus.textContent = ''; }, 6000);
    });
  }

  /* ---------------------------------------------------------
     FOOTER YEAR
  --------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();