import { ChangeEvent, FocusEvent } from "react";
import S from "./styled";
import { EngInputStatus } from "../types";

interface EngInputProps {
    status: EngInputStatus;
    value?: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

// 영어 단어
const EngInput = ({
    status,
    value,
    placeholder,
    onChange,
    onBlur,
}: EngInputProps) => {
    // 초기 or 정정 필요한 경우에만 편집 가능
    const editable = status === "INITIAL" || status === "NEEDS-CORRECTION";

    return (
        <S.EngInputContainer
            {...{
                status,
                value,
                placeholder,
                onChange,
                onBlur,
            }}
            disabled={!editable}
        />
    );
};

export default EngInput;
