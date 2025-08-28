<script setup>
import { useCityStore, useCategoryStore } from '@/entities';
import { useProductStore } from '@/entities/product';
import { ProductsList, ProductCard } from '@/entities/product';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const cityStore = useCityStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const { cityId } = storeToRefs(cityStore);
const { productsList } = storeToRefs(productStore);
const { categories } = storeToRefs(categoryStore);

watch(
	route,
	async (newRoute, oldRoute) => {
		const newSlug = newRoute.params.slug;
		const oldSlug = oldRoute?.params?.slug;

		if (oldSlug !== undefined && newSlug === oldSlug) {
			return;
		}
		// if (!currentCategory) {
		// 	await categoryStore.getCategory();
		// }
		productStore.fetchProducts(newSlug, cityId.value);
	},
	{ immediate: true },
);
</script>
<template>
	<div class="category-details">
		<!-- <div>Функциональные коктейли</div> -->
		<aside style="background-color: #ddd"></aside>
		<ProductsList :products="productsList" class="categories-filter">
			<template #default="{ product }">
				<ProductCard
					:price="product.price"
					:imageUrl="product.imageUrl"
					:categoryName="product.categoryName"
					:available="product.available"
					:name="product.name"
					:comment="product.comment"
					:tagIds="product.tagIds"
				/>
			</template>
		</ProductsList>
	</div>
</template>
<style>
.category-details {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	background-color: #c0c0c0;
}

.categories-filter {
	height: 100%;
	width: 240px;
	background-color: #e0e0e0;
}
</style>
