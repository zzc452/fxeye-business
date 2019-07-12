export let formatTime = (timestamp,format)=>{
    if(timestamp instanceof Date){
        var date = timestamp;
    }else{
        timestamp = timestamp+'';
        if( !timestamp.includes('-') &&  !timestamp.includes('.')){
            timestamp=parseInt(timestamp)*1000;//格式化时间戳
        }else{
            try{
                if(timestamp.length<18){timestamp=timestamp.replace(/-/g,'/')}
                timestamp = new Date(timestamp).valueOf();
            }
            catch(err){
                throw new Error('当前值不适用时间格式化过滤器');
            }
        }
        var date = new Date(timestamp);
    }
    var o = {
        "M+" :date.getMonth() + 1, // month
        "d+" :date.getDate(), // day
        "h+" :date.getHours(), // hour
        "m+" :date.getMinutes(), // minute
        "s+" :date.getSeconds(), // second
        "q+" :Math.floor((date.getMonth() + 3) / 3), // quarter
        "S" :date.getMilliseconds()// millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }
    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
export let formatMonth = (month,format)=>{
    let arr = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
    return arr[month];
}
export let formatNull = (val)=>{
    return val == ''|| val == null ? '--' :val;
}

