import {seasonTranslations} from "../consts/seasons.js";

export const setSeason = (season) => {
    return seasonTranslations[season] || season;
};