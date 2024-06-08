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
    return String(style || '').replace(regex, '');
}
