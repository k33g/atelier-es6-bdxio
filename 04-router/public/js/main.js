import $q from 'js/skeleton/selector';
import Router from 'js/skeleton/Router';


QUnit.test("Create Router and add routes", ( assert ) => {

  let router = new Router();

  router.set("humans", (args) => {
    $q("#results").innerHTML = `humans: ${JSON.stringify(args)}`;
  });

  router.set("animals", (args) => {
    $q("#results").innerHTML = `animals: ${JSON.stringify(args)}`;
  });

  router.set("/", (args) => {
    $q("#results").innerHTML = `/: ${JSON.stringify(args)}`;
  });

  router.listen()

  assert.ok(router.get("humans") !==undefined,"add humans/* routes");
  assert.ok(router.get("animals") !==undefined,"add animals/* routes");
  assert.ok(router.get("/") !==undefined,"add other /* routes");
});





