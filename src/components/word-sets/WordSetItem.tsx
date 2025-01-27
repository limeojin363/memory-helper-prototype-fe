import Icon from "../icons/Icon";
import Text from "../texts/Text";
import S from "./WordSetItem.styled";

type WordSetItemProps = {
    id: string;
    name: string;
    createdAt: Date;
    problemSetCount: number;
};

const WordSetItem = ({
    id,
    createdAt,
    name,
    problemSetCount,
}: WordSetItemProps) => {
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    const formattedDate = formatDate(createdAt);

    return (
        <S.Root id={id}>
            <div className="drag-handle">
                <Icon
                    size={16}
                    iconName="drag-handle"
                    colorName="neutral-dark-lightest"
                />
            </div>
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
