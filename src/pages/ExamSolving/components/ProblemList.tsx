import styled from "@emotion/styled";
import { ProblemType } from "../../ExamDetail/hooks/useExamDetail";

const ProblemItem = ({ itemData }: { itemData: ProblemType }) => {
    return (
        <S.ItemRoot>
            <div>
                {itemData.problemNumber}. {itemData.question}
            </div>
            {itemData.multipleChoice.map((choice) => (
                <div key={choice.id}>
                    {choice.id}: {choice.value}
                </div>
            ))}
        </S.ItemRoot>
    );
};

// Pure Component
const ProblemList = ({ listData }: { listData: ProblemType[] }) => {
    return (
        <S.ListRoot>
            {listData.map((item) => (
                <ProblemItem key={item.problemNumber} itemData={item} />
            ))}
        </S.ListRoot>
    );
};

const S = {
    ListRoot: styled.div`
        /* FILL HERE */
    `,
    ItemRoot: styled.div``,
};

export default ProblemList;
