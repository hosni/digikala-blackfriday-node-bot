
import * as path from "path";
import HTTPClient from './HTTPClient';
import Logger from './Logger';
import Treasure from './Treasure';
import GetProductRequestResponse from './types/GetProductRequestResponse';
import ProductsRequestResponse, { ClickImpression } from './types/ProductsRequestResponse';

export default class Main {

	public static clickImpressions: {[key: number]: ClickImpression} = {};
	public static interestedImages: {[key: string]: string[]} = {};

	public static async run() {
		console.log(Treasure.getActiveProductInfo());
		Logger.log('DigiKala Black Friday starts working!');

		let lastUpdate = Math.floor(Date.now() / 1000);
		const updateProducts = async () => {
			lastUpdate = Math.floor(Date.now() / 1000);
			await this.getProducts();
			Logger.log("count of: this.clickImpressions is", Object.keys(this.clickImpressions).length);
		};
		await updateProducts();

		while (true) {
			const now = Math.floor(Date.now() / 1000);
			if (now - lastUpdate > 1800) {
				await updateProducts();
			}
			await this.checkProducts();
		}
	}

	public static async checkProducts() {
		const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

		const requester = (productID: number): Promise<void> => {
			Logger.debug(`Main.checkProducts.requester, id: ${productID}`);
			return HTTPClient.getClient().get(`https://sirius.digikala.com/v1/product/${productID}/`, {
				headers: HTTPClient.getDigiKalaDefaultHeaders(),
			}).then((res) => {
				const data = res.data as GetProductRequestResponse;
				Logger.debug(
					`Main.checkProducts.requester, id: ${productID}, then: data.data.product.images.image_list: ${JSON.stringify(data.data.product.images.image_list)}`
				);
				for (const imagePath of data.data.product.images.image_list) {
					const url = new URL(imagePath);
					const goodUrl = url.protocol + '://' + url.hostname + url.pathname;
					const baseName = path.basename(goodUrl);

					const underscore = baseName.indexOf('_');
					const hash = baseName.substring(0, underscore);
					const timestampString = baseName.substring(underscore + 1, baseName.indexOf('.'));
					const timestamp = parseInt(timestampString, 10);

					const activeProductInfo = Treasure.getActiveProductInfo();
					console.log("activeProductInfo", activeProductInfo)
					Logger.debug(`Main.checkProducts.requester, id: ${productID}, image: ${imagePath}, activeProductInfo: ${activeProductInfo}`);

					if (activeProductInfo && timestamp >= activeProductInfo.startAt) {
						this.interestedImages[productID] = this.interestedImages[productID] || [];
						this.interestedImages[productID].push(imagePath);
						Logger.warn(`Main.checkProducts.requester, id: ${productID}, find image: ${imagePath} , active product: ${activeProductInfo.productID}`);
						Logger.telegramAlert(
							`(Main.checkProducts.requester)\nHEY!\n Check this image!\n` +
							`image: ${imagePath}\n` +
							`product: https://www.digikala.com/product/dkp-${productID} \n` + 
							`active product id: ${activeProductInfo.productID} \n` +
							`link to active product: https://www.digikala.com/product/dkp-${activeProductInfo.productID}`,
							true
						);
					}
				}
			}).catch((err) => {
				Logger.debug(`Main.checkProducts.requester, id: ${productID}, catch:`, err);
			});
		};

		let promises = [];
		for (const index in this.clickImpressions) {
			const clickImpression = this.clickImpressions[index];
			const activeProductInfo = Treasure.getActiveProductInfo();
			if (!activeProductInfo) {
				Logger.warn('There is no active product!, wait for 2 seconds...');
				await delay(2000) /// waiting 3 second.
				break;
			}
			const promise = requester(clickImpression.id);
			promises.push(promise);
			if (promises.length >= HTTPClient.getClientsCount() * 1) {
				await Promise.race(promises);
				await delay(200);
				promises = [];
			}
		}
	}

	public static getProducts() {
		const promises = [];
		const requester = (pageNumber: number): Promise<void> => {
			Logger.debug(`Main.getProducts, page: ${pageNumber}`);
			return HTTPClient.getClient().get('https://www.digikala.com/ajax/treasure-hunt/products', {
				headers: HTTPClient.getDigiKalaDefaultHeaders(),
				params: {
					pageno: pageNumber,
					sortby: 4,
				},
			}).then((res) => {
				const data = res.data as ProductsRequestResponse;
				Logger.debug(
					`Main.getProducts, page: ${pageNumber}, then:data.data.click_impression.lenght: ${data.data.click_impression.length}`
				);
				for (const clickImpression of data.data.click_impression) {
					this.clickImpressions[clickImpression.id] = clickImpression;
				}
			}).catch((err) => {
				Logger.debug(`Main.getProducts: page: ${pageNumber}, catch:`, err);
			});
		};
		for (let pageNumber = 1; pageNumber <= 47; pageNumber++) {
			promises.push(requester(pageNumber));
		}
		return Promise.all(promises);
	}

}
Main.run();

