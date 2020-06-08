$._originAjax = $.ajax;
$.ajax = function (settings) {

    //默认POST请求
    if (!settings.type) {
        settings.type = 'POST';
    }
    if (!settings.dataType) {
        settings.dataType = 'json'; //注意，若服务端没返回json格式的数据，也会进入error
    }

    // easyui form 会提交FormData而不是json，easyui.min.js 8833行有改动，默认dataType修改为json,并区分了success、error来代替complete
    var formData = false;
    if (Object.prototype.toString.call(settings.data) == '[object FormData]') {
        formData = true;
    }

    // 典型的easyui form,将其修改为普通的方式：统一拦截错误并提示，如果成功则回调自定义的success
    if (formData && settings.dataType == 'html' && !settings.success && !settings.error && settings.complete) {
        settings.success = settings.complete;
        settings.dataType = 'json';
        settings.complete = undefined;
    }


    //获取遮罩设置
    if (formData) {//从FormData中获得maskId的值
        var _maskId = settings.data.get("_maskId");
        if (_maskId) {
            settings.maskId = _maskId;
        }
        var _maskMsg = settings.data.get("_maskMsg");
        if (_maskMsg) {
            settings.maskMsg = _maskMsg;
        }
    } else {
        if (settings.data && settings.data._maskId) {
            settings.maskId = settings.data._maskId;
        }
        if (settings.data && settings.data._maskMsg) {
            settings.maskMsg = settings.data._maskMsg;
        }

    }

    //请求前调用的函数
    var _beforeSend = settings.beforeSend;
    settings.beforeSend = function (xhr) {
        if (settings.maskId) {//加载遮罩
            $(settings.maskId).LoadingOverlay("show", {
                text: settings.maskMsg ? settings.maskMsg : 'Loading....'
            })
        }
        if (_beforeSend) {
            _beforeSend(xhr);
        }
    }

    //请求完成时调用的函数
    var _complete = settings.complete;
    settings.complete = function (xhr, textStatus) {
        if (settings.maskId) {//取消遮罩
            $(settings.maskId).LoadingOverlay("hide");
        }
        if (_complete) {
            _complete(xhr, textStatus);
        }

    }
    //请求失败时调用的函数
    var _error = settings.error;
    settings.error = function (xhr, status, error) {
        switch (xhr.status) {
            case (200):
                //如果指定dataType是json,但是服务端没返回json格式的数据，也会进入error，常见于controller返回void，不必理会
                alert("必须返回Json对象，不能为空或者其它类型");
                return;
            case (500):
                if (xhr.responseJSON && xhr.responseJSON.msg) {
                    $.messager.alert('出错了', xhr.responseJSON.msg, 'warning');
                } else {
                    $.messager.alert('未知的错误', xhr.responseText, 'error');
                }
                break;
            case (401):
                if (window.top.ezui.options._options.on401) {
                    window.top.ezui.options._options.on401(settings)
                } else {
                    alert('无法识别当前用户，请重新登录');
                }
                break;
            case (403):
                alert("无权限执行此操作" + xhr.status);
                break;
            case (404):
                alert("找不到服务" + xhr.status);
                break;
            case (408):
                alert("请求超时" + xhr.status);
                break;
            default:
                alert("未知错误" + xhr.status);
        }

        if (_error) {
            _error(xhr, status, error);
        }

    }

    //请求成功时调用的函数
    var _success = settings.success;
    settings.success = function (result, status, xhr) {
        if (result.tip) {
            $.messager.show({
                title: result.title,
                msg: result.msg,
                timeout: result.timeout,
                showType: result.showType
            });
        }

        if (_success) {
            _success(result, status, xhr);
        }

    }
    console.log(settings.dataType);
    $._originAjax(settings);
}

