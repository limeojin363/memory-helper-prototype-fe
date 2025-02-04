import styled from "@emotion/styled";
import _ from "lodash";
import Icon from "../../general/icons/Icon";
import Text from "../../general/texts/Text";
import WordInput from "../../general/inputs/WordInput";
import { usePairItem, usePairList } from "./useNewWordSetState";

const NewWordsStep1 = () => {
    const { pairList, addPairItem } = usePairList();

    return (
        <S.Root>
            {pairList.map(({ pairId }) => (
                <WordInputPairItem pairId={pairId} key={pairId} />
            ))}
            <Icon
                colorName="neutral-dark-darkest"
                iconName="plus"
                size={30}
                onClick={addPairItem}
            />
        </S.Root>
    );
};

const WordInputPairItem = ({ pairId }: { pairId: string }) => {
    const {
        // API 호출 직후 사용
        // setKorItems,
        item: { engValue, korItems },
        setEngValue,
        addKorItem,
        deleteKorItem,
        modifySingleKorItem,
    } = usePairItem(pairId);
    const { deletePairItem } = usePairList();

    return (
        <S.WordInputPairItemWrapper>
            <S.TrashWrapper>
                <Icon
                    onClick={() => deletePairItem(pairId)}
                    colorName="neutral-dark-darkest"
                    iconName="trash"
                    size={24}
                />
            </S.TrashWrapper>
            <S.InputArea>
                <S.EngArea>
                    <Text fontStyle="heading-5" label="Eng" />
                    <WordInput
                        placeholder="이곳에 단어를 입력하면 한국어 뜻을 추천해드려요"
                        value={engValue}
                        onChange={(e) => setEngValue(e.target.value)}
                        status="INITIAL"
                    />
                </S.EngArea>
                <S.KorArea>
                    <S.KorTopWrapper>
                        <Text fontStyle="heading-5" label="Kor" />
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="plus"
                            size={13.5}
                            onClick={addKorItem}
                        />
                    </S.KorTopWrapper>
                    {korItems?.map((korItem) => {
                        return (
                            <S.KorItemWrapper>
                                <WordInput
                                    placeholder="영단어를 먼저 입력해주세요"
                                    value={korItem.value}
                                    onChange={(e) =>
                                        modifySingleKorItem(
                                            korItem.korItemId,
                                            e.target.value,
                                        )
                                    }
                                    status="DISABLED"
                                    key={korItem.korItemId}
                                />
                                <S.KorTrashWrapper>
                                    <Icon
                                        onClick={() =>
                                            deleteKorItem(korItem.korItemId)
                                        }
                                        colorName="neutral-dark-darkest"
                                        iconName="trash"
                                        size={16}
                                    />
                                </S.KorTrashWrapper>
                            </S.KorItemWrapper>
                        );
                    })}
                </S.KorArea>
            </S.InputArea>
        </S.WordInputPairItemWrapper>
    );
};

const S = {
    Root: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
    `,
    WordInputPairItemWrapper: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
    `,
    InputArea: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;

        padding: 4px;
        border: 1px solid;
    `,
    EngArea: styled.div`
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 2px;
    `,
    KorArea: styled.div`
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 2px;
    `,
    KorTopWrapper: styled.div`
        display: flex;
        justify-content: space-between;
    `,
    KorItemWrapper: styled.div`
        position: relative;
    `,
    KorTrashWrapper: styled.div`
        position: absolute;

        display: flex;
        align-items: center;
        justify-content: center;

        right: 4px;
        /* Icon size가 16px이므로 그 절반만큼 보정*/
        bottom: calc(50% - 8px);
    `,
    TrashWrapper: styled.div`
        width: 24px;
        height: 24px;
        border: 1px solid;
    `,
};

export default NewWordsStep1;
