import { useQuery } from "@tanstack/react-query";

type ResultDataType = {
    resultId: number;
    examId: number;
    examName: string;
    createdAt: Date;
    problemResultList: ProblemResultItemType[];
};

export type ProblemResultItemType = {
    problemId: number;
    question: string;
    problemNumber: number;
    multipleChoice: {
        id: number;
        value: string;
    }[];
    userAnswers: {
        id: number;
        value: string;
    }[];
    rightAnswers: {
        id: number;
        value: string;
    }[];
};

const TEMP_DATA: ResultDataType = {
    resultId: 1,
    examId: 1,
    examName: "exam 1",
    createdAt: new Date(),
    problemResultList: [
        {
            problemId: 1,
            problemNumber: 1,
            question: "What is the capital of France?",
            multipleChoice: [
                {
                    id: 1,
                    value: "Choice A",
                },
                {
                    id: 2,
                    value: "Choice B",
                },
            ],
            userAnswers: [{ id: 1, value: "Choice A" }],
            rightAnswers: [
                { id: 1, value: "Choice A" },
                { id: 2, value: "Choice B" },
            ],
        },
    ],
};

const useResultDetail = (resultId: number) => {
    const { data } = useQuery({
        queryFn: async () => {
            console.log("resultDetail", resultId);
            return TEMP_DATA;
        },
        queryKey: ["resultDetail", resultId],
        initialData: null,
    });

    return data;
};

export default useResultDetail;
