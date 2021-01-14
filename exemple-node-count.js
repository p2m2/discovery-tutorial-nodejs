/* eslint no-console: "error" */
/**
Simple request send to DBpedia using NodeJs/Discovery lib.

sbt discoveryJS/fullOptJS
nodejs ./examples-discovery/nodejs/exemple-node.js

*/

var SWDiscoveryConfiguration = require("../../P2M2/discovery/js/target/scala-2.13/discovery-opt.js").SWDiscoveryConfiguration ;
var SWDiscovery = require("../../P2M2/discovery/js/target/scala-2.13/discovery-opt.js").SWDiscovery ;
var URI = require("../../P2M2/discovery/js/target/scala-2.13/discovery-opt.js").URI ;


let config = new SWDiscoveryConfiguration()
      .setConfigString(`
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
