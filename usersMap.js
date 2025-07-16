/**
 * A bidirectional map that maintains a one-to-one relationship
 * between keys and values, allowing lookup in both directions.
 */
class BiMap {
  /**
   * Initializes the internal maps for key-value and value-key storage.
   */
  constructor() {
    /** @private @type {Map<any, any>} */
    this.keyToValue = new Map();

    /** @private @type {Map<any, any>} */
    this.valueToKey = new Map();
  }

  /**
   * Adds a key-value pair to the map. If either the key or value already exists,
   * their previous mappings will be removed.
   * @param {any} key - The key to store.
   * @param {any} value - The value associated with the key.
   */
  set(key, value) {
    this.delete(key);
    this.deleteValue(value);
    this.keyToValue.set(key, value);
    this.valueToKey.set(value, key);
  }

  /**
   * Gets the value associated with a given key.
   * @param {any} key - The key to look up.
   * @returns {any | undefined} The corresponding value, or undefined if not found.
   */
  get(key) {
    return this.keyToValue.get(key);
  }

  /**
   * Gets the key associated with a given value.
   * @param {any} value - The value to look up.
   * @returns {any | undefined} The corresponding key, or undefined if not found.
   */
  getKey(value) {
    return this.valueToKey.get(value);
  }

  /**
   * Checks if a key exists in the map.
   * @param {any} key - The key to check.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has(key) {
    return this.keyToValue.has(key);
  }

  /**
   * Checks if a value exists in the map.
   * @param {any} value - The value to check.
   * @returns {boolean} True if the value exists, false otherwise.
   */
  hasValue(value) {
    return this.valueToKey.has(value);
  }

  /**
   * Removes a key and its associated value from the map.
   * @param {any} key - The key to remove.
   * @returns {boolean} True if the key existed and was removed.
   */
  delete(key) {
    const value = this.keyToValue.get(key);
    const existed = this.keyToValue.delete(key);
    if (value !== undefined) {
      this.valueToKey.delete(value);
    }
    return existed;
  }

  /**
   * Removes a value and its associated key from the map.
   * @param {any} value - The value to remove.
   * @returns {boolean} True if the value existed and was removed.
   */
  deleteValue(value) {
    const key = this.valueToKey.get(value);
    const existed = this.valueToKey.delete(value);
    if (key !== undefined) {
      this.keyToValue.delete(key);
    }
    return existed;
  }

  /**
   * Returns an iterator of all keys in the map.
   * @returns {IterableIterator<any>}
   */
  keys() {
    return this.keyToValue.keys();
  }

  /**
   * Returns an iterator of all values in the map.
   * @returns {IterableIterator<any>}
   */
  values() {
    return this.keyToValue.values();
  }

  /**
   * Returns an iterator of all key-value pairs in the map.
   * @returns {IterableIterator<[any, any]>}
   */
  entries() {
    return this.keyToValue.entries();
  }

  /**
   * Returns the number of entries in the map.
   * @returns {number}
   */
  size() {
    return this.keyToValue.size;
  }

  /**
   * Clears all entries from the map.
   */
  clear() {
    this.keyToValue.clear();
    this.valueToKey.clear();
  }

  /**
   * Executes a callback for each entry in the map.
   * @param {(value: any, key: any, map: BiMap) => void} callback - Function to execute for each entry.
   */
  forEach(callback) {
    this.keyToValue.forEach((value, key) => {
      callback(value, key, this);
    });
  }
}

export const users = new BiMap();
export const addedContacts = new BiMap();
