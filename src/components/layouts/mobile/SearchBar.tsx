import Icon from "../../icons/Icon";
import S from "./SearchBar.styled";

type SearchBarProps = {
    horizontalPadding?: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({
    horizontalPadding = 16,
    value,
    onChange,
}: SearchBarProps) => {
    return (
        <S.Outer padding={horizontalPadding}>
            <S.Inner>
                <Icon
                    iconName="search"
                    colorName="neutral-dark-dark"
                    size={16}
                />
                <S.Input
                    placeholder="Search"
                    value={value}
                    onChange={onChange}
                />
            </S.Inner>
        </S.Outer>
    );
};

export default SearchBar;
