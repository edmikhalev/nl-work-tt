import CategoriesPage from '@/pages/category/CategoriesPage.vue';
const routes = [
	{
		path: '/',
		component: CategoriesPage,
		meta: {
			title: 'Категории',
		},
	},
	{
		path: '/category/:slug/:subcategorySlug?',
		name: 'CategoryPage',
		meta: {
			title: 'Категория',
		},
		component: () => import('@/pages/category/CategoryPage.vue'),
	},
];

export { routes };
