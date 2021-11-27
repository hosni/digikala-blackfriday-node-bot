
export type Product = {
	id: number,
	category_id: number,
	title_fa: string,
	title_en: string,
	images: {
		main: string,
		image_list: [],
	},
};

type GetProductRequestResponse = {
	status: boolean,
	data: {
		product: Product;
		banners: any[],
		widgets: any[],
		recommendation: {
			related_products: Product[],
			also_bought_products: Product[],
		},
	},
}
export default GetProductRequestResponse;
