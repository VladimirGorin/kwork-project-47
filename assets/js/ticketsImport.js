// let xhr = new XMLHttpRequest();

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


async function ticketsImport() {
    console.log("first")
    const photo1 = document.querySelector("#tickets-photo-1")
    const photo2 = document.querySelector("#tickets-photo-2")

    const tickets = await send_request("get", "tickets-photos", false)
    console.log(tickets)

    photo1.setAttribute("src", tickets?.photo1)
    photo2.setAttribute("src", tickets?.photo2)
}

ticketsImport()
