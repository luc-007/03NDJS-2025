function addition(a, b) {
  const resultat = a + b;
  console.log(`Addition: ${a} + ${b} = ${resultat}`);
  return resultat;
}

function soustraction(a, b) {
  const resultat = a - b;
  console.log(`Soustraction: ${a} - ${b} = ${resultat}`);
  return resultat;
}

function multiplication(a, b) {
  const resultat = a * b;
  console.log(`Multiplication: ${a} * ${b} = ${resultat}`);
  return resultat;
}

function division(a, b) {
  if (b === 0) {
    console.log("Erreur : Division par zéro");
    return "Erreur : Division par zéro"; 
  }
  const resultat = a / b;
  console.log(`Division: ${a} / ${b} = ${resultat}`);
  return resultat;
}
