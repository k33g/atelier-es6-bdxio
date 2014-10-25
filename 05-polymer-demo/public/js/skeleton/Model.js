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