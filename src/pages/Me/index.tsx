import { getDataFromApiRes } from "@/apis/services";
import GetUserInfo from "@/apis/services/auth/get-user-info";
import Header from "@/components/layouts/mobile/Header";
import Text from "@/components/texts/Text";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

const useMyInfo = () => {
  const { data } = useQuery({
    initialData: null,
    queryKey: ["my-info"],
    queryFn: async () => {
      const res = GetUserInfo();
      const data = await getDataFromApiRes(res);

      return data;
    },
  });

  return data;
};

const MyPage = () => {
  const myInfoData = useMyInfo();
  const { history } = useRouter();

  if (!myInfoData) return null;

  return (
    <S.Root>
      <Header goBack={() => history.go(-1)}>
        <Text label="MyPage" fontStyle="heading-2" />
      </Header>
      <S.Contents>
      <S.Item>Username: {myInfoData.username}</S.Item>
      <S.Item>Email: {myInfoData.email}</S.Item>
      </S.Contents>
    </S.Root>
  );
};

const S = {
  Root: styled.div`
    width: 100%;
    height: 100%;
  `,
  Contents: styled.div`
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  Item: styled.div``,
};

export default MyPage;
