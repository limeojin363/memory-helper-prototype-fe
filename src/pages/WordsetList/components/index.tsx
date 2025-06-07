import styled from "@emotion/styled";
import { Colors } from "../../../designs/colors";
import SearchBar from "../../../components/layouts/mobile/SearchBar";
import List from "./List";
import useInput from "../../../hooks/useInput";
import Icon from "../../../components/icons/Icon";
import useWordsetListData from "../hooks/useWordsetListData";
import useCreateAndNavigate from "../hooks/useCreateAndNavigate";

const WordsetListPage = () => {
    const [value, onChange] = useInput();
    const listData = useWordsetListData();
    const createAndNavigate = useCreateAndNavigate();

    return (
        <>
            <S.MainArea>
                <SearchBar value={value} onChange={onChange} />
                <List data={listData} />
            </S.MainArea>
            <S.AddButton onClick={createAndNavigate}>
                <Icon
                    iconName="plus"
                    size={28}
                    colorName="highlight-lightest"
                />
            </S.AddButton>
        </>
    );
};

export default WordsetListPage;

const S = {
    MainArea: styled.div`
        display: flex;
        flex-direction: column;
        gap: 16px;

        width: calc(100% - 32px);
        margin: 20px 16px 0;
        /* BottomNavigation 높이만큼 보정 */
        padding-bottom: 100px;
    `,
    AddButton: styled.div`
        all: unset;

        cursor: pointer;

        width: 60px;
        height: 60px;
        background-color: ${Colors["highlight-darkest"]};
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;
        bottom: 128px;
        right: 10%;

        z-index: 100;
    `,
};
