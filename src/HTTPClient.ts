import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

type Instance = {
	used: number,
	instance: AxiosInstance,
};

export default class HTTPClient {

	protected static inited: boolean = false;
	protected static telegramClient: AxiosInstance = null;
	protected static instances: Instance[] = []

	public static init() {
		if (this.inited) {
			return;
		}
		const socksProxies = [
			'socks://127.0.0.1:9055',

			'socks://127.0.0.1:9060',
			'socks://127.0.0.1:9061',
			'socks://127.0.0.1:9062',
			'socks://127.0.0.1:9063',
			'socks://127.0.0.1:9064',
			'socks://127.0.0.1:9065',
			'socks://127.0.0.1:9066',
			'socks://127.0.0.1:9067',
			'socks://127.0.0.1:9068',

		];
		let isFirst = true;
		for (const sockProxy of socksProxies) {
			const socksProxyAgent = new SocksProxyAgent(sockProxy);
			const axiosConfig: AxiosRequestConfig = {
				httpsAgent: socksProxyAgent,
				httpAgent: socksProxyAgent
			};
			this.instances.push({
				used: 0,
				instance: axios.create(axiosConfig),
			});
			if (isFirst) {
				this.telegramClient = axios.create(axiosConfig);
				isFirst = false;
			}
		}
		this.inited = true;
	}
	public static getClientsCount(): number {
		if (!this.inited) {
			this.init();
		}
		return this.instances.length;
	}
	public static getClient() {
		if (!this.inited) {
			this.init();
		}
		let lastItem: Instance = null;
		for (const item of this.instances) {
			if (!lastItem) {
				lastItem = item;
				continue;
			}
			if (item.used < lastItem.used) {
				lastItem = item;
			}
		}
		lastItem.used++;
		return lastItem ? lastItem.instance : null;
	}

	public static getDigiKalaDefaultHeaders() {
		return {
			'authority': 'www.digikala.com',
			'pragma': 'no-cache',
			'cache-control': 'no-cache',
			'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Microsoft Edge";v="96"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Windows"',
			'dnt': '1',
			'upgrade-insecure-requests': '1',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36 Edg/96.0.1054.29',
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'sec-fetch-site': 'none',
			'sec-fetch-mode': 'navigate',
			'sec-fetch-user': '?1',
			'sec-fetch-dest': 'document',
			'accept-language': 'en-US,en;q=0.9,fa;q=0.8',
		};
	}

	public static getClientForTelegram() {
		return this.telegramClient;
	}
}
