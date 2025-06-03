import { useState } from "react";
import { TypeKey } from "../../WordSetDetailPage-dep/components/WordSetList";
import { useMutation } from "@tanstack/react-query";
import WordApi from "../../../apis/services/word";
import { getDataFromApiRes } from "../../../apis/services";

const useNewWordState = () => {
    const [eng, setEng] = useState("");
    const [meanings, setMeanings] = useState<
        { type: TypeKey; value: string }[]
    >([]);

    const onChangeEng = (value: string) => setEng(value);

    const { mutate: loadMeaningsFromServer } = useMutation({
        mutationFn: async () => {
            const res = WordApi.WordExists({
                word: eng,
            });
            return getDataFromApiRes(res);
        },
        onSuccess: (data) => {
            setMeanings(data.meaning);
        },
    });

    const addCustomMeaning = () =>
        setMeanings((prev) => [...prev, { type: "noun", value: "" }]);

    return {
        eng,
        onChangeEng,
        meanings,
        addCustomMeaning,
        loadMeaningsFromServer,
    };
};

export default useNewWordState;
