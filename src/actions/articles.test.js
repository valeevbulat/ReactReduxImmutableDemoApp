import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import {
  asyncArticles,
  ASYNC_ARTICLES_START,
  ASYNC_ARTICLES_SUCCESS,
} from './articles';// You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates ASYNC_ARTICLES_SUCCESS when fetching articles has been done', () => {
    const data = [{
      'id': '1',
      'author': {
        'id': '1',
        'name': 'Polly Jane',
      },
      'title': 'How I spent my summer',
      'text': 'Few words about my summer story...',
      'comments': [
        {
          'id': '1',
          'text': 'Paris is so cool!',
          'commenter': {
            'id': '2',
            'name': 'John Galt',
          },
        },
      ],
    }];
    nock('http://example-anna.com')
      .get('/articles/')
      .reply(200, { body: data });

    const expectedActions = [
      { type: ASYNC_ARTICLES_START },
      { type: ASYNC_ARTICLES_SUCCESS, data },
    ];
    const store = mockStore({ data: [] });

    return store.dispatch(asyncArticles()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
