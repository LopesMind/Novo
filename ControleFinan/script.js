const inputRenda = document.getElementById('renda');
const inputFixas = document.getElementById('DespesasFixas');
const inputVariaveis= document.getElementById('DespesasVariaveis');
const textoSaldo= document.getElementById('SaldoFinal');
const botaoCalcular = document.getElementById('btnCalcular');

function CalcularSaldo(){
    const renda = parseFloat(inputRenda.value) || 0;
    const fixas = parseFloat(inputFixas.value) || 0;
    const variaveis = parseFloat(inputVariaveis.value) || 0;

    const saldo = renda - (fixas + variaveis);

    textoSaldo.textContent = saldo.toLocaleString('pt-BR', {
        style: 'currency', currency: 'BRL'
    })

if(saldo < 0){
    textoSaldo.style.color = '#d9534f'

} else if (saldo > 0){
    textoSaldo.style.color = '#28a745'
} else if (saldo = 0){

    textoSaldo.style.color = '#000000'
}



}
botaoCalcular.addEventListener('click', CalcularSaldo);