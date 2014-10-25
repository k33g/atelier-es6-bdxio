import Collection from '../../skeleton/Collection';
import Human from './Human';

/*
 - ajouter url
 */

class Humans extends Collection{

  constructor (humans) {
    super(Human,"/humans", humans);
  }
}

export default Humans;