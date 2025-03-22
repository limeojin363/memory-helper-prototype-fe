import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { atom, PrimitiveAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import Text from "../texts/Text";
import { Colors } from "../../designs/colors";
import { useKorInput } from "../../pages/GeneratingNewWordSetPage/hooks/states/useKorInput";
import { css } from "@emotion/react";

export type TypeOfPartOfSpeech = "noun" | "verb" | "adjective" | "adverb";

export const ViewOfTypeOfPartOfSpeech: { [key in TypeOfPartOfSpeech]: string } =
    {
        noun: "명",
        verb: "동",
        adjective: "형",
        adverb: "부",
    };

const TypeSelector = ({ id }: { id: string }) => {
    const { korInput, setKorInput } = useKorInput(id);

    const { type } = korInput;

    const isFixed = type ? type.isFixed : false;
    const value = type ? type.value : null;

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = () => {
        console.log(isFixed);
        if (isFixed) return;
        setIsOpen(!isOpen);
    };

    const handleItemClick = (type: TypeOfPartOfSpeech) => {
        setKorInput({ ...korInput, type: { value: type, isFixed: false } });
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef}>
            <S.DropdownButton isFixed={isFixed} onClick={handleButtonClick}>
                <Text
                    label={
                        korInput.type?.value
                            ? ViewOfTypeOfPartOfSpeech[korInput.type?.value]
                            : "선"
                    }
                    fontStyle="action-sm"
                />
            </S.DropdownButton>
            <S.DropdownMenu isOpen={isOpen}>
                <S.DropdownItem onClick={() => handleItemClick("noun")}>
                    <Text label="명" fontStyle="action-sm" />
                </S.DropdownItem>
                <S.DropdownItem onClick={() => handleItemClick("verb")}>
                    <Text label="동" fontStyle="action-sm" />
                </S.DropdownItem>
                <S.DropdownItem onClick={() => handleItemClick("adjective")}>
                    <Text label="형" fontStyle="action-sm" />
                </S.DropdownItem>
                <S.DropdownItem onClick={() => handleItemClick("adverb")}>
                    <Text label="부" fontStyle="action-sm" />
                </S.DropdownItem>
            </S.DropdownMenu>
        </div>
    );
};

export default TypeSelector;

const S = {
    DropdownButton: styled.button<{ isFixed: boolean }>`
        border: none;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        box-shadow: 0 0 0 2px ${Colors["highlight-darkest"]} inset;

        ${({ isFixed }) =>
            isFixed &&
            css`
                background-color: ${Colors["highlight-light"]};
            `}
    `,
    DropdownMenu: styled.div<{
        isOpen: boolean;
    }>`
        position: absolute;
        opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
        visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
        max-height: ${({ isOpen }) => (isOpen ? "200px" : "0")};
        overflow: hidden;
        transition: opacity 0.3s ease-in-out;

        z-index: 1;
    `,
    DropdownItem: styled.button`
        border: none;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        box-shadow: 0 0 0 2px ${Colors["highlight-darkest"]} inset;
    `,
};
