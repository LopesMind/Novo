# Minhas Finanças

O projeto **Minhas Finanças** foi criado para resolver um problema pessoal: acompanhar de forma simples e visual como estavam os meus gastos ao longo de cada mês.

Começou como uma calculadora básica de renda e despesas, mas durante o desenvolvimento surgiu a ideia de evoluir a interface para um dashboard e transformá-lo em um aplicativo instalável (PWA) para usar direto no celular.

**Link do projeto:** https://lopesmind.github.io/Novo/financeAprimorado/

---

## Funcionalidades

- **Acompanhamento por mês:** Seleção de janeiro a dezembro, salvando os dados de cada mês automaticamente no navegador (`localStorage`).
- **Resumo visual:** Cards com os valores totais e uma barra proporcional mostrando a divisão entre despesas fixas, despesas variáveis e saldo livre.
- **Indicadores do saldo:** Destaque em verde ou vermelho conforme o resultado do mês, além da conversão do saldo restante em quantidade de Big Macs e salários mínimos.
- **Uso como aplicativo:** Configurado com `manifest.json` e `Service Worker` para ser instalado na tela inicial do celular ou computador.

## Tecnologias utilizadas

- HTML5
- CSS3 (Flexbox e Grid)
- JavaScript
- GitHub Pages
