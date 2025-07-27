import styled from "@emotion/styled";
import { Colors } from "../../../designs/colors";
import Icon from "../../../components/icons/Icon";
import Text from "../../../components/texts/Text";
import { useNavigate } from "@tanstack/react-router";

type WordSetItemProps = {
    id: string;
    name: string;
    createdAt: Date;
    problemSetCount: number;
};

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const WordsetsPageList = ({
    id,
    createdAt,
    name,
    problemSetCount,
}: WordSetItemProps) => {
    const formattedDate = formatDate(createdAt);
    const navigate = useNavigate();

    const onClick = () =>
        navigate({
            to: "/wordset/$wordsetId",
            params: { wordsetId: id },
        });

    return (
        <S.Root id={id} onClick={onClick}>
            <S.Body>
                <S.TextRow>
                    <Text
                        label={name}
                        fontStyle="heading-4"
                        colorName="neutral-dark-darkest"
                    />
                </S.TextRow>
                <S.TextRow>
                    <Text
                        label={formattedDate}
                        fontStyle="heading-5"
                        colorName="neutral-dark-light"
                    />
                    <Text
                        label="Generated"
                        fontStyle="body-sm"
                        colorName="neutral-dark-light"
                    />
                </S.TextRow>
                <S.TextRow>
                    <Text
                        label={`${problemSetCount} Problem Sets`}
                        fontStyle="body-sm"
                        colorName="neutral-dark-light"
                    />
                </S.TextRow>
            </S.Body>
            <Icon
                size={16}
                iconName="enter"
                colorName="neutral-dark-lightest"
            />
        </S.Root>
    );
};

export default WordsetsPageList;

const S = {
    Root: styled.div`
        display: flex;
        gap: 16px;
        align-items: center;

        user-select: none;

        background-color: ${Colors["neutral-light-light"]};

        padding: 16px;
        border-radius: 16px;

        :active {
            transform: scale(0.99);
        }
    `,
    Body: styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
    `,
    TextRow: styled.div`
        display: flex;
        gap: 4px;
    `,
};
