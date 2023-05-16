export const data = {
    name: 'toUpperCase',
    code: async function(d: any) {
        const data = d.util.createFunctionData(d);
        data.results = d.args.join(' ').toUpperCase();
        return data;
    }
}