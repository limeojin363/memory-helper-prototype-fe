import { ApiFunc } from "../../types";

export type RenameWordsetFunc = ApiFunc<
    RenameWordsetReqParam,
    RenameWordsetResData
>;

export type RenameWordsetReqParam = {
    id: number; // 단어셋 ID
    setName: string; // 변경할 단어셋 이름
};

export type RenameWordsetResData = {
    setId: number;
    setName: string;
};
