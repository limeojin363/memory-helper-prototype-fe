import Icon from "../../icons/Icon";
import S from "./SearchBar.styled";

type SearchBarProps = {
    horizontalPadding?: number;
};

const SearchBar = ({ horizontalPadding = 16 }: SearchBarProps) => {
    return (
        <S.Outer padding={horizontalPadding}>
            <S.Inner>
                <Icon
                    iconName="search"
                    colorName="neutral-dark-dark"
                    size={16}
                />
                <S.Input placeholder="Search" />
            </S.Inner>
        </S.Outer>
    );
};

export default SearchBar;
