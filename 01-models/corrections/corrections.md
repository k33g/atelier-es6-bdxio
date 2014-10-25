#Correction

##`Model.js`

```javascript
/*--- model ---*/

/* === Spécifications ===
une classe Model

Paramètres du constructeur:

- fields, valeur par défaut {}, contiendra les "champs" du model, ex: {firstName:"Bob", lastName:"Morane"}
- observers, valeur par défaut []

Propriétés:

- fields : initialisé par le paramètre correspondant du constructeur
- observers : initialisé par le paramètre correspondant du constructeur

Méthodes:

- addObserver (observer)
- notifyObservers (context)
- get (fieldName), va lire la valeur d'un champ dans fields
- set (fieldName, value), va modifier la valeur d'un champ dans fields
- toString (), retourne une représentation json de fields

un observer est juste un objet avec une méthode update
donc notifyObservers execute la méthode update de tous les observers avec context en paramètre

*/

class Model {
  constructor (fields={}, observers=[]) {
    this.fields = fields;
    this.observers = observers;
  }

  addObserver (observer) {
    this.observers.push(observer);
  }

  notifyObservers (context) {
    this.observers.forEach((observer) => {
      observer.update(context)
    })
  }

  get (fieldName) {
    return this.fields[fieldName];
  }

  set (fieldName, value) {
    this.fields[fieldName] = value;
    return this;
  }

  toString () {
    return JSON.stringify(this.fields)
  }

}

export default Model;

```

##`Collection.js`

```javascript
/*--- collection ---*/

/* === Spécifications ===
 une classe Collection

 Paramètres du constructeur:

 - model : ce sera le type de la collection (une classe qui héritera de Model), pas de valeur par défaut
 - models : un tableau, contiendra les instances de modèles, valeur par défaut : []
 - observers, valeur par défaut []

 Propriétés:

 - model : initialisé par le paramètre correspondant du constructeur
 - models : initialisé par le paramètre correspondant du constructeur
 - observers : initialisé par le paramètre correspondant du constructeur

 Méthodes:

 - addObserver (observer)
 - notifyObservers (context)
 - toString (), retourne une représentation json de la propriété models
 - add (model), ajoute un model à models et notifie les observers avec un "contexte" égal à {event: "add", model: model}
 - each (callbck) : parcourir les models et exécuter callbck pour chacun (et passer le modèle en paramètre à callbck)
 - filter (callbck) : retourner un tableau de modèle filtré selon callbck
 - size () : retourner le nombre de modèles dans la collection
 
 un observer est juste un objet avec une méthode update
 donc notifyObservers execute la méthode update de tous les observers avec context en paramètre

 */


class Collection {
  constructor (model, models = [], observers = []) {
    this.model = model;
    this.models = models
    this.observers = observers;
  }

  toString () {
    return JSON.stringify(this.models);
  }

  addObserver (observer) {
    this.observers.push(observer);
  }

  notifyObservers (context) {
    this.observers.forEach((observer) => {
      observer.update(context)
    })
  }

  add (model) {
    this.models.push(model);
    this.notifyObservers({event: "add", model: model});
    return this;
  }

  each (callbck) {
    this.models.forEach(callbck)
  }

  filter (callbck) {
    return this.models.filter(callbck)
  }

  size () { return this.models.length; }

}

export default Collection;

```


##`Human.js`

```javascript
/* === Spécifications ===
 une classe Human qui hérite de Model
 
 Paramètres du constructeur:

 - fields, valeur par défaut {firstName:"John", lastName:"Doe"}, 
 
 Propriétés:
 
 - initialiser la propriété fields de la classe mère avec le paramètre du constructeur

 Getters & Setters pour :

 - firstName -> set or get of this.fields.firstName
 - lastName -> set or get of this.fields.lastName
 
 Méthodes:

 - sans objet

 */
import Model from '../../skeleton/Model';

class Human  extends Model {
  constructor (fields = {firstName:"John", lastName:"Doe"}) {
    //superclass's constructor invocation
    super(fields);

    //Getters and Setters
    Object.defineProperty(this, "firstName", {
      get: function (){ return this.fields["firstName"]} ,
      set: function (value) { this.fields["firstName"]=value; }
    });

    Object.defineProperty(this, "lastName", {
      get: function (){ return this.fields["lastName"]} ,
      set: function (value) { this.fields["lastName"]=value; }
    });

  }
}

export default Human;
```


##`Humans.js`

```javascript
/* === Spécifications ===
une classe Humans qui hérite de Collection

Paramètres du constructeur:

- humans, un tableau de modèles

Propriétés:

- initialiser la propriété model de la classe mère avec le type Human
- initialiser la propriété models de la classe mère avec le paramètre humans du constructeur

Méthodes:

- sans objet
*/

import Collection from '../../skeleton/Collection';
import Human from './Human';

class Humans extends Collection{

  constructor (humans) {
    super(Human,humans);
  }
}

export default Humans;
```

