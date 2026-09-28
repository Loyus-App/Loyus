const stores = new Map();

function createMMKV(config) {
  const id = config?.id || 'default';
  if (!stores.has(id)) stores.set(id, new Map());
  const store = stores.get(id);

  return {
    getString: (key) => store.get(key),
    set: (key, value) => store.set(key, value),
    remove: (key) => store.delete(key),
    contains: (key) => store.has(key),
    clearAll: () => store.clear(),
    getBoolean: (key) => store.get(key),
    getNumber: (key) => store.get(key),
  };
}

module.exports = { createMMKV };
