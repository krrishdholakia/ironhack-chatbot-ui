import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

describe('HandsIconQuestion', () => {
  describe('When it renders', () => {
    const onSubmitMock = jest.fn();
    const registerMock = jest.fn();
    const setValueMock = jest.fn();

    const questionMock = {
      id: 1,
      question: 'What is your favorite option?',
      questionType: 'radio',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
    };

    it('Should render the question text and options', async () => {
      const { HandsIconQuestion } = await import('./HandsIconQuestion');
      render(
        <HandsIconQuestion
          onSubmit={onSubmitMock}
          question={questionMock}
          register={registerMock}
          setValue={setValueMock}
        />
      );

      expect(
        screen.getByText('What is your favorite option?')
      ).toBeInTheDocument();

      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('Should call setValue and onSubmit when clicking an option', async () => {
      const { HandsIconQuestion } = await import('./HandsIconQuestion');
      render(
        <HandsIconQuestion
          onSubmit={onSubmitMock}
          question={questionMock}
          register={registerMock}
          setValue={setValueMock}
        />
      );

      fireEvent.click(screen.getByText('Option 1'));

      expect(setValueMock).toHaveBeenCalledWith(
        'What is your favorite option?',
        'option1'
      );
      expect(onSubmitMock).toHaveBeenCalledWith({
        'What is your favorite option?': 'option1',
      });
    });
  });
});
