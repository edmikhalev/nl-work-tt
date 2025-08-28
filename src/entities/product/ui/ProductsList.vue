<script setup>
import ProductCard from './components/ProductCard.vue';

defineProps({
	products: {
		type: Array,
		required: true,
		default() {
			return [];
		},
	},
});
</script>
<template>
	<div class="products-list">
		<ProductCard
			v-for="product of products"
			:key="product.id"
			:price="product.price"
			:imageUrl="product.imageUrl"
			:categoryName="product.categoryName"
			:available="product.available"
			:name="product.name"
			:comment="product.comment"
			:tagIds="product.tagIds"
		/>
	</div>
</template>
<style>
.products-list {
	display: grid;
	width: 100%;
	min-height: 100%;
	grid-template-columns: repeat(auto-fit, minmax(272px, 1fr));
	grid-auto-rows: minmax(494px, 1fr);
	gap: 24px;
	height: 100%;
}

@media (max-width: 768px) {
	.products-list {
		grid-template-columns: repeat(1, 1fr);
		grid-auto-rows: max-content;
	}
}
</style>
