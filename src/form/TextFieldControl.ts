namespace Form {
    export class TextFieldControl extends FieldControl {

        private _input: JQuery;

        constructor(id: string, label: string) {
            super(id, label);
        }

        public getInputValue() {
            return this._input.val();
        }

        public setInputValue(v: any) {
            this._input.val(v);
        }


        public createDomElement(): JQuery {
            if (this.enabled) {
                return $(`<div class='scs-form textbox'>`)
                    .append(this._input = $(`<input type='text'>`));
            }else{
                return $('<span>');
            }
        }
    }
}
