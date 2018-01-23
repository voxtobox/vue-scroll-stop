// Init variables
let elem, lastTouchMove, modifiers = {};

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
    const {
        clientHeight: height,
        clientWidth: width,
        scrollHeight,
        scrollWidth,
        scrollTop,
        scrollLeft
    } = elem;
    let { deltaY = 0 , deltaX = 0 } = getDeltas(e);


    if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (
            (modifiers.v || !modifiers.h) &&
            ((deltaY >= 0 && (scrollHeight - scrollTop) === height) ||
            (deltaY <= 0 && scrollTop === 0))
        ) {
            e.preventDefault();
        }
    } else {
        if (
            (modifiers.h || !modifiers.v) &&
            ((deltaX >= 0 && (scrollWidth  - scrollLeft) === width) ||
            (deltaX <= 0 && scrollLeft === 0))
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

const _addEventListeners = function() {
    elem.addEventListener('wheel', onScrolling);
    elem.addEventListener('touchmove', onScrolling);
    elem.addEventListener('touchstart', onTouchStart);
};

const _removeEventListeners = function() {
    elem.removeEventListener('wheel', onScrolling);
    elem.removeEventListener('touchmove', onScrolling);
    elem.removeEventListener('touchstart', onTouchStart);
};

// Directive
export default {
    bind(el, binding) {
        elem = el;
        modifiers = binding.modifiers;

        if (binding.value !== false) {
            _addEventListeners();
        }
    },
    update(el, binding) {
        if (binding.value !== false) {
            _addEventListeners();
        } else {
            _removeEventListeners();
        }
    },
    unbind(el, binding) {
        _removeEventListeners();
    },
};
