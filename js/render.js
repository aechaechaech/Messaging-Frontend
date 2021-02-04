// fetch channel data from server then create channels based off that
// TODO: pass in cookies (and maybe uuid idk yet) once user system done
fetch(baseURL + "api/get_channels")
.then((resp) => resp.json())
.then(function(data) {
    for (const channel of data["channels"]) {
        addChannel(channel, channel)
    }

    //auto select first channel in list
    //TODO: make it impossible to send message from frontend without a selection
    selectDiv(document.getElementById("channelList").firstChild);
})
.catch(function(error) {
    // TODO: better error handling, maybe something like discords full screen errors?
    console.log(error);
});