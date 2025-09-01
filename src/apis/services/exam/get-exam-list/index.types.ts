import { ApiFunc } from "../../types";

export type GetExamsFunc = ApiFunc<
    {
        page?: number;
        size?: number;
        name?: string;
        setId?: number;
    },
    GetExamsResData
>;

export type GetExamsResData = {
    content: Array<{
        examId: number;
        examName: string;
        problemCount: number;
        timesStudied: number;
        generatedAt: string;
        recentStudiedAt: null | string;
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
