module.exports = {
    name: 'c',
    description: 'just trying to create a calculator, disclaimer: multiplications/divisions are at 2dp',

    // else if (command === 'c') {
    //     client.commands.get('c').execute(message, arguments);
    // }

    execute(client, message, arguments, distube, Discord) {
        // Just a bunch of variables for the calculation
        let method = arguments[1];
        let first = Number(arguments[0]);
        let second = Number(arguments[2]);

        const operator = ['+', '-', '*', '/', '^'];

        // Random error handlers for not inputting the command correctly
        if (!method) return message.channel.send('Your calculation needs at least two arguments');

        // If user tries to use operation as first argument then this error pops up and we dont want that
        if (!operator.includes(method)) return message.channel.send('Use one of the following operators: +, -, *, / or ^');

        if (!arguments[0]) return message.channel.send('Your calculation is missing its first value');

        if (!arguments[2]) return message.channel.send('Your calculation is missing its second value');

        if (isNaN(first)) return message.channel.send('Your first value must be a number');

        if (isNaN(second)) return message.channel.send('Your second value must be a number');

        // The actual calculations
        if (method === '+') {
            let ans = first + second
            message.channel.send(`${ans}`);
        }

        if (method === '-') {
            let ans = first - second
            message.channel.send(`${ans}`);
        }

        if (method === '*') {
            let ans = first * second
            message.channel.send(`${ans.toFixed(2)}`);
        }

        if (method === '/') {
            let ans = first / second
            message.channel.send(`${ans.toFixed(2)}`);
        }

        if (method === '^') {
            let ans = first ** second
            message.channel.send(`${ans}`);
        }
    }
}