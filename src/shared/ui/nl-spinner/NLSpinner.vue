<script setup>
defineProps({
	size: [Number, String],
	border: {
		type: [Number, String],
		default: 2,
	},
});
</script>
<template>
	<div class="nl-spinner__wrapper">
		<slot>
			<span></span>
		</slot>
		<span
			class="nl-spinner"
			:style="`width: ${parseInt(size)}px;height: ${parseInt(size)}px;border-width:${parseInt(border)}px`"
		></span>
	</div>
</template>
<style>
.nl-spinner__wrapper {
	display: inline-flex;
	align-items: center;
	gap: 6px;
}

.nl-spinner {
	width: 48px;
	height: 48px;
	border-color: #393939;
	border-style: solid;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
