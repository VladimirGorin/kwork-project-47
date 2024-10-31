class CurrencySettings {
    currency = "dollar" // default dollar
    currencyEMOJI = "$"
}

export const currencySettings = new CurrencySettings();

function insertHeader() {
    const headerCurrencyChangeBlock = document.querySelector("#currency-change")


    headerCurrencyChangeBlock.innerHTML = `<a class="nav-link"">Currency</a>
    <div class="currency-block">
        <a href="?currency=euro" class="currency-item">
            <span>Euro</span>
            <span class="currency-separator">|</span>
            <span>&euro;</span>
        </a>
        <a href="?currency=dollar" class="currency-item">
            <span>Dollar</span>
            <span class="currency-separator">|</span>
            <span>$</span>
        </a>
    </div>`
}

function getURLCurrency() {
    const urlParams = new URLSearchParams(window.location.search);
    const currency = urlParams.get('currency') ? urlParams.get('currency') : localStorage.getItem("currency");

    currency ? currencySettings.currency = currency : ""
    localStorage.setItem('currency', currencySettings.currency);

    if (currency == "euro"){
        currencySettings.currencyEMOJI = "€"
    }else if(currency == "dollar"){
        currencySettings.currencyEMOJI = "$"
    }
}


function start() {
    insertHeader()
    getURLCurrency()
}


start()
