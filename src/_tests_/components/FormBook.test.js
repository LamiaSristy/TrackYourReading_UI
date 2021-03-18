import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import FormBook from '../../components/FormBook';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <FormBook />
  </Provider>,
);

describe('FormBook Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  test('renders the form the page', () => {
    const page = component.find('.one-form');
    expect(page).toMatchSnapshot();
  });

  test('renders the text of the one-parameter class', () => {
    const text = component.find('.one-parameter');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the buttons-form class', () => {
    const text = component.find('.buttons-form');
    expect(text).toMatchSnapshot();
  });
});
