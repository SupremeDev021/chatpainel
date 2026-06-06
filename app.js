const SUPREME_STORAGE_KEYS = {
  whiteLabel: "supreme_whitelabel_config",
  backend: "supreme_backend_config",
  ai: "supreme_ai_config"
};

const state = {
  activeModule: "dashboard",
  activeFilter: "all",
  activeConversationId: "conv-001",
  isInternalNote: false,
  uploadedLogoDataUrl: "",
  draggedOpportunityId: null,

  conversations: [
    {
      id: "conv-001",
      status: "open",
      assignedTo: "Ana Sales",
      lastAt: "09:42",
      unread: 2,
      contact: {
        name: "Mariana Costa",
        initials: "MC",
        company: "Costa Beauty Clinic",
        channel: "whatsapp",
        phone: "+55 11 98888-1200",
        email: "mariana@costabeauty.com",
        tags: ["Lead quente", "Automação", "WhatsApp"],
        sentiment: "Positivo",
        value: 6800
      },
      messages: [
        {
          type: "in",
          text: "Olá, vi a Supreme Tech no Instagram. Quero automatizar o atendimento da minha clínica pelo WhatsApp.",
          time: "09:31"
        },
        {
          type: "out",
          text: "Olá, Mariana! Perfeito. Conseguimos integrar WhatsApp, IA, CRM e automações para sua clínica. Hoje vocês recebem muitos leads por dia?",
          time: "09:34"
        },
        {
          type: "in",
          text: "Sim, recebemos em média 40 mensagens por dia e perdemos muitas por demora no retorno.",
          time: "09:42"
        }
      ]
    },
    {
      id: "conv-002",
      status: "pending",
      assignedTo: "Bruno CX",
      lastAt: "10:08",
      unread: 0,
      contact: {
        name: "Rafael Mendes",
        initials: "RM",
        company: "Mendes Imóveis",
        channel: "instagram",
        phone: "+55 21 97777-4400",
        email: "rafael@mendesimoveis.com",
        tags: ["CRM", "Pipeline", "Imobiliária"],
        sentiment: "Neutro",
        value: 9200
      },
      messages: [
        {
          type: "in",
          text: "Preciso organizar meus corretores em um funil de vendas. Vocês têm CRM visual?",
          time: "09:58"
        },
        {
          type: "out",
          text: "Temos sim. O CRM pode funcionar em kanban, com funis personalizados, automações e integração com WhatsApp.",
          time: "10:03"
        },
        {
          type: "note",
          text: "Cliente pediu demonstração ainda esta semana. Priorizar follow-up.",
          time: "10:08"
        }
      ]
    },
    {
      id: "conv-003",
      status: "open",
      assignedTo: "Carla Suporte",
      lastAt: "11:17",
      unread: 1,
      contact: {
        name: "Juliana Rocha",
        initials: "JR",
        company: "JR Educação",
        channel: "email",
        phone: "+55 31 96666-1212",
        email: "juliana@jreducacao.com",
        tags: ["Suporte", "IA", "SaaS"],
        sentiment: "Preocupado",
        value: 3900
      },
      messages: [
        {
          type: "in",
          text: "Estamos testando o bot, mas queremos que ele seja mais humanizado nas respostas.",
          time: "11:11"
        },
        {
          type: "out",
          text: "Entendi, Juliana. Podemos ajustar o tom de voz, criar base de conhecimento e limitar respostas para evitar mensagens robóticas.",
          time: "11:14"
        },
        {
          type: "in",
          text: "Ótimo. Quero evitar que ele responda coisas fora do contexto.",
          time: "11:17"
        }
      ]
    },
    {
      id: "conv-004",
      status: "resolved",
      assignedTo: "Ana Sales",
      lastAt: "Ontem",
      unread: 0,
      contact: {
        name: "Eduardo Lima",
        initials: "EL",
        company: "Lima Distribuidora",
        channel: "whatsapp",
        phone: "+55 41 95555-9000",
        email: "eduardo@limadistribuidora.com",
        tags: ["ERP", "Integração", "Contrato"],
        sentiment: "Positivo",
        value: 14700
      },
      messages: [
        {
          type: "in",
          text: "Contrato aprovado. Vamos seguir com a integração do ERP.",
          time: "Ontem"
        },
        {
          type: "out",
          text: "Excelente, Eduardo. Vamos iniciar o onboarding com o time técnico.",
          time: "Ontem"
        }
      ]
    }
  ],

  opportunities: [
    {
      id: "opp-001",
      title: "Automação WhatsApp + IA",
      company: "Costa Beauty Clinic",
      value: 6800,
      stage: "Novo Lead",
      probability: 35,
      owner: "Ana Sales"
    },
    {
      id: "opp-002",
      title: "CRM para corretores",
      company: "Mendes Imóveis",
      value: 9200,
      stage: "Qualificação",
      probability: 55,
      owner: "Bruno CX"
    },
    {
      id: "opp-003",
      title: "IA para suporte educacional",
      company: "JR Educação",
      value: 3900,
      stage: "Proposta",
      probability: 70,
      owner: "Carla Suporte"
    },
    {
      id: "opp-004",
      title: "Integração ERP Enterprise",
      company: "Lima Distribuidora",
      value: 14700,
      stage: "Fechado",
      probability: 100,
      owner: "Ana Sales"
    }
  ],

  automations: [
    {
      id: "auto-001",
      name: "Novo lead WhatsApp",
      description: "Cria contato, aplica tag, envia saudação e abre oportunidade no CRM.",
      icon: "fa-brands fa-whatsapp",
      active: true
    },
    {
      id: "auto-002",
      name: "Follow-up inteligente",
      description: "Detecta conversas sem resposta e agenda follow-up automático.",
      icon: "fa-solid fa-clock-rotate-left",
      active: true
    },
    {
      id: "auto-003",
      name: "Resumo pós-atendimento",
      description: "Gera resumo, classifica sentimento e atualiza histórico do cliente.",
      icon: "fa-solid fa-brain",
      active: false
    }
  ],

  contracts: [
    {
      client: "Costa Beauty Clinic",
      plan: "Automation Pro",
      status: "Em negociação",
      mrr: 1890,
      due: "15/07/2026"
    },
    {
      client: "Mendes Imóveis",
      plan: "CRM Enterprise",
      status: "Proposta enviada",
      mrr: 2490,
      due: "22/07/2026"
    },
    {
      client: "JR Educação",
      plan: "AI Support",
      status: "Ativo",
      mrr: 1290,
      due: "05/07/2026"
    },
    {
      client: "Lima Distribuidora",
      plan: "Enterprise ERP",
      status: "Ativo",
      mrr: 4900,
      due: "01/07/2026"
    }
  ]
};

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  loadSavedWhiteLabel();
  loadSavedBackendConfig();
  loadSavedAIConfig();

  bindEvents();

  renderDashboard();
  renderConversations();
  renderActiveConversation();
  renderKanban();
  renderAutomations();
  renderContracts();

  showTechToast("Plataforma carregada com sucesso.", "success");
}

function bindEvents() {
  document.querySelectorAll(".saas-btn[data-module]").forEach((button) => {
    button.addEventListener("click", () => setActiveModule(button.dataset.module));
  });

  document.querySelectorAll("[data-module-open]").forEach((button) => {
    button.addEventListener("click", () => setActiveModule(button.dataset.moduleOpen));
  });

  document.getElementById("btn-refresh-dashboard").addEventListener("click", () => {
    renderDashboard();
    showTechToast("Dashboard atualizado em tempo real.", "info");
  });

  document.getElementById("conversation-search").addEventListener("input", () => {
    renderConversations();
  });

  document.querySelectorAll(".filter-btn[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeFilter = button.dataset.filter;

      document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      renderConversations();
    });
  });

  document.getElementById("conversations-list").addEventListener("click", (event) => {
    const chatItem = event.target.closest(".chat-item");

    if (!chatItem) {
      return;
    }

    state.activeConversationId = chatItem.dataset.conversationId;

    const conversation = getActiveConversation();

    if (conversation) {
      conversation.unread = 0;
    }

    renderConversations();
    renderActiveConversation();
  });

  document.querySelectorAll(".macro-tag[data-macro]").forEach((button) => {
    button.addEventListener("click", () => insertMacro(button.dataset.macro));
  });

  document.getElementById("toggle-note").addEventListener("change", toggleInternalNote);

  document.getElementById("btn-send").addEventListener("click", sendMessage);

  document.getElementById("msg-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  document.getElementById("btn-ai-suggestion").addEventListener("click", applyAISuggestion);
  document.getElementById("btn-ai-summary").addEventListener("click", generateAISummary);
  document.getElementById("btn-analyze-sentiment").addEventListener("click", analyzeSentiment);
  document.getElementById("btn-resolve-conversation").addEventListener("click", resolveConversation);
  document.getElementById("btn-new-conversation").addEventListener("click", createMockConversation);

  document.getElementById("btn-add-opportunity").addEventListener("click", createOpportunity);

  document.getElementById("kanban-board").addEventListener("dragstart", handleKanbanDragStart);
  document.getElementById("kanban-board").addEventListener("dragover", handleKanbanDragOver);
  document.getElementById("kanban-board").addEventListener("drop", handleKanbanDrop);

  document.getElementById("btn-create-automation").addEventListener("click", createAutomation);

  document.getElementById("automation-grid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-toggle-automation]");

    if (!button) {
      return;
    }

    toggleAutomation(button.dataset.toggleAutomation);
  });

  document.getElementById("btn-export-report").addEventListener("click", () => {
    showTechToast("Relatório empresarial exportado com sucesso.", "success");
  });

  document.getElementById("wl-logo-file").addEventListener("change", handleLogoUpload);
  document.getElementById("btn-apply-whitelabel").addEventListener("click", applyWhiteLabel);
  document.getElementById("btn-save-backend").addEventListener("click", saveBackendConfig);
  document.getElementById("btn-save-ai").addEventListener("click", saveAIConfig);
}

function setActiveModule(moduleName) {
  state.activeModule = moduleName;

  document.querySelectorAll(".saas-btn[data-module]").forEach((button) => {
    button.classList.toggle("active", button.dataset.module === moduleName);
  });

  document.querySelectorAll(".app-module").forEach((section) => {
    section.classList.remove("active");
  });

  const activeSection = document.getElementById(`module-${moduleName}`);

  if (activeSection) {
    activeSection.classList.add("active");
  }

  if (moduleName === "dashboard") {
    renderDashboard();
  }

  if (moduleName === "crm") {
    renderKanban();
  }

  if (moduleName === "automations") {
    renderAutomations();
  }
}

function renderDashboard() {
  const leads = state.conversations.length + 12;
  const conversions = state.opportunities.filter((opportunity) => opportunity.stage === "Fechado").length;
  const active = state.conversations.filter((conversation) => conversation.status === "open").length;
  const revenue = state.opportunities
    .filter((opportunity) => opportunity.stage === "Fechado")
    .reduce((total, opportunity) => total + opportunity.value, 0);

  const efficiency = Math.min(98, 86 + active + conversions);
  const averageResponse = "3m 24s";

  setText("kpi-leads", String(leads));
  setText("kpi-conversions", String(conversions));
  setText("kpi-active", String(active));
  setText("kpi-response", averageResponse);
  setText("kpi-efficiency", `${efficiency}%`);
  setText("kpi-revenue", formatCurrency(revenue));
  setText("hero-score", `${efficiency}%`);
  setText("hero-ai", String(37 + active));

  const insights = [
    "Leads com intenção comercial alta aumentaram 18% nas últimas 24h.",
    "Tempo médio de primeira resposta está dentro da meta premium.",
    "IA recomenda priorizar oportunidades acima de R$ 8.000 no pipeline.",
    "Conversas com sentimento preocupado devem receber follow-up humano."
  ];

  const insightsContainer = document.getElementById("dashboard-insights");
  insightsContainer.innerHTML = insights.map((item) => `<li>${escapeHTML(item)}</li>`).join("");
}

function renderConversations() {
  const list = document.getElementById("conversations-list");
  const search = document.getElementById("conversation-search").value.trim().toLowerCase();

  const filtered = state.conversations.filter((conversation) => {
    const matchesFilter = state.activeFilter === "all" || conversation.status === state.activeFilter;
    const searchable = [
      conversation.contact.name,
      conversation.contact.company,
      conversation.contact.phone,
      getLastMessage(conversation).text
    ]
      .join(" ")
      .toLowerCase();

    return matchesFilter && searchable.includes(search);
  });

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>Nenhuma conversa encontrada.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered
    .map((conversation) => {
      const lastMessage = getLastMessage(conversation);
      const isActive = conversation.id === state.activeConversationId;
      const channelBadge = getChannelBadge(conversation.contact.channel);
      const statusLabel = getStatusLabel(conversation.status);

      return `
        <button class="chat-item ${isActive ? "active" : ""}" type="button" data-conversation-id="${escapeHTML(conversation.id)}">
          <div class="avatar">${escapeHTML(conversation.contact.initials)}</div>

          <div class="chat-preview">
            <h4>
              <span>${escapeHTML(conversation.contact.name)}</span>
              <span class="chat-time">${escapeHTML(conversation.lastAt)}</span>
            </h4>

            <p>${escapeHTML(lastMessage.text)}</p>

            <div class="chat-meta-line">
              ${channelBadge}
              <span class="badge status-${escapeHTML(conversation.status)}">${escapeHTML(statusLabel)}</span>
              ${conversation.unread > 0 ? `<span class="badge status-open">${conversation.unread}</span>` : ""}
            </div>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderActiveConversation() {
  const conversation = getActiveConversation();

  if (!conversation) {
    return;
  }

  setText("active-contact-name", conversation.contact.name);
  setText(
    "active-contact-meta",
    `${conversation.contact.company} • ${capitalize(conversation.contact.channel)} • ${conversation.assignedTo}`
  );

  document.getElementById("assign-select").value = conversation.assignedTo;

  const history = document.getElementById("chat-history");

  history.innerHTML = conversation.messages
    .map((message) => {
      const className = message.type === "in" ? "msg-in" : message.type === "note" ? "msg-note" : "msg-out";
      const prefix = message.type === "note" ? '<strong>Nota interna:</strong> ' : "";

      return `
        <div class="message ${className}">
          ${prefix}${escapeHTML(message.text)}
          <span class="msg-time">${escapeHTML(message.time)}</span>
        </div>
      `;
    })
    .join("");

  history.scrollTop = history.scrollHeight;

  renderContactDetails(conversation);
}

function renderContactDetails(conversation) {
  setText("details-avatar", conversation.contact.initials);
  setText("details-name", conversation.contact.name);
  setText("details-company", conversation.contact.company);
  setText("details-channel", capitalize(conversation.contact.channel));
  setText("details-phone", conversation.contact.phone);
  setText("details-value", formatCurrency(conversation.contact.value));
  setText("details-sentiment", conversation.contact.sentiment);

  const tagsContainer = document.getElementById("details-tags");
  tagsContainer.innerHTML = conversation.contact.tags
    .map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`)
    .join("");

  const summaryOutput = document.getElementById("ai-summary-output");

  if (!summaryOutput.dataset.generated) {
    summaryOutput.textContent = "Gere um resumo automático para visualizar o contexto da conversa.";
  }
}

function sendMessage() {
  const input = document.getElementById("msg-input");
  const text = input.value.trim();
  const conversation = getActiveConversation();

  if (!conversation) {
    showTechToast("Selecione uma conversa antes de enviar.", "error");
    return;
  }

  if (!text) {
    showTechToast("Digite uma mensagem antes de enviar.", "error");
    return;
  }

  const messageType = state.isInternalNote ? "note" : "out";

  conversation.messages.push({
    type: messageType,
    text,
    time: getCurrentTime()
  });

  conversation.lastAt = getCurrentTime();

  if (!state.isInternalNote && conversation.status === "pending") {
    conversation.status = "open";
  }

  input.value = "";

  renderConversations();
  renderActiveConversation();

  showTechToast(state.isInternalNote ? "Nota interna adicionada." : "Mensagem enviada com sucesso.", "success");
}

function insertMacro(text) {
  const input = document.getElementById("msg-input");
  const separator = input.value.trim().length > 0 ? " " : "";

  input.value = `${input.value}${separator}${text}`;
  input.focus();
}

function toggleInternalNote() {
  state.isInternalNote = document.getElementById("toggle-note").checked;

  const inputArea = document.getElementById("input-area");
  const inputField = document.getElementById("msg-input");
  const sendIcon = document.querySelector("#btn-send i");

  inputArea.classList.toggle("internal-note-mode", state.isInternalNote);
  inputField.placeholder = state.isInternalNote ? "Escreva uma nota interna para sua equipe..." : "Digite sua mensagem ao cliente...";
  sendIcon.className = state.isInternalNote ? "fa-solid fa-lock" : "fa-solid fa-paper-plane";
}

function applyAISuggestion() {
  const conversation = getActiveConversation();

  if (!conversation) {
    showTechToast("Selecione uma conversa para usar a IA.", "error");
    return;
  }

  const suggestion = createAISuggestion(conversation);
  const input = document.getElementById("msg-input");

  input.value = suggestion;
  input.focus();

  showTechToast("Sugestão de IA aplicada no campo de mensagem.", "info");
}

function createAISuggestion(conversation) {
  const value = conversation.contact.value;

  if (conversation.contact.sentiment === "Preocupado") {
    return "Entendo sua preocupação. Para garantir segurança e qualidade, podemos configurar limites de resposta, base de conhecimento aprovada e transferência para humano quando a IA identificar baixa confiança.";
  }

  if (value >= 8000) {
    return "Pelo volume e potencial da sua operação, recomendo uma implantação com CRM visual, automações de follow-up e IA para qualificação dos leads. Posso montar uma proposta premium personalizada para você.";
  }

  return "Perfeito. Podemos estruturar uma solução com atendimento integrado, histórico inteligente e automações para reduzir tempo de resposta e aumentar conversões.";
}

function generateAISummary() {
  const conversation = getActiveConversation();

  if (!conversation) {
    showTechToast("Selecione uma conversa para resumir.", "error");
    return;
  }

  const lastInbound = [...conversation.messages].reverse().find((message) => message.type === "in");
  const summary = `Resumo IA: ${conversation.contact.name} da empresa ${conversation.contact.company} demonstrou interesse em ${conversation.contact.tags.join(", ")}. Valor estimado: ${formatCurrency(conversation.contact.value)}. Último ponto relevante: "${lastInbound ? lastInbound.text : "sem mensagem recente"}".`;

  const output = document.getElementById("ai-summary-output");
  output.textContent = summary;
  output.dataset.generated = "true";

  showTechToast("Resumo automático gerado pela IA.", "success");
}

function analyzeSentiment() {
  const conversation = getActiveConversation();

  if (!conversation) {
    showTechToast("Selecione uma conversa para analisar.", "error");
    return;
  }

  const joinedMessages = conversation.messages.map((message) => message.text.toLowerCase()).join(" ");

  if (joinedMessages.includes("preocup") || joinedMessages.includes("demora") || joinedMessages.includes("perdemos")) {
    conversation.contact.sentiment = "Preocupado";
  } else if (joinedMessages.includes("ótimo") || joinedMessages.includes("excelente") || joinedMessages.includes("perfeito")) {
    conversation.contact.sentiment = "Positivo";
  } else {
    conversation.contact.sentiment = "Neutro";
  }

  renderActiveConversation();
  showTechToast(`Sentimento classificado como: ${conversation.contact.sentiment}.`, "info");
}

function resolveConversation() {
  const conversation = getActiveConversation();

  if (!conversation) {
    showTechToast("Selecione uma conversa para resolver.", "error");
    return;
  }

  conversation.status = "resolved";
  conversation.unread = 0;

  renderConversations();
  renderActiveConversation();
  renderDashboard();

  showTechToast("Atendimento marcado como resolvido.", "success");
}

function createMockConversation() {
  const id = `conv-${String(state.conversations.length + 1).padStart(3, "0")}`;

  const conversation = {
    id,
    status: "open",
    assignedTo: "IA Copilot",
    lastAt: getCurrentTime(),
    unread: 1,
    contact: {
      name: "Novo Lead Premium",
      initials: "NL",
      company: "Empresa em Qualificação",
      channel: "whatsapp",
      phone: "+55 11 90000-0000",
      email: "lead@empresa.com",
      tags: ["Novo", "IA", "Qualificação"],
      sentiment: "Neutro",
      value: 5200
    },
    messages: [
      {
        type: "in",
        text: "Olá, quero conhecer as soluções da Supreme Tech.",
        time: getCurrentTime()
      }
    ]
  };

  state.conversations.unshift(conversation);
  state.activeConversationId = id;

  renderConversations();
  renderActiveConversation();
  renderDashboard();

  showTechToast("Nova conversa criada para demonstração.", "success");
}

function renderKanban() {
  const board = document.getElementById("kanban-board");
  const stages = ["Novo Lead", "Qualificação", "Proposta", "Fechado"];

  board.innerHTML = stages
    .map((stage) => {
      const opportunities = state.opportunities.filter((opportunity) => opportunity.stage === stage);
      const total = opportunities.reduce((sum, opportunity) => sum + opportunity.value, 0);

      return `
        <section class="kanban-column" data-stage="${escapeHTML(stage)}">
          <header class="kanban-header">
            <h3>${escapeHTML(stage)}</h3>
            <span>${opportunities.length} oportunidades • ${formatCurrency(total)}</span>
          </header>

          <div class="kanban-cards">
            ${opportunities
              .map((opportunity) => {
                return `
                  <article class="k-card" draggable="true" data-opportunity-id="${escapeHTML(opportunity.id)}">
                    <h4>${escapeHTML(opportunity.title)}</h4>
                    <p>${escapeHTML(opportunity.company)}</p>
                    <div class="k-card-footer">
                      <span>${formatCurrency(opportunity.value)}</span>
                      <span>${opportunity.probability}%</span>
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function handleKanbanDragStart(event) {
  const card = event.target.closest(".k-card");

  if (!card) {
    return;
  }

  state.draggedOpportunityId = card.dataset.opportunityId;
  event.dataTransfer.effectAllowed = "move";
}

function handleKanbanDragOver(event) {
  const column = event.target.closest(".kanban-column");

  if (!column) {
    return;
  }

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handleKanbanDrop(event) {
  const column = event.target.closest(".kanban-column");

  if (!column || !state.draggedOpportunityId) {
    return;
  }

  const opportunity = state.opportunities.find((item) => item.id === state.draggedOpportunityId);

  if (!opportunity) {
    return;
  }

  opportunity.stage = column.dataset.stage;

  if (opportunity.stage === "Fechado") {
    opportunity.probability = 100;
  }

  state.draggedOpportunityId = null;

  renderKanban();
  renderDashboard();

  showTechToast(`Oportunidade movida para ${opportunity.stage}.`, "success");
}

function createOpportunity() {
  const id = `opp-${String(state.opportunities.length + 1).padStart(3, "0")}`;

  state.opportunities.unshift({
    id,
    title: "Nova solução SaaS personalizada",
    company: "Lead Enterprise",
    value: 7500,
    stage: "Novo Lead",
    probability: 25,
    owner: "Ana Sales"
  });

  renderKanban();
  renderDashboard();

  showTechToast("Nova oportunidade criada no CRM.", "success");
}

function renderAutomations() {
  const grid = document.getElementById("automation-grid");

  grid.innerHTML = state.automations
    .map((automation) => {
      return `
        <article class="automation-card">
          <div class="automation-icon">
            <i class="${escapeHTML(automation.icon)}"></i>
          </div>

          <h3>${escapeHTML(automation.name)}</h3>
          <p>${escapeHTML(automation.description)}</p>

          <button class="btn ${automation.active ? "btn-secondary" : "btn-ghost"} full" type="button" data-toggle-automation="${escapeHTML(automation.id)}">
            <i class="fa-solid ${automation.active ? "fa-toggle-on" : "fa-toggle-off"}"></i>
            ${automation.active ? "Ativa" : "Inativa"}
          </button>
        </article>
      `;
    })
    .join("");
}

function toggleAutomation(id) {
  const automation = state.automations.find((item) => item.id === id);

  if (!automation) {
    return;
  }

  automation.active = !automation.active;
  renderAutomations();

  showTechToast(`Automação ${automation.active ? "ativada" : "desativada"}.`, "info");
}

function createAutomation() {
  const id = `auto-${String(state.automations.length + 1).padStart(3, "0")}`;

  state.automations.push({
    id,
    name: "Webhook para CRM externo",
    description: "Envia eventos de conversa e oportunidade para sistemas externos via webhook.",
    icon: "fa-solid fa-plug-circle-bolt",
    active: false
  });

  renderAutomations();

  showTechToast("Nova automação criada.", "success");
}

function renderContracts() {
  const table = document.getElementById("contracts-table");

  table.innerHTML = state.contracts
    .map((contract) => {
      const statusClass = contract.status === "Ativo" ? "status-open" : contract.status === "Proposta enviada" ? "status-pending" : "status-resolved";

      return `
        <tr>
          <td>${escapeHTML(contract.client)}</td>
          <td>${escapeHTML(contract.plan)}</td>
          <td><span class="badge ${statusClass}">${escapeHTML(contract.status)}</span></td>
          <td>${formatCurrency(contract.mrr)}</td>
          <td>${escapeHTML(contract.due)}</td>
        </tr>
      `;
    })
    .join("");
}

function handleLogoUpload(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

  if (!allowedTypes.includes(file.type)) {
    showTechToast("Formato inválido. Use PNG, JPG, WEBP ou SVG.", "error");
    event.target.value = "";
    return;
  }

  const maxSizeInBytes = 1024 * 1024;

  if (file.size > maxSizeInBytes) {
    showTechToast("A imagem deve ter no máximo 1MB.", "error");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    state.uploadedLogoDataUrl = String(reader.result);
    document.getElementById("file-name-display").textContent = file.name;
    document.getElementById("client-logo-sidebar").src = state.uploadedLogoDataUrl;
    showTechToast("Logomarca carregada. Clique em aplicar para salvar.", "info");
  };

  reader.onerror = () => {
    showTechToast("Não foi possível carregar a imagem.", "error");
  };

  reader.readAsDataURL(file);
}

function applyWhiteLabel() {
  const bgColor = document.getElementById("wl-bg").value;
  const primaryColor = document.getElementById("wl-primary").value;
  const accentColor = document.getElementById("wl-accent").value;
  const logoUrl = document.getElementById("wl-logo-url").value.trim();

  let finalLogo = state.uploadedLogoDataUrl || document.getElementById("client-logo-sidebar").src;

  if (logoUrl) {
    if (!isValidURL(logoUrl)) {
      showTechToast("URL da logomarca inválida.", "error");
      return;
    }

    finalLogo = logoUrl;
  }

  document.documentElement.style.setProperty("--bg-dark", bgColor);
  document.documentElement.style.setProperty("--primary", primaryColor);
  document.documentElement.style.setProperty("--primary-strong", lightenHex(primaryColor, 22));
  document.documentElement.style.setProperty("--accent", accentColor);
  document.getElementById("client-logo-sidebar").src = finalLogo;

  const config = {
    bgColor,
    primaryColor,
    accentColor,
    logoUrl: finalLogo
  };

  localStorage.setItem(SUPREME_STORAGE_KEYS.whiteLabel, JSON.stringify(config));

  showTechToast("Identidade visual aplicada com sucesso.", "success");
}

function loadSavedWhiteLabel() {
  const rawConfig = localStorage.getItem(SUPREME_STORAGE_KEYS.whiteLabel);

  if (!rawConfig) {
    return;
  }

  try {
    const config = JSON.parse(rawConfig);

    if (config.bgColor) {
      document.documentElement.style.setProperty("--bg-dark", config.bgColor);
      document.getElementById("wl-bg").value = config.bgColor;
    }

    if (config.primaryColor) {
      document.documentElement.style.setProperty("--primary", config.primaryColor);
      document.documentElement.style.setProperty("--primary-strong", lightenHex(config.primaryColor, 22));
      document.getElementById("wl-primary").value = config.primaryColor;
    }

    if (config.accentColor) {
      document.documentElement.style.setProperty("--accent", config.accentColor);
      document.getElementById("wl-accent").value = config.accentColor;
    }

    if (config.logoUrl) {
      document.getElementById("client-logo-sidebar").src = config.logoUrl;
    }
  } catch {
    localStorage.removeItem(SUPREME_STORAGE_KEYS.whiteLabel);
  }
}

function saveBackendConfig() {
  const backendURL = document.getElementById("backend-url").value.trim();
  const accountId = document.getElementById("chatwoot-account").value.trim();

  if (backendURL && !isValidURL(backendURL)) {
    showTechToast("URL do backend inválida.", "error");
    return;
  }

  const config = {
    backendURL,
    accountId
  };

  localStorage.setItem(SUPREME_STORAGE_KEYS.backend, JSON.stringify(config));
  showTechToast("Conexão segura salva. Token deve permanecer no backend.", "success");
}

function loadSavedBackendConfig() {
  const rawConfig = localStorage.getItem(SUPREME_STORAGE_KEYS.backend);

  if (!rawConfig) {
    return;
  }

  try {
    const config = JSON.parse(rawConfig);

    document.getElementById("backend-url").value = config.backendURL || "";
    document.getElementById("chatwoot-account").value = config.accountId || "";
  } catch {
    localStorage.removeItem(SUPREME_STORAGE_KEYS.backend);
  }
}

function saveAIConfig() {
  const tone = document.getElementById("ai-tone").value;
  const autosummary = document.getElementById("ai-autosummary").value;

  localStorage.setItem(
    SUPREME_STORAGE_KEYS.ai,
    JSON.stringify({
      tone,
      autosummary
    })
  );

  showTechToast("Configurações de IA salvas.", "success");
}

function loadSavedAIConfig() {
  const rawConfig = localStorage.getItem(SUPREME_STORAGE_KEYS.ai);

  if (!rawConfig) {
    return;
  }

  try {
    const config = JSON.parse(rawConfig);

    if (config.tone) {
      document.getElementById("ai-tone").value = config.tone;
    }

    if (config.autosummary) {
      document.getElementById("ai-autosummary").value = config.autosummary;
    }
  } catch {
    localStorage.removeItem(SUPREME_STORAGE_KEYS.ai);
  }
}

function getActiveConversation() {
  return state.conversations.find((conversation) => conversation.id === state.activeConversationId);
}

function getLastMessage(conversation) {
  return conversation.messages[conversation.messages.length - 1] || {
    text: "",
    time: ""
  };
}

function getChannelBadge(channel) {
  const normalized = channel.toLowerCase();

  if (normalized === "whatsapp") {
    return '<span class="badge whatsapp"><i class="fa-brands fa-whatsapp"></i> WhatsApp</span>';
  }

  if (normalized === "instagram") {
    return '<span class="badge instagram"><i class="fa-brands fa-instagram"></i> Instagram</span>';
  }

  return '<span class="badge email"><i class="fa-solid fa-envelope"></i> E-mail</span>';
}

function getStatusLabel(status) {
  const labels = {
    open: "Aberto",
    pending: "Pendente",
    resolved: "Resolvido"
  };

  return labels[status] || status;
}

function showTechToast(message, type = "info") {
  const container = document.getElementById("tech-toast-container");
  const toast = document.createElement("div");

  const normalizedType = ["success", "error", "info"].includes(type) ? type : "info";
  const iconClass = normalizedType === "success"
    ? "fa-circle-check"
    : normalizedType === "error"
      ? "fa-circle-xmark"
      : "fa-circle-info";

  toast.className = `tech-toast toast-${normalizedType}`;

  const icon = document.createElement("div");
  icon.className = "toast-icon";

  const iconElement = document.createElement("i");
  iconElement.className = `fa-solid ${iconClass}`;
  icon.appendChild(iconElement);

  const body = document.createElement("div");
  body.className = "toast-body";

  const title = document.createElement("h4");
  title.textContent = normalizedType === "success" ? "Sucesso" : normalizedType === "error" ? "Atenção" : "Informação";

  const text = document.createElement("p");
  text.textContent = message;

  const progress = document.createElement("div");
  progress.className = "toast-progress";

  body.appendChild(title);
  body.appendChild(text);

  toast.appendChild(icon);
  toast.appendChild(body);
  toast.appendChild(progress);

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  window.setTimeout(() => {
    toast.classList.remove("show");

    window.setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

function setText(id, text) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = text;
  }
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

function getCurrentTime() {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

function capitalize(value) {
  const stringValue = String(value || "");

  if (!stringValue) {
    return "";
  }

  return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
}

function isValidURL(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function lightenHex(hex, percentage) {
  const normalized = hex.replace("#", "");

  if (normalized.length !== 6) {
    return hex;
  }

  const number = parseInt(normalized, 16);
  const red = Math.min(255, (number >> 16) + Math.round(255 * (percentage / 100)));
  const green = Math.min(255, ((number >> 8) & 255) + Math.round(255 * (percentage / 100)));
  const blue = Math.min(255, (number & 255) + Math.round(255 * (percentage / 100)));

  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
}
