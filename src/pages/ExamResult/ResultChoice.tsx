import styled from "@emotion/styled";
import { Colors } from "../../designs/colors";
import Text from "../../components/texts/Text";
import Icon from "../../components/icons/Icon";

type ChoiceProps = {
  num: number;
  value: string;
  checked?: boolean; // by user
  focused?: boolean; // right answer - only in result page
};

const ResultChoice = ({ num, value, focused, checked }: ChoiceProps) => {
  return (
    <S.Root>
      <S.NumArea>
        <S.NumTextWrapper>
          <Text label={`${num}`} />
        </S.NumTextWrapper>
        {checked && (
          <S.CheckWrapper>
            <Icon
              colorName="support-red-medium"
              iconName="choice-check"
              size={28}
            />
          </S.CheckWrapper>
        )}
        {focused && <S.FocusedBox />}
      </S.NumArea>
      <Text label={value} fontStyle="body-lg" />
    </S.Root>
  );
};

export default ResultChoice;

const S = {
  Root: styled.div`
    height: 28px;
    display: flex;
    gap: 6px;
    align-items: center;
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
  FocusedBox: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px ${Colors["highlight-dark"]} inset;
    border-radius: 4px;
  `,
};
