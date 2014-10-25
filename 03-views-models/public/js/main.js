import Human from 'js/app/models/Human';
import Humans from 'js/app/models/Humans';
import HumansList from 'js/app/viewModels/HumansList';
import $q from 'js/skeleton/selector';


QUnit.test("Find div with id=humans-list", ( assert ) => {
  assert.ok($q("#humans-list")!==undefined)
});


QUnit.test("Add humans ...", ( assert ) => {
  stop();
  expect(7);

  let Olivia = new Human({firstName:"Olivia", lastName:"Dunham"});
  Olivia.save().then((data)=>{
    assert.ok(Olivia.id() !==undefined, `id of Olivia is ${Olivia.id()}`);
    console.log(1, "Olivia", data);
  });

  let Walter = new Human({firstName:"Walter", lastName:"Bishop"});
  Walter.save().then((data)=>{
    assert.ok(Walter.id() !==undefined, `id of Walter is ${Walter.id()}`);
    console.log(2, "Walter", data);
  });

  let Peter = new Human({firstName:"Peter", lastName:"Bishop"});
  Peter.save().then((data)=>{
    assert.ok(Peter.id() !==undefined, `id of Peter is ${Peter.id()}`);
    console.log(3, "Peter", data);
  });

  let Astrid = new Human({firstName:"Astrid", lastName:"Farnsworth"});
  Astrid.save().then((data)=>{
    assert.ok(Astrid.id() !==undefined, `id of Astrid is ${Astrid.id()}`);
    console.log(4, "Astrid", data);

    let humans = new Humans();

    let humansList = new HumansList(humans);

    humans.fetch().then((data) => {
      console.log("All humans", data)
      assert.ok(humans.size() > 0, `size of humans collection ${humans.size()}`);
    });

  });

  setTimeout(()=> {
    start();
    let lst = $q("#humans-list > * li");
    assert.ok(lst.first() !== undefined, `first li: ${lst.first().innerText}`);
    assert.ok(lst.last() !== undefined, `last li: ${lst.last().innerText }`);
  }, 1000);

});






