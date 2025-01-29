// Fonction pour compter les éléments avec la classe .hg-arrow-right
function countArrowElements() {
  const elements = document.querySelectorAll("a .hg-arrow-right");
  return elements.length;
}

// Fonction pour cliquer sur un élément à un index donné
function clickArrowElement(i) {
  const elements = document.querySelectorAll("a .hg-arrow-right");

  if (elements.length === 0) {
    console.log("Aucun élément '.hg-arrow-right' trouvé.");
    return;
  }

  if (i >= elements.length) {
    console.log(
      `L'index ${i} est hors limite. Nombre total d'éléments trouvés : ${elements.length}`
    );
    return;
  }

  elements[i].click();
  console.log(`Élément à l'index ${i} cliqué.`);
}

// Exécuter ces fonctions sur le chargement de la page
window.onload = async () => {
  const count = countArrowElements();
  console.log(`Nombre d'éléments .hg-arrow-right : ${count}`);

  // Exemple : cliquer sur l'élément à l'index 0
  const index = 0;
  clickArrowElement(index);
};
