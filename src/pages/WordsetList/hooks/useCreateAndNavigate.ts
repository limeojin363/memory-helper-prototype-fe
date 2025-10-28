import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "../../../routes/__root";
import { getDataFromApiRes } from "../../../apis/services";
import WordsetApi from "../../../apis/services/wordset";
import { v4 as uuidv4 } from 'uuid';

const useCreateAndNavigate = () => {
  const navigate = useNavigate();

  const { mutate: createAndNavigate } = useMutation({
    mutationFn: async () => {
      const res = WordsetApi.CreateWordset({setName: uuidv4()});

      console.log(res);
      const data = await getDataFromApiRes(res);

      console.log({data});

      if (!data) return;
      navigate({
        to: `/wordset/${data.setId}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wordsetList-infinite"],
      });
    },
  });

  return () => createAndNavigate();
};

export default useCreateAndNavigate;
