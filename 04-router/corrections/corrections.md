#Correction

##`Router.js`

```javascript
/* === Spécifications ===

Le routeur a plusieurs routes

Routes : une url ds le navigateur que l'on associe à un traitement (ex afficher une vue)
Du coup les fonctionnalités de ma webapp sont bookmarkables

Ma classe Router est une Map

Donc si je veux créer un routeur et rajouter des routes :

 let router = new Router();

 router.set("humans", (args) => {
  // faire quelque chose
 });

 router.set("animals", (args) => {
  // faire quelque chose
 });

 router.set("/", (args) => {
 // faire quelque chose
 });


A ma classe Router

---------------------------------------
je rajoute une méthode match(uri)
---------------------------------------
qui servira à vérifier les urls saisies ds le navigateur
ou les liens cliqués et déclencher les méthodes associées

uri peut prendre les types de valeurs suivantes:

 #/humans
 #/humans/1234

 etc...

 match(uri) va

 - "retraiter" uri : enlever le #/ donc:

   #/humans       devient humans
   #/humans/1234  devient humans/1234

 - spliter uri : on sépare tous les éléments entre les "/"
 - on obtient un tableau que l'on filtre pour ne garder que les éléments dont la taille > 0

 - le 1er élément du tableau devient la clé à rechercher dans la map
 - les éléments restants représentent les paramètres que l'on passera à la méthode correspondant à la clé

 Par exemple si je saisie #/humans/bob/morane deviendra

 ["humans", "bob", "morane"]

 et j'irais chercher dans mon instance de Router la clé "humans" qui va me retourner une méthode
 à laquelle je passerais (si elle existe) les paramètres ["bob", "morane"] (donc sous forme d'un tableau)
 et je l'exécuterais

 (allez voir main.js pour l'exemple)

---------------------------------------
je rajoute une méthode listen()
---------------------------------------

Qui va une 1ère fois au lancement vérifier l'url pour déterminer s'il y a un traitement à lancer

 la méthode match du routeur sera appelé avec window.location.hash en paramètre

 window.location.hash : retourne la partie de l'url qui correspnd à "anchor" : http://localhost:3000/#/humans donnera #/humans

Cette 1ère vérification est utile si on a bookmarké une fonctionnalité de l'application

Ensuite on va s'abonner à l'évènement "onpopstate" (déclenché lorsque l'utilisateur "navigue", ultilise le bouton back, etc...)

et à chaque fois que l'évènement "onpopstate" sera déclenché, la méthode match du routeur sera appelé avec window.location.hash en paramètre


*/
 class Router extends Map {

  constructor () {
    super();
    this.set("/",(args)=>{});
  }

  match (uri) {
    
    // on retraite l'uri: enlever les #/
    uri = uri.replace("#\/","");

    // splitter uri avec "/" et ne garder que les éléments non vides
    let uriParts = uri.split("/").filter((part)=>part.length>0);

    // clé à chercher
    let route = uriParts[0];
    // paramètres à passer à la méthode
    let params = uriParts.slice(1);

    // récupérer la méthode
    let method = this.get(route);
    
    // exécuter la méthode
    if (method) { method(params) } else {
      this.get("/")(params)
    }
  }

  listen () {
    // une fois le routeur en mode écoute
    // lui faire vérifier une 1ère fois l'url pour déterminer quoi faire
    this.match(window.location.hash);

    /* s'abonner à onpopstate */
    window.onpopstate = (event) => {
      this.match(window.location.hash);
    };
  }

}

export default Router
```




