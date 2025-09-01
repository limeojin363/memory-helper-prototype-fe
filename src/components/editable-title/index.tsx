import { Colors } from "@/designs/colors";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ButtonWithText from "../button-with-text";
import Text, { FontStyleMap } from "../texts/Text";
import Icon from "../icons/Icon";

// Edit, Save
const EditableTitle = ({
    initialValue,
    renameRequest,
    isPending,
}: {
    initialValue: string;
    renameRequest: (name: string) => Promise<unknown>;
    isPending: boolean;
}) => {
    const [mode, setMode] = useState<"VIEW" | "MODIFY">("VIEW");

    const isModifing = mode === "MODIFY";

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <S.Root>
            {isModifing ? (
                <>
                    <S.Input value={value} onChange={onChange} disabled={isPending} />
                    <S.ButtonsPositioner>
                        <ButtonWithText
                            height="24px"
                            width="24px"
                            text="V"
                            borderRadius="30%"
                            onClick={async () => {
                                await renameRequest(value);
                                setMode("VIEW");
                            }}
                        />
                        <ButtonWithText
                            height="24px"
                            width="24px"
                            text="X"
                            borderRadius="30%"
                            onClick={() => {
                                setValue(initialValue);
                                setMode("VIEW");
                            }}
                        />
                    </S.ButtonsPositioner>
                </>
            ) : (
                <>
                    <Text label={value} fontStyle={"heading-2"} />
                    <S.ButtonsPositioner>
                        <Icon
                            iconName="modify-pen"
                            colorName="neutral-dark-darkest"
                            onClick={() => setMode("MODIFY")}
                            size={24}
                        />
                    </S.ButtonsPositioner>
                </>
            )}
        </S.Root>
    );
};

export default EditableTitle;

const S = {
    Root: styled.div`
        display: flex;
        align-items: center;
        gap: 28px;
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

        :disabled {
            cursor: not-allowed;
        }
    `,
    ButtonsPositioner: styled.div`
        position: absolute;
        right: 18px;

        display: flex;
        gap: 4px;
    `,
};
