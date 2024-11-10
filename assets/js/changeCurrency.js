class CurrencySettings {
    currency = "dollar"; // default dollar
    currencyEMOJI = "$";
}

export const currencySettings = new CurrencySettings();

function insertHeader() {
    const headerCurrencyChangeBlock = document.querySelector("#currency-change");

    const currentUrlParams = new URLSearchParams(window.location.search);

    const updateCurrencyInUrl = (currency) => {
        const updatedParams = new URLSearchParams(currentUrlParams);

        updatedParams.set('currency', currency);

        return `${window.location.pathname}?${updatedParams.toString()}`;
    };

    const euroUrl = updateCurrencyInUrl('euro');
    const dollarUrl = updateCurrencyInUrl('dollar');

    headerCurrencyChangeBlock.innerHTML = `
        <a class="nav-link">Currency</a>
        <div class="currency-block">
            <a href="${euroUrl}" class="currency-item">
                <span>Euro</span>
                <span class="currency-separator">|</span>
                <span>&euro;</span>
            </a>
            <a href="${dollarUrl}" class="currency-item">
                <span>Dollar</span>
                <span class="currency-separator">|</span>
                <span>$</span>
            </a>
        </div>`;
}



function getURLCurrency() {
    const urlParams = new URLSearchParams(window.location.search);
    const currency = urlParams.get('currency') || localStorage.getItem("currency");

    console.log(`currency: ${currency}`)

    if (currency) {
        currencySettings.currency = currency;
        localStorage.setItem('currency', currencySettings.currency);

        if (currency === "euro") {
            currencySettings.currencyEMOJI = "€";
        } else if (currency === "dollar") {
            currencySettings.currencyEMOJI = "$";
        }
    }
}


function start() {
    localStorage.setItem("currency", currencySettings.currency)

    insertHeader();
    getURLCurrency();
}

start();

export async function getCurrency (){
    await start()
    return  localStorage.getItem("currency")
}

window.getCurrency = getCurrency;
