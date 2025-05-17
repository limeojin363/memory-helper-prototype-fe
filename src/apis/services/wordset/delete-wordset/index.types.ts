import { ApiFunc } from "../../index.types";

export type DeleteWordsetFunc = ApiFunc<DeleteWordsetReqParam, DeleteWordsetResData>;

export type DeleteWordsetReqParam = {
    id: number; // 삭제할 단어셋 ID
};

export type DeleteWordsetResData = {
    setId: number;
    setName: string;
};