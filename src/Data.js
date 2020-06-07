ezui.data = {
    _data: null,

    init: function () {
        var isTop = top == self;
        if (isTop) {
            this._data = {};
        } else {
            this._data = window.top.ezui._data;
        }
    },

    set: function (key, data) {
        this._data[key] = data;
    },

    get: function (key) {
        if (!this._data[key]) {
            this._data[key] = {};
        }
        var result = this._data[key];
        return result;
    }
}
ezui.data.init();