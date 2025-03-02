export type KorInputStatus =
    | "INITIAL" // 편집 가능, 흑색 테두리
    | "NEEDS-CORRECTION" // 편집 가능(필요), 적색 테두리
    | "SELECTABLE-UNSELECTED" // 편집 불가능
    | "SELECTABLE-SELECTED" // 편집 불가능, 선택됐음을 알리는 두꺼운 테두리
    | "DETERMINING"; // 쓸 만한 놈인지 판단 중

export type EngInputStatus =
    | "INITIAL"
    | "OK"
    | "NEEDS-CORRECTION"
    | "DETERMINING";

export type KorInputObject = { id: string; value: string } & (
    | {
          sourceType: "CUSTOM";
          status: KorInputStatus;
      }
    | {
          sourceType: "OFFERED";
          status: Extract<
              KorInputStatus,
              "SELECTABLE-UNSELECTED" | "SELECTABLE-SELECTED"
          >;
      }
);

export type EngInputObject = {
    value: string;
    status: EngInputStatus;
};

export type InputPairObject = { id: string } & (
    | {
          status: "INITIAL" | "REQUESTED-OPTIONS" | "REQUEST-FAILED";
          engInput: EngInputObject;
          korInputs: null;
      }
    | {
          status: "SELECTING" | "USABLE";
          engInput: EngInputObject;
          korInputs: KorInputObject[];
      }
);

export type InputPairStatus = InputPairObject["status"];
