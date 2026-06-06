// ================= CONFIGURAÇÕES E DADOS MOCK =================
let chatAtivoId = null;
let isInternalNote = false;
let uploadedLogoBase64 = null; // Armazena a imagem da logo em memória

const conversasMock = [
    { id: 101, nome: "Luiz Silva", telefone: "5521999999999", channel: "whatsapp", ultima_msg: "O bot travou no menu inicial", hora: "14:30", etiquetas: ["SUPORTE"], historico: [
        { tipo: 'in', texto: 'O bot travou no menu inicial, preciso de ajuda', hora: '14:30' }
    ]},
    { id: 102, nome: "Hospital Andaraí", telefone: "5521888888888", channel: "instagram", ultima_msg: "Pode me enviar a proposta?", hora: "13:15", etiquetas: ["VIP"], historico: [
        { tipo: 'out', texto: 'Olá! Sou o consultor.', hora: '13:10' },
        { tipo: 'in', texto: 'Pode me enviar a proposta?', hora: '13:15' }
    ]}
];

// ================= INICIALIZAÇÃO =================
document.addEventListener('DOMContentLoaded', () => {
    renderizarListaConversas();
    renderizarBaseContatos();
    loadSavedWhiteLabel();
    
    // Captura Enter para envio no Chat
    document.getElementById('msg-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarMensagem();
        }
    });
});

// ================= TECH TOASTS (Notificações) =================
function showTechToast(message, type = 'success') {
    const container = document.getElementById('tech-toast-container');
    const toast = document.createElement('div');
    toast.className = `tech-toast toast-${type}`;
    
    let icon = '<i class="fas fa-check-circle"></i>';
    if(type === 'error') icon = '<i class="fas fa-exclamation-triangle"></i>';
    if(type === 'info') icon = '<i class="fas fa-info-circle"></i>';

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-body">
            <h4>${type.toUpperCase()}</h4>
            <p>${message}</p>
        </div>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);
    
    // Animação de entrada e saída
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ================= NAVEGAÇÃO DE MÓDULOS =================
function switchModule(moduleId) {
    document.querySelectorAll('.app-module').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.saas-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(moduleId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// ================= BASE DE CONTATOS =================
function renderizarBaseContatos() {
    const tbody = document.getElementById('contacts-table-body');
    tbody.innerHTML = '';
    
    conversasMock.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="td-user">
                        <div class="td-avatar"><i class="fas fa-user"></i></div>
                        <span>${c.nome}</span>
                    </div>
                </td>
                <td>+${c.telefone}</td>
                <td><span class="badge ${c.channel}">${c.channel.toUpperCase()}</span></td>
                <td><span class="status-dot online"></span> Ativo</td>
                <td>
                    <button class="btn-icon" onclick="switchModule('module-chat'); abrirConversa(${c.id})" title="Abrir Chat"><i class="fas fa-comment-dots"></i></button>
                    <button class="btn-icon danger" title="Excluir"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

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
        historyContainer.innerHTML += `<div class="message ${classe}">${msg.texto}<span class="msg-time">${msg.hora}</span></div>`;
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
    historyContainer.innerHTML += `<div class="message ${msgClass}">${texto.replace(/\n/g, '<br>')}<span class="msg-time">Agora</span></div>`;
    input.value = '';
    historyContainer.scrollTop = historyContainer.scrollHeight;
}

function fecharTicket() {
    if(chatAtivoId) showTechToast("Ticket encerrado com sucesso!", "success");
}

function insertMacro(text) {
    const input = document.getElementById('msg-input');
    input.value += (input.value.length > 0 ? " " : "") + text;
    input.focus();
}

function toggleInternalNote() {
    isInternalNote = document.getElementById('toggle-note').checked;
    const inputArea = document.getElementById('input-area');
    const inputField = document.getElementById('msg-input');
    const sendBtn = document.getElementById('btn-send');

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

// ================= WHITE-LABEL ENGINE =================
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('file-name-display').innerText = file.name;
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedLogoBase64 = e.target.result; // Salva o Base64 na variável
            document.getElementById('wl-logo-url').value = ''; // Limpa a URL se o usuário subiu arquivo
        }
        reader.readAsDataURL(file);
    }
}

function applyWhiteLabel() {
    const bgColor = document.getElementById('wl-bg').value;
    const primaryColor = document.getElementById('wl-primary').value;
    const accentColor = document.getElementById('wl-accent').value;
    const urlLogo = document.getElementById('wl-logo-url').value;

    // Define qual logo usar (Upload > URL > Padrão)
    const finalLogo = uploadedLogoBase64 || urlLogo || 'https://via.placeholder.com/40?text=S';

    // Injeta no :root do CSS
    document.documentElement.style.setProperty('--bg-dark', bgColor);
    document.documentElement.style.setProperty('--primary', primaryColor);
    document.documentElement.style.setProperty('--accent', accentColor);
    document.getElementById('client-logo-sidebar').src = finalLogo;

    // Salva no LocalStorage
    localStorage.setItem('wl_config', JSON.stringify({ bgColor, primaryColor, accentColor, logoUrl: finalLogo }));
    showTechToast("Identidade visual aplicada e salva!", "success");
}

function loadSavedWhiteLabel() {
    const saved = localStorage.getItem('wl_config');
    if (saved) {
        const config = JSON.parse(saved);
        document.documentElement.style.setProperty('--bg-dark', config.bgColor);
        document.documentElement.style.setProperty('--primary', config.primaryColor);
        document.documentElement.style.setProperty('--accent', config.accentColor);
        document.getElementById('client-logo-sidebar').src = config.logoUrl;
        
        document.getElementById('wl-bg').value = config.bgColor;
        document.getElementById('wl-primary').value = config.primaryColor;
        document.getElementById('wl-accent').value = config.accentColor;
        
        // Se a logo for muito grande (Base64), não tentamos jogar no input de texto
        if(!config.logoUrl.startsWith('data:image')) {
            document.getElementById('wl-logo-url').value = config.logoUrl;
        }
    }
}
