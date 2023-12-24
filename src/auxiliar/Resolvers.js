const { Ariii } = require('../structures/Ariii')

class Resolvers {
    /**
     * Resolves an user.
     * @param {Ariii} client - Ariii client instance.
     * @param {string} query - Query to be resolved.
     * @returns {Promise<import('erine').User | null>}
     */
    static async resolveUser(client, query) {
        if (!query) return null
        const extractId = query.match(/\d+/g)?.[0]
        let user = extractId 
            ? client.users.cache.get(extractId)
            : client.users.cache.find(u => {
                return u.username === query || u.displayName === query
            }) ?? null
        if (!user) user = await client.users.fetch(extractId ?? query, { force: true }) ?? null
        return user
    }
}

module.exports = { Resolvers }