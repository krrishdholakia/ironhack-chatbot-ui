import React from 'react';
import { render, screen } from '@testing-library/react';

describe('FinalMessage', () => {
  describe('When it renders', () => {
    it('Should render the correct text', async () => {
      const { FinalMessage } = await import('./FinalMessage');

      render(<FinalMessage text="Thanks for the feedback!" />);

      expect(screen.getByText('Thanks for the feedback!')).toBeInTheDocument();
    });
  });
});
