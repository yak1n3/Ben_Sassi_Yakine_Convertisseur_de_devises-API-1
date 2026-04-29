// Récupération des éléments HTML
const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");
const swap = document.getElementById("swap");

// Fonction principale de conversion
async function convert() {

  // Lecture du montant saisi
  const montant = parseFloat(amount.value);

  // Vérification de la validité du montant
  if (isNaN(montant) || montant <= 0) {
    result.innerText = "Entrez un montant";
    return;
  }

  try {

    // Message pendant le chargement
    result.innerText = "Conversion en cours...";

    // Appel API pour récupérer les taux de change
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from.value}`);
    const data = await response.json();

    // Vérifie si la devise cible existe
    if (!data.rates[to.value]) {
      result.innerText = "Devise non supportée";
      return;
    }

    // Calcul de la conversion
    const rate = data.rates[to.value];
    const total = montant * rate ;

    // Affichage du résultat
    result.innerText = `${montant.toFixed(2)} ${from.value} = ${total.toFixed(2)} ${to.value}`;

    // Sauvegarde du dernier résultat
    localStorage.setItem("last", result.innerText);

  } catch (error) {

    // Gestion des erreurs réseau
    result.innerText = "Erreur";
  }
}

// Mise à jour automatique lors des changements
amount.addEventListener("input", convert);
from.addEventListener("change", convert);
to.addEventListener("change", convert);

// Inversion des devises
swap.addEventListener("click", () => {
  [from.value, to.value] = [to.value, from.value];
  convert();
});

// Chargement au démarrage
window.onload = () => {
  result.innerText = localStorage.getItem("last") || "";
  convert();
};

