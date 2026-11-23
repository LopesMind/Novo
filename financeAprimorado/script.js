const inputRenda = document.getElementById('renda');
const inputFixas = document.getElementById('DespesasFixas');
const inputVariaveis = document.getElementById('DespesasVariaveis');

const resumoRenda = document.getElementById('resumoRenda');
const resumoFixas = document.getElementById('resumoFixas');
const resumoVariaveis = document.getElementById('resumoVariaveis');
const textoSaldo = document.getElementById('SaldoFinal');

const fatiaFixas = document.getElementById('fatiaFixas');
const fatiaVariaveis = document.getElementById('fatiaVariaveis');
const fatiaSaldo = document.getElementById('fatiaSaldo');
const textoBigMac = document.getElementById('textoBigMac');
const textoSalarioMinimo = document.getElementById('textoSalarioMinimo');

const botaoCalcular = document.getElementById('btnCalcular');
const selectMes = document.getElementById('mesSelecionado');

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarBarra(renda, fixas, variaveis, saldo) {
    if (renda <= 0) {
        fatiaFixas.style.width = '0%';
        fatiaVariaveis.style.width = '0%';
        fatiaSaldo.style.width = '0%';
        return;
    }

    const percFixas = Math.min((fixas / renda) * 100, 100);
    const percVariaveis = Math.min((variaveis / renda) * 100, 100 - percFixas);
    const percSaldo = saldo > 0 ? Math.max(100 - percFixas - percVariaveis, 0) : 0;

    fatiaFixas.style.width = `${percFixas}%`;
    fatiaVariaveis.style.width = `${percVariaveis}%`;
    fatiaSaldo.style.width = `${percSaldo}%`;
}

function CalcularSaldo() {
    const mes = selectMes.value;
    const renda = parseFloat(inputRenda.value) || 0;
    const fixas = parseFloat(inputFixas.value) || 0;
    const variaveis = parseFloat(inputVariaveis.value) || 0;
    const saldo = renda - (fixas + variaveis);

    resumoRenda.textContent = formatarMoeda(renda);
    resumoFixas.textContent = formatarMoeda(fixas);
    resumoVariaveis.textContent = formatarMoeda(variaveis);
    textoSaldo.textContent = formatarMoeda(saldo);

    if (saldo < 0) {
        textoSaldo.style.color = '#d9534f';
    } else if (saldo > 0) {
        textoSaldo.style.color = '#28a745';
    } else {
        textoSaldo.style.color = '#000000';
    }
// Cálculo do Big Mac dentro da função onde 'saldo' existe
    const precoBigMac = 23.90;
    if (saldo >= precoBigMac) {
        const qtdBigMacs = Math.floor(saldo / precoBigMac);
        const plural = qtdBigMacs === 1 ? 'Big Mac' : 'Big Macs';
        textoBigMac.textContent = `🍔 Você consegue comprar ${qtdBigMacs} ${plural} com o saldo deste mês!`;
    } else if (saldo > 0) {
        textoBigMac.textContent = `🍔 Seu saldo ainda não dá para 1 Big Mac inteiro (custa R$ 23,90).`;
    } else {
        textoBigMac.textContent = `🍔 Saldo zerado ou negativo — sem Big Macs por enquanto!`;
    }

    localStorage.setItem(`financas_${mes}`, JSON.stringify({ renda, fixas, variaveis }));
    atualizarBarra(renda, fixas, variaveis, saldo);

 const salarioMinimo = 1621.00;

    if (saldo > 0) {
        const qtdSalarios = saldo / salarioMinimo;
        const qtdFormatada = qtdSalarios.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        const labelSalario = qtdSalarios > 1 ? 'salários mínimos' : 'salário mínimo';
        textoSalarioMinimo.textContent = `💰 Sobraram ${qtdFormatada} ${labelSalario} neste mês!`;
    } else {
        textoSalarioMinimo.textContent = `💰 Não sobrou nenhum salário mínimo neste mês.`;
    }
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

CarregarDadosMes();
