
# Digikala Treasure Hunt Bot (شکار گنج دیجی‌کالا)

A Node.js/TypeScript bot for automating the "Treasure Hunt" challenge by دیجی‌کالا, Iran's largest online store.

## What is the Treasure Hunt Challenge?
In the "شکار گنج" (Treasure Hunt) event, دیجی‌کالا hides a special discount code (up to 99% off) inside one image of a product among thousands. Each challenge features a high-value prize (e.g., iPhone, PlayStation) and runs for a limited time. Users must manually browse ~200 pages (25 products per page), open each product, and inspect all images to find the code.

[![digikala-hunted-1](assets/images/digikala-hunted-1.jpg)](https://www.digikala.com/product/dkp-2739876/)

## What Does This Bot Do?

- **Automates product scanning:** Fetches all products in the treasure hunt event.
- **Identifies treasure images by filename:** Instead of downloading or analyzing image content, the bot checks the timestamp embedded in each image's filename to find the treasure image.
- **Supports multiple challenges:** Handles different products and time windows as defined in `src/Treasure.ts`.
- **Telegram alerts:** Notifies via Telegram when a potential treasure image is found (requires bot token and chat ID).
- **Proxy support:** Uses SOCKS proxies for distributed requests.

## How Does It Work?

1. **Challenge Schedule:** Each challenge (product, start/end time) is defined in `src/Treasure.ts`.
2. **Product Fetching:** Bot fetches all products for the active challenge using Digikala's API.
3. **Image Identification:** For each product, all image filenames are checked. The bot looks for a timestamp in the filename that matches the challenge time window. If found, the image is flagged as a possible treasure image.
4. **Notification:** If a suspicious image is found, a Telegram alert is sent (see `Logger.ts`).
5. **Manual Review:** You must manually review flagged images for the actual discount code.

### Timestamp Analysis Algorithm

Digikala's challenge hides a discount code in one product image. Instead of looking at the image itself, this bot finds the treasure by checking the image filename:

1. For each product, the bot gets all image URLs.
2. Each image filename contains a timestamp (e.g., `abcdef_1638030600.jpg`).
3. The bot extracts the timestamp from the filename.
4. It compares this timestamp to the challenge's start time.
5. If the timestamp matches or is newer than the challenge start, the bot flags the image and sends a Telegram alert.

**Why does this work?**
Digikala's system names the treasure image with a timestamp that matches the challenge start. This means you can find the treasure image just by checking filenames—no need to look at the images themselves. This shortcut was a flaw in the challenge design, only noticed after the event ended.

## Project Structure

- `src/Main.ts`: Main logic for scanning products and images.
- `src/Treasure.ts`: Challenge schedule and prize definitions.
- `src/HTTPClient.ts`: HTTP client with proxy support.
- `src/Logger.ts`: Logging and Telegram alert integration.
- `src/types/`: Type definitions for product and API responses.
- `data/treasure-hunt_products.json`: Sample product data for testing.
- `assets/images/`: Example images used in the challenge

## Setup & Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure Telegram alerts:**
   - Edit `src/Logger.ts` and add your bot token and chat/channel IDs.
3. **Build the project:**
   ```sh
   npm run build
   ```
4. **Run the bot:**
   ```sh
   npm start
   ```

## Notes

- **Images:** Example images are in `assets/images/`. The `octane booster` image (`digikala-octane-booster.jpg`) is a joke and not a real treasure image.
- **Proxy:** The bot uses multiple SOCKS proxies for faster scanning. Configure proxies in `src/HTTPClient.ts`.
- **No image download or analysis:** The bot does not download or analyze image content. It simply checks the timestamp in the image filename.
- **Challenge flaw (سووتی):** The Digikala team did not realize this technical shortcut at first, but after the challenge ended, they recognized that the treasure image could be found by filename timestamp rather than manual inspection. This was a major oversight in the challenge design.

   ![اکتان بوستر](assets/images/digikala-octane-booster.jpg)

## Contributing

Thinking about contributing? This project captured a unique moment in tech history. If you have creative ideas, want to add a twist, or just enjoy legendary code, you know where the PR button is. No pressure—just legendary vibes!

## License

ISC
