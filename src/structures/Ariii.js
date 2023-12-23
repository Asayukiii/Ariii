const { Database } = require('midb')
const { Erine } = require('erine')

class Ariii extends Erine {
    /** @type {Database | null} */
    db = null;

    /**
     * Set the database for the bot.
     * @param {import('midb').DatabaseOptions} options - Database options.
     */
    setDatabase(options) {
        this.db = new Database(options)
    }
}

module.exports = { Ariii }