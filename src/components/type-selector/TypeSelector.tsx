import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import Text from "../texts/Text";
import { ColorName, Colors } from "../../designs/colors";
import Button1, { Button1Props } from "../button1";

// --------- text-field 참조 --------- //
type ColorSetName =
    | "PRIMARY-INITIAL"
    | "PRIMARY-DISABLED"
    | "NEUTRAL-INITIAL"
    | "NEUTRAL-DISABLED";

const ColorSetMap: {
    [key in ColorSetName]: {
        bgColor: string;
        borderColor: string;
        textColor: string;
    };
} = {
    "NEUTRAL-DISABLED": {
        bgColor: Colors["neutral-light-dark"],
        borderColor: Colors["neutral-light-dark"],
        textColor: Colors["neutral-dark-dark"],
    },
    "NEUTRAL-INITIAL": {
        bgColor: "black",
        borderColor: "black",
        textColor: "black",
    },
    "PRIMARY-DISABLED": {
        bgColor: Colors["neutral-light-darkest"],
        borderColor: Colors["highlight-darkest"],
        textColor: Colors["neutral-dark-dark"],
    },
    "PRIMARY-INITIAL": {
        bgColor: "transparent",
        borderColor: Colors["highlight-dark"],
        textColor: Colors["neutral-dark-dark"],
    },
};
// --------- text-field 참조 --------- //

const TypeSelector = ({
    select,
    value,
    disabled,
    colorSetName,
}: {
    value: TypeKey;
    select: (t: TypeKey) => void;
    disabled: boolean;
    colorSetName: ColorSetName
}) => {
    const ButtonPropPreset: Omit<Button1Props, "children"> = {
        height: "28px",
        width: "28px",
        borderRadius: "10px",
        activeTransformScale: 0.95,
        bgColor: ColorSetMap[colorSetName].bgColor,
        borderColor: ColorSetMap[colorSetName].borderColor,
    };

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

    const textColor: ColorName =  "highlight-darkest"

    return (
        <S.Root ref={dropdownRef}>
            <Button1
                {...ButtonPropPreset}
                onClick={() => {
                    if (disabled) return;
                    open();
                }}
            >
                <Text
                    label={ViewOfType[value]}
                    colorName={textColor}
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
                        colorName={textColor}
                        fontStyle="action-md"
                    />
                </Button1>
                <Button1
                    {...ButtonPropPreset}
                    onClick={() => handleItemClick("verb")}
                >
                    <Text
                        label="동"
                        colorName={textColor}
                        fontStyle="action-md"
                    />
                </Button1>
                <Button1
                    {...ButtonPropPreset}
                    onClick={() => handleItemClick("adjective")}
                >
                    <Text
                        label="형"
                        colorName={textColor}
                        fontStyle="action-md"
                    />
                </Button1>
                <Button1
                    {...ButtonPropPreset}
                    onClick={() => handleItemClick("adverb")}
                >
                    <Text
                        label="부"
                        colorName={textColor}
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
