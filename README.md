# ![Arget](logo.png)

> A JavaScript utility library to manipulate Function.arguments

![Arget](https://api.travis-ci.org/Javascipt/arget.svg)

A nice library to deal with most of arguments annoying usecases. A first Error object, a second optional argument or a last function as a callback... Arget helps solve all these issues in one line of code. Ex:

```javascript
  function fn () {
    arget(arguments).toArray(); // => [1, 'str', 2, true]
    arget(arguments).pick(Number); // => [1, 2]
    arget(arguments).match(null, Boolean, String); // => [1, true, 'str']
  }

  fn(1, 'str', 2, true);
```

Second example :

```javascript
  function fn () {
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
  - [.first( )](#first-)
  - [.last( )](#last-)
  - [.get( )](#get-)
  - [.getRight( )](#getRight-)
  - [.all( )](#all-)
  - [.toArray( )](#toarray-)
  - [.forEach( )](#foreach-)
  - [.each( )](#each-)
  - [.filter( )](#filter-)
  - [.map( )](#map-)
  - [.pick( )](#pick-)
  - [.omit( )](#omit-)
  - [.match( )](#match-)
  - [.matchRight( )](#matchright-)
  - [.length](#length)
- [License](#license)

## Install
```
npm install --save arget
```

## Usage
When requiring the arget module, you'll get a function that instanciates the [Arget wrapper](#arget-wrapper) using the arguments you are passing.
```javascript
  var arget = require('arget');

  function fn () {
    var wrapper = arget(arguments);
  }
```
> /!\ arget instanciates the wrapper whether you pass arguments as argument to arget or not, but you need to keep in mind that there is a huge performance issue if you don't.

## Arget wrapper

### .first( )

Returns the first argument

```javascript
  function fn () {
    return arget(arguments).first();
  }

  fn(1, 2, 3, 4); // ==> 1
  fn(); // ==> undefined
```

### .last( )

Returns the last argument

```javascript
  function fn () {
    return arget(arguments).last();
  }

  fn(1, 2, 3, 4); // ==> 4
  fn(); // ==> undefined
```

### .get( )

> .get(position, [constructor = undefined])

Returns element with the constructor and the position specified

```javascript
  function fn () {
    return arget(arguments).get(1);
  }

  fn(true, 2, 3, 4); // ==> 2
  fn(); // ==> undefined



  function fn () {
    return arget(arguments).get(1, Number);
  }

  fn(true, 2, 3, 4); // ==> 3
```
### .getRight( )

> .getRight(position, [constructor = undefined])

Returns element with the constructor and the position from the right specified

```javascript
  function fn () {
    return arget(arguments).get(1);
  }

  fn(true, 2, 3, 4); // ==> 3
  fn(); // ==> undefined



  function fn () {
    return arget(arguments).get(0, Number);
  }

  fn(true, 2, 3, 4); // ==> 4
```
### .all( )

> .all([constructor = undefined])

Returns elements with the constructor specified

```javascript
  function fn () {
    return arget(arguments).all(Number);
  }

  fn(true, 2, 3, 4); // ==> [2, 3, 4]
  fn(); // ==> []
```
### .toArray( )

Converts arguments object to array

```javascript
  function fn () {
    return arget(arguments).toArray();
  }

  fn(1, 2, 3, 4); // ==> [1, 2, 3, 4]
  fn(); // ==> []
```
### .forEach( )

>  .forEach(iteratee)

Iterates over the arguments

```javascript
  function fn () {
    arget(arguments).forEach(e => console.log(e));
  }

  fn(1, 2, 3, 4); // ==> prints 1 2 3 4

```
The `iteratee` takes 3 arguments :

> iteratee(item, index, array)

- `item`  : The element
- `index` : The element index on the arguments
- `array` : The arguments as array

```javascript
  function fn () {
    arget(arguments).forEach((item, index, array) => {
      console.log(item, index, array)
    });
  }

  fn(1, 2, 3);

  // prints :
  // 1 0 [1, 2, 3]
  // 2 1 [1, 2, 3]
  // 3 2 [1, 2, 3]

```

### .each( )

Alias of [.forEach( )](#foreach)

### .filter( )

>  .filter(predicate)

Returns an array filtred depending on the returned value of the predicate for each item. The result contains items that the predicate returned a truthy value for.

```javascript
  function fn () {
    return arget(arguments).filter(e => e != 3);
  }

  fn(1, 2, 3, 4); // ==> 1 2 4

```

The `predicate` takes 3 arguments :

> predicate(item, index, array)

- `item`  : The element
- `index` : The element index on the arguments
- `array` : The arguments as array

### .map( )

>  .map(predicate)

Returns an array containing the result of the predicate for each element

```javascript
  function fn () {
    return arget(arguments).map(e => e * 2);
  }

  fn(1, 2, 3, 4); // ==> 2 4 6 8

```
The `iteratee` takes 3 arguments :

> iteratee(item, index, array)

- `item`  : The element
- `index` : The element index on the arguments
- `array` : The arguments as array

### .pick( )

>  .pick(contructor[, constructor[, ...]])

Returns an array of elements with the constructors specified

```javascript
  function fn () {
    return arget(arguments).pick(Number)
  }

  fn(true, 1, 2, 'str'); // ==> [1, 2]


  function fn () {
    return arget(arguments).pick(Number, String)
  }

  fn(true, 1, {}, 'str'); // ==> [1, 'str']

```

### .omit( )

>  .omit(contructor[, constructor[, ...]])

Returns an array of elements without those with the constructors specified

```javascript
  function fn () {
    return arget(arguments).omit(Number)
  }

  fn(true, 1, 2, 'str'); // ==> [true, 'str']


  function fn () {
    return arget(arguments).omit(Number, String)
  }

  fn(true, 1, {}, 'str'); // ==> [true, {}]

```
### .match( )

>  .match(contructor[, constructor[, ...]])

Returns an array of elements depending in the pattern of constructors specified.
When a falsy value is given instead of a constructor, the position is filled with an elements not matched yet.

```javascript
  function fn () {
    return arget(arguments).match(null, null, Function);
  }

  fn(1, () => {}); // ==> [1, undefined, () => {}]
  fn(1, 'value', () => {}); // ==> [1, 'value', () => {}]



  function fn () {
    return arget(arguments).match(Array, null, Number, null, Function);
  }

  fn(1, 2, 3, () => {}, []) // ==> [ [], 2, 1, 3, () => {} ]
```
> /!\ : Note that the match method starts first by putting the items with the constructors specified on their position, then it fills the falsy positions with the rest.

### .matchRight( )

>  .matchRight(contructor[, constructor[, ...]])

Similar to [.match( )](#match-) but it loops **from right to left**.

Returns an array of elements depending in the pattern of constructors specified. 
When a falsy value is given instead of a constructor, the position is filled with an elements not matched yet.

```javascript
  function fn () {
    return arget(arguments).matchRight(null, null, Function);
  }

  fn(1, () => {}); // ==> [undefined, 1, () => {}]
  fn(1, 'value', () => {}); // ==> [1, 'value', () => {}]



  function fn () {
    return arget(arguments).matchRight(Array, null, Number, null, Function);
  }

  fn(1, 2, 3, () => {}, []) // ==> [ [], 1, 3, 2, () => {} ]
```
> /!\ : Note that the matchRight method starts first by putting the items with the constructors specified on their position, then it fills the falsy positions with the rest.

### .length

Returns the number of elements


```javascript
  function fn () {
    return arget(arguments).length
  }

  fn(); // ==> 0
  fn(1, () => {}); // ==> 2
  fn(1, 'value', () => {}); // ==> 3
```

## License
MIT