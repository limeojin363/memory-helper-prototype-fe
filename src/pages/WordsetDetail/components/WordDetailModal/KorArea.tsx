import styled from "@emotion/styled";
import Button1 from "../../../../components/button1";
import Icon from "../../../../components/icons/Icon";
import TextField from "../../../../components/text-field";
import Text from "../../../../components/texts/Text";
import TypeSelector from "../../../../components/type-selector/TypeSelector";
import WordDetailModal from ".";
import WordDetailEditor from "./WordDetailEditor";

const KorArea = () => {
  const { editable } = WordDetailModal.useModalContext();
  const {
    korMeanings,
    addCustomMeaning,
    changeMeaningByIdx,
    changeTypeByIdx,
    deleteMeaningByIdx,
  } = WordDetailEditor.useEditorContext();

  // keydown 리스너: enter 키에 반응
  const inputKeyDownHandler =
    (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;

      // shift 눌리지 않음
      if (!e.shiftKey) {
        if (korMeanings.length - 1 === idx) {
          addCustomMeaning();
          setTimeout(() => {
            const NextInput = document.querySelector(
              `input[data-idx="${idx + 1}"]`,
            ) as HTMLInputElement | null;
            NextInput?.focus();
          });
        } else {
          const NextInput = document.querySelector(
            `input[data-idx="${idx + 1}"]`,
          ) as HTMLInputElement | null;
          NextInput?.focus();
        }
      }
      // shift 눌리지 않음
      else {
        if (idx === 0) return;
        else {
          const PrevInput = document.querySelector(
            `input[data-idx="${idx - 1}"]`,
          ) as HTMLInputElement | null;
          PrevInput?.focus();
        }
      }
    };

  const onClickAddCustom = () => {
    addCustomMeaning();
    setTimeout(() => {
      const CreatedInput = document.querySelector(
        `input[data-idx="${korMeanings.length}"]`,
      ) as HTMLInputElement | null;
      CreatedInput?.focus();
    });
  };

  const showTrashButton = editable;

  return (
    <S.KorAreaWrapper>
      <S.KorTopWrapper>
        <Text fontStyle="heading-5" label="Kor" />
        {editable && (
          <Button1
            onClick={onClickAddCustom}
            width={"16px"}
            height={"16px"}
            activeTransformScale={0.95}
            colorStyle="Primary"
            borderRadius={"30%"}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon colorName="highlight-dark" iconName="plus" size={10} />
            </div>
          </Button1>
        )}
      </S.KorTopWrapper>

      {korMeanings.map((item, idx) => (
        <S.KorMeaningItemWrapper key={idx}>
          <TypeSelector
            colorSetName={editable ? "PRIMARY-INITIAL" : "PRIMARY-DISABLED"}
            disabled={!editable}
            select={(t) => changeTypeByIdx(idx, t)}
            value={item.type}
          />
          <TextField
            disabled={!editable}
            colorSetName={editable ? "PRIMARY-INITIAL" : "PRIMARY-DISABLED"}
            data-idx={idx}
            type="text"
            value={item.value}
            onKeyDown={inputKeyDownHandler(idx)}
            onChange={(e) => changeMeaningByIdx(idx, e.target.value)}
          />
          {showTrashButton && (
            <S.SideIconPositionor right={4}>
              <Button1
                onClick={() => deleteMeaningByIdx(idx)}
                width={"24px"}
                height={"24px"}
                activeTransformScale={0.95}
                colorStyle="Primary"
                borderRadius={"30%"}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon colorName="highlight-dark" iconName="trash" size={20} />
                </div>
              </Button1>
            </S.SideIconPositionor>
          )}
        </S.KorMeaningItemWrapper>
      ))}
    </S.KorAreaWrapper>
  );
};

export default KorArea;

const S = {
  KorAreaWrapper: styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  KorTopWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  KorMeaningItemWrapper: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  TypeSelectorWrapper: styled.div`
    position: relative;
  `,

  SideIconPositionor: styled.div<{ right: number }>`
    position: absolute;

    right: ${({ right }) => right}px;
    bottom: calc(50%);
    transform: translateY(50%);

    transition: all 0.2s ease-in-out;
  `,
};
