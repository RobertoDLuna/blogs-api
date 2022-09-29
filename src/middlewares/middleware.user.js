const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateNewUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (displayName.length < 8) {
    return res.status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (password.length < 6) {
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  }
  // referencia regex https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const validateEmail = regex.test(email);
  if (!validateEmail) return (res.status(400).json({ message: '"email" must be a valid email' }));
  next();
};

module.exports = {
  validateLogin,
  validateNewUser,
};