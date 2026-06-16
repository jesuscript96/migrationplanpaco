// ==========================================================================
// Propuesta de Migración Holística - Lógica Interactiva (Estilo paco.app)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initPhaseStepInteractions();
  initFeaturedDeliverables();
  initDeliverableCatalogue();
  initCrossImpactInteractions();
  initModuleExpanders();
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
   3. Fases del Plan (Selector de Tarjetas)
   ========================================================================== */
const phasesData = {
  1: {
    title: 'Fase 1: Kickoff & Gobernanza de Stores',
    time: 'Mes -2 (Semanas 1-4)',
    desc: 'Esta fase se enfoca en auditar la infraestructura técnica de publicación y establecer las bases estratégicas del proyecto. Se mapean los accesos de las cuentas de desarrollador y se identifican las aplicaciones que requieren compilación independiente.',
    audits: [
      'Auditoría de credenciales, firmas y permisos vigentes en App Store Connect y Google Play Console.',
      'Identificación de las cuentas de desarrollador de clientes con apps personalizadas (branded).',
      'Diagnóstico de flujos UX clave de la app anterior para segmentar el impacto por perfil de colaborador.'
    ],
    rationales: [
      { icon: 'bi-cpu', title: 'Alineación al Despliegue', desc: 'Previene cuellos de botella en las revisiones de las stores al detectar problemas de cumplimiento o accesos antes del desarrollo.' },
      { icon: 'bi-heart-pulse', title: 'Alineación a Customer Success', desc: 'Permite anticipar qué cuentas premium B2B requerirán un soporte de gobernanza especial debido a sus branded apps.' }
    ]
  },
  2: {
    title: 'Fase 2: Preparación & Habilitación',
    time: 'Mes -1 (Semanas 5-8)',
    desc: 'Se centra en el diseño conceptual del plan de change management y en capacitar a la estructura de soporte. El objetivo es estructurar los materiales educativos y canales de comunicación previos al lanzamiento.',
    audits: [
      'Diseño conceptual de plantillas de correo, infografías y banners in-app.',
      'Definición metodológica de las preguntas frecuentes (FAQs) y videotutoriales de la nueva UI/UX.',
      'Planificación de los talleres Train the Trainers para los equipos internos de helpdesk y soporte.'
    ],
    rationales: [
      { icon: 'bi-headset', title: 'Alineación a Soporte', desc: 'Garantiza que el personal técnico interno domine la nueva navegación de la app antes de recibir las llamadas de los usuarios.' },
      { icon: 'bi-graph-up-arrow', title: 'Alineación a Ventas', desc: 'Provee al equipo comercial de dossiers y comparativas visuales para defender la renovación de cara al mercado.' }
    ]
  },
  3: {
    title: 'Fase 3: Despliegue Controlado',
    time: 'Mes 0 (Lanzamiento)',
    desc: 'La fase de ejecución técnica y lanzamiento vivo. Se implementa un plan progresivo para migrar a los colaboradores paulatinamente y se habilita una sala de guerra (War Room) conjunta para supervisar el rendimiento técnico y de usabilidad.',
    audits: [
      'Establecimiento de las cuotas de migración progresiva (Canary Deployment de 10% -> 30% -> 60% -> 100%).',
      'Monitoreo activo de logs de error, APIs y métricas de carga en servidores.',
      'Gestión del despliegue secuencial de las compilaciones de branded apps aprobadas.'
    ],
    rationales: [
      { icon: 'bi-cpu', title: 'Alineación al Despliegue', desc: 'El rollout progresivo asegura que la base de datos de 30,000 empleados migre de manera fluida sin saturar el backend.' },
      { icon: 'bi-headset', title: 'Alineación a Soporte', desc: 'El monitoreo en War Room coordina la solución en tiempo récord de los hotfixes de interfaz detectados el Día D.' }
    ]
  },
  4: {
    title: 'Fase 4: Evaluación & Cierre',
    time: 'Mes +1 (Post-Lanzamiento)',
    desc: 'Garantía del soporte post-lanzamiento y análisis del comportamiento de los usuarios en la nueva interfaz. Se evalúa el nivel de adopción real, se recogen métricas cualitativas y se estabiliza la plataforma.',
    audits: [
      'Supervisión de incidencias escaladas al equipo VIP de Hypercare.',
      'Evaluación cualitativa de adopción mediante encuestas de satisfacción (eNPS).',
      'Elaboración del reporte de cierre operativo y lecciones aprendidas de gobernanza.'
    ],
    rationales: [
      { icon: 'bi-heart-pulse', title: 'Alineación a Customer Success', desc: 'Asegura que los administradores B2B de recursos humanos vean que sus colaboradores adoptan exitosamente la plataforma.' },
      { icon: 'bi-cpu', title: 'Alineación al Despliegue', desc: 'Cierre del periodo Hypercare con transferencia de la infraestructura estable y documentación técnica final.' }
    ]
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

  const auditsList = data.audits.map(aud => `<li>${aud}</li>`).join('');
  
  const rationalesList = data.rationales.map(rat => `
    <div class="details-right-section">
      <h4><i class="bi ${rat.icon}"></i> ${rat.title}</h4>
      <p>${rat.desc}</p>
    </div>
  `).join('');

  detailsPanel.innerHTML = `
    <div class="phase-details-content animate-fade">
      <div class="details-left">
        <span class="step-time">${data.time}</span>
        <h3>${data.title}</h3>
        <p class="desc">${data.desc}</p>
        
        <h4><i class="bi bi-search"></i> Enfoque del Análisis</h4>
        <ul>
          ${auditsList}
        </ul>
      </div>
      
      <div class="details-right">
        <h4 style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; margin-bottom: 5px;">Alineamiento Operativo</h4>
        ${rationalesList}
      </div>
    </div>
  `;
}

/* ==========================================================================
   4. Entregables Estrella de Alto Valor (Sub-Línea de Tiempo Progresiva)
   ========================================================================== */
const featuredDeliverablesData = {
  manual: {
    title: 'Manual de Uso de la App (UX/UI)',
    desc: 'Un recurso clave de adopción técnica. No se trata de un simple PDF estático; se diseña como una guía progresiva adaptada a las diferentes etapas de la migración y personalizada por cliente corporativo.',
    icon: 'bi-file-earmark-pdf-fill',
    phases: [
      {
        num: '1',
        title: 'Mapeo y Arquitectura UX',
        desc: 'Identificación de flujos transaccionales clave modificados. Estructuración del inventario de pantallas de ayuda y wireframes de navegación rápida.',
        impact: 'Despliegue & Customer Success'
      },
      {
        num: '2',
        title: 'Redacción y Rediseño Gráfico',
        desc: 'Creación del manual interactivo en formato digital, FAQs contextuales y guiones para video-guías cortas basados en la nueva identidad del software.',
        impact: 'Soporte & CS'
      },
      {
        num: '3',
        title: 'Guía de Onboarding Integrada',
        desc: 'Propuesta de onboarding interactivo directamente en el primer inicio de sesión de la app para guiar a los 30,000 colaboradores de manera autónoma.',
        impact: 'Soporte & Despliegue'
      },
      {
        num: '4',
        title: 'Personalización Branded',
        desc: 'Adaptación visual del manual de uso con colores, logotipos y nombres de las marcas de los clientes corporativos premium que tienen branded apps.',
        impact: 'Customer Success'
      }
    ]
  },
  toolkit: {
    title: 'Toolkit de Adopción & Comunicación B2B2C',
    desc: 'La herramienta estratégica para change management. Suministra a las áreas de RRHH de las empresas cliente los copies, artes e infografías necesarios para mitigar la fricción de sus empleados.',
    icon: 'bi-file-earmark-slides-fill',
    phases: [
      {
        num: '1',
        title: 'Estrategia de Canales',
        desc: 'Mapeo de los puntos de contacto disponibles (correo, banners in-app, notificaciones push) y diseño de la pauta de mensajes preventivos.',
        impact: 'CS & Ventas'
      },
      {
        num: '2',
        title: 'Diseño de Materiales White-Label',
        desc: 'Creación del Toolkit digital editable (plantillas de correo, infografías descriptivas "Qué cambia" y copies de banners in-app).',
        impact: 'Ventas & CS'
      },
      {
        num: '3',
        title: 'Activación de Campaña In-App',
        desc: 'Implementación y lanzamiento de los banners preventivos dentro de la versión anterior para preparar visualmente a la masa de usuarios.',
        impact: 'Soporte & Despliegue'
      },
      {
        num: '4',
        title: 'Evaluación de Impacto de Comunicación',
        desc: 'Análisis cualitativo del alcance de la campaña previa a través de clicks y tasas de apertura de los comunicados de RRHH.',
        impact: 'Customer Success'
      }
    ]
  },
  training: {
    title: 'Plan de Habilitación Train the Trainers',
    desc: 'Un programa formativo integral para el equipo del cliente. Garantiza la transferencia de conocimiento de la nueva UI/UX hacia el personal interno para asegurar una primera respuesta de soporte impecable.',
    icon: 'bi-mortarboard-fill',
    phases: [
      {
        num: '1',
        title: 'Diagnóstico de Tickets Previos',
        desc: 'Auditoría de las consultas de soporte histórico de la versión anterior para priorizar los flujos más complejos que requerirán FAQs reforzadas.',
        impact: 'Soporte'
      },
      {
        num: '2',
        title: 'Desarrollo de Manual de Helpdesk',
        desc: 'Creación de la guía de escalamiento interno para incidentes de UI, guiones de resolución rápida para agentes telefónicos y FAQs técnicas.',
        impact: 'Soporte'
      },
      {
        num: '3',
        title: 'Talleres de Certificación UI/UX',
        desc: 'Impartición de sesiones interactivas prácticas y simulaciones de llamadas de soporte con el nuevo flujo del sistema para certificar agentes.',
        impact: 'Soporte & CS'
      },
      {
        num: '4',
        title: 'Supervisión en War Room',
        desc: 'Acompañamiento del consultor al Helpdesk durante la semana del lanzamiento en vivo para resolver tickets inusuales en caliente.',
        impact: 'Soporte & Despliegue'
      }
    ]
  },
  governance: {
    title: 'Matriz de Store Governance',
    desc: 'El mapa logístico técnico de tiendas de aplicaciones. Controla la compilación, firma y aprobaciones de Apple y Google, minimizando el riesgo de demoras o rechazos en stores corporativas.',
    icon: 'bi-app-indicator',
    phases: [
      {
        num: '1',
        title: 'Auditoría de Cuentas y Llaves',
        desc: 'Inventario de cuentas de desarrollador Apple/Google, validez de certificados push, llaves API y estados de cumplimiento de políticas.',
        impact: 'Despliegue & CS'
      },
      {
        num: '2',
        title: 'Preparación de Fichas y ASO',
        desc: 'Redacción de textos de actualización, screenshots con la nueva UI/UX del software y optimización del texto de presentación en stores.',
        impact: 'CS'
      },
      {
        num: '3',
        title: 'Monitoreo de Aprobaciones',
        desc: 'Carga y seguimiento del proceso de revisión. Configuración de Phased Releases en Apple y Staged Rollouts por porcentajes en Google.',
        impact: 'Despliegue'
      },
      {
        num: '4',
        title: 'Cierre Logístico y Entrega',
        desc: 'Transferencia técnica final de las credenciales firmadas estables y reporte de gobernanza en stores de las branded apps.',
        impact: 'Despliegue & CS'
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

  // Load first featured initially
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
        <span class="feat-step-impact"><i class="bi bi-diagram-3-fill"></i> Impacto: ${p.impact}</span>
      </div>
    </div>
  `).join('');

  display.innerHTML = `
    <div class="featured-display-content animate-fade">
      <div class="featured-details-header">
        <div class="featured-icon-box"><i class="bi ${data.icon}"></i></div>
        <div>
          <span class="featured-badge">Entregable Estrella de Alto Valor</span>
          <h3>${data.title}</h3>
          <p class="desc">${data.desc}</p>
        </div>
      </div>
      
      <div class="featured-roadmap-timeline">
        <h4 class="roadmap-section-title">Mapa de Ruta de Construcción por Fases</h4>
        <div class="feat-roadmap-steps-container">
          ${stepsHtml}
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   5. Catálogo General de Entregables Adicionales
   ========================================================================== */
const deliverablesList = [
  {
    id: 'd-1.1',
    phase: '1',
    title: 'Store Governance Assessment',
    desc: 'Auditoría detallada de accesos de desarrollo, llaves de firma criptográfica y validación preliminar de políticas de Apple y Google. Prepara el plan logístico para la actualización de Branded Apps.',
    format: 'Documento PDF e inventario de cuentas',
    impacts: ['ti', 'cs'],
    icon: 'bi-app-indicator'
  },
  {
    id: 'd-1.2',
    phase: '1',
    title: 'Matriz de Impacto por Rol de Usuario',
    desc: 'Identificación sistemática de las variaciones del flujo UX/UI para administradores de RRHH frente a colaboradores finales. Base clave para orientar los mensajes y plantillas.',
    format: 'Matriz analítica de roles y riesgos',
    impacts: ['cs'],
    icon: 'bi-people-fill'
  },
  {
    id: 'd-2.1',
    phase: '2',
    title: 'Toolkit de Comunicación White-Label',
    desc: 'Diseño de plantillas de correos, infografías de navegación rápida y copies promocionales de marca blanca. Permite a las empresas clientes comunicar el cambio de forma ordenada y autónoma.',
    format: 'Kit digital de recursos y plantillas',
    impacts: ['ventas', 'cs'],
    icon: 'bi-file-earmark-slides-fill'
  },
  {
    id: 'd-2.2',
    phase: '2',
    title: 'Centro de Ayuda UX/UI Renovado',
    desc: 'Propuesta de estructura para el nuevo portal de ayuda. Contiene el esqueleto de manuales digitales, FAQs del comportamiento de la app y guías cortas animadas.',
    format: 'Esquema de portal y guías PDF de UI',
    impacts: ['soporte'],
    icon: 'bi-file-earmark-pdf-fill'
  },
  {
    id: 'd-2.3',
    phase: '2',
    title: 'Plan de Habilitación Train the Trainers',
    desc: 'Programa de capacitación estructurado para el equipo técnico interno. Asegura que los operadores de Helpdesk dominen las consultas asociadas a la nueva UX.',
    format: 'Cronograma y manual de talleres',
    impacts: ['soporte'],
    icon: 'bi-mortarboard-fill'
  },
  {
    id: 'd-3.1',
    phase: '3',
    title: 'Protocolo de Piloto Interno',
    desc: 'Mapa de ruta para la migración inicial de los colaboradores del propio cliente. Define los instrumentos de reporte para monitorear errores técnicos iniciales.',
    format: 'Guía de pruebas e instrumentación técnica',
    impacts: ['ti', 'soporte'],
    icon: 'bi-shield-check'
  },
  {
    id: 'd-3.2',
    phase: '3',
    title: 'Esquema de Rollout Progresivo canario',
    desc: 'Plan estratégico de migración por porcentajes de usuarios. Diseñado para mitigar la concurrencia masiva en bases de datos y balancear las Stores en Branded Apps.',
    format: 'Cronograma técnico de porcentajes',
    impacts: ['ti', 'soporte'],
    icon: 'bi-arrow-repeat'
  },
  {
    id: 'd-3.3',
    phase: '3',
    title: 'Manual de Sala de Guerra (War Room)',
    desc: 'Estructura operativa de tableros de analítica y matriz de escalación inmediata de fallos críticos para el equipo técnico durante el Día de Lanzamiento.',
    format: 'Protocolo y matriz de escalamiento',
    impacts: ['ti', 'soporte'],
    icon: 'bi-activity'
  },
  {
    id: 'd-4.1',
    phase: '4',
    title: 'Plan de Estabilización Hypercare',
    desc: 'Estructuración del soporte dedicado exclusivo para el primer mes post-lanzamiento. Diseña el proceso para dar prioridad y resolver incidentes de navegación.',
    format: 'Acuerdo de nivel de servicio (SLA)',
    impacts: ['cs'],
    icon: 'bi-heart-pulse-fill'
  },
  {
    id: 'd-4.2',
    phase: '4',
    title: 'Informe de Adopción & NPS',
    desc: 'Análisis cualitativo del comportamiento de los colaboradores en la nueva UI. Consolida encuestas de usabilidad y métricas de retención de la plataforma.',
    format: 'Reporte analítico final de adopción',
    impacts: ['cs', 'ti'],
    icon: 'bi-bar-chart-line-fill'
  }
];

const impactLabels = {
  ti: { text: 'Despliegue', class: 'tag-ti' },
  cs: { text: 'Customer Success', class: 'tag-cs' },
  ventas: { text: 'Ventas', class: 'tag-ventas' },
  soporte: { text: 'Soporte', class: 'tag-soporte' }
};

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
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 40px 0;">No se encontraron entregables para esta fase.</p>`;
    return;
  }

  const itemsHtml = filteredItems.map(item => {
    const pills = item.impacts.map(imp => {
      const label = impactLabels[imp];
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
          <span class="del-impact-title">Impacto Directo</span>
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
   6. Matriz de Impacto Cruzado (Bidireccional)
   ========================================================================== */
const crossImpactData = {
  soporte: {
    title: 'Soporte & Helpdesk',
    desc: 'El personal de soporte técnico interno requiere preparación metodológica exhaustiva para mitigar el incremento de dudas de navegación tras el cambio visual de la UI.',
    deliverables: [
      { id: 'd-2.2', title: 'Centro de Ayuda UX/UI Renovado (Fase 2)', link: '#entregables', impactDesc: 'Proporciona las FAQs estructuradas y guías visuales que el equipo de Helpdesk usará para resolver dudas de manera inmediata.' },
      { id: 'd-2.3', title: 'Plan de Habilitación Train the Trainers (Fase 2)', link: '#entregables', impactDesc: 'Capacita al personal clave de atención mediante simulaciones del nuevo flujo transaccional renovado.' },
      { id: 'd-3.1', title: 'Protocolo de Piloto Interno (Fase 3)', link: '#entregables', impactDesc: 'Permite testear la estabilidad y volumen inicial de llamadas de soporte con los propios empleados de la compañía en producción real.' },
      { id: 'd-3.3', title: 'Manual de Sala de Guerra (Fase 3)', link: '#entregables', impactDesc: 'Establece canales directos entre el Helpdesk de nivel 1 y el equipo de ingeniería para solucionar bugs o consultas inusuales en caliente.' }
    ]
  },
  ventas: {
    title: 'Ventas & Marketing',
    desc: 'El área de ventas debe comprender el cambio visual como una renovación tecnológica que eleva el valor del software de cara a la captación y retención de prospectos.',
    deliverables: [
      { id: 'd-2.1', title: 'Toolkit de Comunicación White-Label (Fase 2)', link: '#entregables', impactDesc: 'Suministra infografías y materiales de comunicación que Ventas puede usar como demos de la nueva UI ante prospectos comerciales.' }
    ]
  },
  success: {
    title: 'Customer Success',
    desc: 'Responsable de la estabilidad de las grandes cuentas B2B corporativas. Necesita herramientas para mitigar el rechazo al cambio de los administradores de recursos humanos de las empresas cliente.',
    deliverables: [
      { id: 'd-1.1', title: 'Store Governance Assessment (Fase 1)', link: '#entregables', impactDesc: 'Permite alertar a las cuentas con branded apps con dos meses de antelación sobre el plan logístico de compilación de sus apps.' },
      { id: 'd-1.2', title: 'Matriz de Impacto por Rol de Usuario (Fase 1)', link: '#entregables', impactDesc: 'Provee al Account Manager el mapa de ruta conceptual para explicar a cada tipo de cliente qué cambiará exactamente.' },
      { id: 'd-2.1', title: 'Toolkit de Comunicación White-Label (Fase 2)', link: '#entregables', impactDesc: 'Kit que los administradores B2B de RRHH reenvían a su base de colaboradores, reduciendo consultas hacia el equipo de Customer Success.' },
      { id: 'd-4.1', title: 'Plan de Estabilización Hypercare (Fase 4)', link: '#entregables', impactDesc: 'Garantía de soporte de ingeniería prioritaria para resolver rápidamente cualquier queja de cuentas clave post-lanzamiento.' },
      { id: 'd-4.2', title: 'Informe de Adopción & NPS (Fase 4)', link: '#entregables', impactDesc: 'Prueba analítica final para demostrar a la directiva del cliente el nivel de usabilidad y satisfacción obtenido con la nueva UI.' }
    ]
  },
  ti: {
    title: 'Despliegue Técnico',
    desc: 'El núcleo de infraestructura del proyecto. La estrategia y entregables de TI están orientados a balancear cargas en servidores y stores de aplicaciones durante el despliegue.',
    deliverables: [
      { id: 'd-1.1', title: 'Store Governance Assessment (Fase 1)', link: '#entregables', impactDesc: 'Garantiza que la firma, claves API y credenciales de las tiendas estén listas para la conmutación.' },
      { id: 'd-3.1', title: 'Protocolo de Piloto Interno (Fase 3)', link: '#entregables', impactDesc: 'Primera validación en producción real con volumen controlado para evaluar la latencia de las nuevas APIs.' },
      { id: 'd-3.2', title: 'Esquema de Rollout Progresivo canario (Fase 3)', link: '#entregables', impactDesc: 'Estrategia de despliegue por porcentajes en Google Play y App Store para prevenir caídas de servidores y picos de tráfico.' },
      { id: 'd-3.3', title: 'Manual de Sala de Guerra (Fase 3)', link: '#entregables', impactDesc: 'Protocolo técnico de contingencias y monitoreo en tiempo real de caídas del sistema o degradaciones de UI.' },
      { id: 'd-4.2', title: 'Informe de Adopción & NPS (Fase 4)', link: '#entregables', impactDesc: 'Métricas de rendimiento técnico, latencias y errores de frontend recopilados post-migración.' }
    ]
  }
};

function initCrossImpactInteractions() {
  const buttons = document.querySelectorAll('.area-btn');
  const display = document.getElementById('impact-mapping-display');

  if (!buttons.length || !display) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const areaKey = btn.getAttribute('data-area');
      updateCrossImpactDisplay(areaKey);
    });
  });

  updateCrossImpactDisplay('soporte');
}

function updateCrossImpactDisplay(key) {
  const display = document.getElementById('impact-mapping-display');
  const data = crossImpactData[key];

  if (!data || !display) return;

  const itemsHtml = data.deliverables.map(del => `
    <div class="impact-list-item">
      <div class="impact-list-item-header">
        <h4>${del.title}</h4>
        <span>PROPUESTA DE ANÁLISIS</span>
      </div>
      <p>${del.impactDesc}</p>
    </div>
  `).join('');

  display.innerHTML = `
    <div class="impact-mapping-content animate-fade">
      <div class="impact-map-header">
        <h3>Alineamiento de ${data.title}</h3>
        <p>${data.desc}</p>
      </div>
      <div class="impact-items-list">
        <h4 style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--color-text-muted); letter-spacing:0.5px; margin-bottom:5px;">Entregables que Protegen esta Área</h4>
        ${itemsHtml}
      </div>
    </div>
  `;
}

/* ==========================================================================
   6. Módulos de Trabajo (Acordeón Expandible)
   ========================================================================== */
function initModuleExpanders() {
  const expandButtons = document.querySelectorAll('.btn-module-expand');

  expandButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
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
   7. Smooth Scrolling para Enlaces de Navegación
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
      
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}
