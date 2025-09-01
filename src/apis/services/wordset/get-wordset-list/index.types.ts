import { ApiFunc } from "../../types";

export type GetWordsetListResFunc = ApiFunc<
    {
        page?: number;
        size?: number;
        name?: string;
    },
    GetWordsetListResData
>;

export type GetWordsetListResData = {
    content: Array<{
        setId: number;
        setName: string;
        wordCount: number; // 단어 개수
        testSetsCount: number; // 테스트 세트 개수
        createdAt: string; // 생성 날짜
    }>;

    empty: boolean;
    first: boolean;
    last: boolean;

    number: number; // 현재 페이지 번호
    numberOfElements: number; // 현재 페이지의 요소 개수

    pageable: {
        offset: number; // 전체 요소 중 현재 페이지의 시작 위치
        pageNumber: number;
        pageSize: number;
        paged: boolean;
    };

    size: number; // 페이지 크기
    totalElements: number; // 전체 요소 개수
    totalPages: number; // 전체 페이지 개수
};
