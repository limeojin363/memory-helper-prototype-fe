// import styled from "@emotion/styled";
// import { ItemData } from "../../hooks/useModalState";
// import Text from "../../../../components/texts/Text";
// import { TypeKey } from "../../../WordSetDetailPage/components/WordSetList";
// import { Colors } from "../../../../designs/colors";
// import { ViewOfType } from "./TypeSelector";

// const ItemView = ({ status }: { status: ItemData }) => {
//     const {
//         selectedData: { word, meaning },
//     } = status;

//     return (
//         <S.Root>
//             <EngArea value={word} />
//             <KorArea meanings={meaning} />
//         </S.Root>
//     );
// };

// export default ItemView;

// const EngArea = ({ value }: { value: string }) => {
//     return (
//         <S.EngAreaWrapper>
//             <Text fontStyle="heading-5" label="Eng" />
//             <S.EngWordViewWrapper>
//                 <S.WordView>
//                     <Text fontStyle="body-lg" label={value} />
//                 </S.WordView>
//             </S.EngWordViewWrapper>
//         </S.EngAreaWrapper>
//     );
// };

// const KorArea = ({
//     meanings,
// }: {
//     meanings: {
//         type: TypeKey;
//         value: string;
//     }[];
// }) => {
//     return (
//         <S.KorAreaWrapper>
//             <S.KorTopWrapper>
//                 <Text fontStyle="heading-5" label="Kor" />
//             </S.KorTopWrapper>

//             {meanings.map((item, idx) => (
//                 <S.KorMeaningItemWrapper key={idx}>
//                     <div>
//                         <S.Type>
//                             <Text
//                                 fontStyle="action-sm"
//                                 label={ViewOfType[item.type]}
//                             />
//                         </S.Type>
//                     </div>
//                     <S.WordView>
//                         <Text fontStyle="body-lg" label={item.value} />
//                     </S.WordView>
//                 </S.KorMeaningItemWrapper>
//             ))}
//         </S.KorAreaWrapper>
//     );
// };

// const S = {
//     Root: styled.div`
//         display: flex;
//         flex-direction: column;
//         gap: 16px;
//     `,
//     EngAreaWrapper: styled.div`
//         position: relative;

//         display: flex;
//         flex-direction: column;
//         gap: 8px;
//     `,
//     EngWordViewWrapper: styled.div`
//         position: relative;
//         width: 100%;

//         display: flex;
//     `,
//     KorAreaWrapper: styled.div`
//         flex: 1;

//         display: flex;
//         flex-direction: column;
//         gap: 8px;
//     `,
//     KorTopWrapper: styled.div`
//         display: flex;
//         justify-content: space-between;
//     `,
//     KorMeaningItemWrapper: styled.div`
//         position: relative;
//         display: flex;
//         align-items: center;

//         gap: 8px;
//     `,
//     WordView: styled.div`
//         all: unset;
//         border-radius: 12px;
//         padding: 12px 16px;
//         transition: all 0.1s;

//         width: 100%;

//         box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;
//     `,
//     Type: styled.div`
//         border: none;
//         border-radius: 30%;
//         width: 28px;
//         height: 28px;
//         box-shadow: 0 0 0 2px ${Colors["neutral-dark-darkest"]} inset;

//         display: flex;
//         justify-content: center;
//         align-items: center;
//     `,
// };
