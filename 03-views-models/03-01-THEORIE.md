#ES6 - Partie 3

##Mixin d'objets

```javascript
let tonyStark = {
  firstName:"Tony", lastName:"Stark"
};
let armorAbilities = {
  fly:() => console.log("I'm flying")
};
Object.assign(tonyStark, armorAbilities);

tonyStark.fly(); // I'm flying

```

##Array.from

Exemple:

Avant pour parcourir comme un tableau le résultat d'un `document.querySelectorAll`, il fallait d'abord transformer ce résultat en tableau :

```javascript
var items = [].slice.apply(document.querySelectorAll("li"));
// ou var items = Array.prototype.slice.apply(document.querySelectorAll("li"));
items.forEach(function(item) { ... });
```

Maintenant :

```javascript
Àrray.from(document.querySelectorAll("li")).forEach((item) => {})
``


