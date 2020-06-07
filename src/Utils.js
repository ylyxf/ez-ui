ezui.uitls = {
    isTop: function () {
        return top == self;
    },

    timestampUrl: function (url) {
        if (url.indexOf('?') != -1) {
            url = url + '&t=' + (new Date()).getTime();
        } else {
            url = url + '?t=' + (new Date()).getTime();
        }
        return url;
    },
    propertyArray: function (arrayData, propertyName) {
        var result = new Array();
        for (item in arrayData) {
            var resultValue = arrayData[item][propertyName];
            if (resultValue != undefined) {
                result.push(resultValue);
            }
        }
        return result;
    },

}