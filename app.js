/**
 * SUPREME TECH - PORTAL DO CLIENTE FRONT-END
 * Motor de UI e Integração Headless
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificação de Sessão (Login LocalStorage)
    verificarSessao();

    // 2. Listeners de Login/Logout
    document.getElementById('login-form').addEventListener('submit', realizarLogin);
    document.getElementById('btn-logout').addEventListener('click', realizarLogout);

    // 3. Listeners de Navegação do Menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active de todos
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
            
            // Adiciona no clicado
            const targetId = e.currentTarget.getAttribute('data-target');
            e.currentTarget.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Inicializa estrutura de catálogo vazio caso não exista
    renderizarCatalogo();
});

// ================= AUTENTICAÇÃO =================
function realizarLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');

    // Aqui você conectará com o seu banco de dados ou Webhook do n8n (ex: POST /auth)
    // Para validação visual da estrutura:
    if(email && password.length >= 6) {
        errorMsg.style.display = 'none';
        
        // Simulação de Token JWT recebido da API
        localStorage.setItem('supreme_token', 'token_jwt_valido_aqui');
        localStorage.setItem('supreme_user', email.split('@')[0]); 

        showToast('Login realizado com sucesso!', 'success');
        verificarSessao();
    } else {
        errorMsg.style.display = 'block';
        errorMsg.innerText = "Email ou senha incorretos.";
    }
}

function verificarSessao() {
    const token = localStorage.getItem('supreme_token');
    const user = localStorage.getItem('supreme_user');

    if (token) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        document.getElementById('user-name-display').innerText = user.charAt(0).toUpperCase() + user.slice(1);
    } else {
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('dashboard').style.display = 'none';
    }
}

function realizarLogout() {
    localStorage.removeItem('supreme_token');
    localStorage.removeItem('supreme_user');
    window.location.reload();
}

// ================= GESTÃO DE CATÁLOGOS =================
let catalogoData = [
    { id: 1, nome: "Serviços Digitais", itens: [{ nome: "Automação WhatsApp", preco: "R$ 497,00" }] }
];

function renderizarCatalogo() {
    const container = document.getElementById('catalogo-container');
    container.innerHTML = '';

    catalogoData.forEach((categoria, indexCat) => {
        let itensHTML = '';
        categoria.itens.forEach((item, indexItem) => {
            itensHTML += `
                <div class="item-row">
                    <input type="text" class="item-nome" value="${item.nome}" placeholder="Nome do Produto/Serviço" onchange="atualizarItem(${indexCat}, ${indexItem}, 'nome', this.value)">
                    <input type="text" class="item-preco" value="${item.preco}" placeholder="R$ 0,00" onchange="atualizarItem(${indexCat}, ${indexItem}, 'preco', this.value)">
                    <button class="btn-remove" onclick="removerItem(${indexCat}, ${indexItem})" title="Remover Item"><i class="fas fa-times-circle"></i></button>
                </div>
            `;
        });

        const catHTML = `
            <div class="categoria-block">
                <div class="categoria-topo">
                    <input type="text" value="${categoria.nome}" placeholder="Nome da Categoria" onchange="atualizarCategoria(${indexCat}, this.value)">
                    <button class="btn-remove" onclick="removerCategoria(${indexCat})" title="Remover Categoria"><i class="fas fa-trash"></i></button>
                </div>
                <div class="itens-container">
                    ${itensHTML}
                </div>
                <button class="btn-add-item" onclick="adicionarItem(${indexCat})"><i class="fas fa-plus"></i> Adicionar Item</button>
            </div>
        `;
        container.innerHTML += catHTML;
    });
}

function adicionarCategoria() {
    catalogoData.push({ id: Date.now(), nome: "Nova Categoria", itens: [] });
    renderizarCatalogo();
}

function removerCategoria(index) {
    catalogoData.splice(index, 1);
    renderizarCatalogo();
}

function adicionarItem(indexCat) {
    catalogoData[indexCat].itens.push({ nome: "", preco: "" });
    renderizarCatalogo();
}

function removerItem(indexCat, indexItem) {
    catalogoData[indexCat].itens.splice(indexItem, 1);
    renderizarCatalogo();
}

function atualizarCategoria(index, valor) { catalogoData[index].nome = valor; }
function atualizarItem(indexCat, indexItem, campo, valor) { catalogoData[indexCat].itens[indexItem][campo] = valor; }

function salvarCatalogo() {
    // Aqui você enviará o array 'catalogoData' para o seu banco Postgres via API/n8n
    console.log("JSON pronto para envio ao BD:", JSON.stringify(catalogoData));
    showToast('Catálogo sincronizado com o banco de dados.', 'success');
}

// ================= CONFIGURAÇÕES E KILL SWITCH =================
function toggleIA(checkbox) {
    const status = checkbox.checked ? 'PAUSADO' : 'ATIVO';
    // Aqui dispara a chamada para a API atualizando o status no Postgres
    if(checkbox.checked) {
        showToast('ATENÇÃO: IA Pausada. Atendimento manual exigido.', 'error');
    } else {
        showToast('IA Reativada com sucesso.', 'success');
    }
}

function salvarConfigIA() {
    showToast('Novas diretrizes enviadas para a IA.', 'success');
}

// ================= TOAST NOTIFICATIONS =================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    
    const icon = type === 'success' ? '<i class="fas fa-check-circle" style="color: var(--success); font-size: 1.2rem;"></i>' 
                                    : '<i class="fas fa-exclamation-triangle" style="color: var(--danger); font-size: 1.2rem;"></i>';
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // Animate In
    setTimeout(() => toast.classList.add('show'), 10);

    // Animate Out & Remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ================= PREPARAÇÃO HEADLESS CHATWOOT =================
/* * Quando for conectar de fato ao Chatwoot, você usará chamadas Fetch semelhantes a esta:
 *
 * async function buscarConversas(accountId, apiToken) {
 * const response = await fetch(`https://chatsupreme.supremetechdev.com/api/v1/accounts/${accountId}/conversations`, {
 * headers: { 'api-access-token': apiToken }
 * });
 * const data = await response.json();
 * // Função para renderizar as mensagens na div do Painel de Atendimento
 * }
 */
