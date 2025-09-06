import styled from "@emotion/styled";
import { Colors } from "@/designs/colors";
import WordsetsPageItem from "./Item";
import useInfiniteWordsetList from "../hooks/useWordsetListData";
import useCreateAndNavigate from "../hooks/useCreateAndNavigate";
import Icon from "@/components/icons/Icon";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const WordsetListPage = () => {
    const { data, fetchNextPage, isFetchingNextPage } =
        useInfiniteWordsetList();
    const createAndNavigate = useCreateAndNavigate();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && !isFetchingNextPage) fetchNextPage();
    }, [fetchNextPage, inView, isFetchingNextPage]);

    return (
        <>
            <S.MainArea>
                <S.ListContainer>
                    {data && (
                        <>
                            {data.map(
                                ({
                                    createdAt,
                                    setId,
                                    setName,
                                    testSetsCount,
                                }) => (
                                    <WordsetsPageItem
                                        id={String(setId)}
                                        key={setId}
                                        name={setName}
                                        createdAt={new Date(createdAt)}
                                        problemSetCount={testSetsCount}
                                    />
                                ),
                            )}
                        </>
                    )}
                    {isFetchingNextPage ? (
                        <>불러오는 중... </>
                    ) : (
                        <div ref={ref}></div>
                    )}
                </S.ListContainer>
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
    ListContainer: styled.div`
        position: relative;

        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
};
