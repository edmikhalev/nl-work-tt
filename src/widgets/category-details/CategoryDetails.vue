<script setup>
import { useCityStore } from '@/entities';
import { SubcategoriesList, useCategoryStore } from '@/entities/category';
import { useProductStore } from '@/entities/product';
import { ProductsList } from '@/entities/product';
import { ArrowLeftFilled } from '@/shared/ui/icons';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const cityStore = useCityStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const { cityId } = storeToRefs(cityStore);
const { productsList, loading: productsLoading } = storeToRefs(productStore);
const { currentCategory, loading: cateogriesLoading } = storeToRefs(categoryStore);

const loading = computed(() => productsLoading.value || cateogriesLoading.value);
const currentSubcategorySlug = computed(() => route.params.subcategorySlug);

const showSidebar = computed(() => currentCategory.value?.children?.length > 2);

const availableProducts = computed(() => {
	return productsList.value;
	// if (!currentSubcategorySlug.value || currentCategory?.children?.length < 2) {
	// 	return productsList.value;
	// }

	// return productsList.value.filter((prodcuct) => prodcuct.categorySlugs.includes(currentSubcategorySlug.value));
});
categoryStore.reset();
productStore.reset();
watch(
	route,
	async (newRoute, oldRoute) => {
		const newSlug = newRoute.params.slug;
		const oldSlug = oldRoute?.params?.slug;

		if (newSlug === oldSlug && !newRoute.params.subcategorySlug) {
			return;
		}

		await categoryStore.fetchCategories(cityId.value);
		categoryStore.setCurrentCategoryBySlug(newSlug);
		productStore.fetchProducts(newSlug, cityId.value);
	},
	{ immediate: true },
);
</script>
<template>
	<div class="category-details">
		<div class="category-details__title">
			<button class="go-back-button" @click="() => router.push('/')">
				<ArrowLeftFilled />
			</button>
			<span>{{ currentCategory?.name }}</span>
		</div>
		<div class="category-details__content">
			<SubcategoriesList
				v-if="showSidebar"
				:categories="currentCategory?.children"
				:root-category="route.params.slug"
				:current-category="currentSubcategorySlug"
			/>
			<div v-if="loading" class="data-loading">Загрузка...</div>
			<ProductsList v-else :products="availableProducts" />
		</div>
	</div>
</template>
<style>
.data-loading {
	display: flex;
	width: 100%;
	justify-content: center;
	padding: 60px 0;
	font-size: 24px;
	line-height: 24px;
}

.empty-category {
	display: flex;
	padding: 60px 0;
	font-size: 44px;
	width: 100%;
	line-height: 44px;
	text-align: center;
}

.category-details__title {
	font-weight: 600;
	font-size: 44px;
	line-height: 44px;
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
}

.go-back-button {
	cursor: pointer;
	&:hover {
		opacity: 0.6;
	}
}

.category-details__content {
	width: 100%;
	display: flex;
	gap: 34px;
}

@media (max-width: 768px) {
	.category-details__content {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
}
</style>
