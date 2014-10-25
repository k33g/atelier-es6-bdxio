/* === Spécifications ===

*/
 class Router extends Map {
  // 0- un routeur comporte plusieurs routes

  /*
   http://localhost:3000/#/humans
   http://localhost:3000/#/humans/1234
  */
  constructor () {
    super();
    this.set("/",(args)=>{});
  }

  match (uri) {

    uri = uri.replace("#\/","");
    let uriParts = uri.split("/").filter((part)=>part.length>0);

    /*
      exemple de ce ça donne
     */

    let route = uriParts[0];
    let params = uriParts.slice(1);

    //console.log("uriParts",uriParts, "route", route, "params", params);

    let method = this.get(route);
    if (method) { method(params) } else {
      this.get("/")(params)
    }
  }

  listen () {
    /*first time -> about bookmarks */
    this.match(window.location.hash);

    /* trouver explications de onpopstate */
    window.onpopstate = (event) => {
      this.match(window.location.hash);
    };
  }

}

export default Router