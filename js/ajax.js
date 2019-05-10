function ajax(obj){
    if(!obj){
        return;
    }
    obj.type = obj.type || 'GET';
    obj.url = obj.url || '';
    obj.data = obj.data || null;
    obj.ancy = obj.ancy || true;
    obj.success = obj.success || function(){};
    obj.error = obj.error || function(){};
    var arr = [];
    for(var key in obj.data){
        arr.push(key +'='+ obj.data[key]);
    }
    var str = arr.join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    if(obj.type.toUpperCase() === 'GET'){
        xhr.open(obj.type,obj.url,obj.ancy);
        xhr.send();
    }else if(obj.type.toUpperCase() === 'POST'){
        xhr.open(obj.type,obj.url,obj.ancy);
        xhr.setRequestHeader('content-type','Application/x-www-form-urlencoded;charset=utf-8');
        xhr.send(str);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                if(obj.success instanceof Function){
                    obj.success(xhr.responseText);
                }
            }else{
                if(obj.error instanceof Function){
                    obj.error();
                }
            }
        }
    }
}