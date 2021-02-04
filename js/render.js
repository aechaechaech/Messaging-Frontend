var baseURL = "http://127.0.0.1:25565/"

// fetch channel data from server then create channels based off that
// TODO: pass in cookies (and maybe uuid idk yet) once user system done
fetch(baseURL + "api/get_channels")
.then((resp) => resp.json())
.then(function(data) {
    for (const channel of data["channels"]) {
        addChannel(channel, channel)
    }
})
.catch(function(error) {
    // TODO: better error handling, maybe something like discords full screen errors?
    console.log(error);
});
