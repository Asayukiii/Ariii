// @ts-nocheck
import { Data, Token } from '../typing/index';
import { FunctionManager } from './parser/functions';
import * as util from './parser/util';

export class Interpreter {
    static async interprete(raw: string | undefined, d: Data = {}): Promise<any> {
        const code = raw?.escape(), funcs = new FunctionManager();
        let { args, context, client, data } = d,
            { random, splits, vars } = (data || {}),
            results = '',
            tokens = Interpreter.parse_code(code!).map((token: Token) => {
                if (token.function) return { text: Interpreter.parse_function(token.text), function: true };
                else return token
            }),
            funcData: Data = {
                client,
                data: {
                    vars: typeof vars == "object" ? vars : {},
                    random: typeof random == "object" ? random : {},
                    splits: typeof splits == "object" ? splits : [],
                },
                context,
                content: context?.args?.join(' ') || '',
                message: context?.message || {},
                author: context?.author || {},
                member: context?.member || {},
                guild: context?.guild || {},
                channel: context?.channel || {},
                code: raw,
                codeLines: raw.split("\n"),
                util: util,
                interpreter: Interpreter.interprete,
                functions: (code.match(/\$(\w+)/g)||[]).filter(x=>funcs.has(x)),
                FunctionManager: funcs
            };
        for (let token of tokens) {
            if(!token.function) results += token.text;
            else {
                let { name, args } = token.text;
                if(!funcs.has(name)) {
                    let prefix = `$${name}`
                    let suffix = args[0]==undefined?'':args[0]==''?'[]':`[${args.join(';')}]`;
                    results+=prefix+suffix;
                } else {
                    let func = funcs.get(name);
                    let newargs = [];
                    for (let arg of args) {
                        let a = await Interpreter.interprete(arg, funcData);
                        newargs.push(a.code)
                        funcData = a.d
                    }
                    funcData.name = func.name
                    funcData.args = newargs
                    let r = await func.run(funcData)
                    results += r.results;
                    funcData.data.vars = r.vars
                    funcData.data.random = r.random
                    funcData.data.splits = r.splits
                }
            }
        }
        return {
            code: results.unescape() ?? '',
            d: funcData
        }
    }

    /**
     * Parses BDScript code.
     * @param code RAW BDScript code.
     * @returns {Token[]}
     */
    static parse_code(code: string): Token[] {
        let output: Token[] = [],
            currentText: string = '',
            inFunction: boolean = false,
            functionDepth: number = 0;
        for (let i = 0; i < code.length; i++) {
            const char: string = code[i];
            if (char === '$' && !inFunction) {
                if (currentText) {
                    output.push({ text: currentText, function: false });
                    currentText = '';
                }
                inFunction = true;
                currentText += char;
            } else if (inFunction) {
                currentText += char;
                if (char === '[') {
                    functionDepth++;
                } else if (char === ']') {
                    functionDepth--;
                }
                if (functionDepth === 0 && (char == "]" || char === ' ' || i === code.length - 1 || char === "\n")) {
                    output.push({ text: currentText.trim(), function: true });
                    currentText = '';
                    inFunction = false;
                }
            } else currentText += char;
        }
        if (currentText) output.push({ text: currentText, function: false });
        return output;
    }

    /**
     * Parses BDScript functions.
     * @param code BDScript code
     * @returns 
     */
    static parse_function(code: string): any {
        let name: string | undefined = code.match(/\$(\w+)/)?.[1],
            argsString: string = code.replace(`$${name}`,'')?.slice(1, -1),
            args: any[] = [],
            temp: string = '',
            depth: number = 0;
        if (!code.includes('[')) return { name, args };
        if (!argsString.includes('[')) {
            args = argsString.split(';');
            return { name, args };
        }
        for (let i = 0; i < argsString.length; i++) {
            let char = argsString[i];      
            if (char == ";" && depth <= 0) {
                args.push(temp);
                temp = "";
            } else if (char == "[") depth += 1; 
            else if (char == "]") depth -= 1;
            temp += char;
        }
        if (temp !== '') args.push(temp);
        args = args.map((x) => x.replace(/^;/,''));
        return { name, args };
    }
}

String.prototype.escape = function() {
    return this
        .replace(/\\\$/g, "%{DOL}%")
        .replace(/\\]/g, "%ESCAPED%")
        .replace(/\\;/g, "%{-SEMICOL-}%")
        .replace(/\\\[/g, "%OPENB%")
}

String.prototype.unescape = function() {
    return this
        .replace(/%{DOL}%/g, "$")
        .replace(/%ESCAPED%/g, "]")
        .replace(/%{-SEMICOL-}%/g, ";")
        .replace(/%OPENB%/g, "[")
}