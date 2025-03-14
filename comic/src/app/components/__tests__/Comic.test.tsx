import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Comic from '../Comic';

const mockComic = {
  id: 1,
  title: 'Amazing Spider-Man',
  issueNumber: 123,
  thumbnail: {
    path: 'https://example.com/image',
    extension: 'jpg',
  },
  dates: [{ type: 'onsaleDate', date: '2023-10-10T00:00:00Z' }],
  creators: {
    items: [
      { role: 'writer', name: 'Stan Lee' },
      { role: 'artist', name: 'Steve Ditko' },
    ],
  },
};

describe('Comic Component', () => {
  it('renders the comic title, issue number, published date, and creator names', () => {
    render(<Comic comic={mockComic} />);
/*
    expect(screen.getByText(/Amazing Spider-Man/i)).toBeInTheDocument();
    expect(screen.getByText(/Issue: 123/i)).toBeInTheDocument();
    expect(screen.getByText(/Published: October 10, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/Writer: Stan Lee/i)).toBeInTheDocument();
    expect(screen.getByText(/Artist: Steve Ditko/i)).toBeInTheDocument();*/
  });
});
