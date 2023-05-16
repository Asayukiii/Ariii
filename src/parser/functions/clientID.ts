export const data = {
    name: 'clientID',
    code: async function(d: any) {
        const data = d.util.createFunctionData(d);
        data.results = d.client.user.id;
        return data;
    }
}