/* eslint no-console: "error" */
/**
Simple request send to DBpedia using NodeJs/Discovery lib.

sbt discoveryJS/fullOptJS
nodejs ./examples-discovery/nodejs/exemple-node.js

*/

var requireFromUrl = require('require-from-url/sync');
var discovery = requireFromUrl("https://cdn.jsdelivr.net/gh/p2m2/Discovery@master/dist/discovery-web.js")


var SWDiscoveryConfiguration = discovery.SWDiscoveryConfiguration ;
var SWDiscovery = discovery.SWDiscovery ;
var URI = discovery.URI ;


let config = new SWDiscoveryConfiguration()
      .setConfigString(`
          {
          "sources" : [{
                    "id"  : "dbpedia",
                    "url" : "https://dbpedia.org/sparql",
                    "typ" : "tps",
                    "method" : "POST"
                     }],
          "settings" : {
            "logLevel" : "off",
            "sizeBatchProcessing" : 100
          }
           }
          `)

        let query = new SWDiscovery(config);

        let r = query.something("some")
                     .set(URI("http://dbpedia.org/resource/Category:1919_in_Washington_(state)"))
                     .isSubjectOf(URI("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),"motherClass")                     
                     .select("motherClass") ;

        r.commit().raw().then((value) => {
          let res = value;
          console.log(JSON.stringify(res,null,4));
        }).catch( (error) => {
          console.error(" -- catch exception --")
          console.error(error)
        } );
