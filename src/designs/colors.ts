export const ColorMap = {
    "highlight-darkest": "#006FFD",
    "highlight-dark": "#2897FF",
    "highlight-medium": "#6FBAFF",
    "highlight-light": "#B4DBFF",
    "highlight-lightest": "#EAF2FF",
    "neutral-light-darkest": "#C5C6CC",
    "neutral-light-dark": "#D4D6DD",
    "neutral-light-medium": "#E8E9F1",
    "neutral-light-light": "#F8F9FE",
    "neutral-light-lightest": "#FFFFFF",
    "neutral-dark-darkest": "#1F2024",
    "neutral-dark-dark": "#2F3036",
    "neutral-dark-medium": "#494A50",
    "neutral-dark-light": "#71727A",
    "neutral-dark-lightest": "#8F9098",
} as const;

export type ColorName = keyof typeof ColorMap;
