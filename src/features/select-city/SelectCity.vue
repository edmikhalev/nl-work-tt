<script setup lang="ts">
import { NLSelect, NLModal, NLButton } from '@/shared/ui';
import { storeToRefs } from 'pinia';
import { useCityStore } from '@/entities';
import { debounce } from '@/shared/lib';
import { computed, ref } from 'vue';
import { PinIcon } from '@/shared/ui/icons';
import { useRouter } from 'vue-router';

const router = useRouter();
const MIN_LENGTH_CITY_SEARCH_TERM = 3;

const cityStore = useCityStore();
cityStore.loadPersistentOrGetDefault();

const { currentCity, citiesList, loading } = storeToRefs(cityStore);
const selectedCity = ref();

async function searchCity(term) {
	if (term.length < MIN_LENGTH_CITY_SEARCH_TERM) {
		return;
	}
	await cityStore.searchCity(term);
}

const searchCityHandle = debounce(searchCity, 600);

const citiesOptions = computed(() =>
	citiesList.value.map(({ id, city, label }) => ({
		label,
		city,
		value: id,
	})),
);

const acceptCityHandle = (callback) => {
	cityStore.setCity(selectedCity.value);
	selectedCity.value = undefined;
	callback();
	router.push('/');
};

const selectCityHandle = (newCity) => {
	selectedCity.value = newCity;
};
</script>

<template>
	<NLModal>
		<template #default="{ closeModal }">
			<div class="text-lg" style="margin-bottom: 12px; font-weight: 600">Выбор населённого пункта:</div>
			<div class="select-city" style="gap: 18px">
				<NLSelect
					:model-value="selectedCity || currentCity"
					:options="citiesOptions"
					:loading="loading"
					class="select-city__input"
					@search="searchCityHandle"
					@update:model-value="selectCityHandle"
				/>

				<NLButton
					:disabled="!selectedCity || currentCity?.value === selectedCity?.value"
					label="Подтвердить"
					class="btn-accept"
					uppercase
					@click="() => acceptCityHandle(closeModal)"
				/>
			</div>
		</template>
		<template #trigger="{ openModal }">
			<NLButton text @click="openModal" style="padding: 0; width: fit-content">
				<template #leftIcon>
					<PinIcon />
				</template>

				<span class="btn-trigger">{{ currentCity?.city }}</span>
			</NLButton>
		</template>
	</NLModal>
</template>

<style>
.select-city {
	display: flex;
}
.btn-trigger {
	font-weight: 600;
	font-size: 15px;
	line-height: 24px;
	letter-spacing: 0px;
}
.selet-city {
	display: flex;
}
.btn-accept {
	max-width: 174px;
}
.select-city__input {
	width: 540px;
}

@media (max-width: 768px) {
	.select-city__input {
		width: 100%;
		min-width: 100%;
		flex-grow: 1;
	}
	.select-city {
		flex-direction: column;
	}
	.btn-accept {
		max-width: 100%;
	}
}
</style>
