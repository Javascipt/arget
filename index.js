var _util = require('./lib/_util');

var Arget = function (args) {
  this._args = args;
};

Arget.prototype.first = function (type) {
  if(type) return this.get(0, type);

  return this._args[0];
};

Arget.prototype.last = function (type) {
  if(type) return this.getRight(0, type);

  return this._args[this._args.length - 1];
};

Arget.prototype.get = function (index, type) {
  if(!type) return this._args[index];

  for(var i = 0; i<this.length; i++) {
    if(Object.getPrototypeOf(this._args[i]) == type.prototype) {
      return this._args[i];
    }
  }
};

Arget.prototype.getRight = function (index, type) {
  if(!type) return this._args[this.length - index - 1];

  for(var i = this.length  - 1; i >= 0; i--) {
    if(Object.getPrototypeOf(this._args[i]) == type.prototype) {
      return this._args[i];
    }
  }
};

Arget.prototype.all = function (type) {
  if(!type) return this.toArray();

  var args = [];
  for(var i = 0; i<this.length; i++) {
    if(Object.getPrototypeOf(this._args[i]) == type.prototype) {
      args.push(this._args[i]);
    }
  }

  return args;
};

Arget.prototype.toArray = function () {
  return Array.prototype.slice.call(this._args);
};

Arget.prototype.forEach = function (iteratee) {
  this.toArray().forEach(iteratee);
};

Arget.prototype.each = Arget.prototype.forEach;

Arget.prototype.filter = function (predicate) {
  return this.toArray().filter(predicate);
};

Arget.prototype.pick = function () {
  var argsObject  = this.toArray().map(arg => { return { arg }; })
    , hash        = _util.typeHash(argsObject)
    , payload     = ( new Arget(arguments) ).toArray()
    , neutral     = _util.pickFromHash(payload, hash);

  for(var i = 0, obj; i < neutral.length; i++) {
    do { obj = argsObject.shift(); } while (obj && obj.picked);
    payload[neutral[i]] = obj ? obj.arg : null;
  }

  return payload;
};

Object.defineProperty(Arget.prototype, 'length', { 
  get : function () {
    return this._args.length;
  }
});

module.exports = function arget (args) {
  return new Arget(args || arget.caller.arguments);
};