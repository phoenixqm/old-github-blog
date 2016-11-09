
// HERE is global util functions //////////////////

function assert(condition, msg) {
    if (!condition) {
        console.err(msg);
    }
}

// Returns the parameters which are appended to an URL
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [,""])[1].replace(/\+/g, '%20')) || null;
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
function getExtension(filename) {
    var extensionStart = filename.lastIndexOf('.'),
        extension = "";

    if (extensionStart >= 0) {
        extension = filename.substr(extensionStart).toLowerCase();
        return extension;
    } else {
        return null;
    }
}

function cloneObjNode(src) {
    var ret = (src instanceof Array ? [] : {});
    for (var key in src) {
        if (!src.hasOwnProperty(key)) {
            continue;
        }
        var val = src[key];
        if (val && typeof(val)=='object') {
            val = clone(val);
        }
        ret[key] = val;
    }
    return ret;
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}
function generateUUID_12() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}

function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function contains(target, it) {
    return target.indexOf(it) != -1;    // indexOf can be search or lastIndexOf
}

function contains(target, str, separator) {
    return separator ?
            (separator+target+separator).indexOf(separator+str+separator) > -1 :
            target.indexOf(str) > -1;
}

function startsWith(target, str, ignorecase) {
    var start_str = target.substr(0, str.length);
    return ignorecase ? start_str.toLowerCase() === str.toLowerCase() :
            start_str === str;
}
function endsWith(target, str, ignorecase) {
    var end_str = target.substring(target.length - str.length);
    return ignorecase ? end_str.toLowerCase() === str.toLowerCase() :
            end_str === str;
}

//// END of global util functions //////////////////
