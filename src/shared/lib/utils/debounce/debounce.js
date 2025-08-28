export function debounce(fn, delay = 30) {
	let timeoutId;

	return function (...args) {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
}
