import { Map, List } from 'immutable';
import articles from './articles';
import {
  ASYNC_ARTICLES_SUCCESS,
} from '../actions/articles';

describe('articles reducer', () => {
  it('should return the initial state', () => {
    expect(articles(undefined, {})).toEqual(Map({
      byId: null,
      allIds: null,
      asyncError: null,
      asyncLoading: false,
    })
    );
  });

  it('should handle ASYNC_ARTICLES_SUCCESS', () => {
    const dataFirst = [{
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
    const dataSecond = [{
      'id': '2',
      'author': {
        'id': '1',
        'name': 'Polly Jane',
      },
      'title': 'How I spent my summer',
      'text': 'Few words about my summer story...',
      'comments': [
        {
          'id': '2',
          'text': 'Paris is so cool!',
          'commenter': {
            'id': '2',
            'name': 'John Galt',
          },
        },
      ],
    }];
    expect(
      articles(undefined, {
        type: 'ASYNC_ARTICLES_SUCCESS',
        data: dataFirst,
      })
    ).toEqual(Map({
      byId: Map({
        1: Map({
          id: "1",
          author: "1",
          title: 'How I spent my summer',
          text: 'Few words about my summer story...',
          comments: List(["1"]),
        }),
      }),
      allIds: List(["1"]),
      asyncError: null,
      asyncLoading: false,
    }));

    expect(
      articles(
        Map({
          byId: Map({
            1: Map({
              id: "1",
              author: "1",
              title: 'How I spent my summer',
              text: 'Few words about my summer story...',
              comments: List(["1"]),
            }),
          }),
          allIds: List(["1"]),
          asyncError: null,
          asyncLoading: false,
        }),
        {
          type: ASYNC_ARTICLES_SUCCESS,
          data: dataSecond,
        }
      )
    ).toEqual(Map({
      byId: Map({
        2: Map({
          id: "2",
          author: "1",
          title: 'How I spent my summer',
          text: 'Few words about my summer story...',
          comments: List(["2"]),
        }),
      }),
      allIds: List(["2"]),
      asyncError: null,
      asyncLoading: false,
    })
    );
  });
});
