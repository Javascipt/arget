function typeHash (argsObject) {
  var hash = {};
  for(var obj of argsObject) {
    var type = Object.getPrototypeOf(obj.arg).constructor;
    if(hash[type]) {
      hash[type].push(obj);
    } else {
      hash[type] = [obj];
    }
  }
    
  return hash;
}

function matchFromHash (payload, hash) {
  for(var i = 0, neutral = []; i < payload.length; i++) {
    if(payload[i]) {
      var obj = (hash[payload[i]] || []).shift() || {};
      payload[i] = obj.arg;
      obj.matched = true;
    } else {
      neutral.push(i);
    }
  }

  return neutral;
}

module.exports = {
  typeHash,
  matchFromHash
};