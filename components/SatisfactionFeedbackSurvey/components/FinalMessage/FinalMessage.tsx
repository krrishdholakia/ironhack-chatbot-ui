import { Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

type ThankYouMessageProps = {
  text: string;
};

export const FinalMessage = (props: ThankYouMessageProps): ReactElement => {
  const { text } = props;

  return (
    <Text
      alignItems="baseline"
      color="white"
      fontSize="16px"
      fontWeight={700}
      {...props}
    >
      {text}
    </Text>
  );
};
