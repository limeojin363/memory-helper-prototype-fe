import {
    createFileRoute,
    Outlet,
    useLocation,
    useNavigate,
    ToOptions,
} from "@tanstack/react-router";
import styled from "@emotion/styled";
import Header from "../../general/layouts/mobile/Header";
import ProgressBar from "../../general/progress-bar/ProgressBar";
import { ReactNode } from "react";

type StepNumber = 1 | 2 | 3;

type AssuredPathname = `/words/new/${StepNumber}`;

const backwardObject: { [key in StepNumber]: ToOptions["to"] } = {
    "1": "/words",
    "2": "/words/new/1",
    "3": "/words/new/2",
};

const frontwordObject: { [key in StepNumber]: ToOptions["to"] } = {
    "1": "/words/new/2",
    "2": "/words/new/3",
    "3": "/words",
};

const extractNumberFromPathname = (pathname: AssuredPathname): StepNumber => {
    const match = pathname.match(/\/words\/new\/(\d)/);

    // match가 항상 존재하므로, null 체크는 필요 없음
    const number = parseInt(match![1], 10) as StepNumber;
    return number; // 항상 1, 2, 3 중 하나가 반환됨
};

export const useNewWordSetStep = () => {
    const navigate = useNavigate();

    const pathname = useLocation({
        select: (location) => location.pathname,
    }) as AssuredPathname;

    console.log(pathname);

    const currentStep = extractNumberFromPathname(pathname);

    const goBack = () => {
        navigate({
            to: backwardObject[currentStep],
        });
    };

    const goAhead = () => {
        navigate({
            to: frontwordObject[currentStep],
        });
    };

    return { currentStep, goBack, goAhead };
};

const TOTAL_STEP = 3;

const NewWordLayout = ({ children }: { children: ReactNode }) => {
    const { currentStep, goBack } = useNewWordSetStep();

    return (
        <>
            <Header title="New Word Set Generating" goBack={goBack} />
            <ProgressBar current={currentStep} total={TOTAL_STEP} />
            <S.MiddleArea>{children}</S.MiddleArea>
        </>
    );
};

export default NewWordLayout;

const S = {
    MiddleArea: styled.div`
        display: flex;
        flex-direction: column;
        gap: 16px;

        width: calc(100% - 32px);
        margin: 20px 16px 0;
    `,
};
