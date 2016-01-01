const req = require.context('.', true, /\.spec$/);

for (const key of req.keys()) {
  req(key);
}
