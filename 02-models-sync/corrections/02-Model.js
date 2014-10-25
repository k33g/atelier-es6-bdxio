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