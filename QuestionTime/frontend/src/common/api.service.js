import { CSRF_TOKEN } from "./csrf_token.js"

//--------------- more explicit way than axios ---------------
async function getJSON(response){
  
  //http 204 No Content
  if (response.status === 204) return '';
  return response.json();

}


function apiService(endpoint, method, data) {
  // D.R.Y. code to make HTTP requests to the REST API backend using fetch
  const config = {
    method: method || "GET", // default method is `GET`, useful when making a lot of requests
    body: data !== undefined ? JSON.stringify(data) : null,
    headers: {
      'content-type': 'application/json',
      'X-CSRFTOKEN': CSRF_TOKEN
    }
  };
  return fetch(endpoint, config)
           .then(getJSON)
           .catch(error => Console.log(error))
}

export { apiService }; //now can make request in any place in code