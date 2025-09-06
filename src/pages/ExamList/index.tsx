import { useEffect } from "react";
import ExamListComponent from "./ExamListComponent";
import useExamList from "./useExamList";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";

const ExamListPage = () => {
    const { data, fetchNextPage, isFetchingNextPage } = useExamList();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView, isFetchingNextPage]);

    return (
        <S.MiddleArea>
            <ExamListComponent
                ref={ref}
                data={data}
                isFetchingNextPage={isFetchingNextPage}
            />
        </S.MiddleArea>
    );
};

export default ExamListPage;

const S = {
    MiddleArea: styled.div`
        display: flex;
        flex-direction: column;
        gap: 16px;

        width: calc(100% - 32px);
        margin: 20px 16px 0;
    `,
};
