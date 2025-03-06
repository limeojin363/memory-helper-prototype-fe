type Code = "OK";

export type WrappedObject<T> = {
    data: T;
    code: Code;
};
