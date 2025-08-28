import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import { productApi } from '../api';

export const useProductStore = defineStore('product', () => {
	const currentProduct = ref();
	const productsList = shallowRef([]);
	const loading = ref(false);

	async function fetchProducts(slug, cityId) {
		try {
			const products = await productApi.fetchProducts(slug, cityId);
			productsList.value = products;
		} catch (e) {
			console.error(e);
		}
	}

	function setProduct(product) {
		currentProduct.value = product;
	}

	function setProducts(products) {
		productsList.value = products;
	}

	function reset() {
		currentProduct.value = undefined;
		productsList.value = [];
	}

	return {
		loading,
		currentProduct,
		productsList,
		reset,
		fetchProducts,
		setProducts,
		setProduct,
	};
});
