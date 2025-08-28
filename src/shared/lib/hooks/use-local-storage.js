export function useLocalStorage(key) {
	const keyIsExists = () => !(key === '' || key === null || key === undefined);

	const save = (data) => {
		if (!keyIsExists()) {
			return;
		}
		if (data == undefined) {
			return remove();
		}
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch (e) {
			console.error(e);
		}
	};

	const load = () => {
		if (!keyIsExists()) {
			return;
		}
		try {
			const rawData = localStorage.getItem(key);
			if (!rawData) {
				return;
			}
			return JSON.parse(rawData);
		} catch (e) {
			console.error(e);
		}
	};

	function remove() {
		if (!keyIsExists()) {
			return;
		}
		localStorage.removeItem(key);
	}

	return {
		save,
		load,
		remove,
	};
}
