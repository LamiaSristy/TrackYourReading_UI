import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header Component', () => {
  test('renders the title text of the Header Component', () => {
    const { getByText } = render(<Header />);
    const title = getByText('Reading-Tracker');
    expect(title).toBeInTheDocument();
  });

  test('renders the title text of the Header Component', () => {
    const { getByText } = render(<Header />);
    const title = getByText('Reading-Tracker');
    expect(title).toMatchSnapshot();
  });
});
