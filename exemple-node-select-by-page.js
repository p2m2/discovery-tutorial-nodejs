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
                     }],
          "settings" : {
            "logLevel" : "off",
            "sizeBatchProcessing" : 100,
            "pageSize" : 5
          }
           }
          `)

        let query = new SWDiscovery(config);

        let pages = query.something("some")
                     .isSubjectOf(URI("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"))  
                     .set(URI("http://www.w3.org/2002/07/owl#Class"))                   
                     .selectByPage("some") ;

        pages.then( (args) => {
	  
          let numberOfPages = Object.values(args)[0] ;
          let lazyPage = Object.values(args)[1] ;

	  console.log("number of pages:"+numberOfPages)
          console.log(" -- deuxieme page -- ")

          lazyPage[0].commit().raw().then( value => { 
		  let res = value;
		  console.log(JSON.stringify(res,null,2));
          });
          
        }).catch( (error) => {
          console.error(" -- catch exception --")
          console.error(error)
        } );
