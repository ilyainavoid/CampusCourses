export  const setTextLight = (placesLeft, placesTotal) => {
    let percentage = (placesLeft / placesTotal) * 100;
    switch (true) {
        case percentage > 70:
            return "success";
        case percentage > 40 && percentage <= 70:
            return "warning";
        case percentage <= 40:
            return "danger";
        default:
            return "default";
    }
};