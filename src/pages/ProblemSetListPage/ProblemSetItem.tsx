import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import S from "./ProblemSetItem.styled";
import Icon from "../../components/icons/Icon";
import Text from "../../components/texts/Text";

type ProblemSetItemProps = {
    id: string;
    name: string;
    generatedAt: Date;
    basedOn: string;
    howManyTimesStudied: number;
    recentStudiedAt: Date;
    problemNumber: number;
};

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const ProblemSetItem = ({
    id,
    name,
    generatedAt,
    basedOn,
    howManyTimesStudied,
    recentStudiedAt,
    problemNumber,
}: ProblemSetItemProps) => {
        const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef,
    } = useSortable({
        id,
        transition: {
            duration: 150,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <S.Root id={id} ref={setNodeRef} style={style}>
            <div ref={setActivatorNodeRef} {...attributes} {...listeners}>
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
                        label={formatDate(generatedAt)}
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
                        label={basedOn}
                        fontStyle="heading-5"
                        colorName="neutral-dark-light"
                    />
                    <Text
                        label="Based"
                        fontStyle="body-sm"
                        colorName="neutral-dark-light"
                    />
                </S.TextRow>
                <S.TextRow>
                    <Text
                        label={`${howManyTimesStudied}`}
                        fontStyle="heading-5"
                        colorName="neutral-dark-light"
                    />
                    <Text
                        label="Times Studied"
                        fontStyle="body-sm"
                        colorName="neutral-dark-light"
                    />
                </S.TextRow>
                <S.TextRow>
                    <Text
                        label={formatDate(recentStudiedAt)}
                        fontStyle="heading-5"
                        colorName="neutral-dark-light"
                    />
                    <Text
                        label="Recent Studied at"
                        fontStyle="body-sm"
                        colorName="neutral-dark-light"
                    />
                </S.TextRow>
                <S.TextRow>
                    <Text
                        label={`${problemNumber}`}
                        fontStyle="heading-5"
                        colorName="neutral-dark-light"
                    />
                    <Text
                        label="Problems"
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

export default ProblemSetItem;
