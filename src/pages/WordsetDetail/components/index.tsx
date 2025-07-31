import styled from "@emotion/styled";
import WordsArea from "./WordsArea";
import { useWordsetDetailData } from "../hooks/useWordsetDetailData";
import { Provider as AtomProvider } from "jotai";
import Header from "../../../components/layouts/mobile/Header";
import { useNavigate } from "@tanstack/react-router";
import { GetWordsetDetailData } from "../../../apis/services/wordset/get-wordset-detail/index.types";
import { createContext, useContext, useState } from "react";
import Button1 from "../../../components/button1";
import ExamsArea from "./ExamsArea";
import Text from "../../../components/texts/Text";
import { useMutation } from "@tanstack/react-query";
import WordsetApi from "@/apis/services/wordset";
import { queryClient } from "@/routes/__root";
import EditableTitle from "@/components/editable-title";

const ModeSelector = ({
    mode,
    setMode,
}: {
    mode: "WORDS" | "EXAMS";
    setMode: (mode: "WORDS" | "EXAMS") => void;
}) => {
    return (
        <S.Wrapper>
            <Button1
                height={"50px"}
                colorStyle={mode === "WORDS" ? "NeutralSelected" : "Neutral"}
                onClick={() => setMode("WORDS")}
            >
                <Text
                    fontStyle={mode === "WORDS" ? "action-xl" : "action-xl"}
                    fontSize={mode === "WORDS" ? 18 : 17}
                    label="단어장"
                    colorName={"neutral-dark-darkest"}
                />
            </Button1>
            <Button1
                height={"50px"}
                colorStyle={mode === "EXAMS" ? "NeutralSelected" : "Neutral"}
                onClick={() => setMode("EXAMS")}
            >
                <Text
                    fontStyle={mode === "EXAMS" ? "action-xl" : "action-xl"}
                    fontSize={mode === "EXAMS" ? 18 : 17}
                    label="시험"
                    colorName={"neutral-dark-darkest"}
                />
            </Button1>
        </S.Wrapper>
    );
};

const PageContext = createContext<{
    wordsetId: number;
    pageData: GetWordsetDetailData;
}>({
    wordsetId: 0,
    pageData: {
        name: "",
        list: [],
        examIds: [],
    },
});

const usePageData = () => useContext(PageContext).pageData;
const useWordsetId = () => useContext(PageContext).wordsetId;

// Page Root
const WordsetDetailPage = ({ wordsetId }: { wordsetId: number }) => {
    const pageData = useWordsetDetailData(wordsetId);

    if (!pageData) return null;

    return (
        <PageContext.Provider value={{ wordsetId, pageData }}>
            <IfDataValid />
        </PageContext.Provider>
    );
};

WordsetDetailPage.usePageData = usePageData;
WordsetDetailPage.useWordsetId = useWordsetId;

const useRename = () => {
    const wordsetId = WordsetDetailPage.useWordsetId();

    const { mutateAsync: rename, isPending } = useMutation({
        mutationFn: async (newTitle: string) => {
            if (!wordsetId) {
                return;
            }

            await WordsetApi.RenameWordset({
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

    return { renameRequest: (name: string) => rename(name), isPending };
};

const IfDataValid = () => {
    const navigate = useNavigate();
    const [pageMode, setPageMode] = useState<"WORDS" | "EXAMS">("WORDS");

    const goBack = () =>
        navigate({
            to: "/wordset",
        });

    const pageData = usePageData();
    const wordsetId = useWordsetId();

    const { renameRequest, isPending } = useRename();

    return (
        // Provider for Modal Status
        <AtomProvider>
            <S.Outer>
                <Header goBack={goBack}>
                    <EditableTitle
                        initialValue={pageData.name}
                        renameRequest={renameRequest}
                        isPending={isPending}
                    />
                </Header>
                <ModeSelector mode={pageMode} setMode={setPageMode} />
                {pageMode === "WORDS" ? (
                    <WordsArea />
                ) : (
                    <ExamsArea
                        examIds={pageData.examIds}
                        wordsetId={wordsetId}
                    />
                )}
            </S.Outer>
        </AtomProvider>
    );
};

export default WordsetDetailPage;

const S = {
    Outer: styled.div`
        height: 100vh;
        width: 100vw;

        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    Wrapper: styled.div`
        display: flex;
        width: calc(100% - 60px);
        justify-content: center;
        margin-bottom: 8px;
        gap: 8px;
    `,
};
