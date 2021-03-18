import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Signup from '../../containers/Signup';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Signup />
  </Provider>,
);

describe('Signup Container', () => {
  let container;
  beforeEach(() => {
    container = setup();
  });

  test('renders the signup class in the page', () => {
    const page = container.find('.signup');
    expect(page).toMatchSnapshot();
  });

  test('renders the text of the errors-div class', () => {
    const text = container.find('.errors-div');
    expect(text).toMatchSnapshot();
  });
});
