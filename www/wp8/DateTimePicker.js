
var exec = require('cordova/exec');

/**
 * Constructor
 */
function DatePicker() {
    this._callback;
}


DatePicker.prototype.show = function(options, cb) {
    if (cb && (typeof cb !== "function")) {
        console.log("DateTimePicker Error: cb is not a function");
        return;
    }

    var padDate = function (date) {
        if (date.length == 1) {
            return ("0" + date);
        }
        return date;
    };

    var formatDate = function (date) {
        date = new Date(date);
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }
    if (options.date) {
        options.date = formatDate(options.date);
    }

    if (options.minDate) {
        options.minDate = formatDate(options.minDate);
    }

    if (options.maxDate) {
        options.maxDate = formatDate(options.maxDate);
    }

    var onSuccess = function (date) {
        var d = new Date(parseInt(date,10));
        if (cb) {
            cb(d);
        }
    }
    if (options.mode == 'date') {
        exec(onSuccess,
          null,
          "DateTimePicker",
          "selectDate",
          [options.date]
        );
    } else {
        exec(onSuccess,
          null,
          "DateTimePicker",
          "selectTime",
          [options.date]
        );
    }
}

    /**
    * Open DateTime picker to select a date
    *
    * @param {Function} successCallback
    * @param {Function} errorCallback
    * @param {Object} options - additional options: 'value' - initial value for date
    */
    // pickerexport.selectDate = function (successCallback, errorCallback, options) {
    //     if (successCallback && (typeof successCallback !== "function")) {
    //         console.log("DateTimePicker Error: successCallback is not a function");
    //         return;
    //     }

    //     if (errorCallback && (typeof errorCallback !== "function")) {
    //         console.log("DateTimePicker Error: errorCallback is not a function");
    //         return;
    //     }

    //     exec(function (res) {

    //         successCallback(new Date(parseFloat(res)));

    //     }, errorCallback, "DateTimePicker", "selectDate", options.value);
    // };

    /**
    * Open DateTime picker to select a time
    *
    * @param {Function} successCallback
    * @param {Function} errorCallback
    * @param {Object} options - additional options: 'value' - initial value for time
    */
    // pickerexport.selectTime = function (successCallback, errorCallback, options) {
    //     if (successCallback && (typeof successCallback !== "function")) {
    //         console.log("DateTimePicker Error: successCallback is not a function");
    //         return;
    //     }

    //     if (errorCallback && (typeof errorCallback !== "function")) {
    //         console.log("DateTimePicker Error: errorCallback is not a function");
    //         return;
    //     }

    //     exec(function (res) {

    //      successCallback(new Date(parseFloat(res)));

    //     }, errorCallback, "DateTimePicker", "selectTime", options.value);
    // };


var datePicker = new DatePicker();
module.exports = datePicker;

if (!window.plugins) {
    window.plugins = {};
}
if(!window.plugins.datePciker) {
    window.plugins.datePicker = datePicker;
}
