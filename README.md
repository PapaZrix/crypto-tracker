# Crypto Tracker

This is my first full project in Next.js 13+ (app router) and Typescript. On Crypto Tracker, you can check an individual cryptocurrency coins current price as well as its market movement, including a graphical representation of the selected time span. In case you don't know any, a list of the 200 most popular ones is available on the /popular tab or any of the trending coins shown on the landing page.

\*\* NOTE - Coingecko's API has a per minute request limit so it's quite possible that you'll face an error either loading a coins page, its graph data or the popular table. All errors are handled and provide redirection to either try rerendering the page or to go the landing page. Thank you for understanding.

![Landing page](/public/assets/readme/crypto.png)

## Built with

- [Next.js 14](https://nextjs.org/) - web framework
- [Typescript](https://www.typescriptlang.org/) - type safety
- [Tailwind CSS](https://tailwindcss.com/) - styling
- [Recharts](https://recharts.org/en-US/) - graph

## Features

### Search

- Search for all available coins on the search bar in the header, and click on it to navigate to its individual page.

![Search functionality](/public/assets/readme//search.gif)

### Light / Dark Mode

- Switch to your prefered mode in the theme switcher also located in the header. Your preference gets saved locally so you don't have to worry about changing it every time.

![Theme switcher](/public/assets/readme//theme.gif)

### Individual coin page, e.g. Bitcoin

- Search for a coin on the search bar, click on it and navigate to its page. From there, check its current price, price history, general information and description as well as graphical representation of its price movement for a provided time span.

![Coin page](/public/assets/readme//coin.gif)

### Popular coins table

- Click on the popular tab in the header and check out the top 200 coins by market cap, change the filter as you'd like.

![Popular table](/public/assets/readme//popular.gif)

### Exchanges table

- Check out the top cryptocurrency exchanges and go to their website to trade

![Exchange table](/public/assets/readme//exchanges.gif)

## Work in progress

- As there is no free and reliable crypto news API, I plan on scraping a couple crypto news outlets (Cointelegraph, Coindesk, etc.) and serving that data either in a separate tab or somewhere on the landing page.
