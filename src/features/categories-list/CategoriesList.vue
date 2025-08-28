<script setup>
import { useCityStore } from '@/entities/city';
import { useCategoryStore, CategoryCard } from '@/entities/category';
import { storeToRefs } from 'pinia';
import { NLSpinner } from '@/shared/ui';

const cityStore = useCityStore();
const { cityId } = storeToRefs(cityStore);
const categoryStore = useCategoryStore();
const { categories, loading } = storeToRefs(categoryStore);

categoryStore.fetchCategories(cityId.value);
</script>
<template>
	<div class="categories-list__wrapper">
		<div class="categories-list__title">Категории товаров</div>
		<div v-if="loading" class="nl-data-loading"><NLSpinner size="18"> Загрузка </NLSpinner></div>
		<div class="categories-list" v-else>
			<CategoryCard
				v-for="category of categories"
				:key="category.slug"
				:name="category.name"
				:text-color="category.textColor"
				:image-url="category.image"
				:slug="category.slug"
			/>
		</div>
	</div>
</template>
<style>
.nl-loading {
	display: flex;
	justify-content: center;
	padding: 40px 0;
}

.categories-list__title {
	font-size: 44px;
	line-height: 44px;
	font-weight: 600;
	margin-bottom: 20px;
}

.categories-list {
	display: grid;
	height: 100%;
	width: 100%;
	gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(272px, 1fr));
	grid-auto-rows: minmax(152px, 1fr);
}
</style>
