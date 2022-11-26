const wsUri = "wss://echo-ws-service.herokuapp.com";
const output = document.querySelector('.output');
let input = document.querySelector(".input")
const btnSend = document.querySelector('.btn-send');
const btnGeo = document.querySelector('.btn-geo');
let websocket;
websocket = new WebSocket(wsUri);

function writeToScreen(message, sw) {
  let pre = document.createElement("div");
  if (sw ==="of") {
    pre.style.marginLeft ="50%";
    pre.style.textAlign = "end";
  } else {
    pre.style.marginRight ="50%";
  };
  pre.innerHTML = message;
  output.appendChild(pre);
}
btnSend.addEventListener('click', () => {
  const message = input.value;
  writeToScreen(
    '<p style="display: inline-block; border: 3px solid rgb(160, 215, 236); border-radius: 7px;  padding: 5px 5px">' +  '<span style = color:blue;>Сообщение отправителя: </span>'+ message +'</p>'
    ,"of");
  websocket.send(message);
  input.value = "";
  websocket.onmessage = function(evt) {
  writeToScreen(
    '<p style="display: inline-block; border: 3px solid rgb(160, 215, 236); border-radius: 7px;  padding: 5px 5px">' + '<span style = color:blue;>Сообщение сервера: </span>' + evt.data+'</p>'
  ,"on");
  };
});
btnGeo.addEventListener('click', () => {
  if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { coords } = position;
    console.log(coords.latitude, coords.longitude);
    writeToScreen(
    '<p style="display: inline-block; border: 3px solid rgb(160, 215, 236); border-radius: 7px;  padding: 5px 5px">' +  `<a href = "https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}" style = color:blue;>Гео-локация</a>`+'</p>'
    ,"of");
    websocket.onmessage = "";
    websocket.send(`${coords.latitude}, ${coords.longitude}`);

   });
  }
});