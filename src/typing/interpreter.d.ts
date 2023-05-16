import { Context } from "erine";
import type { Erisa } from '../classes/client'
import { FunctionManager } from "../classes/parser/functions";

export interface Data {
    context?: Context;
    args?: string;
    client?: Erisa;
    data?: SystemData;
    args?: string;
    message?: any;
    author?: any;
    member?: any;
    channel?: any;
    code?: string;
    codeLines: any;
    functions: any[];
    FunctionManager: FunctionManager;
}

export interface SystemData {
    vars?: Vars;
    random?: any;
    splits?: any[];
}

interface Vars {
    [key: string]: any
}

export interface Token {
    text: string;
    function: boolean
}