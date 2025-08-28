import { useApi } from '@/shared/lib';

const { get } = useApi();

const mapCitiesFromApi = (cities) =>
	cities.map(({ id, label, city }) => ({
		id,
		label,
		city,
	}));

export const cityApi = {
	async searchCity(term) {
		const cities = await get(`city?term=${term}&country=ru`);
		return mapCitiesFromApi(cities);
	},

	async getCity(id) {
		const city = await get(`city?id=${id}`);
		return mapCitiesFromApi([city])[0];
	},
};
