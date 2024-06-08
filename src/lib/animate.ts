import { cssToMillisecond } from "./utilies";


import { cleanAnimaxStyle } from "./cleanAnimaxStyle";
import { Motions } from "./motions";

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


/**
 * ==================================================
 * Create Animation style properties
 * ==================================================
 */
export function createAnimateStyle(props: AnimateStyleProps): string {


    const { infinite = false } = props;
    const motion = props?.motion || 'lightSpeedIn';
    const duration = props?.duration || '1s';
    const style = props?.style || '';

    const _infinite = infinite ? "animation-iteration-count: infinite;" : "";

    return `-webkit-animation-name: ${motion};
          animation-name: ${motion};
          -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
          -webkit-animation-duration: ${duration};
          animation-duration: ${duration};
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          ${_infinite}
          ${style}`;
}



export function createAnimate(props: AnimateProps) {
    //get config props
    const { once = true, element, ...params } = props;


    //timer var init
    let timer: any = undefined;
    //@ts-ignore
    let observer: IntersectionObserver = undefined;

    //get default style of element
    const defaultStyle = cleanAnimaxStyle(element?.getAttribute("style"));

    //create inline style for anmition
    const animateStyle = createAnimateStyle({ ...params, style: defaultStyle });

    if (props.infinite) {
        element?.setAttribute("style", animateStyle)
        return {
            cleanup: () => {
                element?.setAttribute('style', defaultStyle)
            }
        }
    } else {

    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && once) {

                //set inline style when section is visited
                entry.target.setAttribute("style", animateStyle);

                //clear inline style added for animation and unsuscribe observer
                timer = setTimeout(() => {
                    entry.target.setAttribute("style", defaultStyle);
                    observer.unobserve(entry.target);
                    clearTimeout(timer);
                }, cssToMillisecond(props.duration));
            }

            if (!once) {
                entry.target.setAttribute(
                    "style",
                    entry.isIntersecting ? animateStyle : defaultStyle
                );
                return false;
            }

        });
    }, props.observer);

    if (element) observer.observe(element);
    //add element to observer

    return {
        cleanup: () => {
            observer.unobserve(element);
            observer.disconnect();
            clearTimeout(timer)
        }
    }
}