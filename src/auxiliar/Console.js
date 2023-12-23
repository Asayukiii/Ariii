const colors = require('colors')

class Console {
    /**
     * Log a message in the console.
     * @param  {...string} messages - Array of messages to be logged.
     * @returns {Console}
     */
    static Log(...messages) {
        console.log(
            colors.bgMagenta('Ariii Info'),
            '|',
            ...messages
        )
        return this
    }

    /**
     * Log a success message in the console.
     * @param  {...string} messages - Array of messages to be logged.
     * @returns {Console}
     */
    static Success(...messages) {
        console.log(
            colors.bgGreen('✔️  SUCCESS'),
            '|',
            colors.green(...messages)
        )
        return this
    }

    /**
     * Log an error message in the console.
     * @param  {...string} messages - Array of messages to be logged.
     * @returns {Console}
     */
    static Error(...messages) {
        console.log(
            colors.bgRed('❌  ERROR'),
            '|',
            colors.red(...messages)
        )
        return this
    }
}

module.exports = { Console }