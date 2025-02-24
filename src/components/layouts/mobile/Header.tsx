import Icon from "../../icons/Icon";
import Text from "../../texts/Text";
import S from "./Header.styled";

type HeaderProps = {
    title: string;
    goBack?: () => void;
};

const Header = ({ title, goBack }: HeaderProps) => {
    return (
        <S.Root>
            {goBack && (
                <S.ArrowWrapper onClick={goBack}>
                    <Icon
                        colorName="highlight-darkest"
                        iconName="arrow-left"
                        size={20}
                    />
                </S.ArrowWrapper>
            )}
            <Text fontStyle="heading-4" label={title} />
        </S.Root>
    );
};

export default Header;
