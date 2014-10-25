/* === Spécifications ===

écrire une lambda qui prend en paramètre un sélecteur (selector) de DOM
qui va exécuter un `document.querySelectorAll(selector)`
et qui retourne directement un élément du DOM si il n'y a qu'un seul résultat
ou un tableau d'élements du DOM si il y a plusieurs résultats

dans le cas de plusieurs éléments, ajouter à la valeur de retour:
une méthode first() qui retourne le 1er élément
une méthode last() qui retourne le dernier élément

*/

export default (selector) => {
  var nodes = Array.from(document.querySelectorAll(selector));
  if (nodes.length == 1) { nodes = nodes[0]; } else {
    Object.assign(nodes, {
      first ()  { return this[0]; },
      last () { return this[this.length-1]; }
    })
  }
  return nodes;
}