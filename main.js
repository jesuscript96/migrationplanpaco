// ==========================================================================
// Plan de acompañamiento al cambio de aplicación - Lógica interactiva
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initPhaseStepInteractions();
  initWeeklyCalendar();
  initFeaturedDeliverables();
  initDeliverableCatalogue();
  initDepartmentPlans();
  initModuleExpanders();
  initResourcesEstimate();
  initCollapsibleSections();
  initSmoothScrollLinks();
});

/* ==========================================================================
   1. Navbar Scroll & Shadow Effect
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  const scrollThreshold = 20;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/* ==========================================================================
   2. Mobile Menu Navigation
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu-overlay');

  if (!mobileToggle || !mobileMenu) return;

  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    mobileToggle.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
    });
  });
}

/* ==========================================================================
   Etiquetas de equipos (lenguaje claro, sin tecnicismos)
   ========================================================================== */
const teamLabels = {
  tecnico: { text: 'Equipo Técnico', class: 'tag-ti' },
  cuentas: { text: 'Cuentas', class: 'tag-cs' },
  ventas: { text: 'Ventas', class: 'tag-ventas' },
  soporte: { text: 'Atención al usuario', class: 'tag-soporte' }
};

function renderTeamPills(teams) {
  return teams.map(t => {
    const label = teamLabels[t];
    return `<span class="impact-pill ${label.class}">${label.text}</span>`;
  }).join('');
}

function renderAvisos(avisos) {
  return avisos.map(a => `
    <div class="aviso-item">
      <i class="bi bi-exclamation-triangle-fill"></i>
      <p>${a}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   3. Fases del Plan (qué analizamos, fechas y avisos)
   ========================================================================== */
const phasesData = {
  1: {
    title: 'Fase 1: Análisis y punto de partida',
    time: 'Mes -2 · Semanas 1 a 4',
    desc: 'Antes de tocar nada, dedicamos las primeras semanas a entender a fondo la situación de tu cliente y de sus usuarios. Es la fase en la que más escuchamos, revisamos y ordenamos, para que el resto del plan no traiga sorpresas.',
    analiza: [
      'Cómo es hoy la aplicación y qué va a notar cada tipo de usuario cuando llegue la nueva versión.',
      'Qué empresas cliente (como podría ser la casa de Toño) tienen su propia app con su marca, porque esas piden un cuidado especial.',
      'El estado de las cuentas en las tiendas de aplicaciones (App Store y Google Play) y los accesos necesarios para publicar.'
    ],
    avisos: [
      'Las apps con la marca propia de cada empresa tardan más en aprobarse: hay que detectarlas ya para no llegar tarde.',
      'Si falta algún acceso o permiso en las tiendas, conviene resolverlo ahora y no el día del cambio.'
    ],
    equipos: ['tecnico', 'cuentas']
  },
  2: {
    title: 'Fase 2: Preparación de los equipos y los materiales',
    time: 'Mes -1 · Semanas 5 a 8',
    desc: 'Con el análisis claro, preparamos a las personas y los materiales. El objetivo es que, cuando llegue el cambio, nadie se sienta perdido: ni los usuarios de tu cliente, ni los equipos que los atienden.',
    analiza: [
      'Las dudas más habituales de los usuarios, para anticiparlas en las guías y los manuales.',
      'Qué necesita saber cada equipo del cliente (atención al usuario, ventas, cuentas) para responder con seguridad desde el primer día.',
      'Cómo y cuándo avisar a los usuarios del cambio, sin agobiar pero sin pillarles por sorpresa.'
    ],
    avisos: [
      'Si el equipo de atención al usuario no conoce la nueva versión antes del cambio, se saturará de consultas.',
      'Avisar demasiado tarde genera desconfianza; avisar demasiado pronto se olvida. El calendario de avisos importa.'
    ],
    equipos: ['soporte', 'ventas', 'cuentas']
  },
  3: {
    title: 'Fase 3: El cambio, paso a paso',
    time: 'Mes 0 · El cambio',
    desc: 'Llega el momento del cambio. En lugar de cambiar a todo el mundo de golpe, lo hacemos por grupos y vamos comprobando que todo funcione antes de seguir. Así, si algo se tuerce, afecta a pocos y se corrige rápido.',
    analiza: [
      'Cómo responde la aplicación a medida que entran más usuarios, para ir abriendo el cambio con seguridad.',
      'Qué incidencias aparecen y a quién afectan, para resolver primero lo que más molesta a los usuarios.',
      'El orden en que entran las empresas con app propia, que van al final por necesitar su propia publicación.'
    ],
    avisos: [
      'Cambiar a todos el mismo día es el mayor riesgo del proyecto: por eso vamos por grupos.',
      'Las empresas con marca propia dependen de los plazos de las tiendas, que no controlamos del todo.'
    ],
    equipos: ['tecnico', 'soporte']
  },
  4: {
    title: 'Fase 4: Acompañamiento y seguimiento',
    time: 'Mes +1 · Después del cambio',
    desc: 'El cambio no termina el día del lanzamiento. Durante las semanas siguientes acompañamos de cerca a tu cliente, resolvemos con prioridad lo que vaya surgiendo y medimos cómo están viviendo el cambio sus usuarios.',
    analiza: [
      'Cómo están usando los usuarios la nueva versión y dónde se atascan, para seguir mejorando las guías.',
      'Qué incidencias siguen llegando, para cerrarlas antes de dar el proyecto por terminado.',
      'El grado de satisfacción de los usuarios y de las empresas cliente con el cambio.'
    ],
    avisos: [
      'Retirar el acompañamiento demasiado pronto deja al cliente solo justo cuando más dudas surgen.',
      'Conviene recoger la opinión de los usuarios mientras el cambio está reciente, no meses después.'
    ],
    equipos: ['cuentas', 'tecnico']
  }
};

function initPhaseStepInteractions() {
  const steps = document.querySelectorAll('.phase-step-card');
  const detailsPanel = document.getElementById('phase-details-panel');

  if (!steps.length || !detailsPanel) return;

  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const phaseId = step.getAttribute('data-phase');
      updatePhaseDetails(phaseId);
    });
  });

  updatePhaseDetails('1');
}

function updatePhaseDetails(id) {
  const detailsPanel = document.getElementById('phase-details-panel');
  const data = phasesData[id];

  if (!data || !detailsPanel) return;

  const analizaList = data.analiza.map(a => `<li>${a}</li>`).join('');

  detailsPanel.innerHTML = `
    <div class="phase-details-content animate-fade">
      <div class="details-left">
        <span class="step-time">${data.time}</span>
        <h3>${data.title}</h3>
        <p class="desc">${data.desc}</p>

        <h4><i class="bi bi-search"></i> Qué analizamos en esta fase</h4>
        <ul>
          ${analizaList}
        </ul>
      </div>

      <div class="details-right">
        <div class="avisos-block">
          <h4 class="avisos-title"><i class="bi bi-exclamation-triangle-fill"></i> Puntos de atención</h4>
          ${renderAvisos(data.avisos)}
        </div>
        <div class="details-teams">
          <h4 class="teams-title">Equipos que entran en juego</h4>
          <div class="step-impact-pills">${renderTeamPills(data.equipos)}</div>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   4. El plan de cada equipo (centro del planteamiento)
   ========================================================================== */
const departmentPlans = {
  soporte: {
    title: 'Atención al usuario',
    icon: 'bi-headset',
    role: 'Las personas que responden cuando un usuario llama o escribe porque algo no le cuadra. Son la primera cara del cambio.',
    analiza: [
      'Las preguntas que más se repiten hoy, para tenerlas resueltas de antemano.',
      'Qué partes de la nueva versión pueden generar más dudas según el tipo de usuario.'
    ],
    timeline: [
      { fase: 'Fase 1', periodo: 'Mes -2', accion: 'Revisamos juntos las dudas más frecuentes de los usuarios para saber qué reforzar.' },
      { fase: 'Fase 2', periodo: 'Mes -1', accion: 'Formamos al equipo en la nueva versión y le entregamos guías de respuesta rápidas.' },
      { fase: 'Fase 3', periodo: 'Mes 0', accion: 'Acompañamos al equipo durante el cambio para resolver en caliente lo inesperado.' },
      { fase: 'Fase 4', periodo: 'Mes +1', accion: 'Ajustamos las guías con las dudas reales que han surgido tras el cambio.' }
    ],
    entregables: [
      'Guía de respuestas rápidas para atender a los usuarios.',
      'Formación práctica sobre la nueva versión.'
    ],
    avisos: [
      'Si el equipo no conoce la nueva versión antes del cambio, las consultas se acumulan y la experiencia del usuario se resiente.'
    ]
  },
  ventas: {
    title: 'Ventas y Marketing',
    icon: 'bi-graph-up-arrow',
    role: 'El equipo que habla con clientes nuevos y potenciales. Para ellos, el cambio es una oportunidad de mostrar una aplicación renovada.',
    analiza: [
      'Qué mejora con la nueva versión, para poder contarlo de forma clara y honesta.',
      'Qué dudas pueden tener los clientes potenciales al ver el cambio.'
    ],
    timeline: [
      { fase: 'Fase 1', periodo: 'Mes -2', accion: 'Identificamos los puntos fuertes del cambio que ayudan a vender mejor.' },
      { fase: 'Fase 2', periodo: 'Mes -1', accion: 'Les preparamos un material claro de "qué cambia y por qué es mejor".' },
      { fase: 'Fase 3', periodo: 'Mes 0', accion: 'Coordinamos el mensaje para que ventas cuente lo mismo que ve el usuario.' },
      { fase: 'Fase 4', periodo: 'Mes +1', accion: 'Compartimos los resultados del cambio como argumento de venta.' }
    ],
    entregables: [
      'Documento de "qué cambia y por qué mejora" para usar con clientes.'
    ],
    avisos: [
      'Si ventas promete algo que la nueva versión todavía no hace, se genera frustración. El mensaje debe ir alineado con la realidad.'
    ]
  },
  cuentas: {
    title: 'Cuentas y grandes clientes',
    icon: 'bi-heart-pulse',
    role: 'Las personas que cuidan la relación con las empresas cliente más importantes, como podría ser la casa de Toño. Son quienes dan la cara ante los grandes clientes.',
    analiza: [
      'Qué empresas cliente necesitan un trato especial, sobre todo las que tienen su propia app con su marca.',
      'Cómo explicar a cada empresa, en su idioma, qué va a cambiar para sus usuarios.'
    ],
    timeline: [
      { fase: 'Fase 1', periodo: 'Mes -2', accion: 'Mapeamos las cuentas grandes y avisamos con tiempo a las que tienen app propia.' },
      { fase: 'Fase 2', periodo: 'Mes -1', accion: 'Damos a cada cuenta un kit para comunicar el cambio a sus propios usuarios.' },
      { fase: 'Fase 3', periodo: 'Mes 0', accion: 'Acompañamos de cerca a las cuentas grandes durante el cambio.' },
      { fase: 'Fase 4', periodo: 'Mes +1', accion: 'Compartimos con cada cuenta cómo ha vivido el cambio su gente.' }
    ],
    entregables: [
      'Kit para que cada empresa avise y explique el cambio a sus usuarios.',
      'Resumen de cómo ha ido la adopción, cuenta por cuenta.'
    ],
    avisos: [
      'Un gran cliente que se entera del cambio tarde o por sorpresa es el riesgo más caro del proyecto. Aquí la atención al detalle marca la diferencia.'
    ]
  },
  tecnico: {
    title: 'Equipo Técnico',
    icon: 'bi-cpu',
    role: 'El equipo que hace que el cambio ocurra por dentro y que la aplicación siga funcionando para todos.',
    analiza: [
      'Cómo aguantará la aplicación cuando muchos usuarios entren a la nueva versión a la vez.',
      'Qué puede fallar durante el cambio y cómo dar marcha atrás si hiciera falta.'
    ],
    timeline: [
      { fase: 'Fase 1', periodo: 'Mes -2', accion: 'Revisamos el estado técnico y preparamos los accesos a las tiendas.' },
      { fase: 'Fase 2', periodo: 'Mes -1', accion: 'Dejamos listo el plan para abrir el cambio por grupos.' },
      { fase: 'Fase 3', periodo: 'Mes 0', accion: 'Vigilamos en directo que todo funcione mientras entran los usuarios.' },
      { fase: 'Fase 4', periodo: 'Mes +1', accion: 'Estabilizamos y entregamos todo ordenado y documentado.' }
    ],
    entregables: [
      'Plan del cambio por grupos, con marcha atrás prevista.',
      'Documentación final para que el equipo del cliente quede autónomo.'
    ],
    avisos: [
      'Abrir el cambio a todos a la vez puede saturar el sistema. Ir por grupos es lo que protege la experiencia de los usuarios.'
    ]
  }
};

function initDepartmentPlans() {
  const buttons = document.querySelectorAll('.area-btn');
  const display = document.getElementById('impact-mapping-display');

  if (!buttons.length || !display) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const areaKey = btn.getAttribute('data-area');
      updateDepartmentPlan(areaKey);
    });
  });

  updateDepartmentPlan('soporte');
}

function updateDepartmentPlan(key) {
  const display = document.getElementById('impact-mapping-display');
  const data = departmentPlans[key];

  if (!data || !display) return;

  const analizaList = data.analiza.map(a => `<li>${a}</li>`).join('');
  const entregablesList = data.entregables.map(e => `<li>${e}</li>`).join('');

  const timelineHtml = data.timeline.map(t => `
    <div class="dept-timeline-step">
      <div class="dept-step-marker">
        <span class="dept-step-fase">${t.fase}</span>
        <span class="dept-step-periodo">${t.periodo}</span>
      </div>
      <p class="dept-step-accion">${t.accion}</p>
    </div>
  `).join('');

  display.innerHTML = `
    <div class="dept-plan-content animate-fade">
      <div class="dept-plan-header">
        <div class="dept-plan-icon"><i class="bi ${data.icon}"></i></div>
        <div>
          <h3>${data.title}</h3>
          <p class="dept-role">${data.role}</p>
        </div>
      </div>

      <div class="dept-section">
        <h4><i class="bi bi-search"></i> Qué analizamos para este equipo</h4>
        <ul class="dept-list">${analizaList}</ul>
      </div>

      <div class="dept-section">
        <h4><i class="bi bi-calendar3"></i> Su plan, fase a fase</h4>
        <div class="dept-timeline">${timelineHtml}</div>
      </div>

      <div class="dept-columns">
        <div class="dept-section">
          <h4><i class="bi bi-box-seam"></i> Lo que reciben</h4>
          <ul class="dept-list">${entregablesList}</ul>
        </div>
        <div class="dept-section">
          <h4 class="avisos-title"><i class="bi bi-exclamation-triangle-fill"></i> Puntos de atención</h4>
          ${renderAvisos(data.avisos)}
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   5. Materiales que preparamos (línea de tiempo por fases)
   ========================================================================== */
const featuredDeliverablesData = {
  manual: {
    title: 'Manual de uso de la nueva versión',
    desc: 'No es un PDF estático y olvidable. Lo construimos paso a paso a partir del análisis, en lenguaje claro y pensado para el usuario final, no para técnicos.',
    icon: 'bi-file-earmark-text-fill',
    phases: [
      {
        num: '1',
        title: 'Qué cambia de verdad',
        desc: 'Localizamos las partes de la app que cambian y que más usa la gente, para centrar el manual en lo importante.',
        impact: 'Equipo Técnico y Cuentas'
      },
      {
        num: '2',
        title: 'Redacción del manual y las guías',
        desc: 'Escribimos el manual y las guías paso a paso, en lenguaje claro, pensados para quien usa la app cada día.',
        impact: 'Atención al usuario'
      },
      {
        num: '3',
        title: 'Vídeos e instrucciones cortas',
        desc: 'Preparamos vídeos breves e instrucciones sencillas para las dudas más habituales.',
        impact: 'Atención al usuario'
      },
      {
        num: '4',
        title: 'Versión para cada empresa',
        desc: 'Adaptamos el contenido a cada empresa cliente para que hable de su caso concreto, no de uno genérico.',
        impact: 'Cuentas'
      }
    ]
  },
  toolkit: {
    title: 'Kit para comunicar el cambio',
    desc: 'Damos a cada empresa cliente los textos y mensajes listos para avisar a sus propios usuarios del cambio, de forma clara y ordenada.',
    icon: 'bi-chat-left-text-fill',
    phases: [
      {
        num: '1',
        title: 'Por dónde avisar',
        desc: 'Vemos qué canales tiene cada empresa para avisar a sus usuarios (correo, avisos dentro de la app, etc.).',
        impact: 'Cuentas y Ventas'
      },
      {
        num: '2',
        title: 'Mensajes listos para usar',
        desc: 'Escribimos los textos que cada empresa puede enviar a su gente, listos para reenviar.',
        impact: 'Ventas y Cuentas'
      },
      {
        num: '3',
        title: 'Avisos dentro de la app',
        desc: 'Redactamos los avisos que verán los usuarios dentro de la versión actual, anticipando el cambio.',
        impact: 'Atención al usuario'
      },
      {
        num: '4',
        title: 'Repaso de cómo ha calado',
        desc: 'Revisamos si los avisos llegaron y se entendieron, para reforzar donde haga falta.',
        impact: 'Cuentas'
      }
    ]
  },
  training: {
    title: 'Formación para el equipo de atención',
    desc: 'Preparamos al equipo que atiende a los usuarios para que domine la nueva versión antes del cambio y responda con seguridad desde el primer día.',
    icon: 'bi-mortarboard-fill',
    phases: [
      {
        num: '1',
        title: 'Dónde se atasca la gente',
        desc: 'Repasamos las dudas habituales de atención al usuario para priorizar lo más complejo.',
        impact: 'Atención al usuario'
      },
      {
        num: '2',
        title: 'Guion de respuestas',
        desc: 'Preparamos las respuestas y los pasos para resolver las dudas más frecuentes.',
        impact: 'Atención al usuario'
      },
      {
        num: '3',
        title: 'Sesiones de formación',
        desc: 'Formamos al equipo de atención con ejemplos reales de la nueva versión.',
        impact: 'Atención al usuario y Cuentas'
      },
      {
        num: '4',
        title: 'Apoyo durante el cambio',
        desc: 'Acompañamos al equipo la semana del cambio para resolver lo inesperado.',
        impact: 'Atención al usuario'
      }
    ]
  },
  governance: {
    title: 'Plan de publicación en las tiendas',
    desc: 'Ordenamos la publicación en App Store y Google Play para que no haya retrasos, con cuidado especial en las apps que llevan la marca propia de cada empresa.',
    icon: 'bi-google-play',
    phases: [
      {
        num: '1',
        title: 'Estado de las cuentas',
        desc: 'Revisamos las cuentas y accesos en las tiendas, sobre todo de las apps con marca propia.',
        impact: 'Equipo Técnico y Cuentas'
      },
      {
        num: '2',
        title: 'Preparar las fichas',
        desc: 'Actualizamos los textos de la ficha de cada app para explicar el cambio a quien la descargue.',
        impact: 'Cuentas'
      },
      {
        num: '3',
        title: 'Seguimiento de aprobaciones',
        desc: 'Subimos las nuevas versiones y seguimos las revisiones, abriendo el cambio poco a poco.',
        impact: 'Equipo Técnico'
      },
      {
        num: '4',
        title: 'Cierre ordenado',
        desc: 'Dejamos las cuentas y los accesos ordenados y entregados al cliente.',
        impact: 'Equipo Técnico y Cuentas'
      }
    ]
  }
};

function initFeaturedDeliverables() {
  const tabs = document.querySelectorAll('.featured-tab-btn');
  const display = document.getElementById('featured-display-panel');

  if (!tabs.length || !display) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const featKey = tab.getAttribute('data-featured');
      updateFeaturedDisplay(featKey);
    });
  });

  updateFeaturedDisplay('manual');
}

function updateFeaturedDisplay(key) {
  const display = document.getElementById('featured-display-panel');
  const data = featuredDeliverablesData[key];

  if (!data || !display) return;

  const stepsHtml = data.phases.map(p => `
    <div class="feat-roadmap-step">
      <div class="feat-step-number">Fase ${p.num}</div>
      <div class="feat-step-body">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <span class="feat-step-impact"><i class="bi bi-people-fill"></i> ${p.impact}</span>
      </div>
    </div>
  `).join('');

  display.innerHTML = `
    <div class="featured-display-content animate-fade">
      <div class="featured-details-header">
        <div class="featured-icon-box"><i class="bi ${data.icon}"></i></div>
        <div>
          <span class="featured-badge">Material que preparamos</span>
          <h3>${data.title}</h3>
          <p class="desc">${data.desc}</p>
        </div>
      </div>

      <div class="featured-roadmap-timeline">
        <h4 class="roadmap-section-title">Cómo lo construimos, fase a fase</h4>
        <div class="feat-roadmap-steps-container">
          ${stepsHtml}
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   6. Catálogo general de entregables
   ========================================================================== */
const deliverablesList = [
  {
    id: 'd-1.1',
    phase: '1',
    title: 'Radiografía de las apps en las tiendas',
    desc: 'Revisión del estado de las cuentas y accesos en App Store y Google Play, con foco en las empresas que tienen su propia app con su marca.',
    format: 'Informe y listado de cuentas',
    impacts: ['tecnico', 'cuentas'],
    icon: 'bi-google-play'
  },
  {
    id: 'd-1.2',
    phase: '1',
    title: 'Mapa de a quién afecta cada cambio',
    desc: 'Identificamos qué cambia para cada tipo de usuario (por ejemplo, quien administra frente a quien solo usa la app), para adaptar los avisos y las guías.',
    format: 'Análisis por tipo de usuario',
    impacts: ['cuentas'],
    icon: 'bi-people-fill'
  },
  {
    id: 'd-2.1',
    phase: '2',
    title: 'Kit para comunicar el cambio',
    desc: 'Textos y mensajes listos para que cada empresa avise a sus usuarios del cambio de forma clara y ordenada.',
    format: 'Conjunto de textos y plantillas',
    impacts: ['ventas', 'cuentas'],
    icon: 'bi-chat-left-text-fill'
  },
  {
    id: 'd-2.2',
    phase: '2',
    title: 'Centro de ayuda renovado',
    desc: 'Estructura del nuevo centro de ayuda, con manuales, preguntas frecuentes y guías cortas sobre la nueva versión.',
    format: 'Manuales y guías',
    impacts: ['soporte'],
    icon: 'bi-file-earmark-text-fill'
  },
  {
    id: 'd-2.3',
    phase: '2',
    title: 'Formación para el equipo de atención',
    desc: 'Plan de formación para que el equipo que atiende a los usuarios domine la nueva versión antes del cambio.',
    format: 'Plan y materiales de formación',
    impacts: ['soporte'],
    icon: 'bi-mortarboard-fill'
  },
  {
    id: 'd-3.1',
    phase: '3',
    title: 'Prueba con un grupo pequeño',
    desc: 'Plan para hacer el cambio primero con un grupo reducido y detectar problemas antes de abrirlo a todos.',
    format: 'Plan de prueba',
    impacts: ['tecnico', 'soporte'],
    icon: 'bi-shield-check'
  },
  {
    id: 'd-3.2',
    phase: '3',
    title: 'Plan del cambio por grupos',
    desc: 'Calendario para ir cambiando a los usuarios por grupos, sin saturar el sistema ni a los equipos de atención.',
    format: 'Calendario del cambio',
    impacts: ['tecnico', 'soporte'],
    icon: 'bi-arrow-repeat'
  },
  {
    id: 'd-3.3',
    phase: '3',
    title: 'Guion para el día del cambio',
    desc: 'Quién hace qué, a quién se avisa y cómo se resuelve si algo falla durante el día del cambio.',
    format: 'Guion y reparto de responsabilidades',
    impacts: ['tecnico', 'soporte'],
    icon: 'bi-activity'
  },
  {
    id: 'd-4.1',
    phase: '4',
    title: 'Acompañamiento reforzado',
    desc: 'Soporte prioritario durante las primeras semanas para resolver rápido cualquier incidencia tras el cambio.',
    format: 'Plan de acompañamiento',
    impacts: ['cuentas'],
    icon: 'bi-heart-pulse-fill'
  },
  {
    id: 'd-4.2',
    phase: '4',
    title: 'Informe de cómo ha ido el cambio',
    desc: 'Resumen de cómo están usando los usuarios la nueva versión y qué opinan, para cerrar el proyecto con datos.',
    format: 'Informe final',
    impacts: ['cuentas', 'tecnico'],
    icon: 'bi-bar-chart-line-fill'
  }
];

function initDeliverableCatalogue() {
  const grid = document.getElementById('deliverables-grid');
  const filters = document.querySelectorAll('.filter-btn');

  if (!grid || !filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      renderDeliverables(filterValue);
    });
  });

  renderDeliverables('all');
}

function renderDeliverables(filter) {
  const grid = document.getElementById('deliverables-grid');
  if (!grid) return;

  const filteredItems = filter === 'all'
    ? deliverablesList
    : deliverablesList.filter(item => item.phase === filter);

  if (filteredItems.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 40px 0;">No hay entregables para esta fase.</p>`;
    return;
  }

  const itemsHtml = filteredItems.map(item => {
    const pills = item.impacts.map(imp => {
      const label = teamLabels[imp];
      return `<span class="impact-pill ${label.class}">${label.text}</span>`;
    }).join('');

    return `
      <div class="deliverable-card animate-fade">
        <div class="del-card-header">
          <span class="del-phase-badge">Fase ${item.phase}</span>
          <i class="bi ${item.icon} del-card-icon"></i>
        </div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="del-card-footer">
          <span class="del-impact-title">A quién ayuda</span>
          <div class="del-impact-pills">
            ${pills}
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.innerHTML = itemsHtml;
}

/* ==========================================================================
   7. Áreas de trabajo (acordeón expandible)
   ========================================================================== */
function initModuleExpanders() {
  const expandButtons = document.querySelectorAll('.btn-module-expand');

  expandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.module-card');
      if (!card) return;

      const isExpanded = card.classList.contains('expanded');

      document.querySelectorAll('.module-card').forEach(c => {
        c.classList.remove('expanded');
      });

      if (!isExpanded) {
        card.classList.add('expanded');

        setTimeout(() => {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 350);
      }
    });
  });
}

/* ==========================================================================
   8. Secciones desplegables (acordeón)
   ========================================================================== */
function setSectionOpen(section, open) {
  const header = section.querySelector('.section-header');
  section.classList.toggle('open', open);
  if (header) header.setAttribute('aria-expanded', String(open));
}

function initCollapsibleSections() {
  const sections = document.querySelectorAll('.collapsible-section');

  sections.forEach(section => {
    const containerWidth = section.querySelector('.container-width');
    const header = section.querySelector('.section-header');
    if (!containerWidth || !header) return;

    // Envolver el texto de la cabecera y añadir el chevron
    const textWrap = document.createElement('div');
    textWrap.className = 'section-header-text';
    while (header.firstChild) textWrap.appendChild(header.firstChild);
    header.appendChild(textWrap);

    const chevron = document.createElement('span');
    chevron.className = 'section-chevron';
    chevron.innerHTML = '<i class="bi bi-chevron-down"></i>';
    header.appendChild(chevron);

    // Envolver todo el contenido posterior a la cabecera en el contenedor colapsable
    const collapse = document.createElement('div');
    collapse.className = 'section-collapse';
    const inner = document.createElement('div');
    inner.className = 'section-collapse-inner';

    let node = header.nextSibling;
    while (node) {
      const next = node.nextSibling;
      inner.appendChild(node);
      node = next;
    }
    collapse.appendChild(inner);
    containerWidth.appendChild(collapse);

    // Accesibilidad e interacción
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');

    header.addEventListener('click', () => {
      setSectionOpen(section, !section.classList.contains('open'));
    });
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setSectionOpen(section, !section.classList.contains('open'));
      }
    });
  });
}

/* ==========================================================================
   9. Smooth Scrolling + apertura de la sección destino
   ========================================================================== */
function initSmoothScrollLinks() {
  const links = document.querySelectorAll('a[href^="#"]');
  const navbarHeight = 80;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      // Si el destino es una sección desplegable, ábrela antes de desplazarte
      if (targetEl.classList.contains('collapsible-section')) {
        setSectionOpen(targetEl, true);
      }

      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* ==========================================================================
   9. Calendario semana a semana (tarjetas + detalle)
   ========================================================================== */

// Agrupación de semanas por mes (lanzamiento en septiembre)
const calendarMonths = [
  { name: 'Julio', tag: 'Mes -2', start: 1, end: 4 },
  { name: 'Agosto', tag: 'Mes -1', start: 5, end: 8 },
  { name: 'Septiembre', tag: 'Mes 0 · Lanzamiento', start: 9, end: 12 },
  { name: 'Octubre', tag: 'Mes +1', start: 13, end: 16 }
];

// Detalle semana a semana
const weeklyPlan = [
  { w: 1, dates: '6–12 Jul', phase: 1, foco: 'Kickoff y arranque del análisis', hito: 'Kickoff del proyecto', entregables: ['Plan de trabajo y calendario detallado', 'Solicitud de accesos a App Store y Google Play'], avisos: ['Sin los accesos a las tiendas a tiempo, el track de apps de marca arranca con retraso.'] },
  { w: 2, dates: '13–19 Jul', phase: 1, foco: 'Auditoría técnica y de tiendas', hito: null, entregables: ['Auditoría del estado de las cuentas en tiendas', 'Diagnóstico técnico inicial'], avisos: [] },
  { w: 3, dates: '20–26 Jul', phase: 1, foco: 'Análisis de usuarios y dudas frecuentes', hito: null, entregables: ['Mapa de dudas frecuentes por tipo de usuario'], avisos: [] },
  { w: 4, dates: '27 Jul–2 Ago', phase: 1, foco: 'Cierre del análisis y mapa de impacto', hito: 'Cierre del análisis (Go/No-Go de preparación)', entregables: ['Matriz de impacto por equipo', 'Plan de despliegue por grupos (borrador)'], avisos: ['Si el análisis no cierra a tiempo, las fases siguientes se comprimen.'] },
  { w: 5, dates: '3–9 Ago', phase: 2, foco: 'Redacción de manuales y guías', hito: null, entregables: ['Primera versión de manuales y guías paso a paso'], avisos: [] },
  { w: 6, dates: '10–16 Ago', phase: 2, foco: 'Kit de comunicación y vídeos', hito: null, entregables: ['Kit white-label de comunicación', 'Vídeos e instrucciones cortas'], avisos: [] },
  { w: 7, dates: '17–23 Ago', phase: 2, foco: 'Formación de equipos (train the trainers)', hito: null, entregables: ['Sesiones de formación al equipo de atención'], avisos: ['Si el equipo de atención no se forma antes del cambio, las consultas se acumulan el Día D.'] },
  { w: 8, dates: '24–30 Ago', phase: 2, foco: 'Materiales listos y ensayo del despliegue', hito: 'Equipos formados y materiales listos', entregables: ['Guía de respuestas rápidas', 'Plan de marcha atrás validado'], avisos: ['Conviene un ensayo del despliegue antes de septiembre.'] },
  { w: 9, dates: '31 Ago–6 Sep', phase: 3, foco: 'Piloto interno y avisos in-app', hito: null, entregables: ['Migración del piloto interno (empleados propios)', 'Avisos in-app activados'], avisos: [] },
  { w: 10, dates: '7–13 Sep', phase: 3, foco: 'Día D: inicio del cambio por grupos (10%)', hito: 'Día D — inicio del cambio por grupos (10%)', entregables: ['Sala de seguimiento en directo (war room)'], avisos: ['Abrir a todos a la vez puede saturar el sistema: el avance por grupos protege la experiencia.'] },
  { w: 11, dates: '14–20 Sep', phase: 3, foco: 'Avance del despliegue (30%–60%)', hito: null, entregables: ['Informe diario de adopción y errores'], avisos: [] },
  { w: 12, dates: '21–27 Sep', phase: 3, foco: 'Despliegue al 100% y apps de marca', hito: 'Cambio al 100% + apps de marca publicadas', entregables: ['Apps de marca publicadas en las tiendas'], avisos: ['Las apps de marca requieren aprobación independiente: dejar margen por si la tienda tarda.'] },
  { w: 13, dates: '28 Sep–4 Oct', phase: 4, foco: 'Hypercare: soporte prioritario', hito: null, entregables: ['Soporte prioritario activo', 'Matriz de escalado de incidencias'], avisos: [] },
  { w: 14, dates: '5–11 Oct', phase: 4, foco: 'Seguimiento de adopción', hito: null, entregables: ['Seguimiento de uso de la nueva versión'], avisos: [] },
  { w: 15, dates: '12–18 Oct', phase: 4, foco: 'Encuestas y recogida de opiniones', hito: null, entregables: ['Encuestas de satisfacción (NPS)'], avisos: [] },
  { w: 16, dates: '19–25 Oct', phase: 4, foco: 'Cierre del proyecto e informe final', hito: 'Cierre del proyecto e informe final', entregables: ['Informe de estabilidad técnica', 'Informe de adopción y satisfacción', 'Documentación de traspaso al equipo del cliente'], avisos: [] }
];

function initWeeklyCalendar() {
  const container = document.getElementById('weeks-calendar');
  if (!container) return;

  let html = '';
  calendarMonths.forEach(month => {
    const weeks = weeklyPlan.filter(w => w.w >= month.start && w.w <= month.end);
    html += `<div class="cal-month-group">
      <div class="cal-month-head">
        <span class="cal-month-name">${month.name}</span>
        <span class="cal-month-tag">${month.tag}</span>
      </div>
      <div class="cal-week-cards">
        ${weeks.map(week => `
          <button class="cal-week-card phase-${week.phase}${week.hito ? ' has-milestone' : ''}" data-week="${week.w}" type="button">
            <div class="cal-card-top">
              <span class="cal-card-week">Semana ${week.w}</span>
              <span class="cal-card-phase">Fase ${week.phase}</span>
            </div>
            <span class="cal-card-dates"><i class="bi bi-calendar3"></i> ${week.dates}</span>
            <h4 class="cal-card-foco">${week.foco}</h4>
            <div class="cal-card-footer">
              ${week.hito ? '<span class="cal-card-milestone"><i class="bi bi-diamond-fill"></i> Hito</span>' : '<span></span>'}
              <span class="cal-card-cta">Ver detalle <i class="bi bi-chevron-right"></i></span>
            </div>
          </button>
        `).join('')}
      </div>
    </div>`;
  });

  container.innerHTML = html;

  const cards = container.querySelectorAll('.cal-week-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      renderWeekDetail(parseInt(card.getAttribute('data-week'), 10));

      const detail = document.getElementById('calendar-week-detail');
      if (detail && window.innerWidth <= 991) {
        detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Detalle inicial: la semana del Día D
  const initial = container.querySelector('.cal-week-card[data-week="10"]') || cards[0];
  if (initial) {
    initial.classList.add('active');
    renderWeekDetail(parseInt(initial.getAttribute('data-week'), 10));
  }
}

function renderWeekDetail(weekNum) {
  const panel = document.getElementById('calendar-week-detail');
  const week = weeklyPlan.find(w => w.w === weekNum);
  if (!panel || !week) return;

  const month = calendarMonths.find(m => weekNum >= m.start && weekNum <= m.end);

  const entregablesHtml = week.entregables.length
    ? `<ul class="wd-list">${week.entregables.map(e => `<li>${e}</li>`).join('')}</ul>`
    : '<p class="wd-empty">Sin entregables formales esta semana.</p>';

  const avisosHtml = week.avisos.length
    ? renderAvisos(week.avisos)
    : '<p class="wd-empty">Sin puntos críticos esta semana.</p>';

  const hitoHtml = week.hito
    ? `<div class="wd-milestone"><i class="bi bi-diamond-fill"></i> <span>${week.hito}</span></div>`
    : '';

  panel.innerHTML = `
    <div class="wd-content animate-fade">
      <div class="wd-header">
        <div class="wd-badge">
          <span class="wd-week">Semana ${week.w}</span>
          <span class="wd-dates">${week.dates}</span>
        </div>
        <div class="wd-meta">
          <span class="wd-month">${month ? month.name + ' · ' + month.tag : ''}</span>
          <span class="wd-phase">Fase ${week.phase}</span>
        </div>
      </div>
      <h3 class="wd-foco">${week.foco}</h3>
      ${hitoHtml}
      <div class="wd-columns">
        <div class="wd-section">
          <h4><i class="bi bi-box-seam"></i> Qué se entrega</h4>
          ${entregablesHtml}
        </div>
        <div class="wd-section">
          <h4 class="avisos-title"><i class="bi bi-exclamation-triangle-fill"></i> Puntos de atención</h4>
          ${avisosHtml}
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   10. Estimación de recursos humanos (para presupuesto)
   ========================================================================== */
const resourceProfiles = [
  {
    role: 'Líder de proyecto y migración',
    icon: 'bi-diagram-3-fill',
    cls: 'tag-gov',
    perfil: 'Dirige el proyecto y la parte técnica: coordina con el cliente, prepara y lanza el cambio por grupos, gestiona las tiendas y vigila la estabilidad.',
    entregables: [
      'Plan de trabajo, calendario y coordinación (war room)',
      'Plan de despliegue por grupos y marcha atrás',
      'Publicación en App Store y Google Play (incl. apps de marca)',
      'Monitoreo en directo e informe final de estabilidad'
    ]
  },
  {
    role: 'Consultor de gestión del cambio',
    icon: 'bi-chat-left-dots-fill',
    cls: 'tag-soporte',
    perfil: 'Se ocupa de cómo viven el cambio las personas: comunicación a usuarios y empresas, avisos, acompañamiento a los equipos del cliente y medición de la adopción.',
    entregables: [
      'Kit white-label de comunicación y avisos in-app',
      'Plan de avisos por canal y a las empresas cliente',
      'Encuestas de adopción (NPS) e informe de satisfacción'
    ]
  },
  {
    role: 'Especialista en contenidos y formación',
    icon: 'bi-journal-text',
    cls: 'tag-ti',
    perfil: 'Crea y mantiene todo el material de ayuda: manuales, guías, vídeos e instrucciones, y forma al equipo de atención del cliente.',
    entregables: [
      'Manuales, guías, vídeos e instrucciones',
      'Centro de ayuda y FAQs actualizado',
      'Formación al equipo de atención (train the trainers)'
    ]
  }
];

function initResourcesEstimate() {
  const summary = document.getElementById('resources-summary');
  const grid = document.getElementById('resources-grid');
  if (!summary || !grid) return;

  const perWeek = (resourceProfiles.length * 0.5).toFixed(1).replace('.', ','); // ≈ 1,5

  const summaryItems = [
    { value: resourceProfiles.length, label: 'Perfiles', icon: 'bi-people-fill' },
    { value: '½', label: 'Media jornada cada uno', icon: 'bi-clock-history' },
    { value: 'Todo el plan', label: 'De principio a fin', icon: 'bi-calendar3', small: true },
    { value: perWeek, label: 'Recursos por semana', icon: 'bi-person-workspace' }
  ];

  summary.innerHTML = summaryItems.map(item => `
    <div class="res-summary-card">
      <i class="bi ${item.icon}"></i>
      <span class="res-summary-value${item.small ? ' res-summary-value-sm' : ''}">${item.value}</span>
      <span class="res-summary-label">${item.label}</span>
    </div>
  `).join('');

  grid.innerHTML = resourceProfiles.map(p => `
    <div class="resource-card">
      <div class="resource-card-top">
        <div class="resource-icon ${p.cls}"><i class="bi ${p.icon}"></i></div>
        <span class="resource-dedication"><i class="bi bi-clock-history"></i> Media jornada</span>
      </div>
      <h3 class="resource-role">${p.role}</h3>
      <p class="resource-perfil">${p.perfil}</p>
      <div class="resource-meta">
        <span class="resource-chip"><i class="bi bi-calendar3"></i> Durante todo el plan</span>
      </div>
      <div class="resource-deliverables">
        <span class="rd-title">Entregables que asume</span>
        <ul>${p.entregables.map(e => `<li>${e}</li>`).join('')}</ul>
      </div>
    </div>
  `).join('');
}
