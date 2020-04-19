'use strict';

exports.success = function(values, res) {
  var data = {
      'status': 200,
      'values': values
  };
  res.json(data);
  res.end();
};

exports.forbidden = function(values, res) {
  var data = {
      'status': 403,
      'values': values
  };
  res.json(data);
  res.end();
};


exports.error = function(values, res) {
    var data = {
        'status': 500,
        'values': values
    };
    res.json(data);
    res.end();
};