const convertButton = document.querySelector(".convert-button");
// Botão de conversão
const currencySelectDe = document.querySelector(".currency-select-of");
// Origem da moeda
const currencySelectPara = document.querySelector(".currency-select-for");
// Destino da moeda

function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  
  const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); 
  // Valor a ser convertido
  const currencyValueConverted = document.querySelector(".currency-value");
  // Valor já convertido

  const rates = {
    BRL: 1.0,
    USD: 5.5,
    EUR: 6.2,
    GBP: 7.2,
    BTC: 336.555,
  };

  const ofRate = rates[currencySelectDe.value]; // Moeda de origem
  const forRate = rates[currencySelectPara.value]; // Moeda de destino

  const conversionRate = ofRate / forRate;
   // Calcula a taxa de conversão

  const convertedValue = inputCurrencyValue * conversionRate;
   // Converte o valor

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencySelectDe.value,
  }).format(inputCurrencyValue);
  // Formata e exibe o valor a ser convertido

  currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencySelectPara.value,
  }).format(convertedValue);
  // Formata e exibe o valor convertido
}

function changeCurrency() {
  const currencyNameOf = document.getElementById("currency-name-of");
  const currencyNameFor = document.getElementById("currency-name-for");
  const currencyImageOf = document.querySelector(".currency-img-of");
  const currencyImageFor = document.querySelector(".currency-img-for");

  const currencyNames = {
    BRL: "Real",
    USD: "Dólar Americano",
    EUR: "Euro",
    GBP: "Libra",
    BTC: "Bitcoin",
  };

  const currencyImages = {
    BRL: "./assets/real.png",
    USD: "./assets/dolar.png",
    EUR: "./assets/euro.png",
    GBP: "./assets/libra.png",
    BTC: "./assets/bitcoin.png",
  };

  currencyNameOf.innerHTML = currencyNames[currencySelectDe.value];
  currencyImageOf.src = currencyImages[currencySelectDe.value];

  currencyNameFor.innerHTML = currencyNames[currencySelectPara.value];
  currencyImageFor.src = currencyImages[currencySelectPara.value];

  convertValues();
}

currencySelectDe.addEventListener("change", changeCurrency);
currencySelectPara.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

// R$NaN, $NaN, €NaN, £NaN

