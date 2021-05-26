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
                     }],
          "settings" : {
            "logLevel" : "off",
            "sizeBatchProcessing" : 100,
            "pageSize" : 5
          }
           }
          `)

        SWDiscovery(config).something("some")
                     .isSubjectOf(URI("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"))  
                     .set(URI("http://www.w3.org/2002/07/owl#Class"))                   
                     .selectByPage("some")
		     .then( (args) => {
	  
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
