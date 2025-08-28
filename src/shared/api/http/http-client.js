import { API_HEADERS, API_URL, TIMEOUT } from '@/shared/config';
import axios from 'axios';

async function waitForData(response) {
	if (response?.data?.data) {
		return response.data.data;
	}

	if (response?.data) {
		return response.data;
	}

	return response;
}
const httpClient = axios.create({
	baseURL: API_URL,
	headers: API_HEADERS,
	timeout: TIMEOUT,
});

httpClient.interceptors.response.use(
	function onFulfilled(response) {
		return waitForData(response);
	},
	function onRejected(error) {
		return Promise.reject(error);
	},
);

export { httpClient };
