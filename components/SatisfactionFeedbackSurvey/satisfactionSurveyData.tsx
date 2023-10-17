export const satisfactionSurveyData = {
  ironTutorSurvey: {
    questions: [
      {
        id: 0,
        logic: {
          yes: 'end',
          no: 1,
        },
        options: [
          { value: 'yes', label: '👍🏻' },
          { value: 'no', label: '👎🏻' },
        ],
        question: 'Was this useful?',
        questionKey: 'is_successful',
        questionType: 'HandsIconQuestion',
      },
      {
        id: 1,
        logic: {
          all: 2,
        },
        options: [],
        question: 'How can we improve this answer?',
        questionKey: 'improve_details',
        questionType: 'InputQuestion',
      },
      {
        id: 2,
        logic: {
          all: 'end',
        },
        options: [],
        question: 'Can you provide any more detail?',
        questionKey: 'improve_more_details',
        questionType: 'InputQuestion',
      },
    ],
    finalMessage: 'Noted! Thanks! 🙌🏼',
  },
};
