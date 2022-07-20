# Workaround: Smart and enhanced `$kv`

The `$kv` system allows apps to store persistent data across event handlers and app sessions. However, it has some flaws:
* No way to list all stored `$kv` keys
* No way to delete all stored `$kv` data
* `$kv` sometimes fails to store and fetch the data

&nbsp;

## Enhanced `$kv` - simple edition
Add this to the beginning of your shared code, and use `_kv` instead of `$kv`.

```javascript
const _kv = {
  addIndex: (key) => {
    const _kv_index = $kv.get('__keys', []);
    if (_kv_index.indexOf(key) != -1) return;
    _kv_index.push(key);
    $kv.set('__keys', _kv_index);
  },
  removeIndex: (key) => {
    const _kv_index = $kv.get('__keys', []);
    _kv_index.splice(_kv_index.indexOf(key), 1);
    $kv.set('__keys', _kv_index);
  },
  set: (key, data) => {
    _kv.addIndex(key);
    $kv.set(key, data);
  },
  get: (...a) => {
    return $kv.get(...a);
  },
  incr: (...a) => $kv.incr(...a),
  decr: (...a) => $kv.decr(...a),
  flip: (key) => _kv.set(key, !_kv.get(key, null)),
  remove: (key) => {
    _kv.removeIndex(key);
    return $kv.remove(key);
  },
  getKeys: () => [...$kv.get('__keys', [])]
};
```