ezui.window = {
    open: function (options, params, callback) {
        //设置默认窗口风格
        var opts = $.extend({
            width: 1024,
            height: 600,
            title: 'New Window',
            url: '',
            maximizable: false,
            minimizable: false,
            resizable: true,
            modal: true,
            onClosed: function () {
            }
        }, options || {});


        //构造窗口容器
        var winId = "_iframe_" + (new Date()).getTime();

        window.top.$('body', window.top.document).append(`<div style="overflow: hidden" id="_div_${winId}"></div>`)
        var winDiv = window.top.$(`#_div_${winId}`, window.top.document);

        //url加上时间戳后缀
        let url = ezui.uitls.timestampUrl(opts.url);

        //在容器中加载iframe
        var content = `<iframe scrolling="auto" name="${winId}" src="${url}" frameborder="0" style="width:100%;height:100%;" ></iframe><div style="clear:both;"/>`;
        winDiv.append(content);

        //用easyui打开窗口
        winDiv.window({
            title: opts.title,
            width: opts.width,
            height: opts.height,
            modal: opts.modal,
            collapsible: false,
            minimizable: opts.minimizable,
            maximizable: opts.maximizable,
            resizable: opts.resizable,
            closable:opts.closable,
            onClose: function () {
                opts.onClosed();
                winDiv.window('destroy');
            }
        });

        //注册窗口信息
        ezui.data.get('_wins')[winId] = {
            callback: callback || function () { },
            container: winDiv,
            params: params
        };

    },
    close: function (callbackParams, topTip) {
        let winId = window.name;
        if (data) {
            var winCallback = ezui.data.get('_wins')[winId].callback;
            winCallback(callbackParams);
            if (topTip) {
                window.top.$.messager.show({
                    title: '',
                    msg: topTip,
                    timeout: 2000,
                    showType: 'fade'
                });
            }
        }
        var winDiv = Global.get('_wins')[winId].container;
        winDiv.window('close');
    },
    getParams: function () {
        let winId = window.name;
        return ezui.data.get('_wins')[winId].params;
    },
    setTitle: function (title) {
        let winId = window.name;
        let winDiv = Global.get('_wins')[winId].container;
        winDiv.window('setTitle', title);
    },
}