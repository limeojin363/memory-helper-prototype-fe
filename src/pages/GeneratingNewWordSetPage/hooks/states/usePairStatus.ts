import { useAtomValue } from "jotai";
import { getPairStatusAtom } from "./atoms";
import { useMemo } from "react";

const usePairStatus = (id: string) =>
    useAtomValue(useMemo(() => getPairStatusAtom(id), [id]));

export default usePairStatus;
