import { useAtomValue } from "jotai";
import { usePair } from "./usePair";
import { getPairDataForServerAtom } from "./atoms";

const usePairData = (pairId: string) => {
    const pairDataForServer = useAtomValue(getPairDataForServerAtom)
    
};

export default usePairData;
