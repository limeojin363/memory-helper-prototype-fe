import { BarLoader } from "react-spinners";
import useWordSetDetailData from "../hooks/useWordSetDetailData";
import S from "./styled";
import Header from "../../../components/layouts/mobile/Header";
import WordList, { ComponentViewDataItem } from "./WordSetList";
import Text from "../../../components/texts/Text";
import { useNavigate } from "@tanstack/react-router";
import useDeleteWordSet from "../hooks/useDeleteWordSet";

export type Data = {
    createdAt: Date;
    list: ComponentViewDataItem[];
};

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const WordSetDetail = ({ wordsetId }: { wordsetId: number }) => {
    const { data, isPending, isError } = useWordSetDetailData(wordsetId);

    const navigate = useNavigate();

    const goBack = () => navigate({ to: "/words" });

    const deleteHadler = useDeleteWordSet(wordsetId);

    if (isError) {
        return (
            <S.PageWrapper>
                <div>Error</div>
            </S.PageWrapper>
        );
    }

    if (isPending || !data) {
        // 나중에 Skeleton UI로 대체
        return (
            <S.PageWrapper>
                <BarLoader />
            </S.PageWrapper>
        );
    }

    const createdAt = data.list.reduce(
        (acc, curr) =>
            acc > new Date(curr.createdAt) ? acc : new Date(curr.createdAt),
        new Date("2025-01-01"),
    );

    const processedList: ComponentViewDataItem[] = data.list.map((item) => ({
        engWord: item.word,
        korWords: item.meaning,
    }));

    return (
        <S.PageWrapper>
            <Header title="단어 세트 보기" goBack={goBack} />
            <S.DateWrapper>
                <Text label={formatDate(createdAt)} fontStyle="caption-md" />
            </S.DateWrapper>
            <button onClick={deleteHadler}>삭제</button>
            <WordList list={processedList} />
        </S.PageWrapper>
    );
};

export default WordSetDetail;
