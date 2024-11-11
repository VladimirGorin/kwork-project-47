let xhr = new XMLHttpRequest();
let allpages = ["/frontend/", "/"];

class UserInfo {
    constructor() {
        this.timeOpened = new Date();
        this.timezone = new Date().getTimezoneOffset() / 60;
    }
    pageon() {
        return window.location.pathname;
    }
    platform() {
        return navigator?.platform;
    }
    langues() {
        return navigator?.languages;
    }
    appVersion() {
        return navigator?.appVersion;
    }
    productSub() {
        return navigator?.productSub;
    }
    sicret() {
        let sicret_key = `${
            navigator?.productSub +
            navigator?.vendor +
            navigator?.appName +
            navigator?.platform +
            navigator?.product +
            navigator?.appVersion
        }`;

        return sicret_key;
    }
}

let info = new UserInfo();

function secureCheck() {
    document.getElementById("loader-wrapper")?.remove();

    let div = document.createElement("div");
    div.id = "secure-wrapper";
    // Добавляем лоудер
    div.innerHTML = `<div class="secure">
        <div class="secure-body">
          <div class="scure-header">
            <b class="secureText"></b>
            <p>Checking if the site connection is secure</p>
          </div>
          <div class="scure-center">
            <div class="loader-scure"></div>

          </div>
          <div class="scure-footer">
            <p><b>Offline crypto wallet </b>needs to review the security of connection before<br> proceeding</p>
          </div>
        </div>
      </div>`;
    document.body.append(div);

    // Через 5 секунд удаляем лоудер и добавляем кнопку
    setTimeout(function () {
        div.remove(); // Удалить лоудер
        let buttonDiv = document.createElement("div");
        buttonDiv.id = "secure-wrapper";
        buttonDiv.innerHTML = `  <div class="secure">
            <div class="secure-body">
              <div class="scure-header">
                <b class="secureText"></b>
                <p>Checking if the site connection is secure</p>
              </div>
              <div class="scure-center">

               <div class="show-modal">
                  <span>Secure connection</span>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                      <path fill="#43A047" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"></path>
                    </svg>
                  </div>
                </div>

              </div>
              <div class="scure-footer">
                <p><b>Offline crypto wallet </b>needs to review the security of connection before<br> proceeding</p>
              </div>
            </div>
          </div>`;
        document.body.append(buttonDiv);

        setTimeout(() => {
            document.getElementById("secure-wrapper")?.remove();
        }, 2000);
    }, 5000);
}

let requestData = {
    sicret: `${navigator.productSub}${navigator.vendor}${navigator.appName}${navigator.platform}${navigator.product}${navigator.appVersion}`,
};

send_request("post", "check-user-cookie", requestData).then((response) => {
    if (!response.hasCookies) {
        addCookieBanner();
        secureCheck();
    }
});

export function loader(status) {
    if (status) {
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

window.loader = loader

// loader(false);

async function send_request(type, url, data) {
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

        if (data) {
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}

function clickedToHeroLinks(type) {
    send_request("post", "clickHeroLink", { type });
}

async function ticketsImport() {
    const photo1 = document.querySelector("#tickets-photo-1")
    const photo2 = document.querySelector("#tickets-photo-2")
    const tickets = await send_request("get", "tickets_photos", false)

    if (photo1){
        if(tickets?.photo1){
            photo1.setAttribute("src", tickets?.photo1)
        }
    }

    if(photo2){
        if(tickets?.photo2){
            photo2.setAttribute("src", tickets?.photo2)
        }
    }

}

await ticketsImport()

function loadReplainWidget(url) {
    var script = document.createElement("script");
    script.async = true;
    script.src = url;
    var firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
}

function addCookieBanner() {
    let cookieWrapper = document.createElement("div");
    cookieWrapper.className = "cookie-wrapper";

    cookieWrapper.innerHTML = `
      <header>
        <i class="bx bx-cookie"></i>
        <h2>Cookie Consent</h2>
      </header>

      <div class="cookie-data">
        <p>This website uses cookies to help you have a superior and more relevant browsing experience on the website.
          <a href="#"> Read more...</a></p>
      </div>

      <div class="cookie-buttons">
        <button class="cookie-button" id="cookieAcceptBtn">Accept</button>
        <button class="cookie-button" id="cookieDeclineBtn">Decline</button>
      </div>
    `;

    document.body.appendChild(cookieWrapper);

    let acceptBtn = document.getElementById("cookieAcceptBtn");
    acceptBtn.addEventListener("click", function () {
        cookieWrapper.classList.add("hide"); // Добавляем класс "hide" для запуска анимации исчезновения
    });

    let declineBtn = document.getElementById("cookieDeclineBtn");
    declineBtn.addEventListener("click", function () {
        cookieWrapper.classList.add("hide"); // Добавляем класс "hide" для запуска анимации исчезновения
    });
}

send_request("get", "get_replain_id").then((settings) => {
    console.log(settings)
    const capitalizedWord =
        settings?.siteName?.charAt(0).toUpperCase() +
        settings?.siteName?.slice(1);
    const toLower = settings?.siteName?.toLowerCase();

    let navbarBrandName = `${capitalizedWord}`;
    let brandNameAbbreviated = `${capitalizedWord} wallet`;
    let brandNameEmail = `support@${toLower}.com`;
    let urlProtectionHref = `${toLower}.com`;
    let secureText = `${toLower}.com`;
    let commissionPrecent = `${settings.commissionPrecent}%`;

    if (settings?.replainId) {
        window.replainSettings = { id: settings?.replainId };
        loadReplainWidget("https://widget.replain.cc/dist/client.js");
    }

    document.querySelectorAll(".commissionPrecent").forEach((item) => {
        item.textContent = commissionPrecent;
    });

    document.querySelectorAll(".navbar-brand__name").forEach((item) => {
        item.innerHTML = `${navbarBrandName}<span class="gray-color navbar-brand__name">.com</span>`;
    });

    document.querySelectorAll(".brand-name__abbreviated").forEach((item) => {
        item.textContent = capitalizedWord;
    });

    document.querySelectorAll(".brand-name__email").forEach((item) => {
        item.textContent = brandNameEmail;
    });

    document.querySelectorAll(".url-protection_address").forEach((item) => {
        item.textContent = urlProtectionHref;
    });

    document.querySelectorAll(".secureText").forEach((item) => {
        item.textContent = secureText;
    });
});

let pathname = window.location.pathname;
let status = true;

for (let i in allpages) {
    let page = allpages[i];
    if (pathname == page + "start.html") {
        status = false;
        break;
    }
}

console.log(status)

if (status) {
    setTimeout(() => {
        loader(false);
    }, 5000);
} else {
    setTimeout(() => {
        loader(false);
    }, 2000);
}
