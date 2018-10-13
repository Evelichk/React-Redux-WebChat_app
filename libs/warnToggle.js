'use strict';
import { messenger } from "./messenger";

//Toggels warning message
export function warnToggle(field, status) {
    //parent element id
    const id = field + '-warning';
    switch (status) {
        case true:
            //if warning message exsits it will be deleted
            if (document.getElementById(id)) {
                let sign = document.getElementById(id);
                sign.parentElement.removeChild(sign)
            }
            break;
        case false:
            if (!document.getElementById(id)) {
                //add warning message if validation failed
                let sign = document.createElement('div');
                sign.innerHTML = messenger(field);
                sign.id = id;
                document.getElementById(field).appendChild(sign);
            }
            break;
    }

}