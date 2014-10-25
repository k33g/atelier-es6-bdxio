import Human from 'js/app/models/Human';
import Humans from 'js/app/models/Humans';

console.log("Hello ES6!");

QUnit.test( "john is John Doe", ( assert ) => {

  let john = new Human();
  assert.ok( john.firstName == "John", "john.firstName is John");
  assert.ok( john.lastName == "Doe", "john.lastName is Doe");

  john.lastName = "DOE";
  assert.ok( john.fields.lastName == john.lastName && john.lastName == "DOE", "john.lastName is DOE");

});

QUnit.test( "bob is Bob Morane", ( assert ) => {

  let bob = new Human({firstName:"Bob", lastName:"Morane"});

  assert.ok(bob.firstName == "Bob", "bob.firstName is Bob");
  assert.ok(bob.lastName == "Morane", "bob.lastName is Morane");
  assert.ok(bob.toString() == '{"firstName":"Bob","lastName":"Morane"}', 'bob.toString() returns {"firstName":"Bob","lastName":"Morane"}');

});


QUnit.test( "bob and john are in a collection", ( assert ) => {
  let john = new Human();
  let bob = new Human({firstName:"Bob", lastName:"Morane"});
  let humans = new Humans([john, bob]);

  assert.ok(humans.size() == 2, "John and Bob are in a collection");

});


QUnit.test( "Fringe division is watched by September", ( assert ) => {

  let fringeDivision = new Humans([
    new Human({firstName:"Olivia", lastName:"Dunham"}),
    new Human({firstName:"Walter", lastName:"Bishop"}),
    new Human({firstName:"Peter", lastName:"Bishop"})
  ]);

  /* September is an Observer */
  let september = { update: (context) => {
    assert.ok(context.event == "add", "a model was added");
    assert.ok(context.model.firstName == "Astrid" && context.model.lastName == "Farnsworth", "this model is Astrid Farnsworth");
    console.log(context);
  }};

  fringeDivision.addObserver(september);

  fringeDivision.add(new Human({firstName:"Astrid", lastName:"Farnsworth"}));

});


QUnit.test( "Parsing Fringe division", ( assert ) => {

  let fringeDivision = new Humans([
    new Human({firstName:"Olivia", lastName:"Dunham"}),
    new Human({firstName:"Walter", lastName:"Bishop"}),
    new Human({firstName:"Peter", lastName:"Bishop"}),
    new Human({firstName:"Astrid", lastName:"Farnsworth"})
  ]);

  let team = "";
  fringeDivision.each((human) => team+=human.firstName)

  assert.ok(team == "OliviaWalterPeterAstrid", "the Fringe Division firstNames : OliviaWalterPeterAstrid");

  let bishopFamily = fringeDivision.filter((human) =>  human.lastName == "Bishop")
  console.log(bishopFamily);

  assert.ok(bishopFamily.length == 2, "2 people in Bishop Family")

});