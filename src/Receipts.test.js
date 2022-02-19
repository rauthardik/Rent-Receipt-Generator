import { render, screen } from '@testing-library/react';
import Receipts from './App';

test('renders learn react link', () => {
  render(<Receipts />);
  const linkElement = screen.getByText(/RENT RECEIPT/i);
  expect(linkElement).toBeInTheDocument();
});
