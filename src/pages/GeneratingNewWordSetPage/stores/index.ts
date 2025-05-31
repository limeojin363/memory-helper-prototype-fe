// import {
//     atomWithMutation,
//     atomWithQuery,
//     queryClientAtom,
// } from "jotai-tanstack-query";
// import WordsetApi from "../../../apis/services/wordset";
// import { getDataFromApiRes } from "../../../apis/services";
// import { atom } from "jotai";

// export const wordsetDetailQueryAtom = atomWithQuery((get) => {
//     const wordsetId = get(wordsetIdAtom);

//     return {
//         queryKey: ["wordList", wordsetId],
//         queryFn: async () => {
//             if (!wordsetId) return null;

//             const res = WordsetApi.GetWordsetDetail({ id: wordsetId });
//             return getDataFromApiRes(res);
//         },
//         initialData: null,
//         enabled: !!wordsetId,
//     };
// });
// wordsetDetailQueryAtom.debugLabel = "wordsetDetailQueryAtom";

// export const wordsetIdAtom = atom((get) => {
//     const queryClient = get(queryClientAtom);
//     const mutationCache = queryClient.getMutationCache().getAll();

//     const wordsetCreateMutation = mutationCache.find(
//         (mutation) =>
//             mutation?.options?.mutationKey &&
//             mutation?.options?.mutationKey[0] === "createWordset",
//     );

//     // 이게 맞나..
//     return (wordsetCreateMutation?.state?.data as { setId: number })?.setId;
// });
// wordsetIdAtom.debugLabel = "wordsetIdAtom";

// export const wordsetInitializeAtom = atomWithMutation(() => ({
//     mutationFn: async (setName: string) => {
//         const res = WordsetApi.CreateWordset({ setName });
//         return getDataFromApiRes(res);
//     },
//     mutationKey: ["createWordset"],
// }));

// wordsetInitializeAtom.debugLabel = "wordsetInitializeAtom";
