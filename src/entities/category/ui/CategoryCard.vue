<script setup>
defineProps({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	textColor: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
});
</script>
<template>
	<router-link :key="slug" :to="`/category/${slug}`">
		<div class="category-card" :style="{ backgroundImage: `url(${imageUrl})`, color: textColor }">
			{{ name }}
		</div>
	</router-link>
</template>
<style>
.category-card {
	height: 100%;
	width: 100%;
	aspect-ratio: calc(272 / 152);
	padding: 20px;
	border-radius: 5px;
	font-size: 24px;
	line-height: 28px;
	cursor: pointer;
	background-size: cover;
	background-repeat: no-repeat;
	&:hover {
		opacity: 0.8;
	}
}
</style>
