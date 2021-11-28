import HTTPClient from "./HTTPClient";

export default class Logger {
	public static log(...data: any[]) {
		console.log(...data, "\n");
		this.telegramAlert(JSON.stringify(data), false);
	}
	public static info(...data: any[]) {
		console.info(...data, "\n");
		this.telegramAlert(JSON.stringify(data), false);
	}
	public static warn(...data: any[]) {
		console.warn(...data, "\n");
		this.telegramAlert(JSON.stringify(data), false);
	}
	public static debug(...data: any[]) {
		console.debug(...data, "\n");
	}
	public static error(...data: any[]) {
		console.error(...data, "\n");
		this.telegramAlert(JSON.stringify(data), false);
	}

	public static telegramAlert(message: string, notifyToMe: boolean = true) {
		const client = HTTPClient.getClientForTelegram();
		if (client) {
			const telegramToken = 'PUT_YOUR_BOT_API_TOKEN_HERE';

			const chatIDs = [
				// put channels or groups chat id here
			];
			if (notifyToMe) {
				// put your personal chat id here!
				// chatIDs.push('REPLACE_WITH_YOU_CHAT_ID');
			}
			const sendRequest = (chatID: string|number) => {
				const now = (new Date).toLocaleString('fa-IR', {});
				client.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
					chat_id: chatID,
					text: `[${now}]\n${message}`,
				}).catch((err) => {
					console.warn(`can not notify by telegram! try again, message: ${message}`, err);
					// sendRequest(chatID);
				});
			}
			for (const chatID of chatIDs) {
				sendRequest(chatID);
			}
		} else {
			console.error("there is no telegram client!");
		}
	}
}
