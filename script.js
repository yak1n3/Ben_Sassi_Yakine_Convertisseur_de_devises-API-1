const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");
const swap = document.getElementById("swap");

async function convert() {
  const montant = parseFloat(amount.value);
  if (isNaN(montant) ||montant <= 0) {
    result.innerText = "Entrez un montant"; 
    return;
  }

  try {

    result.innerText = "Conversion en cours...";

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from.value}`);
    const data = await response.json();

    if (!data.rates[to.value]) {
      result.innerText = "Devise non supportée";
      return;
    }

  const rate = data.rates[to.value];
  const total = montant * rate;

  result.innerText = `${montant.toFixed(2)} ${from.value} = ${total.toFixed(2)} ${to.value}`;

  localStorage.setItem("last", result.innerText);
  
} catch (error) {

    result.innerText = "Erreur";
  }
}

amount.addEventListener("input", convert);
from.addEventListener("change", convert);
to.addEventListener("change", convert);

swap.addEventListener("click", () => {
  [from.value, to.value] = [to.value, from.value];
  convert();
});

window.onload = () => {
  result.innerText = localStorage.getItem("last") || "";
  convert();
};
