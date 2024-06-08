import * as index from './index';
declare global {
    interface Window {
        animax: typeof index;
    }
}
window.animax = index;
