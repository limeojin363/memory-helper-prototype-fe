import styled from "@emotion/styled";
import useCreateExam from "../../hooks/useCreateExam";
import Button1 from "../../../../components/button1";
import Icon from "../../../../components/icons/Icon";

const ExamsArea = ({
    examIds,
    wordsetId,
}: {
    examIds: number[];
    wordsetId: number;
}) => {
    const createExam = useCreateExam(wordsetId);

    return (
        <S.Root>
            {examIds.map((examId) => (
                <div>{examId}</div>
            ))}
            <Button1
                height={"40px"}
                onClick={() => createExam()}
                colorStyle="Neutral"
            >
                <Icon
                    colorName="neutral-dark-darkest"
                    iconName="plus"
                    size={20}
                />
            </Button1>
        </S.Root>
    );
};

export default ExamsArea;

const S = {
    Root: styled.div`
        width: calc(100% - 80px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        gap: 8px;
    `,
};
