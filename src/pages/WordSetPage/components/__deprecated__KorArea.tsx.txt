import { ClipLoader } from "react-spinners";
import Icon from "../../../components/icons/Icon";
import Text from "../../../components/texts/Text";
import { Colors } from "../../../designs/colors";
import useToggleKorOption from "../hooks/handlers/useToggleKorOption";
import S from "./styled";
import { KorStatus } from "../types";
import { useAtomValue } from "jotai";
import { getPairStatusAtom } from "../hooks/states/atoms";
import { useMemo } from "react";
import { useKorInput } from "../hooks/states/useKorInput";
import { usePair } from "../hooks/states/usePair";
import TypeSelector from "../../../components/type-selector/TypeSelector";

interface KorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    status: KorStatus;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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

const KorArea = ({ pairId }: { pairId: string }) => {
    const { pair, addNewKor } = usePair(pairId);
    const pairStatus = useAtomValue(
        useMemo(() => getPairStatusAtom(pairId), [pairId]),
    );

    if (pairStatus === "INITIAL") return null;

    if (pairStatus === "WAITING") return null;

    return (
        <S.KorAreaContainer>
            <S.KorTopWrapper>
                <Text fontStyle="heading-5" label="Kor" />
                <S.IcButtonWrapper size={16}>
                    <Icon
                        colorName="neutral-dark-darkest"
                        iconName="plus"
                        size={12}
                        onClick={addNewKor}
                    />
                </S.IcButtonWrapper>
            </S.KorTopWrapper>
            <S.KorItemsWrapper>
                {pair.korIds.map((korId) => (
                    <KorItem key={korId} korId={korId} pairId={pairId} />
                ))}
            </S.KorItemsWrapper>
        </S.KorAreaContainer>
    );
};

const KorItem = ({ korId, pairId }: { korId: string; pairId: string }) => {
    const { korInput, setKorInput } = useKorInput(korId);
    const { value, status, sourceType } = korInput;
    const { toggleKorOption } = useToggleKorOption(korId);
    const { setPair } = usePair(pairId);

    const onClickDelete = () => setPair((prev) => ({ ...prev }));

    const onClickKorItem = () => {
        if (
            status === "SELECTABLE-SELECTED" ||
            status === "SELECTABLE-UNSELECTED"
        )
            toggleKorOption();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setKorInput((prev) => ({ ...prev, value: e.target.value }));

    const showDeleteButton =
        sourceType === "CUSTOM" &&
        status !== "SELECTABLE-SELECTED" &&
        status !== "SELECTABLE-UNSELECTED";
    const showSubmitButton = value !== "" && status === "INITIAL";
    const showLoader = status === "WAITING";

    return (
        <S.KorItemWrapper>
            <TypeSelector id={korId} />
            <KorInput
                placeholder="영단어를 먼저 입력해주세요"
                onClick={onClickKorItem}
                value={value}
                onChange={onChange}
                status={status}
                key={korId}
            />
            {showSubmitButton && (
                <S.SideIconPositionor right={4}>
                    <S.IcButtonWrapper size={24}>
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="submit"
                            size={20}
                        />
                    </S.IcButtonWrapper>
                </S.SideIconPositionor>
            )}
            {showLoader && (
                <S.SideIconPositionor right={4}>
                    <ClipLoader
                        size={12}
                        color={Colors["neutral-dark-darkest"]}
                    />
                </S.SideIconPositionor>
            )}
            {showDeleteButton && (
                <S.SideIconPositionor
                    right={showSubmitButton || showLoader ? 32 : 4}
                >
                    <S.IcButtonWrapper size={24}>
                        <Icon
                            onClick={onClickDelete}
                            colorName="neutral-dark-darkest"
                            iconName="trash"
                            size={20}
                        />
                    </S.IcButtonWrapper>
                </S.SideIconPositionor>
            )}
        </S.KorItemWrapper>
    );
};

export default KorArea;
