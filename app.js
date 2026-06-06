// ================= CONFIGURAÇÕES E DADOS MOCK =================
const CHATWOOT_API_URL = "https://chatsupreme.supremetechdev.com/api/v1";
let chatAtivoId = null;
let isInternalNote = false;

const conversasMock = [
    { id: 101, nome: "Luiz Silva", telefone: "5521999999999", channel: "whatsapp", ultima_msg: "O bot travou no menu inicial", hora: "14:30", etiquetas: ["SUPORTE"], historico: [
        { tipo: 'in', texto: 'O bot travou no menu inicial, preciso de ajuda', hora: '14:30' }
    ]},
    { id: 102, nome: "Hospital Andaraí", telefone: "5521888888888", channel: "instagram", ultima_msg: "Pode me enviar a proposta?", hora: "13:15", etiquetas: ["VIP", "PROSPECÇÃO"], historico: [
        { tipo: 'out', texto: 'Olá! Sou o consultor responsável.', hora: '13:10' },
        { tipo: 'in', texto: 'Pode me enviar a proposta?', hora: '13:15' }
    ]}
];

// ================= INICIALIZAÇÃO =================
document.addEventListener('DOMContentLoaded', () => {
    renderizarListaConversas();
    
    // Captura Enter para envio
    document.getElementById('msg-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarMensagem();
        }
    });

    // Carregar White-Label salvo (Se houver)
    loadSavedWhiteLabel();
});

// ================= LÓGICA DO CHAT (INBOX) =================
function renderizarListaConversas() {
    const listContainer = document.getElementById('chat-list');
    listContainer.innerHTML = '';

    conversasMock.forEach(chat => {
        const icon = chat.channel === 'whatsapp' ? '<i class="fab fa-whatsapp" style="color:var(--whatsapp)"></i>' : '<i class="fab fa-instagram" style="color:#E1306C"></i>';
        
        listContainer.innerHTML += `
            <div class="chat-item" id="chat-${chat.id}" onclick="abrirConversa(${chat.id})">
                <div class="avatar">${icon}</div>
                <div class="chat-preview">
                    <h4>${chat.nome} <span class="chat-time">${chat.hora}</span></h4>
                    <p>${chat.ultima_msg}</p>
                </div>
            </div>
        `;
    });
}

function abrirConversa(id) {
    chatAtivoId = id;
    const chatData = conversasMock.find(c => c.id === id);

    document.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active'));
    document.getElementById(`chat-${id}`).classList.add('active');

    document.getElementById('current-chat-name').innerText = chatData.nome;
    document.getElementById('current-chat-phone').innerText = "+" + chatData.telefone;

    const historyContainer = document.getElementById('chat-history');
    historyContainer.innerHTML = '';
    
    chatData.historico.forEach(msg => {
        const classe = msg.tipo === 'in' ? 'msg-in' : (msg.isNote ? 'msg-note' : 'msg-out');
        const iconLock = msg.isNote ? '<i class="fas fa-lock" style="font-size:10px; margin-right:5px;"></i>' : '';
        historyContainer.innerHTML += `
            <div class="message ${classe}">
                ${msg.texto}
                <span class="msg-time">${iconLock}${msg.hora}</span>
            </div>
        `;
    });
    historyContainer.scrollTop = historyContainer.scrollHeight;

    document.getElementById('crm-name').value = chatData.nome;
    document.getElementById('crm-phone').value = chatData.telefone;
    
    const tagsContainer = document.getElementById('crm-tags');
    tagsContainer.innerHTML = '';
    chatData.etiquetas.forEach(tag => {
        tagsContainer.innerHTML += `<span class="tag" style="--tag-color: var(--primary);">${tag}</span>`;
    });
}

function enviarMensagem() {
    const input = document.getElementById('msg-input');
    const texto = input.value.trim();
    if (texto === '' || chatAtivoId === null) return;

    const historyContainer = document.getElementById('chat-history');
    const msgClass = isInternalNote ? 'msg-note' : 'msg-out';
    const lockIcon = isInternalNote ? '<i class="fas fa-lock" style="font-size:10px; margin-right:5px;"></i>' : '';

    historyContainer.innerHTML += `
        <div class="message ${msgClass}">
            ${texto.replace(/\n/g, '<br>')}
            <span class="msg-time">${lockIcon}Agora</span>
        </div>
    `;
    input.value = '';
    historyContainer.scrollTop = historyContainer.scrollHeight;

    // Simulando API Chatwoot (O atributo private define se é nota interna)
    const payload = { content: texto, message_type: "outgoing", private: isInternalNote };
    console.log("Enviando para Chatwoot API:", payload);
}

// ================= ZENDESK FEATURES (MACROS & NOTAS) =================
function insertMacro(text) {
    const input = document.getElementById('msg-input');
    input.value += (input.value.length > 0 ? " " : "") + text;
    input.focus();
}

function toggleInternalNote() {
    const checkbox = document.getElementById('toggle-note');
    const inputArea = document.getElementById('input-area');
    const inputField = document.getElementById('msg-input');
    const sendBtn = document.getElementById('btn-send');

    isInternalNote = checkbox.checked;

    if (isInternalNote) {
        inputArea.classList.add('internal-note-mode');
        inputField.placeholder = "Escreva uma nota interna (O cliente não verá isso)...";
        sendBtn.innerHTML = '<i class="fas fa-lock"></i>';
    } else {
        inputArea.classList.remove('internal-note-mode');
        inputField.placeholder = "Digite sua mensagem ao cliente...";
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
}

// ================= MULTI-TENANT & WHITE-LABEL ENGINE =================
function applyWhiteLabel() {
    const logoUrl = document.getElementById('wl-logo').value;
    const primaryColor = document.getElementById('wl-primary').value;
    const accentColor = document.getElementById('wl-accent').value;

    // Altera as Variáveis CSS na Raiz do Documento
    document.documentElement.style.setProperty('--primary', primaryColor);
    document.documentElement.style.setProperty('--accent', accentColor);
    
    // Altera a Logo
    if(logoUrl) {
        document.getElementById('client-logo-sidebar').src = logoUrl;
    }

    // Salva no LocalStorage para persistência no navegador do cliente
    localStorage.setItem('wl_config', JSON.stringify({ primaryColor, accentColor, logoUrl }));
    alert("Identidade visual aplicada com sucesso!");
}

function loadSavedWhiteLabel() {
    const saved = localStorage.getItem('wl_config');
    if (saved) {
        const config = JSON.parse(saved);
        document.documentElement.style.setProperty('--primary', config.primaryColor);
        document.documentElement.style.setProperty('--accent', config.accentColor);
        document.getElementById('client-logo-sidebar').src = config.logoUrl;
        
        // Atualiza os inputs
        document.getElementById('wl-primary').value = config.primaryColor;
        document.getElementById('wl-accent').value = config.accentColor;
        document.getElementById('wl-logo').value = config.logoUrl;
    }
}

// ================= NAVEGAÇÃO =================
function switchModule(moduleId) {
    document.querySelectorAll('.app-module').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.saas-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(moduleId).classList.add('active');
    event.currentTarget.classList.add('active');
}
