function hashByType (argsObject) {
  var hash = {};
  for(var obj of argsObject) {
    var type = getType(obj.arg);
    if(hash[type]) {
      hash[type].push(obj);
    } else {
      hash[type] = [obj];
    }
  }
    
  return hash;
}

function getType (value) {
  try {
    return Object.getPrototypeOf(value).constructor.name;
  } catch (ex) {
    return Symbol();
  }
}

function hashRightByType (argsObject) {
  var hash = {};
  for(var obj of argsObject) {
    var type = getType(obj.arg);
    if(hash[type]) {
      hash[type].unshift(obj);
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

function matchRightFromHash (payload, hash) {
  for(var i = payload.length - 1, neutral = []; i >= 0 ; i--) {
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

function toKeys (array) {
  return array.reduce((obj, el) => {
    obj[el] = true;

    return obj;
  }, {});
}

module.exports = {
  hashByType,
  hashRightByType,
  matchFromHash,
  matchRightFromHash,
  getType,
  toKeys
};