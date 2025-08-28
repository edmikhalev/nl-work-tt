import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import { categoryApi } from '../api/category-api';

export const useCategoryStore = defineStore('category', () => {
	const currentCategory = ref();
	const categories = shallowRef([]);
	const loading = ref(false);

	async function fetchCategories(cityId) {
		try {
			loading.value = true;
			const categoriesRes = await categoryApi.fetchCategories(cityId);
			categories.value = categoriesRes;
		} catch (e) {
			console.error(e);
		} finally {
			loading.value = false;
		}
	}

	function setCurrentCategoryBySlug(slug) {
		if (categories.value.length === 0) {
			return;
		}

		const category = categories.value.find((category) => category.slug === slug);

		if (!category) {
			return;
		}

		setCategory(category);
	}

	function setCategory(category) {
		currentCategory.value = category;
	}

	function setCategories(newCategories) {
		categories.value = newCategories;
	}

	function reset() {
		setCategory(undefined);
		setCategories([]);
	}

	return {
		loading,
		categories,
		currentCategory,

		reset,
		setCurrentCategoryBySlug,
		fetchCategories,
	};
});
