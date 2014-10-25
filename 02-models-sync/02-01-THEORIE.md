#ES6 - Partie 2

##Les Promises!

```javascript
let doSomeThing = new Promise((resolve, reject) => {

  // faites quelque chose (asynchrone)

  let allisfine = true; // essayez avec false
  
  if (allisfine) {
    resolve("Hello World!");
  }
  else {
    reject(Error("Ouch"));
  }
});

doSomeThing
  .then((data) => { console.log(data); })
  .catch((err) => { console.log(err); });
```
  
**Voir cet article**: [http://www.html5rocks.com/en/tutorials/es6/promises/](http://www.html5rocks.com/en/tutorials/es6/promises/)

##Interpolations de chaînes

###Template strings

```javascript
let firstName = "Bob", lastName = "Morane";
console.log(`Hello I'm ${firstName} ${lastName}`); // Hello I'm Bob Morane
```

###Multiline strings

```javascript
let firstName = "Bob", lastName = "Morane";
console.log(`
Hello I'm 
  ${firstName} 
  ${lastName}
`
); 
/*
Hello I'm 
  Bob 
  Morane
*/
```

###Tagged template strings

```javascript
let upper = (strings, ...values) => {
  console.log(strings); // ["Hello I'm ", " ", "", raw: Array[3]]
  console.log(values);  // ["Bob", "Morane"] 
  let result = "";
  for(var i = 0; i < strings.length; i++) {
      result = result + strings[i];
      if (i < values.length) {
          result = result + values[i];
      }
  }
  return result.toUpperCase();
}
let firstName = "Bob", lastName = "Morane";
console.log(upper `Hello I'm ${firstName} ${lastName}`)
/*
HELLO I'M BOB MORANE
*/
```


