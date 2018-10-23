'use strict';

export function warner(status, field, message){
    const id = field + '-warning';
    if (status === true){
        if (document.getElementById(id)) {
            let warning = document.getElementById(id);
            warning.parentElement.removeChild(warning);
        }
    } else {
        if (document.getElementById(id)){
            let warning = document.getElementById(id);
            warning.parentElement.removeChild(warning);
            let warnSign = document.createElement('div');
            warnSign.innerHTML = message;
            warnSign.id = id;
            document.getElementById(field).appendChild(warnSign);
        } else {
            let warnSign = document.createElement('div');
            warnSign.innerHTML = message;
            warnSign.id = id;
            document.getElementById(field).appendChild(warnSign);
        }
    }

}