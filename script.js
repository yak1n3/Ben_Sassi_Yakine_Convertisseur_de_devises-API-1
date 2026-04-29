const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");

async function convert() {
  const montant = parseFloat(amount.value);
  if (isNaN(montant) ||montant <= 0) return;

  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from.value}`);
  const data = await response.json();

  const rate = data.rates[to.value];
  const total = montant * rate;

  result.innerText = `${montant.toFixed(2)} ${from.value} = ${total.toFixed(2)} ${to.value}`;
}