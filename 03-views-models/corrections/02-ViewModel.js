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
