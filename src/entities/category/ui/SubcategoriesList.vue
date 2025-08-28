<script setup>
defineProps({
	categories: {
		type: Array,
		required: true,
		default() {
			return [];
		},
	},
	rootCategory: {
		type: String,
		required: true,
	},
	currentCategory: {
		type: String,
		required: true,
	},
});
</script>
<template>
	<div class="subcategories-list__container">
		<ul class="subcategories-list">
			<li
				:class="{ '--selected': currentCategory === undefined || currentCategory === '' }"
				class="subcategories-list__item"
			>
				<router-link :to="`/category/${rootCategory}`">
					<span> Все продукты </span>
				</router-link>
			</li>
			<li
				v-for="category of categories"
				:key="category.id"
				:class="{ '--selected': currentCategory === category.slug }"
				class="subcategories-list__item"
			>
				<router-link :to="`/category/${rootCategory}/${category.slug}`">
					<span>
						{{ category.name }}
					</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<style>
.subcategories-list__container {
	max-width: 240px;
}
.subcategories-list {
	height: 100%;
	min-width: 240px;
}

.subcategories-list__item {
	font-family: var(--base-font);
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	padding: 8px 12px;
	border-bottom: 1px solid #e9eef3;

	&:hover {
		cursor: pointer;
		opacity: 0.7;
	}

	&.--selected {
		color: #202648;
		background-color: #e9eef3;
	}
}

@media (max-width: 768px) {
	.subcategories-list__container {
		overflow-x: auto;
		max-width: 100%;
	}

	.subcategories-list {
		min-width: 100%;
		display: flex;
		flex-wrap: nowrap;
	}

	.subcategories-list__item {
		border-bottom: none;
		flex-grow: 1;
		text-wrap: nowrap;
	}
}
</style>
