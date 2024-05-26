import { AnimateStyleProps } from "./types";

/**
 * css duration string to milliseconds number
 * @param cssDuration
 */
export function cssToMillisecond(cssDuration = "1s") {
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
 * ==================================================
 * Create Animation style properties
 * ==================================================
 */
export function createAnimateStyle(props: AnimateStyleProps): string {

    const init: AnimateStyleProps = {
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



export function cleanAnimaxStyle(style: string | undefined | null) {
    const animationProperties = [
        'animation-name',
        'animation-duration',
        'animation-timing-function',
        'animation-iteration-count',
        'animation-fill-mode',
        '-webkit-animation-name',
        '-webkit-animation-duration',
        '-webkit-animation-timing-function',
        '-webkit-animation-iteration-count',
        '-webkit-animation-fill-mode',
    ];

    // Create a regular expression to match these properties
    const regex = new RegExp(`(?:${animationProperties.join('|')}):\\s*[^;]+;?`, 'g');

    // Remove animation properties from the style string
    return String(style).replace(regex, '');
}
