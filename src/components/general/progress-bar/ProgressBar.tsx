import S from "./ProgressBar.styled";

type ProgressBarProps = {
    total: number;
    current: number;
    horizontalPadding?: number; // 좌우 간격
};

const ProgressBar = ({
    total,
    current,
    horizontalPadding = 12,
}: ProgressBarProps) => {
    const barList = new Array(total).fill(0).map((_, index) => {
        if (index < current) {
            return true;
        }
        return false;
    });

    return (
        <S.OuterWrapper>
            <S.InnerWrapper padding={horizontalPadding}>
                {barList.map((filled, i) => (
                    <S.Bar key={i} filled={filled} />
                ))}
            </S.InnerWrapper>
        </S.OuterWrapper>
    );
};

export default ProgressBar;
