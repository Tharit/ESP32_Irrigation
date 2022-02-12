var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
var NUM_OUTPUTS = +'%NUM_OUTPUTS%'; // use string & casting to disable linter warnings in IDE
window.addEventListener('load', onLoad);

for(let i = 0; i < NUM_OUTPUTS; i++) {
    const elS = document.getElementById(i + "s");
    elS.closest('.card').style.display = 'block';
}

function onLoad(event) {
    initWebSocket();
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection...');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('Connection opened');
    websocket.send(JSON.stringify({ "action": "states" }));
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

function onMessage(event) {
    var myObj = JSON.parse(event.data);
    console.log(myObj);
    for (i in myObj.cards) {
        var c_text = myObj.cards[i].c_text;
        console.log(c_text);
        document.getElementById(i + "h").innerHTML = c_text;
    }
    for (i in myObj.gpios) {
        var output = myObj.gpios[i].output;
        var state = myObj.gpios[i].state;
        console.log(output);
        console.log(state);
        const elS = document.getElementById(output + "s");
        if (state == "1") {
            document.getElementById(output).checked = true;
            elS.innerHTML = "ON";
        }
        else {
            document.getElementById(output).checked = false;
            elS.innerHTML = "OFF";
        }
    }
    console.log(event.data);
}

// Send Requests to Control GPIOs
function toggleCheckbox(element) {
    console.log(element.id);
    websocket.send(JSON.stringify({ "action": "relais", "data": { "relais": +element.id } }));
    if (element.checked) {
        document.getElementById(element.id + "s").innerHTML = "ON";
    }
    else {
        document.getElementById(element.id + "s").innerHTML = "OFF";
    }
}

function myFunction(id) {
    console.log("Reboot");
    websocket.send(JSON.stringify({ "action": "reboot" }));
} 