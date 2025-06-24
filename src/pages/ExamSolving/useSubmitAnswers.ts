import { atom, useAtomValue } from "jotai";
import { useExamId } from ".";
import useExamDetail from "../ExamDetail/hooks/useExamDetail";
import { choiceAtomFamily } from "./useChoice";
import { useMemo } from "react";

const useSubmitAnswers = () => {
    const examId = useExamId();
    const examDetailData = useExamDetail(examId);
    const entireChoicesAtom = useMemo(
        () =>
            atom((get) => {
                if (!examDetailData) return null;

                return examDetailData.problems.map((problem) =>
                    get(
                        choiceAtomFamily({
                            examId,
                            problemId: problem.problemNumber,
                        }),
                    ),
                );
            }),
        [examId, examDetailData],
    );
    const entireChoices = useAtomValue(entireChoicesAtom);
};

export default useSubmitAnswers;
