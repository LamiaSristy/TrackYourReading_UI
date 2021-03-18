import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Trackings from '../../containers/Trackings';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Trackings />
  </Provider>,
);

describe('Signup Container', () => {
  let container;
  beforeEach(() => {
    container = setup();
  });

  test('renders the trackings class in the page', () => {
    const page = container.find('.trackings');
    expect(page).toMatchSnapshot();
  });

  test('renders the text of the trackings-buttons class', () => {
    const text = container.find('.trackings-buttons');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the day class', () => {
    const text = container.find('.day');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the date class', () => {
    const text = container.find('.date');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the page_no class', () => {
    const text = container.find('.page_no');
    expect(text).toMatchSnapshot();
  });
});
