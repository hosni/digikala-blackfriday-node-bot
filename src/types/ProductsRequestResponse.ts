
export type ClickImpression = {
	id: number,
	name: string,
	product_url: string,
	[key: string]: string|number|string[],
};

export type TrackerData = {
	[key: string]: string|number|string[],
};

type ProductsRequestResponse = {
	status: boolean,
	data: {
		click_impression: ClickImpression[];
		data_layer: string,
		products: string,
		filters: string,
		trackerData: TrackerData,
	},
}
export default ProductsRequestResponse;
