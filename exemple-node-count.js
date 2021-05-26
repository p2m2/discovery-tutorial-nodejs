/* eslint no-console: "error" */
/**
Simple request send to DBpedia using NodeJs/Discovery lib.

npm install @p2m2/discovery@0.2.0

*/

var discovery = require("@p2m2/discovery") ;

var SWDiscoveryConfiguration = discovery.SWDiscoveryConfiguration ;
var SWDiscovery = discovery.SWDiscovery ;
var URI = discovery.URI ;

let config = SWDiscoveryConfiguration.setConfigString(`
          {
          "sources" : [{
                    "id"  : "dbpedia",
                    "url" : "https://dbpedia.org/sparql",
                    "typ" : "tps",
                    "method" : "POST"
           }]}
          `)

        let query = SWDiscovery(config);

        let r = query.something("h1")
                     .isSubjectOf(URI("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"))
                     .finder
                     .count() ;

        r.then((value) => {
          let res = value;
          console.log(res);
        }).catch( (error) => {
          console.error(" -- catch exception --")
          console.error(error)
        } );
