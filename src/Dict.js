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
        let dict = ezui.data.get('_dict');
        return dict[dictCode];
    },
    getDictValue: function (dictCode, dictItemCode) {
        let dict = ezui.data.get('_dict');
        let result = null;
        if (dict[dictCode]) {
            let dictItemArray = dict[dictCode];
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