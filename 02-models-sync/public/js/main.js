import Human from 'js/app/models/Human';
import Humans from 'js/app/models/Humans';
import Request from 'js/skeleton/Request';

QUnit.test("Get About message", ( assert ) => {
  stop()
  let request = new Request("/about").get()
    .then((data) => {
      assert.ok(data.message == "Hello World!", "message from server is 'Hello World!'");
      console.log("data", data)
      start()
    })
    .catch((error) => {})
});

QUnit.test("Bad Request", ( assert ) => {
  stop()
  let badRequest = new Request("/something").get()
    .then((data) => {

    })
    .catch((error) => {
      assert.ok(error.message=="Not Found", "error message is 'Not Found");
      console.error("error", error)
      start()
    })
});

var savedId = null;


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

  let Astrid = new Human({firstName:"Astrid", lastName:"FARNSWORTH"});
  Astrid.save().then((data)=>{
    savedId = Astrid.id();
    assert.ok(Astrid.id() !==undefined, `id of Astrid is ${Astrid.id()} and her last name is ${Astrid.lastName}`);
    console.log(4, "Astrid", data);


    console.log("savedId", savedId)
    let model = new Human();

    model.fetch(savedId).then((data) => {
      model.lastName = "Farnsworth";
      model.save().then((data) => {
        assert.ok(data.lastName == "Farnsworth", `lastname of Astrid has changed : ${data.lastName}`);
        console.log(5, "Astrid", data);
      });

    });

    /* September is an Observer */
    let september = { update: (context) => {
      if(context.event == "fetch") {
        assert.ok(context.event == "fetch", "notification: fetch collection");
      }
    }};


    let humans = new Humans();

    humans.addObserver(september);

    humans.fetch().then((data) => {
      console.log("All humans", data)
      assert.ok(humans.size() > 0, `size of humans collection ${humans.size()}`);
    });

  });


  setTimeout(()=> {
    start();
  }, 1000);

});






