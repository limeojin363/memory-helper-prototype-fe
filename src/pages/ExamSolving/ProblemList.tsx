import styled from "@emotion/styled";
import { ProblemType } from "../ExamDetail/hooks/useExamDetail";
import Text from "../../components/texts/Text";
import { createContext, useContext } from "react";
import SolvingChoice from "./SolvingChoice";
import ExamSolvingPage from ".";

const ProblemItemContext = createContext<{
  problemId: number;
  problemIndex: number;
}>({
  problemId: 0,
  problemIndex: 0,
});

const useData = () => {
  const { problemId, problemIndex } = useContext(ProblemItemContext);

  return { problemId, problemIndex };
};

export const ProblemItem = ({
  itemData,
  problemIndex,
}: {
  itemData: ProblemType;
  problemIndex: number;
}) => {
  const { multipleChoice, problemId, question, problemNumber } = itemData;

  const processedChoices = (() => {
    const copied = [...multipleChoice];
    copied.sort((a, b) => a.id.localeCompare(b.id));
    return copied;
  })();

  return (
    <ProblemItemContext.Provider value={{ problemId, problemIndex }}>
      <S.ItemRoot>
        <Text label={`${problemNumber}. ${question}`} fontStyle="body-lg" />
        <S.ChoicesWrapper>
          {processedChoices.map(({ id, value }) => (
            <SolvingChoice key={id} id={id} value={value} />
          ))}
        </S.ChoicesWrapper>
      </S.ItemRoot>
    </ProblemItemContext.Provider>
  );
};

ProblemItem.useData = useData;

const ProblemList = () => {
  const listData = ExamSolvingPage.usePageData().problemResponses;

  return (
    <S.ListRoot>
      {listData.map((item, problemIndex) => (
        <ProblemItem
          key={item.problemNumber}
          itemData={item}
          problemIndex={problemIndex}
        />
      ))}
    </S.ListRoot>
  );
};

const S = {
  ListRoot: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
  `,
  ItemRoot: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  `,
  ChoicesWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
  `,
};

export default ProblemList;
