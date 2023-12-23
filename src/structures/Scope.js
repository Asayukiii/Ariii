const { Context } = require('erine')

class Scope extends Context {
    /**
     * @returns {import('midb').Database}
     */
    get db() {
        return this.bot.db
    }
}

module.exports = { Scope }