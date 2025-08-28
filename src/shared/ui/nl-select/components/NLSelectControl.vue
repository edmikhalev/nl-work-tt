<script setup>
import XIcon from '../../icons/XIcon.vue';
const emit = defineEmits(['clear']);
</script>
<template>
	<div class="nl-select__control">
		<button class="nl-select__clear-btn" @click.stop="emit('clear')">
			<XIcon />
		</button>
	</div>
</template>
<style>
.nl-select__clear-btn {
	display: inline-block;
	width: 20px;
	height: 20px;
	color: var(--text-color);
	cursor: pointer;
	&:hover {
		color: var(--nl-text-light-color);
	}
}
</style>
