<script setup>
defineProps({
	size: {
		type: Number,
		default: 12,
	},
});
</script>
<template>
	<svg :width="size" :height="size" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M10.815 0L6 4.815L1.184 0L0 1.184L4.815 5.999L0 10.815L1.184 12L6 7.185L10.815 12L11.999 10.815L7.184 5.999L11.999 1.184L10.815 0Z"
			fill="currentColor"
		/>
	</svg>
</template>
