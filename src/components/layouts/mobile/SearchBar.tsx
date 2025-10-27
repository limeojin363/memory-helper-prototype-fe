import Icon from "../../icons/Icon";
import S from "./SearchBar.styled";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <S.Outer>
      <S.Inner>
        <Icon iconName="search" colorName="neutral-dark-dark" size={16} />
        <S.Input placeholder="Search" value={value} onChange={onChange} />
      </S.Inner>
    </S.Outer>
  );
};

export default SearchBar;
