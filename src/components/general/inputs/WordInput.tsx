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
    value?: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const WordInput = (props: WordInputProps) => {
    const editable =
        props.status === "INITIAL" || props.status === "NEEDS-CORRECTION";

    return <S.Input {...props} disabled={!editable} />;
};

export default WordInput;
