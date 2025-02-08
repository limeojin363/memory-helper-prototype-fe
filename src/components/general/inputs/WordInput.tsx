import { ChangeEvent } from "react";
import S from "./WordInput.styled";

export type WordInputStatus =
    | "INITIAL"
    | "NEEDS-CORRECTION"
    | "OK-FIXED"
    | "LOADING"
    | "DISABLED";

type WordInputProps = {
    status: WordInputStatus;
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const WordInput = (props: WordInputProps) => {
    return <S.Input {...props} disabled={props.status === "DISABLED"} />;
};

export default WordInput;
