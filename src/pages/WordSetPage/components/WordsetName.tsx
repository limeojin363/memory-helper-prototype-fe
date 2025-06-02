import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Colors } from "../../../designs/colors";
import { useMutation } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";
import { queryClient } from "../../../routes/__root";
import { useAtomValue } from "jotai";
import { wordsetIdAtom } from "../hooks/useServerData";
import { FontStyleMap } from "../../../components/texts/Text";

const useRenameWordset = () => {
    const wordsetId = useAtomValue(wordsetIdAtom);

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

const WordsetName = ({ propValue }: { propValue: string }) => {
    const [value, setValue] = useState(propValue);

    useEffect(() => {
        // propValue가 변경되면 value를 업데이트
        setValue(propValue);
    }, [setValue, propValue]);

    const rename = useRenameWordset();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onKeyEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        // 값 변화가 없다면 실행 X
        if (value === propValue) return;

        rename(value);
    };

    // 우측에 체크 or X 택일할 수 있도록 버튼 비치해두기
    return (
        <S.Input value={value} onChange={onChange} onKeyDown={onKeyEnterDown} />
    );
};

export default WordsetName;

const S = {
    Input: styled.input`
        background-color: ${Colors["neutral-light-medium"]};

        border: none;
        box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;
        border-radius: 12px;
        outline: none;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 12px 12px;

        ${FontStyleMap["body-xl"]}

        :focus {
            box-shadow: 0 0 0 2px ${Colors["neutral-dark-darkest"]} inset;
        }
    `,
};
