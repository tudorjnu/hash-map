const assert = require("assert");

class HashMap {
  constructor(initialSize) {
    this.buckets = initialSize || 16;
  }
}

var hashMap = new HashMap(12);
assert(hashMap.buckets === 12);

var hashMap = new HashMap();
assert(hashMap.buckets === 16);
