export const CONFIG_DBG = {
    apiUrl: "http://127.0.0.1:8080"
};
export const CONFIG = {
    apiUrl: "/homeworkupload"
};
Date.prototype.Format = function(fmt)
{ //author: meizz
    let o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "H+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(let k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

export function doAjax(method, url, func, formData) {
    let ajax = new XMLHttpRequest();
    ajax.open(method, CONFIG.apiUrl + url, true);
    ajax.onload = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            let result = JSON.parse(ajax.responseText);
            func(result);
        }
    };
    ajax.withCredentials = true;
    ajax.send(formData);
}

export function isSignIn(action) {
    return doAjax("GET",   "/api/auth/issignin", action);
}
