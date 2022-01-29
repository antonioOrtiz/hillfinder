import { body, validationResult } from 'express-validator'

export default async function emailValidator(req, res, next, name, email, password) {

  name === 'name' ? body('name').trim().escape() : null;
  email === 'email' ? body('email').isEmail() : null;
  password === 'password' ? body('password').isLength({ min: 7, max: 11 }) : null;

  ((request, response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);

    console.log("errors.isEmpty() ", errors.isEmpty());
    console.log("!errors.isEmpty() ", !errors.isEmpty());
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    next()
  })(req, res, next)
};


