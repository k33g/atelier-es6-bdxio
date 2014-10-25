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