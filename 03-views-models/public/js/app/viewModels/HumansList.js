/* === Spécifications ===

 écrire une classe HumansList qui hérite de ViewModel

 Paramètres du constructeur:

 - une collection de modèles Human (humansCollection)

 Penser à passer au constructeur de la classe mère cette collection,
 ainsi que l'élément du DOM qui portera les informations à afficher:

 dans notre page index.html nous avons ceci:

 <div id="humans-list"></div>

 donc la propriété element de la vue sera : $q("#humans-list")

 Méthodes de HumansList:

 - template(collection) : retournera le code html de la liste à afficher à partir de la collection des modèles
 <ul>
 <li>Bob Morane</li>
 <li>John Doe</li>
 <li>etc. ...</li>
 </ul>

 - render(context) qui change le code html de la propriété element si l'évènement "fetch" de la collection est déclenché

 */

import HumansCollection from '../models/Humans';

import ViewModel from '../../skeleton/ViewModel';
import $q from '../../skeleton/selector';

class HumansList extends ViewModel {

}

export default HumansList;