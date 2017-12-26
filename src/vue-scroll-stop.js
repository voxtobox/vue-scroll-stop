// Init variables
let elem, lastTouchMove, modifiers = {};

/**
 * Get dimensions of container
 * @returns {{height: Number, width: Number, scrollHeight: (*|number), scrollWidth: (*|number)}}
 */
const getDimensions = function() {
    const style = getComputedStyle(elem);

    return {
        height: parseInt(style.height),
        width: parseInt(style.width),
        scrollHeight: elem.scrollHeight,
        scrollWidth: elem.scrollWidth
    }
};

/**
 * Get scroll delta for x and y axios
 * @param e
 * @returns {{deltaX: number, deltaY: number}}
 */
const getDeltas = function(e) {
    let { deltaY = 0 , deltaX = 0 } = e;

    if (e.type === 'touchmove') {
        const touch =  (
            e.touches && e.touches.length && e.touches[0] ||
            { clientY: 0, clientX: 0 }
        );

        deltaY = lastTouchMove.clientY - touch.clientY;
        deltaX = lastTouchMove.clientX - touch.clientX;
        lastTouchMove = touch;
    }

    return { deltaX, deltaY };
};

/**
 * Call on mousewheel or touchmove events
 * @param e
 */
const onScrolling = function(e) {
    const { height, width, scrollHeight, scrollWidth } = getDimensions();
    let { deltaY = 0 , deltaX = 0 } = getDeltas(e);


    if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (
            (modifiers.v || !modifiers.h) &&
            ((deltaY >= 0 && elem.scrollTop === (scrollHeight - height)) ||
            (deltaY <= 0 && elem.scrollTop === 0))
        ) {
            e.preventDefault();
        }
    } else {
        if (
            (modifiers.h || !modifiers.v) &&
            ((deltaX >= 0 && elem.scrollLeft === (scrollWidth - width)) ||
            (deltaX <= 0 && elem.scrollLeft === 0))
        ) {
            e.preventDefault();
        }
    }
};

/**
 * Save client position on start touch
 *
 * @param e
 */
const onTouchStart = function(e) {
    const { clientX, clientY } = (
        (e.touches && e.touches.length && e.touches[0]) ||
        {clientX: 0, clientY: 0}
    );
    lastTouchMove = { clientX, clientY };
};

// Directive
export default {
    bind(el, binding) {
        elem = el;
        modifiers = binding.modifiers;
        el.addEventListener('mousewheel', onScrolling);
        el.addEventListener('touchmove', onScrolling);
        el.addEventListener('touchstart', onTouchStart);
    },
    unbind(el, binding) {
        el.removeEventListener('mousewheel', onScrolling);
        el.removeEventListener('touchmove', onScrolling);
        el.removeEventListener('touchstart', onTouchStart);
    },
};
