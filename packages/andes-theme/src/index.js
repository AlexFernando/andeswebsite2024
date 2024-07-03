import Root from "./components/Root";

export default {
  name: "andes-theme",
  roots: {
    theme: Root
  },
  state: {
    theme: {},
    source: {
      data: {

        "/": {
          isReady: true,
          isFetching: false,
          isBackgroundImage: true,
          isHomePage: true,
        },

        "/es-/": {
          isReady: true,
          isFetching: false,  
          isHomePageSpanish: true,
        },


        "/searchbar/": {
          isReady: true,
          isFetching: false,
          isSearchBar: true,
        },

        "/es-/es-searchbar/": {
          isReady: true,
          isFetching: false,
          isSearchBarSpanish: true,
        },


        "/investigacion/": {
          isReady: true,
          isFetching: false,
          isInvestigacion: true,
        },

        "/es-/es-investigacion/": {
          isReady: true,
          isFetching: false,
          isInvestigacionSpanish: true,
        },

        "/exchanges/": {
          isReady: true,
          isFetching: false,
          isIntercambios: true,
        },

        "/es-/es-exchanges/": {
          isReady: true,
          isFetching: false,
          isIntercambiosSpanish: true,
        },

        "/intercambios/": {
          isReady: true,
          isFetching: false,
          isIntercambios: true,
        },

        "/es-/es-intercambios/": {
          isReady: true,
          isFetching: false,
          isIntercambiosSpanish: true,
        },

        "/toolkit/": {
          isReady: true,
          isFetching: false,
          isToolkit: true,
        },

        "/es-/es-toolkit/": {
          isReady: true,
          isFetching: false,
          isToolkitSpanish: true,
        },

        "/publications/": {
          isReady: true,
          isFetching: false,
          isPublicaciones: true,
        },        

        "/es-/es-publications/": {
          isReady: true,
          isFetching: false,
          isPublicacionesSpanish: true,
        },

  
        "/news/": {
          isReady: true,
          isFetching: false,
          isNoticiasRelevantes: true,
        },

        "/es-/es-news/": {
          isReady: true,
          isFetching: false,
          isNoticiasRelevantesSpanish: true,
        },

  
        "/events/": {
          isReady: true,
          isFetching: false,
          isEventos: true,
        },

        "/es-/es-events/": {
          isReady: true,
          isFetching: false,
          isEventosSpanish: true,
        },

        "/redirect/": {
          isReady: true,
          isFetching: false,
          isRedirect: true,
        },

        "/es-/es-redirect/": {
          isReady: true,
          isFetching: false,
          isRedirectSpanish: true,
        },
      },
    },
  },
  actions: {
   
    theme: {
          /**
       * At the moment, we only include the ascii characters of Inter font.
       * Values can be "us-ascii" | "latin" | "all".
       */
           fontSets: "all",
    }
  },
 
};
