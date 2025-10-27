import ExamApi from "@/apis/services/exam";
import ButtonWithText from "@/components/button-with-text";
import { useMutation } from "@tanstack/react-query";
import ExamSolvingPage from ".";

const useSubmit = () => {
  const { examId, answers } = ExamSolvingPage.useContext();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const submitable = answers.every((answer) => answer !== null);
      if (!submitable) return;

      await ExamApi.CheckAnswer({
        examId,
        checkedAnswers: answers,
      });
    },
  });

  return () => mutate();
};

const SubmitButton = () => {
  const { answers } = ExamSolvingPage.useContext();
  const requestSubmit = useSubmit();

  return (
    <ButtonWithText
      disabled={answers.some((answer) => answer === null)}
      text="제출하기"
      onClick={requestSubmit}
    />
  );
};
export default SubmitButton;
