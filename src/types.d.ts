import animations from "./animations";

export type Motions = typeof animations[number];

export type AnimateStyleProps = {
    motion?: Motions,
    duration?: string;
    infinite?: boolean;
    style?: string,
};


export type AnimateProps = AnimateStyleProps & {
    element: HTMLElement | Element;
    once?: boolean;
    observer?: IntersectionObserver,
};