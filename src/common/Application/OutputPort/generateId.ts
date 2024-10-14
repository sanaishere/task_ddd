export const IDgenerator = Symbol("IDgenerator").valueOf();
export interface IDgenerator {
    generate(): string
}