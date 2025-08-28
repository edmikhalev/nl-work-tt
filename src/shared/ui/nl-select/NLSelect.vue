<script setup>
import { computed, provide, ref, useTemplateRef, watch } from 'vue';
import { createUID } from './lib/uid';
import NlSelectControl from './components/NLSelectControl.vue';
import { NLSelectMenu } from './components';
import { SELECET_DATA } from './lib/provide-inject';

defineProps({
	options: {
		type: Array,
		default() {
			return [];
		},
	},
	loading: Boolean,
});

const emit = defineEmits(['menuOpened', 'menuClosed', 'search', 'select', 'clear']);

const searchInputRef = useTemplateRef('searchInput');
const selectRef = useTemplateRef('select');

const selected = defineModel({ required: true });

const search = ref('');
const menuOpen = ref(false);
const isTyping = computed(() => search.value.length > 0);

const isSelected = (option) => option.value === selected.value?.value;

function openMenu() {
	menuOpen.value = true;

	if (searchInputRef.value) {
		searchInputRef.value.focus();
	}

	emit('menuOpened');
}

function closeMenu() {
	menuOpen.value = false;
	search.value = '';
	emit('search', '');
	emit('menuClosed');
}

function optionSelectHandle(option) {
	selected.value = option;
	closeMenu();
	emit('select', option);
}

function controlClickHandle() {
	openMenu();
}

function clearHandle() {
	selected.value = undefined;
	emit('clear');

	if (menuOpen.value) closeMenu();

	if (searchInputRef.value) {
		searchInputRef.value.blur();
	}
}

watch(
	() => search.value,
	() => {
		if (search.value) {
			emit('search', search.value);

			if (!menuOpen.value) {
				openMenu();
			}
		}
	},
);

provide(SELECET_DATA, {
	closeMenu,
	selectRef,
	isSelected,
});
</script>

<template>
	<div ref="select" class="nl-select">
		<div
			class="nl-select__inner"
			:class="{ '--is-open': menuOpen, '--typing': isTyping }"
			@click="controlClickHandle"
		>
			<div class="nl-select__value-wrapper">
				<div class="nl-select__input-wrapper" :class="{ '--typing': isTyping }">
					<input
						v-model="search"
						:id="`nl-select__input_${createUID()}`"
						ref="searchInput"
						class="nl-select__search-input"
						autocapitalize="none"
						autocomplete="off"
						autocorrect="off"
						spellcheck="false"
						tabindex="0"
						type="text"
						@mousedown="openMenu()"
					/>
				</div>
				<div class="nl-select__value" v-if="selected && !isTyping">
					{{ selected.label }}
				</div>
				<NlSelectControl v-if="selected || isTyping" @clear="clearHandle" />
			</div>
		</div>
		<NLSelectMenu v-if="menuOpen" :options="options" :loading="loading" @select="optionSelectHandle" />
	</div>
</template>
<style>
:root {
	--nl-border: 1px solid rgba(151, 151, 151, 0.5);
	--nl-background-color: #fff;
}

.nl-select__value-wrapper {
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	padding: 12px 16px 13px 16px;
	width: 100%;
}

.nl-select {
	position: relative;
	box-sizing: border-box;
	width: 100%;
}

.nl-select__value {
	font-size: 18px;
	line-height: 24px;
	display: block;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex-grow: 1;
	transform: translateX(-2px);
}

.nl-select__inner {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	flex-grow: 1;
	width: 100%;
	justify-content: space-between;
	min-height: 48px;
	border: var(--nl-border);
	border-radius: var(--nl-border-radius);
	background-color: var(--vs-background-color);

	&.--is-open {
		border-radius: var(--nl-border-radius) var(--nl-border-radius) 0 0;
		border-bottom: 0;
		border-color: var(--text-color);
	}

	&.--typing {
		.nl-select__value {
			opacity: 0;
		}
	}
}

.nl-select__input-wrapper {
	display: flex;
	flex: 0 1 0%;

	&.--typing {
		flex: 1 0 0%;
	}
}

.nl-select__search-input {
	min-width: 2px;
	width: 100%;
	font-size: 18px;
	background: none;
	background: 0px center;
	line-height: 23px;
	color: var(--text-color);
	font-weight: 400;
	flex-grow: 0;
	flex-shrink: 1;
}
</style>
