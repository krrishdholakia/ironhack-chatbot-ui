interface Props {
  onPromptSelected: Function;
}
type ButtonData = {
  title: string;
  subtitle: string;
  prompt: string;
};
const BUTTONS_DATA: ButtonData[] = [
  {
    title: 'How can you help me? ',
    subtitle: '',
    prompt: 'Hey, who are you and how can you help me',
  },
  {
    title: 'Topic explanations',
    subtitle: 'on JS, Python, HTML, CSS and more',
    prompt: 'What is a javascript object? How is it different from a class?',
  },
  {
    title: 'Explain code snippets',
    subtitle: 'explain logic and what it does',
    prompt:
      'Explain this code: for (let i = 1; i <= 5; i++) {   console.log(i); }',
  },
  {
    title: 'Generate quizzes',
    subtitle: 'for specific topics',
    prompt:
      "Create a quizz with 4 questions and 3 possible answers on javascript objects, don't mark the correct answers",
  },
];

const Onboarding = ({ onPromptSelected }: Props) => {
  return (
    <div className="grid grid-cols-2 w-full gap-4">
      {BUTTONS_DATA.map(({ title, subtitle, prompt }: ButtonData) => (
        <button
          key={title}
          className="flex flex-col w-full flex-shrink-0 cursor-pointer select-none gap-0.25 rounded-lg border border-white/20 p-2 transition-colors duration-200 hover:bg-gray-500/10"
          onClick={() => {
            onPromptSelected(prompt);
          }}
        >
          <p className="text-white/80 font-semibold ">{title}</p>
          {subtitle && <p className="text-white/40">{subtitle}</p>}
        </button>
      ))}
    </div>
  );
};

export default Onboarding;
