import fetch from 'isomorphic-fetch';


const responseJson = res => res.json();
const responseData = json => json.body;
const instance = (url) => fetch(`http://example-anna.com${ url }`)
  .then(responseJson)
  .then(responseData);

export default {
  getArticles: () => instance('/articles/'),
  putComment: (id) => instance(`/comment/${ id }/`),
  putUser: (id) => instance(`/user/${ id }/`),
};
