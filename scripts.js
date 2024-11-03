// Seleciona o botão de conversão
const convertButton = document.querySelector(".convert-button");

// Seleciona o menu de seleção da moeda de origem
const currencySelectDe = document.querySelector(".currency-select-of");

// Seleciona o menu de seleção da moeda de destino
const currencySelectPara = document.querySelector(".currency-select-for");

// Função assíncrona para converter valores de moeda
const convertValues = async () => {
  // Obtém o valor da moeda de entrada
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  
  // Seleciona os elementos para mostrar os valores convertidos
  const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
  const currencyValueConverted = document.querySelector(".currency-value");

  // Busca os dados da API
  const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL").then(response => response.json());

  // Define as taxas de câmbio para as moedas
  const rates = {
    BRL: 1.0, // Real
    USD: parseFloat(data.USDBRL.high), // Dólar Americano
    EUR: parseFloat(data.EURBRL.high), // Euro
    GBP: parseFloat(data.GBPBRL.high), // Libra
    BTC: parseFloat(data.BTCBRL.high) // Bitcoin
  };

  // Obtém as taxas de câmbio para as moedas de origem e destino
  const ofRate = rates[currencySelectDe.value]; 
  const forRate = rates[currencySelectPara.value];

  // Calcula a taxa de conversão
  const conversionRate = ofRate / forRate;

  // Calcula o valor convertido
  const convertedValue = inputCurrencyValue * conversionRate;

  // Formata e exibe o valor a ser convertido
  currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencySelectDe.value,
  }).format(inputCurrencyValue);

  // Formata e exibe o valor convertido
  currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencySelectPara.value,
  }).format(convertedValue);
}

// Função para mudar a moeda selecionada
function changeCurrency() {
  const currencyNameOf = document.getElementById("currency-name-of");
  const currencyNameFor = document.getElementById("currency-name-for");
  const currencyImageOf = document.querySelector(".currency-img-of");
  const currencyImageFor = document.querySelector(".currency-img-for");

  // Nomes das moedas
  const currencyNames = {
    BRL: "Real",
    USD: "Dólar Americano",
    EUR: "Euro",
    GBP: "Libra",
    BTC: "Bitcoin",
  };

  // Imagens das moedas
  const currencyImages = {
    BRL: "./assets/real.png",
    USD: "./assets/dolar.png",
    EUR: "./assets/euro.png",
    GBP: "./assets/libra.png",
    BTC: "./assets/bitcoin.png",
  };

  // Atualiza o nome e a imagem da moeda de origem
  currencyNameOf.innerHTML = currencyNames[currencySelectDe.value];
  currencyImageOf.src = currencyImages[currencySelectDe.value];

  // Atualiza o nome e a imagem da moeda de destino
  currencyNameFor.innerHTML = currencyNames[currencySelectPara.value];
  currencyImageFor.src = currencyImages[currencySelectPara.value];

  // Chama a função de conversão de valores
  convertValues();
}

// Adiciona ouvintes de eventos para mudanças nos menus de seleção de moeda e clique no botão de conversão
currencySelectDe.addEventListener("change", changeCurrency);
currencySelectPara.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
