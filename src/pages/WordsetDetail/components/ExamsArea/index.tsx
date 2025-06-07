import styled from "@emotion/styled";

type ExamItem = {
    name: string;
};

// Pure
const ExamsArea = ({ listData }: { listData: ExamItem[] }) => {
    return (
        <S.Root>
            {listData.map(({ name }) => (
                <div>{name}</div>
            ))}
        </S.Root>
    );
};

export default ExamsArea;

const S = {
    Root: styled.div``,
};
