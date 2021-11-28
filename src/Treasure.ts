
type TreasureInfo = {
	productID: number,
	startAt: number,
	endAt: number,
}

export default class Treasure {
	public static readonly treasures: TreasureInfo[] = [
		{
			productID: 3738470, // کنسول بازی سونی مدل Playstation 5 Digital Edition ظرفیت 825 گیگابایت
			startAt: 1638030600, // 1400/09/06 20:00:00
			endAt: 1638041400, // 1400/09/06 23:00:00
		},
		{
			productID: 984129, // کنسول بازی سونی مدل Playstation 4 Slim کد Region 2 CUH-2216B ظرفیت یک ترابایت
			startAt: 1638081000, // 1400/09/07 10:00:00
			endAt: 1638095400, // 1400/09/07 14:00:00
		},
		{
			productID: 6439357, // تبلت سامسونگ مدل Galaxy Tab S7 FE LTE SM-T735 ظرفیت 64 گیگابایت
			startAt: 1638095400, // 1400/09/07 14:00:00
			endAt: 1638109800, // 1400/09/07 18:00:00
		},
		{
			productID: 6459793, // گوشی موبایل اپل مدل iPhone 13 A2634 دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 4 گیگابایت 
			startAt: 1638109800, // 1400/09/07 18:00:00
			endAt: 1638124200, // 1400/09/07 22:00:00
		},
		{
			productID: 4958276, // گوشی موبایل شیائومی مدل POCO X3 Pro M2102J20SG دو سیم‌ کارت ظرفیت 256 گیگابایت و 8 گیگابایت رم 
			startAt: 1638124200, // 1400/09/07 22:00:00
			endAt: 1638167400, // 1400/09/08 10:00:00
		},
		{
			productID: 2246971, // هارد اکسترنال ای دیتا مدل HD770G ظرفیت 1 ترابایت
			startAt: 1638167400, // 1400/09/08 10:00:00
			endAt: 1638196200, // 1400/09/08 18:00:00
		},
		{
			productID: 4245216, //  هدفون بی سیم سامسونگ مدل Galaxy Buds Pro 
			startAt: 1638196200, // 1400/09/08 18:00:00
			endAt: 1638253800, // 1400/09/09 10:00:00
		},
		{
			productID: 4122136, //  گوشی موبایل سامسونگ مدل Galaxy A12 SM-A125F/DS دو سیم کارت ظرفیت 64 گیگابایت 
			startAt: 1638253800, // 1400/09/09 10:00:00
			endAt: 1638282600, // 1400/09/09 18:00:00
		},
		{
			productID: 3340848, //  تلویزیون ال ای دی هوشمند ایکس ویژن مدل 43XT745 سایز 43 اینچ 
			startAt: 1638282600, // 1400/09/09 18:00:00
			endAt: 0,
		},
	];
	public static getActiveProductInfo(): TreasureInfo {
		const now = Math.floor(Date.now() / 1000);
		for (const treasure of this.treasures) {
			if (treasure.startAt <= now && now < treasure.endAt) {
				return treasure;
			}
		}
		return null;
	}
}
