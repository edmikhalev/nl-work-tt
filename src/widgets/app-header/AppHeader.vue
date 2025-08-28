<script setup>
import { SelectCity } from '@/features/select-city';
</script>

<template>
	<header class="app-header">
		<div class="container">
			<SelectCity />
		</div>
	</header>
</template>

<style>
.app-header {
	width: 100%;
	height: 72px;
	display: flex;
	align-items: center;
	background-color: var(--c-white);
	box-shadow: 0 2px 4px rgba(39, 39, 39, 0.1);
	position: absolute;
}
</style>
