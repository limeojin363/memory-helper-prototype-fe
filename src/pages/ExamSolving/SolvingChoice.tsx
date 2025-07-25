import styled from "@emotion/styled";
import useChoices from "./useChoice";
import Text from "../../components/texts/Text";
import { Colors } from "../../designs/colors";
import Icon from "../../components/icons/Icon";

const SolvingChoice = ({ id, value }: { id: string; value: string }) => {
    const { isSelected, toggleChoice } = useChoices();

    return (
        <S.ChoiceRoot onClick={() => toggleChoice(id)}>
            <S.NumArea>
                <S.NumTextWrapper>
                    <Text label={`${id}`} />
                    {isSelected(id) && (
                        <S.CheckWrapper>
                            <Icon
                                colorName="support-red-medium"
                                iconName="choice-check"
                                size={28}
                            />
                        </S.CheckWrapper>
                    )}
                </S.NumTextWrapper>
            </S.NumArea>
            <Text label={value} fontStyle="body-lg"/>
        </S.ChoiceRoot>
    );
};

const S = {
    ChoiceRoot: styled.div`
        height: 28px;
        display: flex;
        align-items: center;
        gap: 6px;
    `,
    NumArea: styled.div`
        position: relative;
    `,
    NumTextWrapper: styled.div`
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;

        box-shadow: 0 0 0 1px ${Colors["neutral-dark-darkest"]} inset;
        border-radius: 50%;
    `,
    CheckWrapper: styled.div`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-40%, -55%);
    `,
};

export default SolvingChoice;
