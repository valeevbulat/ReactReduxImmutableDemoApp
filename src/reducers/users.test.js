import { Map, List } from 'immutable';
import users from './users';
import {
  ASYNC_ARTICLES_SUCCESS,
} from '../actions/articles';

describe('comments reducer', () => {
  it('should return the initial state', () => {
    expect(users(undefined, {})).toEqual(Map({
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
        'id': '2',
        'name': 'John Galt',
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
      users(undefined, {
        type: 'ASYNC_ARTICLES_SUCCESS',
        data: dataFirst,
      })
    ).toEqual(Map({
      byId: Map({
        1: Map({
          id: "1",
          name: 'Polly Jane',
        }),
      }),
      allIds: List(["1"]),
    }));

    expect(
      users(
        Map({
          byId: Map({
            1: Map({
              id: "1",
              name: 'Polly Jane',
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
          name: 'John Galt',
        }),
      }),
      allIds: List(["2"]),
    })
    );
  });
});
