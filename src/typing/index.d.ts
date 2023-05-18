import { CustomContext } from '../classes/client';

export * from './client';
export * from './interpreter'

declare global {
    interface String {
        escape(): string;
        unescape(): string;
    }
}