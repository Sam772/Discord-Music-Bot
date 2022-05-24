module.exports = {
    name: 'np',
    description: "shows timer for current track",

    execute(client, message, arguments, distube, Discord) {
        timer = distube.getQueue(message).formattedCurrentTime;
        duration = distube.getQueue(message).songs[0].formattedDuration
        currentSong = distube.getQueue(message).songs[0];
        message.channel.send("Now Playing: " + currentSong.name + " - " + timer + " / " + duration);
    }  
}