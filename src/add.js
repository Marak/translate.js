// Add
// Creates a cache from the local translations

// Hold the cache
import cache from 'memory-cache';

// TODO: data validation
export default data => {
  // Warning: the array takes O(n*l^2) memory, fot n = items and l = languages
  if (Array.isArray(data)) {
    return data.forEach(item => {
      for (let from in item) {
        for (let to in item) {
          let id = `${from}:${to}:local:${item[from]}`;
          cache.put(id, item[to]);
        }
      }
    });
  }

  if (typeof data !== 'object') {
    throw new Error('Data should be an object or an array');
  }

  for (let key in data) {
    for (let to in data[key]) {
      let id = `en:${to}:local:${key}`;
      cache.put(id, data[key][to]);
    }
  }
};
