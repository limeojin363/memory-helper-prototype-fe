import WordSetItem from "./WordSetItem";
import S from "./WordSetList.styled";
import { useState } from "react";
import _ from "lodash";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

const WordSetList = () => {
    const [wordSetsData, setWordSetsData] = useState([
        { name: "3", createdAt: new Date(), problemSetCount: 1, id: "1" },
        { name: "34", createdAt: new Date(), problemSetCount: 4, id: "2" },
        { name: "534", createdAt: new Date(), problemSetCount: 4, id: "3" },
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id && active.id !== over.id) {
            setWordSetsData((items) => {
                const oldIndex = items.findIndex(
                    (item) => item.id === active.id,
                );
                const newIndex = items.findIndex((item) => item.id === over.id);

                console.log(...arrayMove(items, oldIndex, newIndex));

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <SortableContext
                items={wordSetsData}
                strategy={verticalListSortingStrategy}
            >
                <S.Root>
                    {wordSetsData.map((wordSet) => (
                        <WordSetItem
                            id={wordSet.id}
                            key={wordSet.id}
                            name={wordSet.name}
                            createdAt={wordSet.createdAt}
                            problemSetCount={wordSet.problemSetCount}
                        />
                    ))}
                </S.Root>
            </SortableContext>
        </DndContext>
    );
};

export default WordSetList;
