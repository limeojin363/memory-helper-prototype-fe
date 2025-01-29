import { ChangeEvent } from "react";
import S from "./WordInput.styled";

export type WordInputStatus = "INITIAL" | "PRIMARY" | "OK" | "WARNING";

type WordInputProps = {
    status: WordInputStatus;
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent) => void;
};

const WordInput = (props: WordInputProps) => {
    return <S.Input {...props} />;
};

export default WordInput;
