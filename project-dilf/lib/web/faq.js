// controller functions used as the backend functionalities on the webapp side


var index = {
    greetUser: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};
        return callback(null, {
            greeting: "Hello, John"
        });
    }

};

module.exports = index;