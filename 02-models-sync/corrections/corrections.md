#Correction

##`Request.js`

```javascript
/*--- Request ---*/
/* === Spécifications ===

Ajouter 4 méthodes à la classe Request:

- get() retourne une promise via sendRequest() avec la propriété method = "GET"
- post(jsonData) retourne une promise via sendRequest() avec la propriété method = "POST" et la propriété data prend la valeur jsonData
- put(jsonData) retourne une promise via sendRequest() avec la propriété method = "PUT" et la propriété data prend la valeur jsonData
- delete() retourne une promise via sendRequest() avec la propriété method = "DELETE"

*/
class Request {

  constructor (url = "/") {
    this.request = new XMLHttpRequest();
    this.url = url;
    this.method = null;
    this.data = null;
  }

  sendRequest () { /*json only*/

    return new Promise((resolve, reject) => {
      this.request.open(this.method, this.url);
      this.request.onload = () => {
        // If the request was successful
        if (this.request.status === 200) {
          resolve(JSON.parse(this.request.response)); // JSON response
        } else { /* oups */
          reject(Error(this.request.statusText));
        }
      }
      // Handle network errors
      this.request.onerror = function() {
        reject(Error("Network Error"));
      };

      this.request.setRequestHeader("Content-Type", "application/json");
      this.request.send(this.method === undefined ? null : JSON.stringify(this.data));
    });
  }

  get () {
    this.method = "GET";
    this.data = {};
    return this.sendRequest();
  }

  post (jsonData) {
    this.method = "POST";
    this.data = jsonData;
    return this.sendRequest();
  }

  put (jsonData) {
    this.method = "PUT";
    this.data = jsonData;
    return this.sendRequest();
  }

  delete () {
    this.method = "DELETE";
    this.data = {};
    return this.sendRequest();
  }
}

export default Request;
```

##`Model.js`

```javascript
/*--- model ---*/

/* === Spécifications ===

Remarques: 

- j'ai ajouté une propriété url à la classe Model,
  Vous pouvez vérifier que Human.js a été modifié pour en tenir compte
- lorsque je vais créer un modèle et le persister côté serveur, 
  un identifiant unique lui est affecté par la base de donnée
  et le modèle "gagne" un nouveau champ _id renseigné par la base:
  j'ai donc créé une méthode : id() { return this.get("_id");}
  pour pouvoir récupérer la valeur de l'id du modèle

Donc, complétez la classe en lui ajoutant:

- une méthode save():
  si this.id() == undefined, c'est une création (POST)
  sinon c'est une mise à jour (PUT)
  !!!: save() retourne une promise (grâce à Request)
  ce qui nous permettra d'écrire quelque chose comme ceci:

 let Olivia = new Human({firstName:"Olivia", lastName:"Dunham"});
 Olivia.save().then((data) => {
    console.log("Olivia", data);
 }).catch((err) => {});
 
 Remarque : côté node c'est ceci qui est appelé:
 app.post("/models_url", function(req, res) { ... });
 
 ou (dans le cas d'une mise à jour)
 
 app.put("/models_url/:id", function(req, res) { ... }); 
 
 !!!: Pensez à notifier les observers du modèle:
 
 - quand c'est une création: {event: "create", model: this} 
 - quand c'est une mise à jour: {event: "update", model: this}

- une méthode fetch(id) qui permet de retrouver un modèle par son identifiant (GET)
  si le paramètre id n'est pas utilisé, utiliser this.id()
 fetch(id) retourne une une promise (grâce à Request)

 Remarque : côté node c'est ceci qui est appelé:
 app.get("/models_url/:id", function(req, res) { ... });

 !!!: Pensez à notifier les observers du modèle:
 
 - {event: "fetch", model: this}


- une méthode delete(id) qui permet de supprimer un modèle par son identifiant (DELETE)
 si le paramètre id n'est pas utilisé, utiliser this.id()
 delete(id) retourne une une promise (grâce à Request)

 Remarque : côté node c'est ceci qui est appelé:
 app.delete("/models_url/:id", function(req, res) { ... });

 !!!: Pensez à notifier les observers du modèle:
 
 - {event: "delete", model: this}

 */

import Request from './Request';

class Model {
  constructor (fields={}, url="/", observers=[]) {
    this.fields = fields;
    this.url = url;
    this.observers = observers;
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

  addObserver (observer) {
    this.observers.push(observer);
  }

  notifyObservers (context) {
    this.observers.forEach((observer) => {
      observer.update(context)
    })
  }

  /*--- sync ---*/
  id() { return this.get("_id");}

  save () {
    return new Promise((resolve, reject) => {
      if (this.id() == undefined) {
        // create (insert)
        new Request(this.url).post(this.fields)
          .then((data) => {
            this.fields = data;
            this.notifyObservers({event: "create", model: this});
            resolve(data);
          })
          .catch((error) => reject(error))
      } else {
        // update
        new Request(`${this.url}/${this.id()}`).put(this.fields)
          .then((data) => {
            this.fields = data;
            this.notifyObservers({event: "update", model: this});
            resolve(data);
          })
          .catch((error) => reject(error))
      }
    });

  }

  fetch (id) {

    return new Promise((resolve, reject) => {
      if (id == undefined) {
        new Request(`${this.url}/${this.id()}`).get()
          .then((data) => {
            this.fields = data;
            this.notifyObservers({event: "fetch", model: this});
            resolve(data)
          })
          .catch((error) => reject(error))
      } else {
        new Request(`${this.url}/${id}`).get()
          .then((data) => {
            this.fields = data;
            this.notifyObservers({event: "fetch", model: this});
            resolve(data)
          })
          .catch((error) => reject(error))
      }
    });

  }

  delete (id) {
    return new Promise((resolve, reject) => {
      if (id == undefined) {
        new Request(`${this.url}/${this.id()}`).delete()
          .then((data) => {
            this.fields = data;
            this.notifyObservers({event: "delete", model: this});
            resolve(data)
          })
          .catch((error)=>reject(error))
      } else {
        new Request(`${this.url}/${id}`).delete()
          .then((data) => {
            this.fields = data;
            this.notifyObservers({event: "delete", model: this});
            resolve(data)
          })
          .catch((error)=>reject(error))
      }
    });
  }

}

export default Model;
```

##`Collection.js`

```javascript
/*--- collection ---*/
/* === Spécifications ===

Remarques:

- j'ai ajouté une propriété url à la classe Collection,
Vous pouvez vérifier que Humans.js a été modifié pour en tenir compte

Donc, complétez la classe en lui ajoutant:

- une méthode fetch() qui permet de retrouver tous les modèles 
  fetch() retourne une promise (grâce à Request)

Remarque : côté node c'est ceci qui est appelé:
app.get("/models_url", function(req, res) { ... });

!!!: Pensez à notifier les observers de la collection:

- {{event: "fetch", models:models}
*/

import Request from './Request';

class Collection {
  constructor (model, url="/", models = [], observers = []) {
    this.model = model;
    this.models = models
    this.observers = observers;
    this.url = url;
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

  /*--- sync ---*/

  fetch () {
    return new Promise((resolve, reject) => {
      new Request(this.url).get().then((models) => {
        this.models = []; /* empty list */

        models.forEach((fields) => {
          this.add(new this.model(fields));
        });

        this.notifyObservers({event: "fetch", models:models});
        resolve(models);
      })
      .catch((error) => reject(error))
    });

  }

}

export default Collection;
```


