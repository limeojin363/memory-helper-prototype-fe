import { ClipLoader } from "react-spinners";
import styled from "@emotion/styled";
import Button1 from "../../../../components/button1";
import TextField from "../../../../components/text-field";
import Text from "../../../../components/texts/Text";
import { Colors } from "../../../../designs/colors";
import Icon from "../../../../components/icons/Icon";
import { useMutation } from "@tanstack/react-query";
import WordApi from "../../../../apis/services/word";
import WordDetailEditor from "./WordDetailEditor";
import { getDataFromApiRes } from "../../../../apis/services";
import WordDetailModal from ".";

const useServerActions = () => {
    const { engWord, addLoadedMeanings } = WordDetailEditor.useEditorContext();

    const { mutate: loadServerMeanings, isPending: isLoadingMeanings } =
        useMutation({
            mutationFn: async () => {
                const res = WordApi.WordExists({
                    word: engWord,
                });
                const data = await getDataFromApiRes(res);
                const gottenMeanings = data.meaning;

                addLoadedMeanings(gottenMeanings);
            },
        });

    return { loadServerMeanings, isLoadingMeanings };
};

const EngArea = () => {
    const { loadServerMeanings, isLoadingMeanings } = useServerActions();
    const { engWord: value, changeWord } = WordDetailEditor.useEditorContext();
    const { editable } = WordDetailModal.useModalContext();
    const showLoadButton = !isLoadingMeanings && !!value && editable;

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
                        editable ? "PRIMARY-INITIAL" : "PRIMARY-DISABLED"
                    }
                    disabled={!editable}
                    onKeyDown={inputKeyDownHandler}
                    onChange={(e) => changeWord(e.target.value)}
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
