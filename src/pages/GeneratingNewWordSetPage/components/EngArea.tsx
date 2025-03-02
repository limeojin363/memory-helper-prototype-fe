import S from "./styled";
import Text from "../../../components/texts/Text";
import { usePair } from "../hooks/useGeneratingNewWordSetPageData";
import useSubmitEngInput from "../hooks/useSubmitEngInput";
import Icon from "../../../components/icons/Icon";
import { ClipLoader, MoonLoader, SyncLoader } from "react-spinners";
import { Colors } from "../../../designs/colors";

const EngArea = ({ pairId }: { pairId: string }) => {
    const [pair, setPair] = usePair(pairId);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPair((draft) => {
            draft!.engInput.value = e.target.value;
        });

    const submitEngInput = useSubmitEngInput(pairId);

    const value = pair!.engInput.value;
    const status = pair!.engInput.status;

    const editable = status === "INITIAL" || status === "NEEDS-CORRECTION";

    const showSubmitButton = value !== "" && status === "INITIAL";

    const isDetermining = status === "DETERMINING";

    return (
        <S.EngAreaContainer>
            <Text fontStyle="heading-5" label="Eng" />
            <S.EngInputWrapper>
                <S.EngInput
                    value={value}
                    status={status}
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
