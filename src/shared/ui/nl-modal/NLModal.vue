<script setup>
import { ref, useTemplateRef } from 'vue';
import { XIcon } from '../icons';

const emit = defineEmits(['open', 'close']);
const overlayRef = useTemplateRef('overlay');

const props = defineProps({
	isOpen: {
		type: Boolean,
		default() {
			return false;
		},
	},
	showClose: {
		type: Boolean,
		default() {
			return true;
		},
	},
});
const isOpen = ref(props.isOpen);
function clickOutsideHandle(e) {
	if (!overlayRef.value || !e.target.contains(overlayRef.value)) {
		return;
	}

	closeModal();
}

function closeModal() {
	isOpen.value = false;
	emit('close');
}

function openModal() {
	isOpen.value = true;
	emit('close');
}
</script>
<template>
	<div class="modal-wrapper">
		<Teleport to="body">
			<template v-if="isOpen">
				<div ref="overlay" class="nl-modal__overlay" @click.stop="clickOutsideHandle">
					<div ref="modal" class="nl-modal">
						<div v-if="showClose" class="nl-modal__header flex justify-end items-center">
							<button @click="closeModal" class="nl-modal__close-btn flex justify-end items-center">
								<XIcon :size="16" />
							</button>
						</div>
						<div class="nl-modal__inner">
							<slot :close-modal="closeModal" />
						</div>
					</div>
				</div>
			</template>
		</Teleport>
		<slot name="trigger" :open-modal="openModal" />
	</div>
</template>
<style>
.nl-modal__overlay {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
	background-color: rgba(53, 54, 71, 0.79);
}

.nl-modal__header {
	padding: 16px 16px 0 16px;

	border-radius: var(--nl-border-radius) var(--nl-border-radius) 0 0;
}

.nl-modal {
	border-radius: var(--nl-border-radius);
	background-color: white;
	max-width: 90%;
	border: 1px solid rgba(53, 54, 71, 1);
	box-shadow: 0 10px 10px 0 rgba(151, 151, 151, 0.5);
}

.nl-modal__inner {
	padding: 0 16px 32px 16px;
}

.nl-modal__close-btn {
	color: var(--nl-text-light-color);
	cursor: pointer;

	&:hover {
		color: var(--nl-text-color);
	}
}
</style>
