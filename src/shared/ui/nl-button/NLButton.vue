<script setup>
defineProps({
	label: {
		type: String,
		default: '',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	uppercase: {
		type: Boolean,
		default: false,
	},

	text: {
		type: Boolean,
		default: false,
	},
});
</script>
<template>
	<button
		:disabled="disabled"
		class="nl-button"
		@click="closeModal"
		:class="{ '--text': text, '--uppercase': uppercase }"
	>
		<slot name="leftIcon" />
		<slot>
			<span>{{ label }}</span>
		</slot>
		<slot name="rightIcon" />
	</button>
</template>
<style>
.nl-button {
	--btn-backlight-width: 90%;
	--btn-backlight-height: 24px;
	background: linear-gradient(270deg, #ffa800 0%, #ff6f00 100%);
	width: 100%;
	text-align: center;
	width: 100%;
	height: 40px;
	border-radius: 24px;
	color: white;
	font-weight: 600;
	font-size: 18px;
	line-height: 24px;
	font-family: 'Futura PT DEMI';
	position: relative;
	z-index: 0;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	padding: 12px 24px;
	&::before {
		content: '';
		position: absolute;
		width: var(--btn-backlight-width);
		left: 0;
		margin-left: calc((100% - var(--btn-backlight-width)) / 2);
		height: 24px;
		transform: translateY(40%);
		border-radius: 24px;
		z-index: -1;
		background: linear-gradient(90deg, rgba(255, 111, 0, 1), rgba(255, 168, 0, 1));
		filter: blur(17.18px);
	}

	&.--text {
		background: none;
		color: var(--nl-text-color);

		&::before {
			display: none;
		}
	}

	&.--uppercase {
		text-transform: uppercase;
		letter-spacing: 1.75px;
		font-size: 16px;
		line-height: 21px;
		height: 48px;
	}

	&:hover {
		cursor: pointer;
		will-change: transform;
		&::before {
			transition: 120ms ease-out;
			transform: scale(1.1);
		}
	}

	&:disabled {
		background: #fff;
		border: 1px solid #9797974d;
		color: #27272780;

		&::before {
			background: none;
			filter: none;
		}

		&:hover {
			cursor: not-allowed;
		}
	}
}
</style>
