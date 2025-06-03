import styled from "@emotion/styled";
import Icon from "../../icons/Icon";

type HeaderProps = {
    children?: React.ReactNode;
    goBack?: () => void;
};

const Header = ({ goBack, children }: HeaderProps) => {
    return (
        <S.Outer>
            <S.Inner>
                {goBack && (
                    <S.ArrowButton onClick={goBack}>
                        <Icon
                            colorName="highlight-darkest"
                            iconName="arrow-left"
                            size={20}
                        />
                    </S.ArrowButton>
                )}
                {children}
            </S.Inner>
        </S.Outer>
    );
};

export default Header;

const S = {
    Outer: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 70px;
        gap: 2px;

        margin-bottom: 8px;
    `,
    Inner: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% - 16px);

        height: 60px;

        border-bottom: 1px solid black;
    `,
    ArrowButton: styled.button`
        position: absolute;
        left: 12px;
        :active {
            transform: scale(0.9);
        }
        background: none;
        border: none;
        cursor: pointer;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `,
};
