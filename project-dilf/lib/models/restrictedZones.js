var JsonDB = require('node-json-db');

var db = new JsonDB("database/restrictedZones", true, true);

var restrictedZones = {

    // Return all the restricted zones
    getRestrictedZones: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        try {
            var data = db.getData("/");
        } catch (error) {
            console.error(error);
            return callback("An error occured while parsing the database.", error);
        }

        return callback(null, {
            success: true,
            restrictedZones: data
        })

    }

}

module.exports = restrictedZones;