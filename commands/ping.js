module.exports = {
    name: 'ping',
    description: "tests if command works",

    execute(client, message, arguments, distube, Discord) {
        message.channel.send(':ping_pong:');
    }
}