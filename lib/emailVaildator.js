import { body, validationResult } from 'express-validator'

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}


function validateMiddleware(validations, validationResponse) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResponse(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(422).json({ errors: errors.array() })
  }
}

export default async function emailValidator(req, res, next, email, password) {

  const inputsToValidate = []

  email === 'email' ? inputsToValidate.push(body('email').isEmail()) : null;
  password === 'password' ? inputsToValidate.push(body('password').isLength({ min: 7, max: 11 })) : null;

  const validateBody = initMiddleware(
    validateMiddleware(inputsToValidate, validationResult)
  )

  await validateBody(req, res);

  const hasErrors = !validationResult(req).isEmpty();

  if (hasErrors) {
    return res.status(422).json({ errors: hasErrors.array() })
  }
};


