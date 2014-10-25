#Correction

##`selector.js`

```javascript
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
```


##`ViewModel.js`

```javascript
/*--- viewModel ---*/
/* === Spécifications ===
 Ecrire une classe ViewModel qui soit un observer
 Elle sera abonnée aux modifications des modèles ou des collections
 Quand son abonnement est déclenché, cela déclenche sa méthode render et lui passe le contexte en paramètre

 Paramètres du constructeur:

 Le constructeur prendra en paramètre un objet `options` avec pour valeur par défaut {}
 les membres d'options deviendront les propriétés de l'instance de ViewModel:

 let myViewModel = new MyViewModel({ // MyViewModel est une instance de ViewModel
   model: bob, // ou collection: humans,
   element: $q("#mylist")
 });

 si model existe, alors ajouter l'instance de ViewModel aux observers du modèle

 si collection existe, alors ajouter l'instance de ViewModel aux observers de la collection

 Méthodes:

 - html(code) : modifie la propriété innerHTML de la propriété element de la classe
 - render(context) : vide
 - update(context) : c'est un observer, la méthode appelle render

 */

class ViewModel { /* it's an observer */

  constructor (options={}) {
    /*
     options: {model,collection,element}
     */
    Object.assign(this, options);

    if (options.model) {
      this.model.addObserver(this)
    }
    if (options.collection) {
      this.collection.addObserver(this)
    }
  }

  html (code) {
    this.element.innerHTML = code;
  }

  render (context) {
    // afficher des information
  }

  // c'est un observer
  update (context) {
    this.render(context);
  }

}

export default ViewModel;

```

##`HumansList.js`

```javascript
/* === Spécifications ===

 écrire une classe HumansList qui hérite de ViewModel

 Paramètres du constructeur:

 - une collection de modèles Human (humansCollection)

 Penser à passer au constructeur de la classe mère cette collection,
 ainsi que l'élément du DOM qui portera les informations à afficher:

 dans notre page index.html nous avons ceci:

 <div id="humans-list"></div>

 donc la propriété element de la vue sera : $q("#humans-list")

 Méthodes de HumansList:

 - template(collection) : retournera le code html de la liste à afficher à partir de la collection des modèles
 <ul>
 <li>Bob Morane</li>
 <li>John Doe</li>
 <li>etc. ...</li>
 </ul>

 - render(context) qui change le code html de la propriété element si l'évènement "fetch" de la collection est déclenché

 */

import HumanModel from '../models/Human';
import HumansCollection from '../models/Humans';

import ViewModel from '../../skeleton/ViewModel';
import $q from '../../skeleton/selector';

class HumansList extends ViewModel {

  constructor (humansCollection) {

    super({
      collection: humansCollection,
      element: $q("#humans-list")
    });

  }

  template (humans) {
    return `
      <ul>${
      humans.models.map(
        (human) => `<li>${human.firstName}, ${human.lastName}</li>`
      ).join("")
      }</ul>
    `;
  }

  render (context) {
    if (context.event == "fetch") {
      this.html(this.template(this.collection));
    }
  }

}

export default HumansList;

```