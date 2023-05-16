export const data = {
    name: 'toLowerCase',
    code: async function(d: any) {
        const data = d.util.createFunctionData(d);
        data.results = d.args.join(' ').toLowerCase();
        return data;
    }
}