import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Colors } from "../../../designs/colors";
import { useMutation } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";
import { queryClient } from "../../../routes/__root";
import { FontStyleMap } from "../../../components/texts/Text";
import ButtonWithText from "../../../components/button-with-text";
import WordsetDetailPage from ".";

const useRenameWordset = ({ wordsetId }: { wordsetId: number }) => {
    const { mutate: rename } = useMutation({
        mutationFn: async (newTitle: string) => {
            if (!wordsetId) {
                return;
            }

            return WordsetApi.RenameWordset({
                setName: newTitle,
                id: wordsetId,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wordsetDetail", wordsetId],
            });
        },
        mutationKey: ["renameWordset", wordsetId],
    });

    return rename;
};

const WordsetName = ({
    valueFromProps,
}: {
    valueFromProps: string;
}) => {
    const wordsetId = WordsetDetailPage.useWordsetId();
    const [value, setValue] = useState(valueFromProps);

    const isChanged = value !== valueFromProps;

    useEffect(() => {
        // propValue가 변경되면 value를 업데이트
        setValue(valueFromProps);
    }, [setValue, valueFromProps]);

    const rename = useRenameWordset({ wordsetId });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onKeyEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        // 값 변화가 없다면 실행 X
        if (!isChanged) return;

        rename(value);
    };

    // 우측에 체크 or X 택일할 수 있도록 버튼 비치해두기
    return (
        <S.Wrapper>
            <S.Input
                value={value}
                onChange={onChange}
                onKeyDown={onKeyEnterDown}
            />
            <S.ButtonsPositioner>
                {isChanged && (
                    <>
                        <ButtonWithText
                            height="24px"
                            width="24px"
                            text="V"
                            borderRadius="30%"
                            onClick={() => rename(value)}
                        />
                        <ButtonWithText
                            height="24px"
                            width="24px"
                            text="X"
                            borderRadius="30%"
                            onClick={() => setValue(valueFromProps)}
                        />
                    </>
                )}
            </S.ButtonsPositioner>
        </S.Wrapper>
    );
};

export default WordsetName;

// 헤더에 들어가는 것을 고려하여 작업할 것
const S = {
    Wrapper: styled.div`
        display: flex;
        justify-content: flex-end;
        width: 100%;
        position: relative;
    `,
    Input: styled.input`
        background-color: ${Colors["neutral-light-medium"]};

        border: none;
        box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;
        border-radius: 12px;
        outline: none;

        width: calc(100% - 32px);

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 12px 12px;

        ${FontStyleMap["body-xl"]}

        :focus {
            box-shadow: 0 0 0 2px ${Colors["neutral-dark-darkest"]} inset;
        }
    `,
    ButtonsPositioner: styled.div`
        position: absolute;
        right: 8px;
        transform: translateY(50%);

        display: flex;
        gap: 4px;
    `,
};
