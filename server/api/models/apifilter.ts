export interface ApiFilter {
    where: object;
    order: Array<string>;
    limit: number;
    skip: number;
}