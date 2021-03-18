import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Login from '../../containers/Login';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Login />
  </Provider>,
);

describe('Login Container', () => {
  let container;
  beforeEach(() => {
    container = setup();
  });

  test('renders the body of the page', () => {
    const page = container.find('.body');
    expect(page).toMatchSnapshot();
  });

  test('renders the text of the login class', () => {
    const text = container.find('.login');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the btn-login class', () => {
    const text = container.find('.btn-login');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the btn-signup class', () => {
    const text = container.find('.btn-signup');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the errors-div class', () => {
    const text = container.find('.errors-div');
    expect(text).toMatchSnapshot();
  });
});
