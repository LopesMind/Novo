const inputRenda = document.getElementById('renda');
const inputFixas = document.getElementById('DespesasFixas');
const inputVariaveis = document.getElementById('DespesasVariaveis');
const textoSaldo = document.getElementById('SaldoFinal');
const botaoCalcular = document.getElementById('btnCalcular');
const selectMes = document.getElementById('mesSelecionado');

function CalcularSaldo() {
    const mes = selectMes.value;
    const renda = parseFloat(inputRenda.value) || 0;
    const fixas = parseFloat(inputFixas.value) || 0;
    const variaveis = parseFloat(inputVariaveis.value) || 0;

    const saldo = renda - (fixas + variaveis);

    textoSaldo.textContent = saldo.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    if (saldo < 0) {
        textoSaldo.style.color = '#d9534f';
    } else if (saldo > 0) {
        textoSaldo.style.color = '#28a745';
    } else {
        textoSaldo.style.color = '#000000';
    }

    // Salva os dados vinculados ao mês escolhido
    const dadosMes = { renda, fixas, variaveis };
    localStorage.setItem(`financas_${mes}`, JSON.stringify(dadosMes));
}

function CarregarDadosMes() {
    const mes = selectMes.value;
    const dadosSalvos = localStorage.getItem(`financas_${mes}`);

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        inputRenda.value = dados.renda || '';
        inputFixas.value = dados.fixas || '';
        inputVariaveis.value = dados.variaveis || '';
    } else {
        inputRenda.value = '';
        inputFixas.value = '';
        inputVariaveis.value = '';
    }

    CalcularSaldo();
}

botaoCalcular.addEventListener('click', CalcularSaldo);
selectMes.addEventListener('change', CarregarDadosMes);

// Carrega os dados do mês selecionado assim que a página abre
CarregarDadosMes();