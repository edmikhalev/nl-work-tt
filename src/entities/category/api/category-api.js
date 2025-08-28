import { useApi } from '@/shared/lib';

const { get } = useApi();

const mapCategoriesFromApi = (categories) =>
	categories.map(({ id, name, text_color, api_url, image, slug, children }) => ({
		id,
		name,
		apiUrl: api_url,
		textColor: text_color,
		image,
		slug,
		children: children?.length ? mapCategoriesFromApi(children) : [],
	}));

export const categoryApi = {
	async fetchCategories(cityId) {
		const categories = await get(`menutags/?city_id=${cityId}`);
		return mapCategoriesFromApi(categories.tags);
	},
};
