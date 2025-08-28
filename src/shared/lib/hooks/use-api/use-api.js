import { httpClient } from '@/shared/api';

export const useApi = () => {
	const get = async (endpoint, query) => {
		try {
			const response = await httpClient.get(endpoint);
			return response;
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const post = () => {
		console.error(`Метод "post" не  реализован`);
	};

	const patch = () => {
		console.error(`Метод "patch" не  реализован`);
	};

	const update = () => {
		console.error(`Метод "update" не  реализован`);
	};

	const remove = () => {
		console.error(`Метод "remove" не  реализован`);
	};

	return {
		get,
		post,
		patch,
		update,
		remove,
	};
};
