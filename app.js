// Configurações do Chatwoot API (Exemplo para substituição futura)
const CHATWOOT_API_URL = "https://chatsupreme.supremetechdev.com/api/v1";
const ACCOUNT_ID = "2";
const API_TOKEN = "SEU_TOKEN_DE_ACESSO_AQUI"; // Idealmente guardado num backend ou variável de ambiente no front.

// Dados Simulados (Para visualizar o front-end funcionando agora)
const conversasMock = [
    { id: 101, nome: "Luiz Silva", telefone: "5521999999999", ultima_msg: "O bot travou no menu inicial", hora: "14:30", etiquetas: ["ANALISE_MANUAL", "SUPORTE"], historico: [
        { tipo: 'in', texto: 'O bot travou no menu inicial, preciso de ajuda', hora: '14:30' }
    ]},
    { id: 102, nome: "Hospital Andaraí", telefone: "5521888888888", ultima_msg: "Pode me enviar a proposta?", hora: "13:15", etiquetas: ["NOVO", "PROSPECCAO_AGUARDANDO"], historico: [
        { tipo: 'out', texto: 'Olá! Sou o Supreminho, consultor da Supreme Tech.', hora: '13:10' },
        { tipo: 'in', texto: 'Pode me enviar a proposta?', hora: '13:15' }
    ]}
];

let chatAtivoId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderizarListaConversas();
    
    // Captura o "Enter" para enviar mensagem
    document.getElementById('msg-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarMensagem();
        }
    });
});

// Renderiza a Coluna 1
function renderizarListaConversas() {
    const listContainer = document.getElementById('chat-list');
    listContainer.innerHTML = '';

    conversasMock.forEach(chat => {
        listContainer.innerHTML += `
            <div class="chat-item" id="chat-${chat.id}" onclick="abrirConversa(${chat.id})">
                <div class="avatar"><i class="fas fa-user"></i></div>
                <div class="chat-preview">
                    <h4>${chat.nome} <span class="chat-time">${chat.hora}</span></h4>
                    <p>${chat.ultima_msg}</p>
                </div>
            </div>
        `;
    });
}

// Abre a Conversa (Colunas 2 e 3)
function abrirConversa(id) {
    chatAtivoId = id;
    const chatData = conversasMock.find(c => c.id === id);

    // Destaque na Lista
    document.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active'));
    document.getElementById(`chat-${id}`).classList.add('active');

    // Preenche Header (Coluna 2)
    document.getElementById('current-chat-name').innerText = chatData.nome;
    document.getElementById('current-chat-phone').innerText = "+" + chatData.telefone;

    // Preenche Histórico (Coluna 2)
    const historyContainer = document.getElementById('chat-history');
    historyContainer.innerHTML = '';
    
    chatData.historico.forEach(msg => {
        const classe = msg.tipo === 'in' ? 'msg-in' : 'msg-out';
        historyContainer.innerHTML += `
            <div class="message ${classe}">
                ${msg.texto}
                <span class="msg-time">${msg.hora}</span>
            </div>
        `;
    });
    
    // Desce o scroll pro final
    historyContainer.scrollTop = historyContainer.scrollHeight;

    // Preenche CRM (Coluna 3)
    document.getElementById('crm-name').value = chatData.nome;
    document.getElementById('crm-phone').value = chatData.telefone;
    
    const tagsContainer = document.getElementById('crm-tags');
    tagsContainer.innerHTML = '';
    chatData.etiquetas.forEach(tag => {
        tagsContainer.innerHTML += `<span class="tag">${tag}</span>`;
    });
}

// Envia Mensagem
function enviarMensagem() {
    const input = document.getElementById('msg-input');
    const texto = input.value.trim();
    
    if (texto === '' || chatAtivoId === null) return;

    // Adiciona na interface
    const historyContainer = document.getElementById('chat-history');
    historyContainer.innerHTML += `
        <div class="message msg-out">
            ${texto.replace(/\n/g, '<br>')}
            <span class="msg-time">Agora</span>
        </div>
    `;
    input.value = '';
    historyContainer.scrollTop = historyContainer.scrollHeight;

    // Lógica Headless (Para conectar com a API Real do Chatwoot no futuro)
    /*
    fetch(`${CHATWOOT_API_URL}/accounts/${ACCOUNT_ID}/conversations/${chatAtivoId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-access-token': API_TOKEN
        },
        body: JSON.stringify({ content: texto, message_type: "outgoing", private: false })
    });
    */
}

// Alterna entre os Módulos (Inbox, Kanban, Settings)
function switchModule(moduleId) {
    // 1. Oculta todos os módulos
    document.querySelectorAll('.app-module').forEach(el => {
        el.classList.remove('active');
    });
    
    // 2. Remove o estado ativo dos botões do menu
    document.querySelectorAll('.saas-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Ativa o módulo selecionado
    document.getElementById(moduleId).classList.add('active');
    
    // 4. Ativa o botão clicado
    event.currentTarget.classList.add('active');
}
