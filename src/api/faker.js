const articles = require('./articles.json');
const articleFirst = require('./article-first.json');
const comment = require('./comment.json');
const user = require('./user.json');

/**
 * Временная функция для работы
 * @param {*} url
 * @param {*} data
 */
function faker(url, data) {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      try {
        switch (url) {
          case '/api/articles/':
            return resolve(articles);
          case '/api/articles/1/':
          case '/api/articles/2/':
            return resolve(articleFirst);
          case '/api/comments/1/':
            return resolve(comment);
          case '/api/user/1/':
            return resolve(user);
          default:
            return reject('Not found');
        }
      } catch (error) {
        reject(new Error(error));
      }
    }, 2000);
  }));
}

export default faker;
