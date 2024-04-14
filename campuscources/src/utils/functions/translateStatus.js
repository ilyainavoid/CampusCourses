import {STATUSES} from "../consts/statuses.js";


export const translateStatus = (status) => {
    return STATUSES[status] || status;
};