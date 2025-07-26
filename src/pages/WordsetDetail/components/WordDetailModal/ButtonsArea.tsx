import { useMutation } from "@tanstack/react-query";
import WordDetailModal from ".";
import ButtonWithText from "../../../../components/button-with-text";
import WordDetailEditor from "./WordDetailEditor";
import WordsetDetailPage from "..";
import { AddWordToSetReqParam } from "../../../../apis/services/wordset/add-word-to-wordset/index.types";
import WordsetApi from "../../../../apis/services/wordset";
import { queryClient } from "../../../../routes/__root";
import { getDataFromApiRes } from "../../../../apis/services";
import UpdateWordInWordset from "../../../../apis/services/wordset/update-word-in-wordset";
import DeleteWordInWordset from "../../../../apis/services/wordset/delete-word-in-wordset";

const useServerActions = () => {
    const { engWord, korMeanings } =
        WordDetailEditor.useEditorContext();
    const { wordId, close: closeModal } = WordDetailModal.useModalContext();
    const wordsetId = WordsetDetailPage.useWordsetId();

    const { mutateAsync: createWord } = useMutation({
        mutationFn: async () => {
            if (!wordsetId) return;

            const body: AddWordToSetReqParam = {
                setId: wordsetId,
                word: engWord,
                meaning: korMeanings,
            };

            const res = WordsetApi.AddWordToWordset(body);
            return getDataFromApiRes(res);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["wordsetDetail", wordsetId],
            });
            closeModal();
        },
    });

    const { mutateAsync: updateWord } = useMutation({
        mutationFn: async () => {
            if (!wordsetId || !wordId) return;

            await UpdateWordInWordset({
                setId: wordsetId,
                wordId,
                meaning: korMeanings,
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["wordsetDetail", wordsetId],
            });
            closeModal();
        },
    });

    const { mutateAsync: deleteWord } = useMutation({
        mutationFn: async () => {
            if (!wordId) return;

            await DeleteWordInWordset({
                setId: wordsetId,
                wordId: wordId,
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["wordsetDetail", wordsetId],
            });

            closeModal();
        },
    });

    return {
        createWord: () => createWord(),
        deleteWord: () => deleteWord(),
        updateWord: () => updateWord(),
    };
};

const ButtonsArea = () => {
    const { mode, selectModeOnExisting } = WordDetailModal.useModalContext();
    const { createWord, deleteWord, updateWord } = useServerActions();

    switch (mode) {
        case "CREATE":
            return <ButtonWithText onClick={createWord} text={"생성"} />;
        case "VIEW":
            return (
                <>
                    <ButtonWithText onClick={deleteWord} text={"삭제"} />
                    <ButtonWithText
                        onClick={() => selectModeOnExisting("MODIFY")}
                        text={"수정"}
                    />
                </>
            );
        case "MODIFY":
            return (
                <ButtonWithText
                    onClick={async () => {
                        await updateWord();
                    }}
                    text={"저장"}
                />
            );
    }
};

export default ButtonsArea;
