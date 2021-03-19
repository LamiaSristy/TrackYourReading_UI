import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Book from '../../containers/Book';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Book />
  </Provider>,
);

describe('Book Container', () => {
  let container;
  beforeEach(() => {
    container = setup();
  });

  test('renders the the page', () => {
    const page = container.find('.main');
    expect(page).toMatchSnapshot();
  });

  test('renders the text of the tracking class', () => {
    const text = container.find('.tracking');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the add-book class', () => {
    const text = container.find('.add-book');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the books class', () => {
    const text = container.find('.books');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the one-book class', () => {
    const text = container.find('.one-book');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the buttons class', () => {
    const text = container.find('.buttons');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the book-info class', () => {
    const text = container.find('.book-info');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the book-name class', () => {
    const text = container.find('.book-name');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the book-description class', () => {
    const text = container.find('.book-description');
    expect(text).toMatchSnapshot();
  });
});
