export default function errorHandler(err, res) {
  res.status(500).json({ msg: [err.message] });
}
