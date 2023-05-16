// @ts-nocheck
import { lstatSync, readdirSync } from 'fs';
import { Data } from '../../typing/index';
import { join } from 'path';

class Function {
    constructor(name: string, d: FunctionData = {}) {
        this.name = name;
        this.code = d.code;
        this.path = d.path;
    }
    async run(d) {
        return this.code.constructor.name === "AsyncFunction" ? await this.code(d) : this.code(d);
    }
}

export class FunctionManager {
    public funcs: any[]
    constructor() {
        this.funcs = [];
        this.load();
    }
    get(n: string) {
        return this.funcs.find((x)=>x[0]==n)[1]
    }
    set(n,d) {
        let f = new Function(n, {
            code: d.code,
            path: d.path||"custom"
        })
        return this.funcs.push([n,f])
    }
  
    all() {
        return this.funcs.map(x=>x[1])
    }
    toJson() {
        let obj = {};
        this.funcs.forEach(x => {
            obj[x[0]]=x[1]
        })
        return obj
    }
    has(n) {
        return !(!this.toJson()[n]);
    }
    async load(dir: string = 'src/parser/functions'): Promise<any> {
        const files = readdirSync(join(process.cwd(), dir));
        for (const file of files) {
            let stat = lstatSync(join(process.cwd(), dir, file));
            if (stat.isDirectory()) { await this.load(join(dir, file)); continue; }
            const _function = require(join(process.cwd(), dir, file)).data;
            if (!_function) continue;
            this.set(file.split('.')[0], {
                code: _function.code,
                path: process.cwd() + '/' + dir + '/' + file
            });
        }
    }
}

interface FunctionData {
    code?: any;
    path?: string;
}