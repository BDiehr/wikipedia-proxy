wikiService.$inject = ['$http', 'apiUrl'];

export default function wikiService ($http, apiUrl) {
  
  function getWiki (resource) {
    return $http.get(`${apiUrl}/${resource}`)
      .then(res => res.data);   
  }
  
  //return object with get method
  return {
    getWiki
  };
}