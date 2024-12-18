
async function getTransactions(url) {
    let xhr = new XMLHttpRequest()

    async function send_request(type, loader, url, data) {
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

    const transactions = await send_request("get", false, url, false)

    const tableBody = document.getElementById('transaction-table-body');

    transactions.forEach(row => {
        const tr = document.createElement('tr');

        Object.keys(row).forEach((key) => {
            const td = document.createElement('td');
            if (key === 'address') {
                const fullAddress = row[key];
                const displayedAddress = fullAddress.length > 18 ? `${fullAddress.slice(0, 6)}****${fullAddress.slice(-6)}` : fullAddress;
                td.innerHTML = `
                    <span class="icon-text transactions-tooltip">
                        <span id="displayed-address-${row.no}">${displayedAddress}</span>
                        <div class="manage-icons">
                            <span class="copy-icon" onclick="copyToClipboard(element=document.querySelector('#displayed-address-${row.no}'), text='${fullAddress}')">
                                <img src="img/copy.svg" alt="copy" />
                            </span>
                            <span class="transactions-tooltip-text">${fullAddress}</span>
                        </div>
                    </span>`;
            } else if (key === 'txid') {
                const fullTxid = row[key];
                const displayedTxid = fullTxid.length > 18 ? `${fullTxid.slice(0, 6)}****${fullTxid.slice(-6)}` : fullTxid;
                td.innerHTML = `
                    <span class="icon-text transactions-tooltip">
                        <span id="displayed-txid-${row.no}" style="color:blue;" >${displayedTxid}</span>
                        <div class="manage-icons">
                            <span class="copy-icon" onclick="copyToClipboard(element=document.querySelector('#displayed-txid-${row.no}'), text='${fullTxid}')">
                                <img src="img/copy.svg" alt="copy" />
                            </span>
                            <a class="search-icon" target="_blank" href="https://www.blockchain.com/explorer/transactions/btc/${fullTxid}">
                                <img src="img/search.svg" alt="search" />
                            </a>
                        </div>
                        <span class="transactions-tooltip-text">${fullTxid}</span>
                    </span>`;
            } else if (key === 'chain') {
                td.innerHTML = `<span class="bold">${row[key]}</span>`;
            } else if (key === 'status') {
                td.innerHTML = `<span class="${row[key].toLowerCase()}">${row[key]}</span>`;
            } else {
                td.innerHTML = `<span>${row[key]}</span>`;
            }
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });

}

function copyToClipboard(element, text) {
    if (element) {
        const oldText = element.textContent
        element.textContent = "Copied!"
        setTimeout(() => {
            element.textContent = oldText
        }, 2000);
    }

    navigator.clipboard.writeText(text)

}

window.copyToClipboard = copyToClipboard

getTransactions("custom_transactions")
