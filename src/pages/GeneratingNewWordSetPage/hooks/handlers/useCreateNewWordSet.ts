import { useMutation } from "@tanstack/react-query";
import CreateNewWordSet from "../../../../apis/services/word-set/createNew";
import uuid from "react-uuid";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { newWordSetIdAtom } from "../states/atoms";

const useCreateNewWordSet = () => {
    const { data, mutate } = useMutation({
        mutationFn: async () => {
            const { data } = await (
                await CreateNewWordSet({
                    setName: uuid(),
                })
            ).json();

            return data;
        },
    });

    const setId = useSetAtom(newWordSetIdAtom);

    useEffect(() => {
        mutate();
    }, [mutate]);

    useEffect(() => {
        if (data) setId(String(data.setId));
    }, [data, setId]);

    return { data };
};

export default useCreateNewWordSet;
