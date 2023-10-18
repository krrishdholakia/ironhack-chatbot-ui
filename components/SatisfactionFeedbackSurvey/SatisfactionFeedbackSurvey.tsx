//@ts-nocheck
import { Flex } from '@chakra-ui/react';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FinalMessage } from './components/FinalMessage';
import { HandsIconQuestion } from './components/HandsIconQuestion';
import { InputQuestion } from './components/InputQuestion';

import { useCohortData, useStudents } from '../../hooks';
import { AuthContext } from '../Auth';
import { satisfactionSurveyData } from './satisfactionSurveyData';

import type { Student } from '@ironhack/types';
import * as R from 'ramda';

type Question = {
  id: number;
  questionKey: string;
  question: string;
  questionType: string;
  options: Array<{ value: string; label: string }>;
  logic: Record<string, number | 'end'>;
};

type SatisfactionFeedbackSurveyProps = {
  customParams?: Record<string, unknown>;
  surveyType: string;
};

export const SatisfactionFeedbackSurvey = (
  props: SatisfactionFeedbackSurveyProps,
): ReactElement => {
  const keycloak = useContext(AuthContext);

  const { customParams, surveyType } = props;
  const { questions, finalMessage } = satisfactionSurveyData[surveyType] as {
    questions: Question[];
    finalMessage: string;
  };
  const { id: cohortId } = useCohortData();
  const { data: students } = useStudents(keycloak?.idTokenParsed?.email);

  const studentId = R.pipe(
    R.defaultTo([]) as (b: Student[]) => Record<'id', unknown>[],
    R.pluck('id'),
    R.last,
  )(students as Student[]) as string;

  const { handleSubmit, register, reset, setValue } = useForm();

  const [step, setStep] = useState(0);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const currentQuestion = questions[step];

  const onSubmit = (data: Record<string, string>): void => {
    setFormData({
      ...formData,
      [currentQuestion.questionKey]: data[currentQuestion.question],
    });

    const nextStep =
      (currentQuestion.logic &&
        currentQuestion.logic[data[currentQuestion.question]]) ||
      currentQuestion.logic.all;

    if (nextStep === 'end') {
      setStep(questions.length);
    } else {
      setStep(step + 1);
    }
    reset();
  };

  useEffect(() => {
    if (
      step === questions.length &&
      !surveySubmitted &&
      cohortId &&
      studentId
    ) {
      const submitSatisfactionFeedbackSurvey = async () => {
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${keycloak.token as string}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...(customParams && { custom_params: customParams }),
            cohort_id: cohortId,
            responses: formData,
            survey_type: surveyType,
          }),
        };

        const response = await fetch(
          `/api/students/${studentId}/surveys/satisfaction-survey`,
          requestOptions,
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      };
      setSurveySubmitted(true);
      submitSatisfactionFeedbackSurvey();
    }
  }, [
    cohortId,
    customParams,
    formData,
    keycloak.token,
    questions.length,
    step,
    studentId,
    surveySubmitted,
    surveyType,
  ]);

  const renderQuestion = (question: Question): ReactElement => {
    if (question.questionType === 'HandsIconQuestion') {
      return (
        <HandsIconQuestion
          onSubmit={onSubmit}
          question={question}
          register={register}
          setValue={setValue}
        />
      );
    }
    return (
      <InputQuestion
        key={question.id}
        question={question}
        register={register}
      />
    );
  };

  return (
    <Flex alignItems="center" mt="32px" minH="150px" {...props}>
      {step < questions.length ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderQuestion(currentQuestion)}
        </form>
      ) : (
        <FinalMessage text={finalMessage} />
      )}
    </Flex>
  );
};
