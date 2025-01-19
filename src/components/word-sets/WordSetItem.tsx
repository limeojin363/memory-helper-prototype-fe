import Icon from "../icons/Icon";
import Text from "../texts/Text";
import S from "./WordSetItem.styled";

type WordSetItemProps = {};

const WordSetItem = () => {
    const name = "어떻게 사람 전역이 ㅋㅋ";
    const createdAt = new Date("2026-02-26");
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const formattedDate = formatDate(createdAt);
    const problemSetCount = 3;

    return (
        <S.Root>
            <Icon
                size={16}
                iconName="drag-handle"
                colorName="neutral-dark-lightest"
            />
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

export default WordSetItem;
