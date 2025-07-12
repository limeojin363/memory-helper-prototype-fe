import { ApiFunc } from "../../types";

export type GetAllExamsFunc = ApiFunc<void, GetAllExamsResData>;

export type GetAllExamsResData = Array<{
    testId: number;
    createdAt: string;
    testType: number;
}>;
