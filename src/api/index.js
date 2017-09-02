import faker from './faker';

export default {
  getArticles: () => faker('/api/articles/'),
  getArticle: (id) => faker(`/api/articles/${ id }/`),
  putComment: (id) => faker(`/api/comment/${ id }/`),
  putUser: (id) => faker(`/api/user/${ id }/`),
};
