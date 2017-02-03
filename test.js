import test from 'ava';
import arget from '.';

function genArg() {
  return arget(arguments);
}
 
test('Arget.prototype.first', t => {
  t.deepEqual(genArg(1, 2, 3, 4).first(), 1);
  t.deepEqual(genArg(2, 3, 4, 5).first(), 2);
  t.deepEqual(genArg(null, 2, 3).first(), null);
  t.deepEqual(genArg().first(), undefined);
});

test('Arget.prototype.last', t => {
  t.deepEqual(genArg(1, 2, 3, 4).last(), 4);
  t.deepEqual(genArg(2, 3, 4, 5).last(), 5);
  t.deepEqual(genArg(3, 2, null).last(), null);
  t.deepEqual(genArg().last(), undefined);
});

test('Arget.prototype.get', t => {
  var f = function () {};
  t.deepEqual(genArg(1, 2, 3, 4).get(0), 1);
  t.deepEqual(genArg(2, 3, 4, 5).get(6), undefined);
  t.deepEqual(genArg(2, 3, 4, 5).get(0, Number), 2);
  t.deepEqual(genArg(2, 3, 4, 5).get(0, Function), undefined);
  t.deepEqual(genArg(2, 3, 4, f).get(0, Function), f);
  t.deepEqual(genArg(2, ()=>{}, 4, f).get(1, Function), f);
  t.deepEqual(genArg(2, ()=>{}, 4, {}, f).get(1, Object), undefined);
});

test('Arget.prototype.getRight', t => {
  var f = function () {};
  t.deepEqual(genArg(1, 2, 3, 4).getRight(0), 4);
  t.deepEqual(genArg(2, 3, 4, 5).getRight(6), undefined);
  t.deepEqual(genArg(2, 3, 4, 5).getRight(0, Number), 5);
  t.deepEqual(genArg(2, 3, 4, 5).getRight(0, Function), undefined);
  t.deepEqual(genArg(2, 3, 4, f).getRight(0, Function), f);
  t.deepEqual(genArg(2, f, 4, ()=>{}).getRight(1, Function), f);
  t.deepEqual(genArg(2, ()=>{}, 4, {}, f).getRight(1, Object), undefined);
});

test('Arget.prototype.all', t => {
  var f = function () {};
  t.deepEqual(genArg(1, 2, 3, 4).all(), [1, 2, 3, 4]);
  t.deepEqual(genArg(2, 3, 4, 5).all(Number), [2, 3, 4, 5]);
  t.deepEqual(genArg(2, 3, 4, 5).all(Object), []);
  t.deepEqual(genArg(2, [], {}, 5).all(Object), [{}]);
  t.deepEqual(genArg(2, [2, 3], {}, [4, 5]).all(Array), [[2, 3], [4, 5]]);
  t.deepEqual(genArg(2, 3, 4, f).all(Function), [f]);
});

test('Arget.prototype.toArray', t => {
  var array   = [1, 2, 3, 4]
    , wrapper = genArg.apply(this, array);

  t.deepEqual(wrapper.toArray(), array);
});

test('Arget.prototype.forEach', t => {
  var array   = [1, 2, 3, 4]
    , wrapper = genArg.apply(this, array);

  wrapper.forEach((e, i, a) => {
    t.deepEqual(array, a);
    t.deepEqual(array[i], e);
  });
});

test('Arget.prototype.each', t => {
  var wrapper = genArg();
  t.deepEqual(wrapper.forEach, wrapper.each);
});

test('Arget.prototype.filter', t => {
  var array   = [1, 2, 3, 4]
    , wrapper = genArg.apply(this, array)
    , result = wrapper.filter((e, i, a) => {
      t.deepEqual(array, a);
      t.deepEqual(array[i], e);
      return e%2 == 0;
    });
  t.deepEqual(result, [2, 4]);
});

test('Arget.prototype.map', t => {
  var array   = [1, 2, 3, 4]
    , wrapper = genArg.apply(this, array)
    , result = wrapper.map((e, i, a) => {
      t.deepEqual(array, a);
      t.deepEqual(array[i], e);
      return e*2;
    });
  t.deepEqual(result, [2, 4, 6, 8]);
});

test('Arget.prototype.pick', t => {
  var f = function () {}
    , C = function () {}
    , c = new C;
  t.deepEqual(genArg(1, 2, 3, 4).pick(Number), [1, 2, 3, 4]);
  t.deepEqual(genArg(2, 3, 4, 5).pick(Object), []);
  t.deepEqual(genArg(2, [], {}, 5).pick(Object, Array), [[], {}]);
  t.deepEqual(genArg(2, [2, 3], {}, [4, 5]).pick(Array, Function), [[2, 3], [4, 5]]);
  t.deepEqual(genArg(2, 3, 4, f).pick(Function), [f]);
  t.deepEqual(genArg(2, 3, c, f).pick(C), [c]);
});

test.todo('Arget.prototype.omit');
test.todo('Arget.prototype.match');
test.todo('Arget.prototype.matchRight');
test.todo('Arget.prototype.length');