var socket = io("ws://localhost:25565");
socket.on('message', data => {
    displayMessage(data);
});


// List of all the divs in channelList
var channelDivList = [];

// Variable holding selected channel ID
var selectedDivId;

var highlightColor = "#3a404a"
var selectColor = "#484e5c"
var defaultChannelColor = "#343942"


// Gets user input from message_input
function getInput(event) {
    if (event.code == "Enter") {
        var user_input = document.getElementById("message_input").value.trim();

        socket.send(user_input);

        if (user_input != ""){
            event.currentTarget.value = "";
            displayMessage(user_input);
            
            moveChannelToTop(selectedDivId);
        }
    }
}

// Displays user_input in the message_area div
function displayMessage(message) {
    var div = document.getElementById("message_area");
    div.innerHTML += message + "&#10;";
    div.scrollTop = div.scrollHeight;
}

function addChannel(channelName, channelId) {
    // channel id is used to refer to it programatically
    // channel name is strictly for user to see and nothing else

    var channelList = document.getElementById("channelList")
    // Creates new div called friend_div
    var channelDiv = document.createElement('div');

    // Assigning properties for friend_div
    channelDiv.id = channelId;
    channelDiv.className = "channelDiv"
    channelDiv.innerHTML = channelName;

    // setting functions
    channelDiv.onclick = function() {selectDiv(this);};
    channelDiv.onmouseover = function() {highlightDiv(this);};

    channelList.appendChild(channelDiv);
    channelDivList.push(channelDiv)

    // setting margins, bottom needs to be 0, all other needs to be 10
    if (channelDivList.length > 1){
        channelDivList[channelDivList.length-2].style.marginBottom = "10px";
    }
    channelDivList[channelDivList.length-1].style.ma5rginBottom = "0px";
}

// TODO - find a better way to implement highlighting cuz theres gotta be a better way
function selectDiv(div) {
    selectedDivId = div.id;

    // Changes the background color of selected friend_div
    div.style.backgroundColor = selectColor;
    // Changes the background color back to normal for all the other friend_divs
    for (i = 0; i < channelDivList.length; i++) {
        if (channelDivList[i].id != selectedDivId) {
            channelDivList[i].style.backgroundColor = defaultChannelColor;
        }
    }
}

// Highlight a friend_div when the mouse is hovering over it
function highlightDiv(div) {
    var highlightedDivId = div.id;

    // Changes the background color of moused over friend_div
    if (highlightedDivId != selectedDivId) {
        div.style.backgroundColor = highlightColor;
    }
    // Changes the background color back to normal for all the other friend_divs
    for (i = 0; i < channelDivList.length; i++) {
        if (channelDivList[i].id != highlightedDivId && channelDivList[i].id != selectedDivId) {
            channelDivList[i].style.backgroundColor = defaultChannelColor;
        }
    }
}

function moveChannelToTop(divId){
    var divToMove = document.getElementById(divId) 
    channelDivList[0].before(divToMove)

    channelDivList = document.getElementById("channelList").childNodes;

    // setting margins, bottom needs to be 0, all other needs to be 10
    if (channelDivList.length > 1){
        channelDivList[channelDivList.length-2].style.marginBottom = "10px";
    }
    channelDivList[channelDivList.length-1].style.marginBottom = "0px";

    // Selects the first friend_div in the channelList
    selectDiv(channelDivList[0]);

    // Scrolls to the top of the friend list
    channelList.scrollTop = 0;
}
