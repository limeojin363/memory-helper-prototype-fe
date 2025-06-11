import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { useMemo } from "react";
import { useExamId } from ".";
import { useProblemId } from "./ProblemList";

// export: useSubmitAnswer에서, 선택한 내용 종합 시 필요
export const choiceAtomFamily = atomFamily(
    (_: { examId: number; problemId: number }) => atom<string[]>([]),
);

const useChoices = () => {
    const examId = useExamId();
    const problemId = useProblemId();
    const choiceAtom = useMemo(
        () => choiceAtomFamily({ examId, problemId }),
        [examId, problemId],
    );

    const [choices, setChoices] = useAtom(choiceAtom);

    const isSelected = (choiceId: string) => choices.includes(choiceId);

    const toggleChoice = (choiceId: string) => {
        setChoices((prevChoices) => {
            if (prevChoices.includes(choiceId)) {
                return prevChoices.filter((num) => num !== choiceId);
            } else {
                return [...prevChoices, choiceId];
            }
        });
    };

    return {
        isSelected,
        toggleChoice,
    };
};

export default useChoices;
