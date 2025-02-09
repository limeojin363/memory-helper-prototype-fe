import ProblemSetItem from "./ProblemSetItem";
import S from "./ProblemSetList.styled";
import { useState } from "react";
import _ from "lodash";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    TouchSensor,
    MouseSensor,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import uuid from "react-uuid";

const ProblemSetList = () => {
    const [problemSetsData, setProblemSetsData] = useState([
        {
            id: uuid(),
            name: "Set 1",
            generatedAt: new Date(),
            basedOn: "Word Set 1",
            howManyTimesStudied: 3,
            recentStudiedAt: new Date(),
            problemNumber: 10,
        },
        {
            id: uuid(),
            name: "Set 2",
            generatedAt: new Date(),
            basedOn: "Word Set 2",
            howManyTimesStudied: 5,
            recentStudiedAt: new Date(),
            problemNumber: 20,
        },
        {
            id: uuid(),
            name: "Set 3",
            generatedAt: new Date(),
            basedOn: "Word Set 3",
            howManyTimesStudied: 2,
            recentStudiedAt: new Date(),
            problemNumber: 30,
        },
    ]);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id && active.id !== over.id) {
            setProblemSetsData((items) => {
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
                items={problemSetsData}
                strategy={verticalListSortingStrategy}
            >
                <S.Root>
                    {problemSetsData.map((problemSet) => (
                        <ProblemSetItem
                            id={problemSet.id}
                            key={problemSet.id}
                            name={problemSet.name}
                            generatedAt={problemSet.generatedAt}
                            basedOn={problemSet.basedOn}
                            howManyTimesStudied={problemSet.howManyTimesStudied}
                            recentStudiedAt={problemSet.recentStudiedAt}
                            problemNumber={problemSet.problemNumber}
                        />
                    ))}
                </S.Root>
            </SortableContext>
        </DndContext>
    );
};

export default ProblemSetList;
