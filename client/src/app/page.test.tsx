import { render, screen, waitFor, act } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';

// @ts-ignore
let fetchResponse: any;
global.fetch = jest.fn(() => {
  return new Promise((resolve) => {
    fetchResponse = resolve;
  });
});

describe('Home component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders loading state initially', async () => {
    render(<Home />);

    expect(screen.getByText('Loading data...')).toBeInTheDocument();

    await act(async () => {
      fetchResponse({
        json: () => Promise.resolve({ text: 'Taking a while to respond' }),
      });
    });
  });

  it('renders fetched data', async () => {
    await act(async () => {
      render(<Home />);
    });

    fetchResponse({
      json: () => Promise.resolve({ text: 'From the server' }),
    });

    await waitFor(() => expect(screen.getByText('From the server')).toBeInTheDocument());
  });

  it('renders input field with correct placeholder', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument();
  });
});
