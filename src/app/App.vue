<script setup>
import { AppHeader } from '@/widgets/app-header';
</script>

<template>
	<AppHeader />
	<main class="app-main">
		<router-view />
	</main>
</template>

<style>
.app-main {
	padding: 72px 0 0 0;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
</style>
