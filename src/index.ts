/**
 * CSS Animation comonents  for Animatopy
 * @link https://sarthology.github.io/Animatopy/
 */
import('./index.css', { assert: { type: 'css' } }).then((css => {
    document.adoptedStyleSheets = [css.default];
}))
import animations from "./animations";

/**
 * css duration string to milliseconds number
 * @param cssDuration
 */
export function cssDurationToMillisecond(cssDuration = "1s") {
    var _a;
    const duration = String(cssDuration);
    const numericValue = parseFloat(duration);
    const unit = (_a = duration.match(/[a-z]+/)) === null || _a === void 0 ? void 0 : _a.toString();
    if (unit == "s") {
        return numericValue * 1000;
    }
    else if (unit == "ms") {
        return numericValue;
    }
    else {
        return numericValue;
    }
}
/**
 * css duration string to milliseconds number
 * @param cssDuration
 * @returns {number}
 */
export const cssToMillisecond = cssDurationToMillisecond;


export type AnimationMotion = typeof animations[number];

/**
 * ==================================================
 * Create Animation style properties
 * ==================================================
 */
type CreateAnimateStyleProps = {
    motion?: AnimationMotion,
    duration?: string;
    infinite?: boolean;
    style?: string,
};
export function createAnimateStyle(props: CreateAnimateStyleProps): string {

    const init: CreateAnimateStyleProps = {
        motion: 'lightSpeedIn',
        duration: '1s',
        infinite: false
    };
    const { motion, duration, infinite, style } = { ...init, ...props };

    const _infinite = infinite ? "animation-iteration-count: infinite;" : "";
    return `
          -webkit-animation-name: ${motion};
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




export type AnimateProps = CreateAnimateStyleProps & {
    element: HTMLElement | Element;
    once?: boolean;
    observer?: IntersectionObserver,
};


export function createAnimate(props: AnimateProps) {
    //get config props
    const { once = true, element, ...params } = props;
    //timer var init
    let timer: number | undefined;

    //get default style of element
    const defaultStyle = element?.getAttribute("style") ?? "";
    element?.setAttribute('data-style', defaultStyle);

    //create inline style for anmition
    const animateStyle = createAnimateStyle({ ...params, style: defaultStyle });

    const observer: IntersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && once) {
                //set inline style when section is visited
                entry.target.setAttribute("style", animateStyle);

                //clear inline style added for animation and unsuscribe observer
                timer = later(cssToMillisecond(props.duration), () => {
                    entry.target.setAttribute("style", defaultStyle);
                    observer.unobserve(entry.target);
                    observer.disconnect();
                    clearTimeout(timer);
                });

                return false;
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

    //add element to observer
    if (element) observer.observe(element);
    return { observer, interval: timer };
}



/**
 * Use later function to setTimeout shortly
 * @param time
 * @param callback
 */
export function later(time: number, callback: () => void) {
    return setTimeout(() => callback(), time);
}
