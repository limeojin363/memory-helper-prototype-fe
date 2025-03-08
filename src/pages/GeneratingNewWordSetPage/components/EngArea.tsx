import S from "./styled";
import Text from "../../../components/texts/Text";
import useSubmitEngInput from "../hooks/handlers/useSubmitEngInput";
import Icon from "../../../components/icons/Icon";
import { ClipLoader } from "react-spinners";
import { Colors } from "../../../designs/colors";
import { usePair } from "../hooks/states/usePair";

const EngArea = ({ pairId }: { pairId: string }) => {
    const { pair, setPair } = usePair(pairId);


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPair((prev) => ({ ...prev, engValue: e.target.value }));

    const submitEngInput = useSubmitEngInput(pairId);

    const editable =
        pair.engStatus === "INITIAL" || pair.engStatus === "NEEDS-CORRECTION";

    const showSubmitButton =
        pair.engValue !== "" && pair.engStatus === "INITIAL";

    const isDetermining = pair.engStatus === "WAITING";

    return (
        <S.EngAreaContainer>
            <Text fontStyle="heading-5" label="Eng" />
            <S.EngInputWrapper>
                <S.EngInput
                    value={pair.engValue}
                    status={pair.engStatus}
                    onChange={onChange}
                    disabled={!editable}
                />
                {showSubmitButton && (
                    <S.SideIconPositionor right={4}>
                        <S.IcButtonWrapper size={24}>
                            <Icon
                                colorName="neutral-dark-darkest"
                                iconName="submit"
                                size={12}
                                onClick={submitEngInput}
                            />
                        </S.IcButtonWrapper>
                    </S.SideIconPositionor>
                )}
                {isDetermining && (
                    <S.SideIconPositionor right={4}>
                        <ClipLoader
                            size={12}
                            color={Colors["neutral-dark-darkest"]}
                        />
                    </S.SideIconPositionor>
                )}
            </S.EngInputWrapper>
        </S.EngAreaContainer>
    );
};

export default EngArea;
