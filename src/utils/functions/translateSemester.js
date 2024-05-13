import {SEMESTERS} from "../consts/semesters.js";

export const translateSemester = (season) => {
    return SEMESTERS[season] || season;
};