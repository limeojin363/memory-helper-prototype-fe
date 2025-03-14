import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Icon from "../../../components/icons/Icon";
import Text from "../../../components/texts/Text";
import S from "./WordSetItem.styled";
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

const WordSetItem = ({
    id,
    createdAt,
    name,
    problemSetCount,
}: WordSetItemProps) => {
    const formattedDate = formatDate(createdAt);
    const navigate = useNavigate();

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

    const onClick = () => {
        navigate({
            to: "/words/$wordSetId",
            params: {
                wordSetId: id,
            },
        });
    };

    return (
        <S.Root id={id} ref={setNodeRef} onClick={onClick} style={style}>
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
