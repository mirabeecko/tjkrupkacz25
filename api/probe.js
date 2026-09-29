module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet, noimageindex");
  res.status(200).send(JSON.stringify({ probe: "ok", runtime: "node", cwd: process.cwd() }));
};
