import { useApi } from '@/shared/lib';

const { get } = useApi();

const createProduct = ({
	main_image_thumb_300,
	present_name,
	comment_name,
	price,
	tags,
	category,
	allowed,
	available,
}) => ({
	price,
	imageUrl: main_image_thumb_300,
	categoryName: category.name,
	available: allowed && available,
	name: present_name,
	comment: comment_name,
	categoryIds: tags.map((tag) => tag.id),
	categorySlugs: tags.map((tag) => tag.slug),
});
const mapProductsFromApi = (products) => products.map(createProduct);

export const productApi = {
	async fetchProducts(slug, cityId) {
		const { products } = await get(`menutags/${slug}?city_id=${cityId}`);
		return mapProductsFromApi(products);
	},
};
