ezui.dict = {
    updateDict: function (url) {
        if (!url) {
            url = ezui.options._options.dictUrl;
        }
        if (!url) {
            return;
        }
        $.post(url, function (data) {
            ezui.data.set('_dict', data);
        });
    },
    getDict: function (dictCode) {
        var dict = ezui.data.get('_dict');
        return dict[dictCode];
    },
    getDictValue: function (dictCode, dictItemCode) {
        var dict = ezui.data.get('_dict');
        var result = null;
        if (dict[dictCode]) {
            var dictItemArray = dict[dictCode];
            for (index in dictItemArray) {
                dictItem = dictItemArray[index];
                if (dictItem.value == dictItemCode) {
                    result = dictItem.text;
                    break;
                }
            }
        }
        return result == null ? "-" : result;
    },
}