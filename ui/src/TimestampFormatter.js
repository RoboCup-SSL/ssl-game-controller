const padWithZero = function (value) {
    if (value < 10) {
        return '0' + value.toString();
    }
    return value.toString();
};

const formatNsDuration = function (timestamp) {
    const seconds = Math.round(Math.abs(timestamp) / 1e9);
    const minutes = Math.floor(seconds / 60);
    const fullSeconds = seconds - minutes * 60;
    const sign = timestamp < 0 ? '-' : '';
    return sign + padWithZero(minutes) + ':' + padWithZero(fullSeconds);
};

const isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const process = function (el, binding) {
    let timestamp;
    if (isNumeric(binding.value)) {
        timestamp = binding.value;
    } else {
        timestamp = el.innerHTML;
    }
    if (!isNaN(timestamp)) {
        el.innerHTML = formatNsDuration(timestamp);
    }
};

const TimestampFormatter = {
    install(Vue) {
        Vue.directive('format-ns-duration', {
            bind(el, binding) {
                process(el, binding);
            },
            update(el, binding) {
                process(el, binding);
            }
        });
    }
};
export default TimestampFormatter;