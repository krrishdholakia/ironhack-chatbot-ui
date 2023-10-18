import { Flex, FormControl, Input, Text, VStack } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

type Question = {
  id: number;
  question: string;
  questionType: string;
  options: Array<{ value: string; label: string }>;
};

type InputQuestionProps = {
  question: Question;
  register: (questionText: string) => void;
};

export const InputQuestion = ({
  question,
  register,
}: InputQuestionProps): ReactElement => {
  const { question: questionText } = question;

  return (
    <FormControl>
      <Flex direction="column">
        <Text color="white" fontSize="16px" fontWeight={700}>
          {questionText}
        </Text>
        <Input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          type="text"
          // @ts-ignore
          {...register(questionText)}
          _focus={{
            borderColor: 'transparent',
            boxShadow: 'none',
            outline: 'none',
          }}
          _hover={{
            borderColor: 'transparent',
            boxShadow: 'none',
            outline: 'none',
          }}
          bg="transparent"
          borderBottom="0.5px solid"
          borderBottomColor="white"
          borderColor="transparent"
          borderRadius="none"
          bottom="26px"
          boxShadow="none"
          fontSize="15px"
          placeholder="This is optional"
          position="relative"
          px="0"
        />
      </Flex>
    </FormControl>
  );
};
