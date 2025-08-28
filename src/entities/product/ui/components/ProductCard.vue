<script setup>
import { NLButton } from '@/shared/ui';

defineProps({
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	categoryName: {
		type: String,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	price: {
		type: [String, Number],
		required: true,
	},
	available: {
		type: Boolean,
		required: true,
	},
});
</script>
<template>
	<div class="product-card">
		<img :src="imageUrl" width="100%" />
		<div class="product-details">
			<div class="product-details__category-name">
				{{ categoryName }}
			</div>
			<router-link to="#" class="product-details__name" :title="name">
				{{ name }}
			</router-link>
			<div class="product-details__comment">
				{{ comment }}
			</div>
			<div class="product-details__price">{{ price }} ₽</div>
			<NLButton :disabled="!available" class="btn-to-cart" :label="available ? 'В корзину' : 'Нет в наличии'" />
		</div>
	</div>
</template>
<style>
.product-card {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;
	background-color: white;
	align-items: center;
	box-shadow: 0px 2px 10px 0px #97979733;
	font-family: 'Futura PT DEMI';
	&:hover {
		box-shadow: 0px 4px 24px 0px #97979755;
	}
}
.btn-to-cart {
	margin-top: 16px;
}
.product-details {
	padding: 6px 24px 18px 24px;
	text-align: center;
	width: 100%;
	flex-grow: 1;
}

.product-details__category-name,
.product-details__name,
.product-details__comment,
.product-details__price {
	overflow: hidden;
	text-overflow: ellipsis;
}

.product-details__category-name {
	margin-top: 6px;
	font-size: 14px;
	line-height: 14px;
	font-family: 'Futura PT';
	font-weight: 300;
	text-align: center;
	display: block;
	height: 14px;
	color: #979797;
}

.product-details__name {
	display: block;
	margin-top: 4px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	text-align: center;
	height: 48px;

	&:hover {
		opacity: 0.6;
		cursor: pointer;
	}
}

.product-details__comment {
	margin-top: 9px;
	font-weight: 400;
	height: 20px;
	font-size: 16px;
	line-height: 20px;
}

.product-details__price {
	margin-top: 14px;
	font-weight: 600;
	font-size: 26px;
	line-height: 24px;
	display: block;
}
</style>
