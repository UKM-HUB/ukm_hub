import React from 'react';
import App from './App.js';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)


it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={mockStore([])}>
      <App />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
