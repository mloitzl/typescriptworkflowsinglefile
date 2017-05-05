namespace Form {

    export abstract class FieldControl extends Controls.Control {

        private _hasInputControl = false;
        private _fieldValue: any;

        constructor(id?: string, public label?: string) {
            super(id);
        }

        protected setInputValue(v: any) {
            this.getDomElement().val(v);
        }

        protected getInputValue(): any {
            return this.getDomElement().val();
        }

        protected setReadOnlyValue(v: any) {
            this.getDomElement().text(v === null ? '' : v);
        }

        protected initDomElement(element: JQuery) {
            super.initDomElement(element);

            this._hasInputControl = this.enabled;

            if (this._hasInputControl) {
                this.setInputValue(this._fieldValue);
            } else {
                this.setReadOnlyValue(this._fieldValue);
            }
        }

        // override
        public setValue(v: any) {
            this._fieldValue = v;
            this.setInternalValue(v);
        }
        // override
        public getValue(): any {
            return this.getInternalValue();
        }

        private setInternalValue(v: any) {
            if (this.domInitialzed) {
                if (this.enabled) {
                    this.setInputValue(v);
                } else {
                    this.setReadOnlyValue(v);
                }
            }
        }

        public getReadOnlyInputValue(): any {
            return this._fieldValue;
        }

        private getInternalValue(): any {
            return this._hasInputControl &&
                this.domInitialzed ? this.getInputValue() : this.getReadOnlyInputValue();
        }
    }
}
