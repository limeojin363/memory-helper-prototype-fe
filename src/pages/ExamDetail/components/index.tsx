import styled from "@emotion/styled";
import Header from "../../../components/layouts/mobile/Header";
import { useNavigate, useRouter } from "@tanstack/react-router";
import Text from "../../../components/texts/Text";
import useExamDetail from "../hooks/useExamDetail";
import ButtonWithText from "../../../components/button-with-text";
import ResultList from "./ResultList";
import EditableTitle from "@/components/editable-title";
import { useMutation } from "@tanstack/react-query";
import { RenameExam } from "@/apis/services/exam/remame";
import { queryClient } from "@/routes/__root";
import ExamApi from "@/apis/services/exam";
import { getDataFromApiRes } from "@/apis/services";

const useRename = (examId: number) => {
  const { mutateAsync: rename, isPending } = useMutation({
    mutationFn: async (newTitle: string) => {
      if (!examId) {
        return;
      }

      await RenameExam({
        examId,
        examName: newTitle,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["examDetail", examId],
      });
      queryClient.invalidateQueries({
        queryKey: ["exam-list-infinite"],
      });
    },
    mutationKey: ["renameExam", examId],
  });

  return { renameRequest: (name: string) => rename(name), isPending };
};

const ExamDetailPage = ({ examId }: { examId: number }) => {
  const { history } = useRouter();
  const navigate = useNavigate();

  const deleteExam = useDelete(examId);
  const examDetailData = useExamDetail(examId);
  const { renameRequest, isPending } = useRename(examId);

  if (!examDetailData) return null;

  const howManyProblems = examDetailData.problemResponses.length;
  const sourceWordsetId = examDetailData.sourceWordSetId;
  const sourceWordsetName = examDetailData.sourceWordSetName;
  const dateView = new Date(examDetailData.createdAt).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  );

  const goBack = () => history.go(-1);
  const goToWordset = () =>
    navigate({
      to: "/wordset/$wordsetId",
      params: { wordsetId: String(sourceWordsetId) },
    });
  const goToSolvingPage = () =>
    navigate({
      to: "/exam/$examId/solve",
      params: { examId: String(examId) },
    });

  const resultListData = examDetailData.resultResponses;

  const deleteAndNavigate = async () => {
    await deleteExam();
    goBack();
  };

  return (
    <S.Root>
      <Header goBack={goBack}>
        <EditableTitle
          initialValue={examDetailData.examName}
          renameRequest={renameRequest}
          isPending={isPending}
        />
      </Header>
      <S.MetaDataArea>
        <Text label={`문제 수: ${howManyProblems}`} fontStyle="action-md" />
        <Text label={dateView} fontStyle="action-md" />
      </S.MetaDataArea>
      <S.ButtonsArea>
        <ButtonWithText text={sourceWordsetName} onClick={goToWordset} />
        <ButtonWithText text={"문제 풀기"} onClick={goToSolvingPage} />
        <ButtonWithText text={"시험 삭제"} onClick={deleteAndNavigate} />
      </S.ButtonsArea>
      <ResultList data={resultListData} />
    </S.Root>
  );
};

const useDelete = (examId: number) => {
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const res = ExamApi.DeleteExam({ examId });
      const data = await getDataFromApiRes(res);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exam-list-infinite"],
      });
    },
  });

  return () => mutateAsync();
};

export default ExamDetailPage;

const S = {
  Root: styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  MetaDataArea: styled.div`
    width: calc(100% - 40px);
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
  `,
  ButtonsArea: styled.div`
    display: flex;
    width: calc(100% - 40px);
    gap: 16px;
  `,
};
