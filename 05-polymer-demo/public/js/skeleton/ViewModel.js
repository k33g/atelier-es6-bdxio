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