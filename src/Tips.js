ezui.tips = {
    successTip: function (message) {
        window.top.$.messager.show({
            title: '提示',
            msg: message,
            timeout: 2000,
            showType: 'fade'
        });
    },

    failedTip: function (message) {
        window.top.$.messager.alert('出错了', message);
    },
}