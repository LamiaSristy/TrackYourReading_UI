import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import FormTracking from '../../components/FormTracking';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <FormTracking />
  </Provider>,
);

describe('FormTracking Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  test('renders the day the page', () => {
    const page = component.find('.day');
    expect(page).toMatchSnapshot();
  });

  test('renders the text of the date-track class', () => {
    const text = component.find('.date-track');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the date-div class', () => {
    const text = component.find('.date-div');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the page_no-div class', () => {
    const text = component.find('.page_no-div');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the day-buttons class', () => {
    const text = component.find('.day-buttons');
    expect(text).toMatchSnapshot();
  });
});
