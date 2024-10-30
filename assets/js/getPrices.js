import { currencySettings } from "./changeCurrency.js"

let tickersUSD = [
    {
        name: 'Bitcoin/USD',
        symbol: 'BTC-USD'
    },
    {
        name: 'Stellar/USD',
        symbol: 'XLM-USD'
    },
    {
        name: 'Ethereum/USD',
        symbol: 'ETH-USD'
    },
    {
        name: 'Tether/USD',
        symbol: 'USDT-USD'
    },
    {
        name: 'Binance Coin/USD',
        symbol: 'BNB-USD'
    },
    {
        name: 'USD Coin/USD',
        symbol: 'USDC-USD'
    },
    {
        name: 'XRP/USD',
        symbol: 'XRP-USD'
    },
    {
        name: 'Cardano/USD',
        symbol: 'ADA-USD'
    },
    {
        name: 'Aptos/USD',
        symbol: 'APT-USD'
    },
    {
        name: 'Polygon/USD',
        symbol: 'MATIC-USD'
    },
    {
        name: 'OKB/USD',
        symbol: 'OKB-USD'
    },
    {
        name: 'Solana/USD',
        symbol: 'SOL-USD'
    },
    {
        name: 'Dogecoin/USD',
        symbol: 'DOGE-USD'
    },
    {
        name: 'Staked Ether/USD',
        symbol: 'STETH-USD'
    },
    {
        name: 'Polkadot/USD',
        symbol: 'DOT-USD'
    },
    {
        name: 'Chainlink/USD',
        symbol: 'LINK-USD'
    },
    {
        name: 'Avalanche/USD',
        symbol: 'AVAX-USD'
    },
    {
        name: 'Shiba Inu/USD',
        symbol: 'SHIB-USD'
    },
    {
        name: 'WETH/USD',
        symbol: 'WETH-USD'
    },
    {
        name: 'Ethereum Classic/USD',
        symbol: 'ETC-USD'
    },
    {
        name: 'Toncoin/USD',
        symbol: 'TON-USD'
    },
    {
        name: 'Ethereum/USD',
        symbol: 'ETH-USD'
    },
    {
        name: 'Monero/USD',
        symbol: 'XMR-USD'
    },
    {
        name: 'OKB/USD',
        symbol: 'OKB-USD'
    },
    {
        name: 'Bitcoin Cash/USD',
        symbol: 'BCH-USD'
    },
    {
        name: 'Filecoin/USD',
        symbol: 'FIL-USD'
    },
    {
        name: 'Hedera/USD',
        symbol: 'HBAR-USD'
    }
]

let pricesUSD = [
    {
        name: 'Bitcoin/USD',
        symbol: 'BTC-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/bitcoin.df7c9480.svg"
    },
    {
        name: 'Ethereum/USD',
        symbol: 'ETH-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/ethereum.57ab686e.svg"
    },
    {
        name: 'Binance Coin/USD',
        symbol: 'BNB-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/bnb.109d70ce.svg"
    },
    {
        name: 'XRP/USD',
        symbol: 'XRP-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/xrp.c351e318.svg"
    },
    {
        name: 'Cardano/USD',
        symbol: 'ADA-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/ada.4b11b055.svg"
    },
    {
        name: 'Aptos/USD',
        symbol: 'APT-USD',
        img: "https://www.cryptocompare.com/media/43881360/apt.png"
    },
    {
        name: 'Polygon/USD',
        symbol: 'MATIC-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/okb.f00e7113.svg"
    },
    {
        name: 'Solana/USD',
        symbol: 'SOL-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/sol.8e2ae057.svg"
    },
    {
        name: 'Dogecoin/USD',
        symbol: 'DOGE-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/doge.60836ae5.svg"
    }
]

let buyTradeUSD = [
    {
        name: 'Bitcoin/USD',
        symbol: 'BTC-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/bitcoin.df7c9480.svg"
    },
    {
        name: 'Ethereum/USD',
        symbol: 'ETH-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/ethereum.57ab686e.svg"
    },
    {
        name: 'Stellar/USD',
        symbol: 'XLM-USD',
        img: "	https://www.blockchain.com/explorer/_next/static/media/xlm.5a72c608.svg"
    },
    {
        name: 'Solana/USD',
        symbol: 'SOL-USD',
        img: "https://www.blockchain.com/explorer/_next/static/media/sol.8e2ae057.svg"
    },
]

let tickersEUR = [
    { name: 'Bitcoin/EUR', symbol: 'BTC-EUR' },
    { name: 'Stellar/EUR', symbol: 'XLM-EUR' },
    { name: 'Ethereum/EUR', symbol: 'ETH-EUR' },
    { name: 'Tether/EUR', symbol: 'USDT-EUR' },
    { name: 'Binance Coin/EUR', symbol: 'BNB-EUR' },
    { name: 'USD Coin/EUR', symbol: 'USDC-EUR' },
    { name: 'XRP/EUR', symbol: 'XRP-EUR' },
    { name: 'Cardano/EUR', symbol: 'ADA-EUR' },
    { name: 'Aptos/EUR', symbol: 'APT-EUR' },
    { name: 'Polygon/EUR', symbol: 'MATIC-EUR' },
    { name: 'OKB/EUR', symbol: 'OKB-EUR' },
    { name: 'Solana/EUR', symbol: 'SOL-EUR' },
    { name: 'Dogecoin/EUR', symbol: 'DOGE-EUR' },
    { name: 'Staked Ether/EUR', symbol: 'STETH-EUR' },
    { name: 'Polkadot/EUR', symbol: 'DOT-EUR' },
    { name: 'Chainlink/EUR', symbol: 'LINK-EUR' },
    { name: 'Avalanche/EUR', symbol: 'AVAX-EUR' },
    { name: 'Shiba Inu/EUR', symbol: 'SHIB-EUR' },
    { name: 'WETH/EUR', symbol: 'WETH-EUR' },
    { name: 'Ethereum Classic/EUR', symbol: 'ETC-EUR' },
    { name: 'Toncoin/EUR', symbol: 'TON-EUR' },
    { name: 'Ethereum/EUR', symbol: 'ETH-EUR' },
    { name: 'Monero/EUR', symbol: 'XMR-EUR' },
    { name: 'OKB/EUR', symbol: 'OKB-EUR' },
    { name: 'Bitcoin Cash/EUR', symbol: 'BCH-EUR' },
    { name: 'Filecoin/EUR', symbol: 'FIL-EUR' },
    { name: 'Hedera/EUR', symbol: 'HBAR-EUR' }
]

let pricesEUR = [
    { name: 'Bitcoin/EUR', symbol: 'BTC-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/bitcoin.df7c9480.svg" },
    { name: 'Ethereum/EUR', symbol: 'ETH-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/ethereum.57ab686e.svg" },
    { name: 'Binance Coin/EUR', symbol: 'BNB-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/bnb.109d70ce.svg" },
    { name: 'XRP/EUR', symbol: 'XRP-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/xrp.c351e318.svg" },
    { name: 'Cardano/EUR', symbol: 'ADA-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/ada.4b11b055.svg" },
    { name: 'Aptos/EUR', symbol: 'APT-EUR', img: "https://www.cryptocompare.com/media/43881360/apt.png" },
    { name: 'Polygon/EUR', symbol: 'MATIC-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/okb.f00e7113.svg" },
    { name: 'Solana/EUR', symbol: 'SOL-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/sol.8e2ae057.svg" },
    { name: 'Dogecoin/EUR', symbol: 'DOGE-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/doge.60836ae5.svg" }
]

let buyTradeEUR = [
    { name: 'Bitcoin/EUR', symbol: 'BTC-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/bitcoin.df7c9480.svg" },
    { name: 'Ethereum/EUR', symbol: 'ETH-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/ethereum.57ab686e.svg" },
    { name: 'Stellar/EUR', symbol: 'XLM-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/xlm.5a72c608.svg" },
    { name: 'Solana/EUR', symbol: 'SOL-EUR', img: "https://www.blockchain.com/explorer/_next/static/media/sol.8e2ae057.svg" }
]


const moved1 = [
    {
        img: "./img/dogecoin-doge-logo-alternative.svg",
        text: "Dogecoin",
    },
    {
        img: "./img/bitcoin.df7c9480.svg",
        text: "Bitcoin",
    },
    {
        img: "./img/ethereum.57ab686e.svg",
        text: "Ethereum",
    },
    {
        img: "./img/usdt.dd7e4bef.svg",
        text: "Tether",
    },
    {
        img: "./img/xrp.c351e318.svg",
        text: "Xrp",
    },
    {
        img: "./img/bnb.109d70ce.svg",
        text: "Binance",
    },
    {
        img: "./img/usdc.32138587.svg",
        text: "Usd",
    },
    {
        img: "./img/ada.4b11b055.svg",
        text: "Cardano",
    },
    {
        img: "./img/arb.png",
        text: "Arbitrum",
    },
    {
        img: "./img/apt.png",
        text: "Aptos",
    },
    {
        img: "./img/sol.8e2ae057.svg",
        text: "Solana",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/matic.2d015b01.svg",
        text: "Polygon",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/okb.f00e7113.svg",
        text: "Okb",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/op.23709375.svg",
        text: "Optimism",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/avax.4baba26c.svg",
        text: "Avalanche",
    },
];

const moved2 = [
    {
        img: "./img/arb.png",
        text: "Arbitrum",
    },
    {
        img: "./img/apt.png",
        text: "Aptos",
    },
    {
        img: "./img/sol.8e2ae057.svg",
        text: "Solana",
    },
    {
        img: "./img/bitcoin.df7c9480.svg",
        text: "Bitcoin",
    },
    {
        img: "./img/ethereum.57ab686e.svg",
        text: "Ethereum",
    },
    {
        img: "./img/usdt.dd7e4bef.svg",
        text: "Tether",
    },
    {
        img: "./img/xrp.c351e318.svg",
        text: "Xrp",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/matic.2d015b01.svg",
        text: "Polygon",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/okb.f00e7113.svg",
        text: "Okb",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/op.23709375.svg",
        text: "Optimism",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/avax.4baba26c.svg",
        text: "Avalanche",
    },
    {
        img: "./img/dogecoin-doge-logo-alternative.svg",
        text: "Dogecoin",
    },
    {
        img: "./img/bnb.109d70ce.svg",
        text: "Binance",
    },
    {
        img: "./img/usdc.32138587.svg",
        text: "Usd",
    },
    {
        img: "./img/ada.4b11b055.svg",
        text: "Cardano",
    },
];

const moved3 = [
    {
        img: "./img/ada.4b11b055.svg",
        text: "Cardano",
    },
    {
        img: "./img/arb.png",
        text: "Arbitrum",
    },
    {
        img: "./img/apt.png",
        text: "Aptos",
    },
    {
        img: "./img/sol.8e2ae057.svg",
        text: "Solana",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/matic.2d015b01.svg",
        text: "Polygon",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/okb.f00e7113.svg",
        text: "Okb",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/op.23709375.svg",
        text: "Optimism",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/avax.4baba26c.svg",
        text: "Avalanche",
    }, {
        img: "./img/dogecoin-doge-logo-alternative.svg",
        text: "Dogecoin",
    },
    {
        img: "./img/bitcoin.df7c9480.svg",
        text: "Bitcoin",
    },
    {
        img: "./img/ethereum.57ab686e.svg",
        text: "Ethereum",
    },
    {
        img: "./img/usdt.dd7e4bef.svg",
        text: "Tether",
    },
    {
        img: "./img/xrp.c351e318.svg",
        text: "Xrp",
    },
    {
        img: "./img/bnb.109d70ce.svg",
        text: "Binance",
    },
    {
        img: "./img/usdc.32138587.svg",
        text: "Usd",
    }
];

const moved4 = [
    {
        img: "./img/xrp.c351e318.svg",
        text: "Xrp",
    },
    {
        img: "./img/bnb.109d70ce.svg",
        text: "Binance",
    },
    {
        img: "./img/usdc.32138587.svg",
        text: "Usd",
    },
    {
        img: "./img/ada.4b11b055.svg",
        text: "Cardano",
    },
    {
        img: "./img/arb.png",
        text: "Arbitrum",
    },
    {
        img: "./img/apt.png",
        text: "Aptos",
    },
    {
        img: "./img/sol.8e2ae057.svg",
        text: "Solana",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/matic.2d015b01.svg",
        text: "Polygon",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/okb.f00e7113.svg",
        text: "Okb",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/op.23709375.svg",
        text: "Optimism",
    },
    {
        img: "https://www.blockchain.com/explorer/_next/static/media/avax.4baba26c.svg",
        text: "Avalanche",
    },
    {
        img: "./img/dogecoin-doge-logo-alternative.svg",
        text: "Dogecoin",
    },
    {
        img: "./img/bitcoin.df7c9480.svg",
        text: "Bitcoin",
    },
    {
        img: "./img/ethereum.57ab686e.svg",
        text: "Ethereum",
    },
    {
        img: "./img/usdt.dd7e4bef.svg",
        text: "Tether",
    }

];


async function get_api(url) {
    let data = await fetch(`https://hexocrypt.com/api/${url}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "mode": "no-cors",
            "cache": "no-cache",
            "credentials": "same-origin",
            "redirect": "follow"
        }
    })

    let json = await data.json();
    return json;
}

let apiKey;

function loader(status) {
    if (status) {
        let div = document.createElement('div');
        div.style = "position: fixed;width: 100%;height: 100%;top: 0;background-color: white;left: 0;z-index: 5000;display: flex;align-items: center;justify-content: center;"
        div.id = "loader-wrapper"
        div.innerHTML = '<div class="loader" style="color:red;"></div>'
        document.body.append(div)
    } else {
        document.getElementById("loader-wrapper")?.remove()

    }
}


async function sendRequest(symbol1, symbol2) {
    let data = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol1}&tsyms=${symbol2}&api_key=${apiKey}`)
        .then((resp) => resp.json())
        .then(function (data) {
            return data?.RAW[symbol1][symbol2];

        }).catch((err) => {
            return false
        })

    return data

}

if (document.getElementsByClassName("prices__body").length == 1) {

    let prices = []

    if (currencySettings.currency == "dollar") {
        prices = pricesUSD
    } else if (
        currencySettings.currency == "euro"
    ) {
        prices = pricesEUR
    }

    for (let p in prices) {
        let currencies = prices[p].symbol.split('-')
        let data = sendRequest(currencies[0], currencies[1])

        data.then((values) => {
            if (!values) { } else {
                let price = values?.PRICE.toFixed(2)
                let lastTradePrice = values?.OPENDAY
                let dropPercentage = (100 * (lastTradePrice - price) / price).toFixed(2)
                if (dropPercentage == Infinity) { dropPercentage = price }

                let coinData = prices[p]
                let coinName = coinData["name"]?.split('/')

                let div = document.createElement('div');
                div.className = "prices__body-row";
                div.innerHTML = `<a href=""><div class="body-row-name"><div class="body-row-name__img"><img src="${coinData['img']}" alt="bitcoin"></div><div class="body-row-name__text"><p>${coinName[0]}<span>${coinName[1]}</span></p></div></div></a><a href=""><div class="body-row-value"><p>$${price}<span class="${dropPercentage > 0 ? 'green' : 'red'}">${dropPercentage}%</span></p></div></a>`;
                document.getElementsByClassName("prices__body")[0].append(div);
            }

        })
    }
}

if (document.getElementsByClassName("blocks__body").length == 1) {
    let buyTrade = []

    if (currencySettings.currency == "dollar") {
        buyTrade = buyTradeUSD
    } else if (
        currencySettings.currency == "euro"
    ) {
        buyTrade = buyTradeEUR
    }

    for (let b in buyTrade) {
        let currencies = buyTrade[b].symbol.split('-')
        let data = sendRequest(currencies[0], currencies[1])
        data.then((values) => {
            if (!values) { } else {
                let price = values?.PRICE.toFixed(2)
                let lastTradePrice = values?.OPENDAY
                let dropPercentage = (100 * (lastTradePrice - price) / price).toFixed(2)
                if (dropPercentage == Infinity) { dropPercentage = price }

                let coinData = buyTrade[b]
                let coinName = coinData["name"]?.split('/')

                let a = document.createElement('a');
                a.innerHTML = `<div class="blocks__body-item">
						<div class="blocks__body-item-top">
							<div class="blocks__body-item-top-img">
								<img src="${coinData['img']}" alt="">
							</div>
							<div class="blocks__body-item-top-links">
								<p class="blue"><a href="https://www.coinbase.com/">Buy</a></p>
								<p class="green"><a href="https://www.coinbase.com/">Trade</a></p>
							</div>
						</div>
						<div class="blocks__body-item-bot">
							<p>${coinName[0]}<span class="short">${coinName[1]}</span></p>
							<p>$${price}<span class="${dropPercentage > 0 ? 'green2' : 'red2'}">${dropPercentage}%</span></p>
						</div>
					</div>`;
                document.getElementsByClassName("blocks__body")[0].append(a);
            }
        })

    }
}

function setElementHeaderPrices() {
    let tickers = []

    if (currencySettings.currency == "dollar") {
        tickers = tickersUSD
    } else if (
        currencySettings.currency == "euro"
    ) {
        tickers = tickersEUR
    }

    if (document.getElementsByClassName("row__item").length == 1) {
        for (let value in tickers) {

            let currencies = tickers[value].symbol.split('-')
            let data = sendRequest(currencies[0], currencies[1])
            data.then((values) => {
                if (!values) { } else {
                    let status = values?.status
                    let name = tickers[value].name
                    let price = values?.PRICE.toFixed(2)
                    let lastTradePrice = values?.OPENDAY
                    let dropPercentage = (100 * (lastTradePrice - price) / price).toFixed(2)
                    if (dropPercentage == Infinity) { dropPercentage = price }

                    if (status != 500) {
                        let a = document.createElement('a');
                        a.className = "row__item-link";
                        a.innerHTML = `<div class="row__item-unit"><p class="row__item-unit-text">${name}</p><p class="row__item-unit-value">$${price}<span class="${dropPercentage > 0 ? 'green' : 'red'}"><img src="img/arrow.svg" alt="">${dropPercentage}%</span></p></div>`;
                        document.getElementsByClassName("row__item")[0].append(a);
                    }
                }
            })

        }
    }
}


for (let j = 0; j < 4; j++) {
    for (let i = 0; i < moved1.length; i++) {
        document.getElementById("moved1").innerHTML += `
		  <button class="moved-block">
			<img
			  src="${moved1[i].img}"
			  class="moved-img"
			  alt="someImg"
			/>
			${moved1[i].text}
		  </button>
		`;
    }
}

for (let j = 0; j < 4; j++) {
    for (let i = moved2.length - 1; i >= 0; i--) {
        document.getElementById("moved2").innerHTML += `
		  <button class="moved-block">
			<img
			  src="${moved2[i].img}"
			  class="moved-img"
			  alt="someImg"
			/>
			${moved2[i].text}
		  </button>
		`;
    }
}

// for (let j = 0; j < 4; j++) {
// 	for (let i = 0; i < moved3.length; i++) {
// 		document.getElementById("moved3").innerHTML += `
// 		  <button class="moved-block">
// 			<img
// 			  src="${moved3[i].img}"
// 			  class="moved-img"
// 			  alt="someImg"
// 			/>
// 			${moved3[i].text}
// 		  </button>
// 		`;
// 	}
// }
// for (let j = 0; j < 4; j++) {
// 	for (let i = moved4.length - 1; i >= 0; i--) {
// 		document.getElementById("moved4").innerHTML += `
// 		  <button class="moved-block">
// 			<img
// 			  src="${moved4[i].img}"
// 			  class="moved-img"
// 			  alt="someImg"
// 			/>
// 			${moved4[i].text}
// 		  </button>
// 		`;
// 	}
// }


window.onload = async () => {
    await get_api("get_api_key").then((d) => {
        apiKey = d.api_key;
    })
    setElementHeaderPrices()
}
