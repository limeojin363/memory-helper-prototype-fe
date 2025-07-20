import { ClipLoader } from "react-spinners";
import styled from "@emotion/styled";
import { ChangeEventHandler } from "react";
import Button1 from "../../../../components/button1";
import TextField from "../../../../components/text-field";
import Text from "../../../../components/texts/Text";
import { Colors } from "../../../../designs/colors";
import Icon from "../../../../components/icons/Icon";

const EngArea = ({
    value,
    onChange,
    loadServerMeanings,
    isLoadingMeanings,
    isEditable,
}: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    loadServerMeanings: () => void;
    isLoadingMeanings: boolean;
    isEditable: boolean;
}) => {
    const showLoadButton = !isLoadingMeanings && !!value && isEditable;

    const inputKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        if (!showLoadButton) return;
        loadServerMeanings();
    };

    return (
        <S.EngAreaWrapper>
            <Text fontStyle="heading-5" label="Eng" />
            <S.EngInputWrapper>
                <TextField
                    colorSetName={
                        isEditable ? "PRIMARY-INITIAL" : "PRIMARY-DISABLED"
                    }
                    disabled={!isEditable}
                    onKeyDown={inputKeyDownHandler}
                    onChange={onChange}
                    value={value}
                />
                {showLoadButton && (
                    <S.SideIconPositionor right={4}>
                        <Button1
                            onClick={() => {
                                loadServerMeanings();
                            }}
                            width={"24px"}
                            height={"24px"}
                            activeTransformScale={0.95}
                            colorStyle="Primary"
                            borderRadius={"30%"}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon
                                    colorName="highlight-dark"
                                    iconName="submit"
                                    size={12}
                                />
                            </div>
                        </Button1>
                    </S.SideIconPositionor>
                )}

                {isLoadingMeanings && (
                    <S.SideIconPositionor right={4}>
                        <ClipLoader
                            size={12}
                            color={Colors["neutral-dark-darkest"]}
                        />
                    </S.SideIconPositionor>
                )}
            </S.EngInputWrapper>
        </S.EngAreaWrapper>
    );
};

export default EngArea;

const S = {
    EngAreaWrapper: styled.div`
        position: relative;

        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
    EngInputWrapper: styled.div`
        position: relative;
        width: 100%;

        display: flex;
    `,
    SideIconPositionor: styled.div<{ right: number }>`
        position: absolute;

        right: ${({ right }) => right}px;
        bottom: calc(50%);
        transform: translateY(50%);

        transition: all 0.2s ease-in-out;
    `,
};
