<script setup>
import { inject, onBeforeMount, onBeforeUnmount, useTemplateRef } from 'vue';
import { SELECET_DATA } from '../lib/provide-inject';

const emit = defineEmits(['select']);

defineProps({
	options: {
		type: Array,
		required: true,
	},
	loading: {
		type: Boolean,
		required: true,
	},
});
const menuRef = useTemplateRef('menu');

const selectData = inject(SELECET_DATA);

function clickOutsideHandle(event) {
	event.preventDefault();
	console.log('on click outside');
	const target = event.target;

	if (!selectData.selectRef.value || !menuRef.value) {
		return;
	}

	if (!selectData.selectRef.value.contains(target) && !menuRef.value.contains(target)) {
		selectData.closeMenu();
	}
}

onBeforeMount(() => {
	document.addEventListener('click', clickOutsideHandle, true);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', clickOutsideHandle, true);
});
</script>
<template>
	<div ref="menu" class="nl-select__menu">
		<div class="nl-select__menu-container">
			<div v-if="loading" class="nl-select__loading">Загрузка...</div>
			<div
				v-else
				v-for="option of options"
				:key="option.value"
				:class="{ '--selected': selectData.isSelected(option) }"
				tabindex="-1"
				role="option"
				class="nl-select__menu-option"
				@click="emit('select', option)"
			>
				{{ option.label }}
			</div>
		</div>
	</div>
</template>
<style>
.nl-select__loading {
	text-align: center;
}

.nl-select__menu-container {
	box-sizing: border-box;
	padding-top: 12px;
	width: 100%;
	height: 100%;
	max-height: 170px;
	overflow-y: auto;
	border-top: 2px solid rgba(151, 151, 151, 0.3);
	scrollbar-width: none;
}

.nl-select__menu {
	position: absolute;
	margin-top: 0;
	width: 100%;
	max-height: 170px;
	min-height: 170px;
	border: var(--nl-border);
	border-color: rgba(39, 39, 39, 1);
	border-radius: 0 0 var(--nl-border-radius) var(--nl-border-radius);
	box-shadow: 0 10px 10px 0 rgba(151, 151, 151, 0.5);
	border-top: 0;
	background-color: var(--nl-background-color);
	z-index: 2;
	box-sizing: border-box;
	padding: 0 12px 12px 12px;
}

.nl-select__menu-option {
	color: var(--nl-text-light-color);
	cursor: pointer;
	font-size: 18px;
	line-height: 24px;
	margin-bottom: 7px;

	&.--selected {
		color: var(--nl-primary-color);
	}

	&:hover {
		color: rgba(39, 39, 39, 1);
		cursor: pointer;
	}
}
</style>
