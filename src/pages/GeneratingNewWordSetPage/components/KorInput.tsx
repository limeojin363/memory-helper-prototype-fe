import { ChangeEvent } from "react";
import S from "./styled";
import { KorInputStatus } from "../types";

interface KorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    status: KorInputStatus;
    value?: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// 한국어 뜻 입력
const KorInput = ({
    status,
    onChange,
    placeholder,
    value,
    ...props
}: KorInputProps) => {
    // 초기 or 정정 필요한 경우에만 편집 가능
    const editable = status === "INITIAL" || status === "NEEDS-CORRECTION";

    return (
        <S.KorInputContainer
            {...{
                status,
                value,
                placeholder,
                onChange,
            }}
            {...props}
            readOnly={!editable}
        />
    );
};

export default KorInput;
