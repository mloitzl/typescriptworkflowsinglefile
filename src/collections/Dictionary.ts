export class Dictionary {
    public static forEach(obj: any, action: (k: string, v: any, i?: number) => void) {
        var i = 0;
        for (var k in obj) action(k, obj[k], i++);
    }

    public static getKeys(obj: any): string[] {
        var arr = [];
        for (var k in obj) arr.push(k);
        return arr;
    }

    public static map<T>(obj: any, map: (k: string, v: any) => T): T[] {
        var arr = [];
        for (var k in obj) arr.push(map(k, obj[k]));
        return arr;
    }
}
