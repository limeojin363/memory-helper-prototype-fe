import { ClipLoader } from "react-spinners";
import Icon from "../../../components/icons/Icon";
import Text from "../../../components/texts/Text";
import { Colors } from "../../../designs/colors";
import {
    makeNewCustomKorItem,
    useKorInput,
    usePair,
} from "../hooks/useGeneratingNewWordSetPageData";
import useSubmitCustomKorInput from "../hooks/useSubmitKorInput";
import useToggleKorOption from "../hooks/useToggleKorOption";
import S from "./styled";
import { KorInputStatus } from "../types";

interface KorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    status: KorInputStatus;
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    const [pair, setPair] = usePair(pairId);

    if (!pair) return null;

    if (pair.status === "INITIAL") return null;

    if (pair.status === "REQUESTED-OPTIONS") return null;

    const addCustomKorInput = () =>
        setPair((draft) => {
            draft!.korInputs!.push(makeNewCustomKorItem());
        });

    return (
        <S.KorAreaContainer>
            <S.KorTopWrapper>
                <Text fontStyle="heading-5" label="Kor" />
                <S.IcButtonWrapper size={16}>
                    <Icon
                        colorName="neutral-dark-darkest"
                        iconName="plus"
                        size={12}
                        onClick={addCustomKorInput}
                    />
                </S.IcButtonWrapper>
            </S.KorTopWrapper>
            <S.KorItemsWrapper>
                {pair.korInputs!.map((korItem) => (
                    <KorItem
                        key={korItem.id}
                        pairId={pairId}
                        korItemId={korItem.id}
                    />
                ))}
            </S.KorItemsWrapper>
        </S.KorAreaContainer>
    );
};

const KorItem = ({
    korItemId,
    pairId,
}: {
    korItemId: string;
    pairId: string;
}) => {
    const [korInput, setKorInput] = useKorInput(pairId, korItemId);

    const { value, status, sourceType } = korInput!;

    const [, setPair] = usePair(pairId);

    const onClickDelete = () =>
        setPair((draft) => {
            draft!.korInputs = draft!.korInputs!.filter(
                (item) => item.id !== korItemId,
            );
        });

    const { toggleKorOption } = useToggleKorOption(pairId, korItemId);

    const onClickKorItem = () => {
        if (
            status === "SELECTABLE-SELECTED" ||
            status === "SELECTABLE-UNSELECTED"
        ) {
            toggleKorOption();
        }
    };

    const onClickCustomItemSubmit = useSubmitCustomKorInput(pairId, korItemId);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setKorInput((draft) => {
            draft!.value = e.target.value;
        });

    const showDeleteButton =
        sourceType === "CUSTOM" &&
        status !== "SELECTABLE-SELECTED" &&
        status !== "SELECTABLE-UNSELECTED";
    const showSubmitButton = value !== "" && status === "INITIAL";
    const showLoader = status === "DETERMINING";

    return (
        <S.KorItemWrapper>
            <KorInput
                placeholder="영단어를 먼저 입력해주세요"
                onClick={onClickKorItem}
                value={value}
                onChange={onChange}
                status={status}
                key={korItemId}
            />
            {showSubmitButton && (
                <S.SideIconPositionor right={4}>
                    <S.IcButtonWrapper size={24}>
                        <Icon
                            onClick={onClickCustomItemSubmit}
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
