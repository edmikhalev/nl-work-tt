import { defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';
import { cityApi } from '../api';
import { useLocalStorage } from '@/shared/lib';
import { DEFAULT_CITY_ID } from '@/shared/config';

const LS_CITY_KEY = 'nl_city';

export const useCityStore = defineStore('city', () => {
	const currentCity = ref();
	const citiesList = shallowRef([]);
	const loading = ref(false);

	const cityId = computed(() => currentCity.value?.id || DEFAULT_CITY_ID);

	const { save: saveLocal, load } = useLocalStorage(LS_CITY_KEY);

	const setCity = (city) => {
		currentCity.value = city;
		saveLocal(city);
	};

	const searchCity = async (term) => {
		try {
			loading.value = true;
			const cities = await cityApi.searchCity(term);
			citiesList.value = cities;
		} catch (e) {
			console.error(e);
		} finally {
			loading.value = false;
		}
	};

	const getCity = async (id) => {
		try {
			loading.value = true;
			currentCity.value = await cityApi.getCity(id);
		} catch (e) {
			console.error(e);
		} finally {
			loading.value = false;
		}
	};

	const loadPersistentOrGetDefault = async () => {
		try {
			loading.value = true;
			const persitentCity = load();
			if (persitentCity) {
				currentCity.value = persitentCity;
				return;
			}
			currentCity.value = await cityApi.getCity(DEFAULT_CITY_ID);
		} catch (e) {
			console.error(e);
		} finally {
			loading.value = false;
		}
	};

	return {
		currentCity,
		citiesList,
		loading,

		cityId,

		setCity,
		searchCity,
		getCity,
		loadPersistentOrGetDefault,
	};
});
