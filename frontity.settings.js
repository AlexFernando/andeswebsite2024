const settings = [

  //english site
  {  
    "name": "andes-headless-english",
   
    "state": {
      "frontity": {
        "url": "https://andes.org.pe/",
        "title": "Andes Website English",
        "description": "A website for the ONG Andes English Version"
      },
      "theme":{
        "lang": "en"
      }
    },
    "packages": [
      {
        "name": "andes-theme",
      },
  
      {
        "name": "@frontity/wp-source",
        "state": {
          "source": {
            "api": "https://en.andescusco.info/wp-json/",
  
            "params": {
              per_page: 100,
         
            },
  
            "postTypes": [
  
              {
                type: "singlesearch",
                endpoint: "singlesearch",
                archive: "/search",

                params: {
                  per_page: 200,
                  _embed: true
                }
              },
  
              {
                type: "cardimage",
                endpoint: "cardimage",
                archive: "cardimage",
              },
  
              {
                type: "cardintership",
                endpoint: "cardintership",
                archive: "cardintership",
              },
  
              {
                type: "cardpersona",
                endpoint: "cardpersona",
                archive: "cardpersona",
              },
  
              {
                type: "toolkitposts",
                endpoint: "toolkitposts",
                archive: "alltoolkit",
              },
  
              {
                type: "allnews",
                endpoint: "allnews",
                archive: "/allnews",
              },
  
              {
                type: "allevents",
                endpoint: "allevents",
                archive: "/allevents",
              }
            ],
  
            "taxonomies": [
              {
                taxonomy: "typeofpublication",
                endpoint: "typeofpublication",
                postTypeEndpoint: "singlesearch",
                params: {
                  per_page: 200,
                  _embed: true
                }
              }
  
            ]
          },
          "theme": {
            fontSets: "us-ascii",
          }
        }
      },
      "@frontity/tiny-router",
      "@frontity/html2react",
      "@aamodtgroup/frontity-contact-form-7"
    ]
  },
  
  
  //SPANISH SITE
  {
    "name": "andes-headless-spanish",
    "match": [".*https?:\/\/www.andes.org.pe\/es-(.*)?$"],
    // "match": [".*https?:\/\/localhost:3000\/es-(.*)?$"],
    "state": {
      "frontity": {
        "url": "https://andes.org.pe/es-",
        "title": "Andes Spanish",
        "description": "Configuration for Spanish Site"
      },
      "theme":{
        "lang": "es"
      }
    },
    "packages": [
      {
        "name": "andes-theme",
      },
      
      {
        "name": "@frontity/wp-source",
        "state": {
          "source": {
            "api": "https://es.andescusco.info/wp-json/",
  
            "params": {
              per_page: 100,
            },
  
  
            "postTypes": [
  
              {
                type: "singlesearch",
                endpoint: "singlesearch",
                archive: "/es-search"
              },
    
              {
                type: "cardimage",
                endpoint: "cardimage",
                archive: "cardimage"
              },
  
              {
                type: "cardintership",
                endpoint: "cardintership",
                archive: "cardintership"
              },
  
              {
                type: "cardpersona",
                endpoint: "cardpersona",
                archive: "cardpersona"
              },
  
              {
                type: "toolkitposts",
                endpoint: "toolkitposts",
                archive: "alltoolkit"
              },
              {
                type: "allnews",
                endpoint: "allnews",
                archive: "/es-allnews",
              },
  
              {
                type: "allevents",
                endpoint: "allevents",
                archive: "/es-allevents",
                params: {
                  per_page: 100,
                  _embed: true
                }
              }
            ],
    
            "taxonomies": [
              {
                taxonomy: "typeofpublication",
                endpoint: "typeofpublication",
                postTypeEndpoint: "singlesearch",
                params: {
                  per_page: 100,
                  _embed: true
                }
              }
    
            ]
    
          },      
        }
      },
       "@frontity/tiny-router",
      "@frontity/html2react",
      "@aamodtgroup/frontity-contact-form-7"
    ]
  }
  
  ];
  
  
  export default settings;
  