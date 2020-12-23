import {options} from "./options";

const fn = function(key, defValue, myOptions) {
    if(key) {
        myOptions = Object.assign({}, options, myOptions ? myOptions : {});

        if(myOptions.logKeys) {
            if(!this.registeredKeys)
                this.registeredKeys = [];
            if(this.registeredKeys.indexOf(key) === -1) {
                console.log(key);
                this.registeredKeys.push(key);
            }
        }

        let f = (k, t) => {
            if(typeof t === 'function')
                return t(k);
            let v = t[k];
            if(typeof v === 'function')
                return v(k);
            return v;
        };

        let trans = f(key, myOptions.translations);
        if(trans)
            return trans;
        else {
            trans = f(key, myOptions.defaults);
            if(trans)
                return trans;
        }
    }
    return defValue;
};

fn.extendDefaults= function(translations) {
    Object.assign(options.defaults, translations);
};
fn.extendTranslations= function(translations) {
    Object.assign(options.translations, translations);
}
fn.options = options;
export default fn;
