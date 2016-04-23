// USEFUL METHODS

var utils = {

    // Checks if a number is in range or not (i.e. for coordonates)
    inRange: function(min, number, max) {
        if (!isNaN(number) && (number >= min) && (number <= max)) {
            return true;
        } else {
            return false;
        };
    },

    isValidLat: function(latitude) {
        return this.inRange(-90, latitude, 90);
    },

    isValidLon: function(longitude) {
        return this.inRange(-180, longitude, 180);
    }

}

module.exports = utils;