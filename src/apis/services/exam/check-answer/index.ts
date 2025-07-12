import authenticatedApiClient from "../../../core/clients";
import { CheckAnswerFunc } from "./index.types";

const CheckAnswer: CheckAnswerFunc = ({ examId, checkedAnswers }) =>
    authenticatedApiClient.post(`exam/check/${examId}`, { 
        json: { checkedAnswers } 
    });

export default CheckAnswer;
