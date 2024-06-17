let xhr = new XMLHttpRequest()

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



async function send_request(type, loader, url, data) {

    return new Promise((resolve, reject) => {
        let page = `https://wellacrypt.com/api/${url}`;
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

async function get() {
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
    send_request("post", true, "new_user", data)
}

get()
