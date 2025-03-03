import { BarLoader } from "react-spinners";
import useWordSetDetailData from "../hooks/useWordSetDetailData";
import S from "./styled";
import Header from "../../../components/layouts/mobile/Header";
import WordSetList, { ComponentViewDataItem } from "./WordSetList";
import Text from "../../../components/texts/Text";

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

const mockecData: Data = {
    createdAt: new Date(),
    list: [
        {
            engWord: "string",
            korWords: [
                {
                    word: "string",
                    type: "noun",
                },
                {
                    word: "string",
                    type: "verb",
                },
                {
                    word: "string",
                    type: "adjective",
                },
                {
                    word: "string",
                    type: "adverb",
                }
            ],
        },
        {
            engWord: "string",
            korWords: [
                {
                    word: "string",
                    type: "noun",
                },
            ],
        },
    ],
};

const WordSetDetail = ({ wordsetId }: { wordsetId: string }) => {
    const { data, isPending, isError } = useWordSetDetailData(wordsetId);

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

    return (
        <S.PageWrapper>
            <Header title="단어 세트 보기" />
            <S.DateWrapper>
                <Text
                    label={formatDate(mockecData.createdAt)}
                    fontStyle="caption-md"
                />
            </S.DateWrapper>
            <WordSetList list={mockecData.list} />
        </S.PageWrapper>
    );
};

export default WordSetDetail;
