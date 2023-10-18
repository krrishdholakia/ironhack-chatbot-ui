import { Box, FormControl, HStack, Radio, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

type Question = {
  id: number;
  question: string;
  questionType: string;
  options: Array<{ value: string; label: string }>;
};

type HandsIconQuestionProps = {
  question: Question;
  onSubmit: (value: Record<string, string>) => void;
  register: (questionText: string) => void;
  setValue: (questionText: string, value: string) => void;
};

export const HandsIconQuestion = ({
  question,
  onSubmit,
  register,
  setValue,
}: HandsIconQuestionProps): ReactElement => {
  const { question: questionText, options } = question;

  const handleRadioChange = (value: string): void => {
    setValue(questionText, value);
    onSubmit({ [questionText]: value });
  };

  return (
    <FormControl as="fieldset">
      <HStack alignItems="baseline">
        <Text color="white" fontSize="16px" fontWeight={700}>
          {questionText}
        </Text>
        {options.map((option, index) => (
          <Box key={index}>
            <Radio
              value={option.value}
              // @ts-ignore
              {...register(questionText)}
              display="none"
            />
            <Text
              aria-label={option.label}
              cursor="pointer"
              onClick={(): void => handleRadioChange(option.value)}
              role="img"
            >
              {option.label}
            </Text>
          </Box>
        ))}
      </HStack>
    </FormControl>
  );
};
