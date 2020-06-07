ezui = {};
require("./Utils");
require("./Tips");
require("./Options");
require("./Data");
require("./AjaxFilter");
require("./Window");
require("./Dict");

ezui.init = function (options) {
    if (ezui.uitls.isTop()) {
        ezui.options.init(options);
        //初始化字典
        if (options.dictUrl) {
            ezui.dict.updateDict(options.dictUrl);
        }
    }

}