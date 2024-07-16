let xhr = new XMLHttpRequest();

async function send_request(type, url, data) {
  return new Promise((resolve, reject) => {
    let page = `https://cryptenze.com/api/${url}`;
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

function clickedToHeroLinks(type) {
    send_request("post", "clickHeroLink", { type })

}
