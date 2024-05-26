/**
 * CSS Animation comonents  for Animatopy
 * @link https://sarthology.github.io/Animatopy/
 */
import './index.css';
import { cleanAnimaxStyle, createAnimateStyle, cssToMillisecond } from "./lib";
import { AnimateProps } from "./types";


export function createAnimate(props: AnimateProps) {
    //get config props
    const { once = true, element, ...params } = props;


    //timer var init
    let timer: number | undefined = undefined;
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
