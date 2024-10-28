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

async function getTransactions(url) {
    const transactions = await send_request("get", false, url, false)

    const tableBody = document.getElementById('transaction-table-body');

    transactions.forEach(row => {
      const tr = document.createElement('tr');

      Object.keys(row).forEach((key) => {
        const td = document.createElement('td');
        if (key === 'address') {
          td.innerHTML = `${row[key]} <span class="copy-icon" onclick="copyToClipboard('${row[key]}')">📋</span>`;
        } else if (key === 'chain') {
          td.innerHTML = `<span class="bold">${row[key]}</span>`;
        } else if (key === 'status') {
          td.innerHTML = `<span class="${row[key].toLowerCase()}">${row[key]}</span>`;
        } else {
          td.textContent = row[key];
        }
        tr.appendChild(td);
      });

      tableBody.appendChild(tr);
    });

    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Address copied to clipboard!");
      }).catch(err => {
        console.error("Error copying text: ", err);
      });
    }
}

getTransactions("custom_transactions")
