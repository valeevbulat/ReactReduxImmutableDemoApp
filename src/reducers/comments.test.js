import { Map, List } from 'immutable';
import comments from './comments';
import {
  ASYNC_ARTICLES_SUCCESS,
} from '../actions/articles';

describe('comments reducer', () => {
  it('should return the initial state', () => {
    expect(comments(undefined, {})).toEqual(Map({
      byId: null,
      allIds: null,
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
      comments(undefined, {
        type: 'ASYNC_ARTICLES_SUCCESS',
        data: dataFirst,
      })
    ).toEqual(Map({
      byId: Map({
        1: Map({
          id: "1",
          text: 'Paris is so cool!',
          commenter: "2",
        }),
      }),
      allIds: List(["1"]),
    }));

    expect(
      comments(
        Map({
          byId: Map({
            1: Map({
              id: "1",
              text: 'Paris is so cool!',
              commenter: "2",
            }),
          }),
          allIds: List(["1"]),
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
          text: 'Paris is so cool!',
          commenter: "2",
        }),
      }),
      allIds: List(["2"]),
    })
    );
  });
});
