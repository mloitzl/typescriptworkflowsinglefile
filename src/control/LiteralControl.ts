namespace Controls {
    export class LiteralControl extends Control {
        private _inner: JQuery;

        public get html(): string {
            return this._inner[0].outerHTML;
        }

        public set html(v: string) {

            if (typeof v === 'string') {
                this._inner.replaceWith(v);
            } else {
                const replace = $(v);
                this._inner.replaceWith(replace);
                // this._inner = replace;
            }
        }

        constructor(html: JQuery)
        constructor(html: string)
        constructor(html: any) {
            super(null);
            this._inner = typeof html === 'string' ? $(html) : <JQuery>html;
        }

        public createDomElement(): JQuery {
            return this._inner;
        }
    }
}
