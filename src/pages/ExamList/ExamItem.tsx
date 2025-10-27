import styled from "@emotion/styled";
import { Colors } from "../../designs/colors";
import Icon from "../../components/icons/Icon";
import Text from "../../components/texts/Text";
import { useNavigate } from "@tanstack/react-router";

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

const ExamItem = ({
  id,
  name,
  generatedAt,
  basedOn,
  howManyTimesStudied,
  recentStudiedAt,
  problemNumber,
}: ProblemSetItemProps) => {
  const navigate = useNavigate();

  return (
    <S.Root
      onClick={() => {
        navigate({ to: "/exam/$examId", params: { examId: id } });
      }}
    >
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
      <Icon size={16} iconName="enter" colorName="neutral-dark-lightest" />
    </S.Root>
  );
};

export default ExamItem;

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
