import { TypeOfPartOfSpeech } from "../../../components/type-selector/types";

export type InputPair = {
    id: string;
    engValue: string;
    engStatus: EngStatus;
    korIds: string[];
};

export type EngStatus = "INITIAL" | "WAITING" | "OK" | "NEEDS-CORRECTION";

export type PairStatus =
    | "INITIAL"
    | "WAITING"
    | "ENG-ERROR"
    | "SELECTING-KOR"
    | "USABLE";

export type KorSourceType = "CUSTOM" | "OFFERED";

export type KorStatus =
    | "INITIAL"
    | "NEEDS-CORRECTION"
    | "WAITING"
    | "SELECTABLE-UNSELECTED"
    | "SELECTABLE-SELECTED";

export type KorItem = {
    sourceType: KorSourceType;
    status: KorStatus;
    id: string;
    value: string;
    type: null | {
        value: "noun" | "verb" | "adjective" | "adverb";
        isFixed: boolean;
    };
};
