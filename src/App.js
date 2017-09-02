import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

// Semantic UI styles
import 'semantic-ui-css/semantic.min.css';

// Reducers and routes
import reducers from './reducers';
import Routes from './routes';
import RootContainer from './containers/RootContainer';

const isProduction = process.env.NODE_ENV === 'production';

// Creating store
let store = null;
const middleware = applyMiddleware(thunk);

if (isProduction) {
  store = createStore(reducers, middleware);
} else {
  const enhancer = compose(
    middleware,
    // Enable DevTools if browser extension is installed
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
  );

  store = createStore(reducers, enhancer);
}

const App = () => (
  <Provider store={ store }>
    <RootContainer>
      <Routes />
    </RootContainer>
  </Provider>
);

render(
  <App />,
  document.getElementById('root')
);
