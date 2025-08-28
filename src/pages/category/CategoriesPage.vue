<script setup>
import { CategoriesList } from '@/features/categories-list';
</script>
<template>
	<div class="app-page">
		<div class="container">
			<CategoriesList style="margin-top: 35px" />
		</div>
	</div>
</template>
<style>
.app-page {
	height: calc(100vh - var(--header-height));
}
</style>
