import styled from "@emotion/styled";

const S = {
    PageWrapper: styled.div`
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 20px;
    `,

    ListContainer: styled.div`
        width: calc(100% - 40px);
        margin: 0 20px;

        display: flex;
        flex-direction: column;
        gap: 16px;
    `,
    ItemContainer: styled.div`
        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
    KorAreaContainer: styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
    `,
    KorItemList: styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
    `,
    EngAreaContainer: styled.div``,
    DateWrapper: styled.div`
        width: calc(100% - 20px);
        margin-right: 20px;

        display: flex;
        justify-content: flex-end;
    `,
};

export default S;
