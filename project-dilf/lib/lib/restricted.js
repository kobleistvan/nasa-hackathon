var restrictedZonesModel = require('../models/restrictedZones');

var restrictedZones = {

    getRestrictedZones: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        return restrictedZonesModel.getRestrictedZones(data, callback);
    }
};

module.exports = restrictedZones;