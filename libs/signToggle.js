'use strict';
import { messenger } from "./warnLogs";

export function warnToggle(field, status) {
    const id = field + '-warning';
    let message;
    switch (status) {
        case true:
            if (document.getElementById(id)) {
                let sign = document.getElementById(id);
                sign.parentElement.removeChild(sign)
            }
            break;
        case false:
            if (!document.getElementById(id)) {
                //add warning message if server login validation failed
                let sign = document.createElement('div');
                sign.innerHTML = messenger(field);
                sign.id = 'warning';
                document.getElementById(field).appendChild(sign);
            }
            break;
    }

}