import styled from "@emotion/styled";
import WordSetItem from "./Item";
import { GetAllWordsetsResData } from "../../../apis/services/wordset/get-wordsets/index.types";

const List = ({ data }: { data: GetAllWordsetsResData | undefined }) => {
    return (
        <S.Root>
            {data?.map(({ createdAt, setId, setName, testSetsCount }) => (
                <WordSetItem
                    id={String(setId)}
                    key={setId}
                    name={setName}
                    createdAt={new Date(createdAt)}
                    problemSetCount={testSetsCount}
                />
            ))}
        </S.Root>
    );
};

export default List;

const S = {
    Root: styled.div`
        position: relative;

        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
};
