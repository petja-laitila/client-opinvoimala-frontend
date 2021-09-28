import React from 'react';
import { render, screen } from '../../utils/test-utils';
import FrontPage from '../FrontPage';

describe('VIEWS: <FrontPage />', () => {
  it('renders main title', async () => {
    render(<FrontPage />);
    expect(
      await screen.findByText(/This is the main title for the front page!/i)
    ).toBeInTheDocument();
  });

  it('renders subtitle', async () => {
    render(<FrontPage />);
    expect(
      await screen.findByText(/This is the subtitle of the front page/i)
    ).toBeInTheDocument();
  });

  it('renders some cards', async () => {
    render(<FrontPage />);
    expect(await screen.findByText(/Card 1 title/i)).toBeInTheDocument();
    expect(await screen.findByText(/Card 1 text/i)).toBeInTheDocument();
    expect(await screen.findByText(/Card 2 title/i)).toBeInTheDocument();
    expect(await screen.findByText(/Card 2 text/i)).toBeInTheDocument();
  });
});
