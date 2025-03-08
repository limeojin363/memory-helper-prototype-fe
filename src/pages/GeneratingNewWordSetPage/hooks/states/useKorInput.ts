import { useAtom } from "jotai";
import { korInputAtomFamily } from "./atoms";

export const useKorInput = (korId: string) => {
    const [korInput, setKorInput] = useAtom(korInputAtomFamily(korId));

    return { korInput, setKorInput };
};
