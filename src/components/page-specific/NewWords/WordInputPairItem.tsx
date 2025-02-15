import styled from "@emotion/styled";
import { usePairItem, usePairList } from "./useNewWordSetState";
import Icon from "../../general/icons/Icon";
import Text from "../../general/texts/Text";
import WordInput, { WordInputStatus } from "../../general/inputs/WordInput";

const WordInputPairItem = ({ pairId }: { pairId: string }) => {
    // props drilling 방지를 위해, global state를 통해 pair item의 value와 handler를 관리
    const {
        // API 호출 직후 사용
        // setKorItems,
        item: { engValue, korItems, engStatus },
        setEngValue,
        addKorItem,
        callGetKorAPI,
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
                        onChange={(e) => {
                            setEngValue(e.target.value);
                            callGetKorAPI(e.target.value);
                        }}
                        status={engStatus}
                    />
                </S.EngArea>
                {korItems !== "INITIAL" && (
                    <>
                        <S.KorArea>
                            <S.KorTopWrapper>
                                <Text fontStyle="heading-5" label="Kor" />
                                {korItems !== "LOADING" && (
                                    <Icon
                                        colorName="neutral-dark-darkest"
                                        iconName="plus"
                                        size={12}
                                        onClick={addKorItem}
                                    />
                                )}
                            </S.KorTopWrapper>
                            <S.KorItemsWrapper>
                                {korItems === "LOADING"
                                    ? Array.from({ length: 3 }).map(
                                          (_, idx) => (
                                              <WordInput
                                                  key={idx}
                                                  status="LOADING"
                                              />
                                          ),
                                      )
                                    : korItems.map(
                                          ({ korItemId, value, status }) => (
                                              <KorItem
                                                  status={status}
                                                  key={korItemId}
                                                  korItemId={korItemId}
                                                  value={value}
                                                  pairId={pairId}
                                              />
                                          ),
                                      )}
                            </S.KorItemsWrapper>
                        </S.KorArea>
                    </>
                )}
            </S.InputArea>
        </S.WordInputPairItemWrapper>
    );
};

const KorItem = ({
    korItemId,
    value,
    pairId,
    status,
}: {
    korItemId: string;
    value: string;
    pairId: string;
    status: WordInputStatus;
}) => {
    const { deleteKorItem, modifySingleKorItem } = usePairItem(pairId);

    return (
        <S.KorItemWrapper>
            <WordInput
                placeholder="영단어를 먼저 입력해주세요"
                value={value}
                onChange={(e) => {
                    modifySingleKorItem(korItemId, e.target.value);
                }}
                status={status}
                key={korItemId}
            />
            <S.KorTrashWrapper>
                <Icon
                    onClick={() => deleteKorItem(korItemId)}
                    colorName="neutral-dark-darkest"
                    iconName="trash"
                    size={16}
                />
            </S.KorTrashWrapper>
        </S.KorItemWrapper>
    );
};

export default WordInputPairItem;

const S = {
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
    KorItemsWrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap: 6px;
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
