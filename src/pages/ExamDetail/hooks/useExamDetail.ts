import { useQuery } from "@tanstack/react-query";
import { ResultItem } from "../components/ResultList";
import GetExam from "../../../apis/services/exam/get-exam";
import { getDataFromApiRes } from "../../../apis/services";

export type ProblemType = {
    question: string;
    problemId: number;
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

const _TEMP_DATA: DataType = {
    examId: 1,
    examName: "1",
    createdAt: new Date(),
    sourceWordsetId: 1,
    sourceWordsetName: "wordset 1",
    problems: [
        {
            problemNumber: 1,
            problemId: 1,
            question: "다음 중 React의 특징이 아닌 것은?",
            multipleChoice: [
                { id: "A", value: "컴포넌트 기반" },
                { id: "B", value: "단방향 데이터 흐름" },
                { id: "C", value: "상태 관리가 필요 없다" },
                { id: "D", value: "가상 DOM 사용" },
            ],
        },
        {
            problemNumber: 2,
            problemId: 2,
            question: "React에서 상태를 관리하기 위한 Hook은?",
            multipleChoice: [
                { id: "A", value: "useState" },
                { id: "B", value: "useEffect" },
                { id: "C", value: "useContext" },
                { id: "D", value: "useReducer" },
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
            const res = GetExam({ examId });
            const data = await getDataFromApiRes(res);

            return data;
        },
        queryKey: ["examDetail", examId],
        initialData: null,
    });

    return data;
};

export default useExamDetail;
