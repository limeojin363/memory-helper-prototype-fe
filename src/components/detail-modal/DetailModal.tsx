import styled from "@emotion/styled";
import Text from "../texts/Text";
import { Colors } from "../../designs/colors";

export type NavigationInfo = {
  navigate: () => void;
  content: React.ReactNode;
  active: boolean;
};

// 상단의 X버튼, 하단의 좌우이동버튼, Body를 가진 DetailModal
const DetailModal = ({
  children,
  close,
  next,
  prev,
}: {
  children: React.ReactNode;
  close: () => void;
  next?: NavigationInfo;
  prev?: NavigationInfo;
}) => {
  return (
    <S.BlackBg>
      <S.Wrapper>
        <S.CloseButtonWrapper>
          <S.CloseButton onClick={close}>
            <Text
              label="X"
              fontStyle="heading-2"
              colorName="neutral-dark-darkest"
            />
          </S.CloseButton>
        </S.CloseButtonWrapper>
        <S.ModalBody>{children}</S.ModalBody>
        <S.BottomButtonsArea>
          {prev && (
            <S.BottomButton disabled={!prev.active} onClick={prev.navigate}>
              {prev.content}
            </S.BottomButton>
          )}
          {next && (
            <S.BottomButton disabled={!next.active} onClick={next.navigate}>
              {next.content}
            </S.BottomButton>
          )}
        </S.BottomButtonsArea>
      </S.Wrapper>
    </S.BlackBg>
  );
};

export default DetailModal;

const S = {
  BlackBg: styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.7);
  `,
  Wrapper: styled.div`
    position: relative;

    padding: 10px;
    height: calc(100% - 20px);

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  `,
  CloseButton: styled.button`
    height: 40px;
    width: 40px;
    background-color: ${Colors["neutral-light-medium"]};

    font-size: 16px;

    cursor: pointer;

    border: none;
    box-shadow: 0 0 0 2px ${Colors["neutral-dark-darkest"]} inset;
    border-radius: 20%;

    display: flex;
    justify-content: center;
    align-items: center;

    :active {
      transform: scale(0.97);
    }
  `,
  ModalBody: styled.div`
    flex: 1;
    padding: 10px;

    background-color: ${Colors["neutral-light-medium"]};
    box-shadow: 0 0 0 2px ${Colors["neutral-dark-dark"]} inset;
    border-radius: 12px;

    display: flex;
    flex-direction: column;
  `,
  BottomButtonsArea: styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    gap: 8px;
  `,
  CloseButtonWrapper: styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
  `,
  BottomButton: styled.button`
    flex: 1;

    cursor: pointer;
    background-color: ${Colors["neutral-light-medium"]};
    border: none;
    box-shadow: 0 0 0 5px ${Colors["neutral-dark-dark"]} inset;

    border-radius: 12px;

    :active {
      transform: scale(0.99);
    }

    :disabled {
      background-color: ${Colors["neutral-light-darkest"]};
      cursor: not-allowed;
      transform: scale(1);
    }
  `,
};
