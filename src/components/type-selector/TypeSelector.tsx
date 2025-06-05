import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import Text from "../texts/Text";
import { Colors } from "../../designs/colors";
import Button1, { Button1Props } from "../button1";

const ButtonPropPreset: Omit<Button1Props, "children"> = {
    height: "28px",
    width: "28px",
    borderRadius: "10px",
    activeTransformScale: 0.95,
    colorStyle: "Primary",
};

const TypeSelector = ({
    select,
    value,
}: {
    value: TypeKey;
    select: (t: TypeKey) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);

    const close = () => setIsOpen(false);

    const handleItemClick = (t: TypeKey) => {
        select(t);
        close();
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

    const dropdownRef = useRef<HTMLDivElement>(null);

    return (
        <S.Root ref={dropdownRef}>
            <Button1 {...ButtonPropPreset} onClick={open}>
                <Text
                    label={ViewOfType[value]}
                    colorName="highlight-darkest"
                    fontStyle="action-md"
                />
            </Button1>
            <S.DropdownList isOpen={isOpen}>
                {/* TODO: 반복코드 줄이기 */}
                <Button1
                    {...ButtonPropPreset}
                    onClick={() => handleItemClick("noun")}
                    activeTransformScale={0.95}
                >
                    <Text
                        label="명"
                        colorName="highlight-darkest"
                        fontStyle="action-md"
                    />
                </Button1>
                <Button1
                    {...ButtonPropPreset}
                    onClick={() => handleItemClick("verb")}
                >
                    <Text
                        label="동"
                        colorName="highlight-darkest"
                        fontStyle="action-md"
                    />
                </Button1>
                <Button1
                    {...ButtonPropPreset}
                    onClick={() => handleItemClick("adjective")}
                >
                    <Text
                        label="형"
                        colorName="highlight-darkest"
                        fontStyle="action-md"
                    />
                </Button1>
                <Button1
                    {...ButtonPropPreset}
                    onClick={() => handleItemClick("adverb")}
                >
                    <Text
                        label="부"
                        colorName="highlight-darkest"
                        fontStyle="action-md"
                    />
                </Button1>
            </S.DropdownList>
        </S.Root>
    );
};

const ViewOfType = {
    noun: "명",
    verb: "동",
    adjective: "형",
    adverb: "부",
};

export type TypeKey = keyof typeof ViewOfType;

export default TypeSelector;

const S = {
    Root: styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;

        position: relative;
    `,
    DropdownButton: styled.button`
        width: 28px;
        height: 28px;

        border-radius: 30%;
        border: none;
        box-shadow: 0 0 0 2px ${Colors["neutral-dark-darkest"]} inset;

        background-color: ${Colors["neutral-light-dark"]};

        :active {
            transform: scale(0.95);
        }
    `,
    DropdownList: styled.div<{
        isOpen: boolean;
    }>`
        position: absolute;
        top: 0;
        left: 32px;

        opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
        visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
        max-height: ${({ isOpen }) => (isOpen ? "200px" : "0")};
        overflow: hidden;
        transition: opacity 0.3s ease-in-out;

        z-index: 1;

        display: flex;
        flex-direction: column;
        gap: 4px;
    `,
    DropdownItem: styled.button`
        width: 28px;
        height: 28px;

        border-radius: 30%;
        border: none;
        box-shadow: 0 0 0 2px ${Colors["neutral-dark-darkest"]} inset;

        background-color: ${Colors["neutral-light-dark"]};

        :active {
            transform: scale(0.95);
        }
    `,
};
