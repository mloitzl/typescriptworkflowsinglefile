export class Collection {
    static first<T>(array: T[], match: (item: T, index?: number) => boolean, silent?: boolean): T {
        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            if (match(item, i)) return item;
        }
        if (!silent) {
            throw "Element not found.";
        }
        return null;
    }
}