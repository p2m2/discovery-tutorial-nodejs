/* eslint no-console: "error" */
/**
Simple request send to DBpedia using NodeJs/Discovery lib.

npm install require-from-url
nodejs ./examples-discovery/nodejs/exemple-node.js

*/

var discovery = require("@p2m2/discovery")

var SWDiscoveryConfiguration = discovery.SWDiscoveryConfiguration ;
var SWDiscovery = discovery.SWDiscovery ;
var URI = discovery.URI


let config = discovery.SWDiscoveryConfiguration.setConfigString(`
          {
          "sources" : [{
                    "id"  : "dbpedia",
                    "url" : "https://dbpedia.org/sparql",
                    "typ" : "tps",
                    "method" : "POST"
           }]}
          `)

        let query = new SWDiscovery(config);

        let r = query.something("h1")
                     .isSubjectOf(URI("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"))
                     .count() ;

        r.then((value) => {
          let res = value;
          console.log(res);
        }).catch( (error) => {
          console.error(" -- catch exception --")
          console.error(error)
        } );
