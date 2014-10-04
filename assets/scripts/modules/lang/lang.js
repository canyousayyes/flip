define('lang', ['lang_en', 'lang_zh'], function (en, zh) {
	var Lang = {
		en: en,
		zh: zh,
        current_lang: 'en',
		get: function () {
			var self = this;
			return self.current_lang;
		},
		set: function (val) {
			var self = this;
			self.current_lang = val;
		},
		// Return the string (or object of strings) with the input key in the pre-set language.
		// Return null if current language is invalid, or if the key is invalid.
		// Return the whole language object if key is not provided.
		str: function (key_str) {
			var self = this;
			var current_lang_obj = self[self.current_lang];

			if (typeof current_lang_obj === 'undefined') {
				return null;
			}

			if (typeof key_str === 'undefined') {
				return current_lang_obj;
			}

            var key_list = key_str.split('.');
            var obj = current_lang_obj;
            for (var i = 0; i < key_list.length; i++) {
                var key = key_list[i];
                if ( typeof obj[key] === 'undefined' ) {
                    return null;
                } else {
                    obj = obj[key];
                }
            }

            return obj;
		}
	};
	return Lang;
});
