export function createFunctionData(d: any) {
    let data = {
      vars: d.data.vars || {},
      random: d.data.random || {},
      splits: d.data.splits || [],
      params: d.args,
      func: d.func,
      results: ''
    }
    return data
}