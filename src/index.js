
import Translate from './translate'

((SK, $)=>{
    Object.assign(SK, {
        Translate
    });

    if($)
        Object.assign($, {
            translate(options) {
                options = Object.assign({}, Translate.options, options);

                this.each(function() {
                    let key = $(this).attr( options.keyAttribute );
                    let target = options.elementMap && options.elementMap[ this.tagName.toLowerCase() ] || options.elementMap[ "*" ];

                    let v=function($q, value) {
                        if(value!==undefined) {
                            // Setter
                            if(target === '@')
                                $q.text(value);
                            else if(target === '#')
                                $q.html(value);
                            else if (typeof target === 'string')
                                $q.attr(target, value);
                        } else {
                            // Getter
                            if(target === '@')
                                return $q.text();
                            else if(target === '#')
                                return $q.html();
                            else if (typeof target === 'string')
                                return $q.attr(target);
                            return "";
                        }
                    }

                    v($(this), Translate(key, v($(this)), options) );
                });
                return this;
            },
            translated(options) {
                options = Object.assign({}, Translate.options, options);
                if(this.length > 0) {
                    let key = $(this[0]).attr( options.keyAttribute );
                    return Translate(key, $(this[0]).text(), myOptions)
                }
                return "";
            }
        });

    $(() => {
        if(Translate.options.translateOnLoad)
            $("*["+ Skyline.Translate.options.keyAttribute +"]").translate();
    })
})(window.Skyline, window.jQuery);
