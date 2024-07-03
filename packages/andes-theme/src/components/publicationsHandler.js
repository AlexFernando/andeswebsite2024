const customPostTypeHandler = {
  name: "customPostTypeHandler",
  priority: 10,
  pattern: "/singlesearch/:slug",
  func: async ({ route, params, state, libraries }) => {
    console.log("hola handler!!!")
    const { api } = libraries.source;
    const { slug } = params;
    const { per_page } = state.source.get(route);
    const endpoint = `/${state.source.postTypes.slug.rest_base}`;

    // Modify the `per_page` parameter of the REST API request to 200
    const response = await api.get({
      endpoint,
      params: {
        slug,
        per_page: 200,
      },
    });

    // Update the `source` state with the modified REST API response
    const items = await libraries.source.populate({ response, state });
    const page = state.source.data[route];

    Object.assign(page, {
      isPostType: true,
      items,
      isArchive: false,
    });
  },
};

export default customPostTypeHandler;
