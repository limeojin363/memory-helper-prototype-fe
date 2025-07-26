import { atom, useAtomValue } from "jotai";
import { useExamId } from ".";
import useExamDetail from "../ExamDetail/hooks/useExamDetail";
import { choiceAtomFamily } from "./useChoice";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import CheckAnswer from "../../apis/services/exam/check-answer";

const useSubmitAnswers = () => {
    const examId = useExamId();
    const examDetailData = useExamDetail(examId);
    const entireChoicesAtom = useMemo(
        () =>
            atom((get) => {
                if (!examDetailData) return null;

                return examDetailData.problemResultList.map((problem) =>
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

    // TODO: singleChoice 반영 후 작업
    // const {mutate} = useMutation({
    //     mutationFn: async()=>{
    //         await CheckAnswer({ checkedAnswers: entireChoices, examId });
    //     },
    // });

    return () => mutate();
};

export default useSubmitAnswers;
