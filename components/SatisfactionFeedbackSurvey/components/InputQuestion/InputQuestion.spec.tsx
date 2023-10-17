import React from 'react';
import { render, screen } from '@testing-library/react';

describe('InputQuestion', () => {
  describe('When it renders', () => {
    const registerMock = jest.fn();

    const questionMock = {
      id: 1,
      question: 'Please enter your name',
      questionType: 'text',
      options: [],
    };

    it('Should render the question text and the input field', async () => {
      const { InputQuestion } = await import('./InputQuestion');

      render(<InputQuestion question={questionMock} register={registerMock} />);

      expect(screen.getByText('Please enter your name')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('This is optional')
      ).toBeInTheDocument();
    });

    it('Should call the register function with the correct argument', async () => {
      const { InputQuestion } = await import('./InputQuestion');

      render(<InputQuestion question={questionMock} register={registerMock} />);

      expect(registerMock).toHaveBeenCalledWith('Please enter your name');
    });
  });
});
