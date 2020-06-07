// config
window.webRoot = '';
window.serviceRoot = '/service';

// load libs
if (typeof module === 'object') { window.module = module; module = undefined; }

document.write(`<link type="text/css" rel="stylesheet" href="${webRoot}/lib/easyui/themes/material/easyui.css">`);
document.write(`<link type="text/css" rel="stylesheet" href="${webRoot}/lib/easyui/themes/icon.css">`);
document.write(`<link type="text/css" rel="stylesheet" href="${webRoot}/lib/easyui/themes/color.css">`);
document.write(`<link type="text/css" rel="stylesheet" href="${webRoot}/lib/ezui-form.css">`);


document.write(`<script type="text/javascript" src="${webRoot}/lib/easyui/jquery.min.js"></script>`);
document.write(`<script type="text/javascript" src="${webRoot}/lib/easyui/jquery.easyui.min.js"></script>`);
document.write(`<script type="text/javascript" src="${webRoot}/lib/loadingoverlay.min.js"></script>`);
document.write(`<script type="text/javascript" src="${webRoot}/lib/jquery.serializejson.min.js"></script>`);
document.write(`<script type="text/javascript" src="${webRoot}/lib/ezui.js"></script>`);

if (window.module) module = window.module;
