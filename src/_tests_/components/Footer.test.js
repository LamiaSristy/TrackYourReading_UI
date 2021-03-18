import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Footer from '../../components/Footer';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Footer />
  </Provider>,
);

describe('Footer Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  test('renders the menu the page', () => {
    const page = component.find('.menu');
    expect(page).toMatchSnapshot();
  });

  test('renders the text of the icons class', () => {
    const text = component.find('.icons');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the icon-btn class', () => {
    const text = component.find('.icon-btn');
    expect(text).toMatchSnapshot();
  });

  test('renders the text of the add-trackings class', () => {
    const text = component.find('.add-trackings');
    expect(text).toMatchSnapshot();
  });
});
