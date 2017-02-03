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

test.todo('Arget.prototype.get');
test.todo('Arget.prototype.getRight');
test.todo('Arget.prototype.all');
test.todo('Arget.prototype.toArray');
test.todo('Arget.prototype.forEach');
test.todo('Arget.prototype.each');
test.todo('Arget.prototype.filter');
test.todo('Arget.prototype.map');
test.todo('Arget.prototype.pick');
test.todo('Arget.prototype.omit');
test.todo('Arget.prototype.match');
test.todo('Arget.prototype.matchRight');
test.todo('Arget.prototype.length');