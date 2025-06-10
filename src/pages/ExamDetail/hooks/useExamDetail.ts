import { useQuery } from "@tanstack/react-query";
import { ResultItem } from "../components/ResultList";

export type ProblemType = {
    question: string;
    problemNumber: number;
    multipleChoice: {
        id: string;
        value: string;
    }[];
};

type DataType = {
    createdAt: Date;
    examId: number;
    examName: string;
    sourceWordsetId: number;
    sourceWordsetName: string;
    problems: ProblemType[];
    results: ResultItem[];
};

const TEMP_DATA: DataType = {
    examId: 1,
    examName: "1",
    createdAt: new Date(),
    sourceWordsetId: 1,
    sourceWordsetName: "wordset 1",
    problems: [
        {
            problemNumber: 1,
            question: "다음 중 React의 특징이 아닌 것은?",
            multipleChoice: [
                { id: "a", value: "컴포넌트 기반" },
                { id: "b", value: "단방향 데이터 흐름" },
                { id: "c", value: "상태 관리가 필요 없다" },
                { id: "d", value: "가상 DOM 사용" },
            ],
        },
        {
            problemNumber: 2,
            question: "React에서 상태를 관리하기 위한 Hook은?",
            multipleChoice: [
                { id: "a", value: "useState" },
                { id: "b", value: "useEffect" },
                { id: "c", value: "useContext" },
                { id: "d", value: "useReducer" },
            ],
        },
    ],
    results: [
        {
            resultId: 1,
            date: "2023-10-01",
            totalProblemsNum: 2,
            correctedAnswersNum: 1,
        },
        {
            resultId: 2,
            date: "2023-10-02",
            totalProblemsNum: 2,
            correctedAnswersNum: 2,
        },
    ],
};

const useExamDetail = (examId: number) => {
    const { data } = useQuery({
        queryFn: async () => {
            console.log({ examId });
            return TEMP_DATA;
        },
        queryKey: ["examDetail"],
        initialData: null,
    });

    return data;
};

export default useExamDetail;
