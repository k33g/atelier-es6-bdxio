
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