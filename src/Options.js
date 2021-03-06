ezui.options = {
    _options: null,

    init: function (options) {
        var isTop = top == self;
        if (isTop) {
            this._options = options || {};
        } else {
            this._options = window.top.ezui.options._options;
        }
    },

    set: function (key, value) {
        this._options[key] = value;
    },

    get: function (key) {
        if (!this._options[key]) {
            this._options[key] = {};
        }
        var result = this._options[key];
        return result;
    }
}
