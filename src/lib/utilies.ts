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