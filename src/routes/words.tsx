import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/layouts/mobile/Header";
import SearchBar from "../components/layouts/mobile/SearchBar";
import useInput from "../hooks/useInput";
import WordSetList from "../components/word-sets/WordSetList";
import styled from "@emotion/styled";
import { Colors } from "../designs/colors";
import Icon from "../components/icons/Icon";

const RouteComponent = () => {
    const [value, onChange] = useInput();

    return (
        <>
            <Header title="words" goBack={() => {}} />
            <S.MiddleArea>
                <SearchBar value={value} onChange={onChange} />
                <WordSetList />
            </S.MiddleArea>
            <S.AddButton>
                <Icon iconName="plus" size={28} colorName="highlight-lightest" />
            </S.AddButton>
        </>
    );
};

export const Route = createFileRoute("/words")({
    component: RouteComponent,
});

const S = {
    MiddleArea: styled.div`
        display: flex;
        flex-direction: column;
        gap: 16px;

        width: calc(100% - 32px);
        margin: 0 16px;
    `,
    AddButton: styled.button`
        all: unset;

        width: 60px;
        height: 60px;
        background-color: ${Colors["highlight-darkest"]};
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;
        bottom: 128px;
        right: 48px;

        z-index: 100;
    `,
};
