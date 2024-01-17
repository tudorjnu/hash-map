const assert = require("assert");

class HashMap {
  constructor() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null);
    this.keyList = new Array(this.capacity).fill(null);
    this.loadFactor = 0.75;
  }

  static #hash(string) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }

    return hashCode;
  }

  resize() {
    this.capacity *= 2;

    const oldBuckets = this.buckets;
    this.buckets = new Array(this.capacity).fill(null);

    const oldKeyList = this.keyList;
    this.keyList = new Array(this.capacity).fill(null);

    for (let i = 0; i < oldBuckets.length; i++) {
      if (oldBuckets[i] !== null) {
        const hashedKey = HashMap.#hash(oldKeyList[i]);
        const hashedIndex = hashedKey % this.capacity;
        this.buckets[hashedIndex] = oldBuckets[i];
        this.keyList[hashedIndex] = oldKeyList[i];
      }
    }
  }

  // takes two arguments, the first is a key and the second is a value that is
  // assigned to this key. If a key already exists, then the old value is overwritten.
  set(key, value) {
    const hashedKey = HashMap.#hash(key);
    const hashedIndex = hashedKey % this.capacity;

    this.keyList[hashedIndex] = key;
    this.buckets[hashedIndex] = value;

    const reachedLimit = this.length() / this.capacity > this.loadFactor;
    console.log(reachedLimit);
    if (reachedLimit) {
      this.resize();
    }
  }

  // takes one argument as a key and returns the value that is assigned to this key.
  // If key is not found, return null
  get(key) {
    if (!this.has(key)) {
      return null;
    }

    const hashedKey = HashMap.#hash(key);
    const hashedIndex = hashedKey % this.capacity;
    const value = this.buckets[hashedIndex];
    return value;
  }

  // takes a key as an argument and returns true or false based on whether or
  // not the key is in the hash map.
  has(key) {
    const hashedKey = HashMap.#hash(key);
    const hashedIndex = hashedKey % this.capacity;
    if (this.keyList[hashedIndex] === key) {
      return true;
    }
    return false;
  }

  // takes a key as an argument. If the given key is in the hash map, it should
  // remove the entry with that key and return true.
  // If the key isn’t in the hash map, it should return false.
  remove(key) {
    if (!this.has(key)) {
      return false;
    }

    this.keyList = this.keyList.filter((k) => k !== key);
    const hashedKey = HashMap.#hash(key);
    const hashedIndex = hashedKey % this.capacity;
    this.buckets[hashedIndex] = null;
    return true;
  }

  // returns the number of stored keys in the hash map.
  length() {
    var count = 0;
    for (let i = 0; i < this.keyList.length; i++) {
      if (this.keyList[i] !== null) {
        count++;
      }
    }
    return count;
  }

  // removes all entries in the hash map.
  clear() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null);
    this.keyList = new Array();
  }

  // returns an array containing all the keys inside the hash map
  keys() {
    return this.keyList.filter((item) => item !== null);
  }

  //  returns an array containing all the values.
  values() {
    const keys = this.keyList.filter((item) => item !== null);
    return keys.map((item) => {
      const value = this.buckets[HashMap.#hash(item) % this.capacity];
      return value;
    });
  }

  //  returns an array that contains each key, value pair.
  entries() {
    const keys = this.keyList.filter((item) => item !== null);
    return keys.map((key) => {
      const value = this.buckets[HashMap.#hash(key) % this.capacity];
      return [key, value];
    });
  }
}

var hashMap = new HashMap();
assert(hashMap.buckets.length === 16);

hashMap.set("a", 4);
assert(hashMap.get("a") === 4);

hashMap.set("a", 3);
assert(hashMap.get("a") === 3);

hashMap.set("b", 3);

assert(hashMap.has("a") === true);
assert(hashMap.has("b") === true);
assert(hashMap.has("c") === false);

assert(hashMap.length() === 2);

assert.deepStrictEqual(hashMap.keys(), ["a", "b"]);

assert.deepStrictEqual(hashMap.values(), [3, 3]);

assert.deepStrictEqual(hashMap.entries(), [
  ["a", 3],
  ["b", 3],
]);

// testing capacity change
for (let item of [
  ["a", 1],
  ["b", 2],
  ["c", 3],
  ["d", 4],
  ["e", 5],
  ["f", 6],
  ["g", 7],
  ["h", 8],
  ["i", 9],
  ["j", 10],
  ["k", 11],
  ["l", 12],
  ["m", 13],
  ["n", 14],
  ["o", 15],
  ["p", 16],
  ["q", 17],
  ["r", 18],
  ["s", 19],
  ["t", 20],
  ["u", 21],
  ["v", 22],
  ["w", 23],
  ["x", 24],
  ["y", 25],
  ["z", 26],
  ["aa", 27],
  ["ab", 28],
  ["ac", 29],
  ["ad", 30],
]) {
  hashMap.set(item[0], item[1]);
}
console.log(hashMap.buckets);

console.log(hashMap.entries());
