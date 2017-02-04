# ![Arget](logo.png)

> A JavaScript utility library to manipulate Function.arguments

A nice library to deal with most of arguments annoying usecases. A first Error object, a second optional argument or a last function as a callback... Arget helps solve all these issues in one line of code. Ex:

```
  var fn = () => {
    arget(arguments).toArray(); // => [1, 'str', 2, true]
    arget(arguments).pick(Number); // => [1, 2]
    arget(arguments).match(null, Boolean, String); // => [1, true, 'str']
  }

  fn(1, 'str', 2, true);
```

Second example :

```
  var fn = () => {
    var [foo, bar, foobar] = arget(arguments).match(null, null, Function);
    console.log(foo, bar, foobar);
  }

  fn({}, () => {}); // ==> {}, undefined, () => {}
  fn({}, 'value', () => {}); // ==> {}, 'value', () => {}
```


## Content


- [Install](#install)
- [Usage](#usage)
- [Arget wrapper](#arget-wrapper)
  - [.first( )](#first)
  - [.last( )](#last)
  - [.get( )](#get)
  - [.getRight( )](#getRight)
  - [.all( )](#all)
  - [.toArray( )](#toArray)
  - [.forEach( )](#forEach)
  - [.each( )](#each)
  - [.filter( )](#filter)
  - [.map( )](#map)
  - [.pick( )](#pick)
  - [.omit( )](#omit)
  - [.match( )](#match)
  - [.matchRight( )](#matchRight)
  - [.length( )](#length)

## Install
```
npm install --save arget
```

## Usage
When requiring the arget module, you'll get a function that instanciates the [Arget wrapper](#arget-wrapper) using the arguments you are passing.
```
  var arget = require('arget');

  var f = () => {
    var wrapper = arget(arguments);
  }
```
> /!\ arget instanciates the wrapper whether you pass arguments as argument to arget or not, but you need to keep in mind that there is a huge performance issue if you don't.

## Arget wrapper

### .first( )

Returns the first argument

```
  var fn () => {
    return arget(arguments).first();
  }

  fn(1, 2, 3, 4); // ==> 1
  fn(); // ==> undefined
```

### .last( )

Returns the last argument

```
  var fn () => {
    return arget(arguments).last();
  }

  fn(1, 2, 3, 4); // ==> 4
  fn(); // ==> undefined
```

### .get( )

> .get(position, [constructor = undefined])

Returns element with the constructor and the position specified

```
  var fn () => {
    return arget(arguments).get(1);
  }

  fn(true, 2, 3, 4); // ==> 2
  fn(); // ==> undefined



  var fn () => {
    return arget(arguments).get(1, Number);
  }

  fn(true, 2, 3, 4); // ==> 3
```
### .getRight()

> .getRight(position, [constructor = undefined])

Returns element with the constructor and the position from the right specified

```
  var fn () => {
    return arget(arguments).get(1);
  }

  fn(true, 2, 3, 4); // ==> 3
  fn(); // ==> undefined



  var fn () => {
    return arget(arguments).get(0, Number);
  }

  fn(true, 2, 3, 4); // ==> 4
```
### .all()

> .all([constructor = undefined])

Returns elements with the constructor specified

```
  var fn () => {
    return arget(arguments).all(Number);
  }

  fn(true, 2, 3, 4); // ==> [2, 3, 4]
  fn(); // ==> []
```
### .toArray()

Converts arguments object to array

```
  var fn () => {
    return arget(arguments).toArray();
  }

  fn(true, 2, 3, 4); // ==> [true, 2, 3, 4]
  fn(); // ==> []
```