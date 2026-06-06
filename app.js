document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. NAVEGAÇÃO SPA (SINGLE PAGE APPLICATION)
    // ==========================================
    const navItems = document.querySelectorAll('.nav-item');
    const modules = document.querySelectorAll('.module');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove a classe 'active' de todos os menus e módulos
            navItems.forEach(nav => nav.classList.remove('active'));
            modules.forEach(mod => mod.classList.remove('active'));

            // Adiciona a classe 'active' ao item clicado
            item.classList.add('active');

            // Descobre qual módulo deve abrir através do data-target (ex: "crm", "inbox")
            const targetId = item.getAttribute('data-target');
            const targetModule = document.getElementById(targetId);
            
            if(targetModule) {
                targetModule.classList.add('active');
            }
        });
    });

    // ==========================================
    // 2. SISTEMA DE PERMISSÕES MODULARES (UPSSELL)
    // ==========================================
    
    /* No mundo real, essa variável "userPlan" viria do seu banco de dados 
       Postgres no momento do login.
       Ex: 'BASIC' (Plano Atendimento), 'PRO' (Gestão Suprema)
    */
    const userContext = {
        name: "Cliente Supremo",
        plan: "BASIC" // Troque para "PRO" para testar a liberação do CRM
    };

    const crmLockScreen = document.getElementById('crm-lock');
    const kanbanBoard = document.getElementById('kanban-board');

    function checkPermissions() {
        if (userContext.plan === 'PRO') {
            // Cliente tem acesso: Destrói a tela de bloqueio
            if(crmLockScreen) crmLockScreen.style.display = 'none';
            kanbanBoard.style.opacity = '1';
        } else {
            // Cliente NÃO tem acesso: Mantém bloqueado e borra o fundo
            if(crmLockScreen) crmLockScreen.style.display = 'flex';
            kanbanBoard.style.opacity = '0.3'; // Faz o CRM de fundo ficar ofuscado
            kanbanBoard.style.pointerEvents = 'none'; // Impede de clicar no Kanban
        }
    }

    // Roda a verificação de segurança assim que a tela carrega
    checkPermissions();

});

// ==========================================
// 3. FUNÇÃO DE UPSELL (Botão "Falar com Consultor")
// ==========================================
function requestUpgrade() {
    // Isso pode abrir um Modal, ou já enviar uma mensagem automática via n8n 
    // para o WhatsApp do Supreminho avisando que o cliente quer um upgrade!
    
    alert("Iniciando conversa com o Supreminho para upgrade de plano...\n\nO cliente demonstrou interesse no Painel Gestão Suprema.");
    
    // Exemplo de integração: Aqui você chamaria o seu próprio webhook do n8n
    // fetch('https://seu-n8n.com/webhook/upgrade-request', { ... })
}
