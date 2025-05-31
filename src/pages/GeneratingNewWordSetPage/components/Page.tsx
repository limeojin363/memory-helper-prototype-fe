import WordList, { WordItemProps } from "./ListView/List";
import { useState } from "react";
import DetailViewModal from "./ModalView/Modal";
import {
    useInitializeWordset,
    useWordsetDetailData,
} from "../hooks/useServerData";
import { TypeKey } from "../../WordSetDetailPage/components/WordSetList";
import { Provider } from "jotai";

// 입력한 이름으로 세트 생성
const EnterName = ({
    initialize,
}: {
    initialize: (name: string) => unknown;
}) => {
    const [value, setValue] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                initialize(value);
            }}
        >
            <input value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
    );
};

const listProcessCallback = (item: {
    wordId: number;
    word: string;
    meaning: Array<{
        type: TypeKey;
        value: string;
    }>;
}): WordItemProps & {key: number} => ({
    eng: item.word,
    firstMeaning: item.meaning[0].value,
    meaningCount: item.meaning.length,
    key: item.wordId,
    id: item.wordId,
});

const GeneratingNewWordSetPage = () => {
    const initialize = useInitializeWordset();
    const data = useWordsetDetailData();

    const initialized = !!data;

    if (!initialized) return <EnterName initialize={initialize} />;

    const processedList = data.list.map(listProcessCallback);

    return (
        // modalStatusAtom은 Provider 내부에서만 생존한다
        <Provider>
            <WordList listData={processedList} />
            <DetailViewModal />
        </Provider>
    );
};

export default GeneratingNewWordSetPage;
