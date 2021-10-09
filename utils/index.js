import { validate, validateAll } from 'indicative/validator';
import { sanitize } from 'indicative/sanitizer'

import crypto from 'crypto';

import Token from '../models/Token'

const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

export function nodeMailerFunc(user, subjectField, textField, emailType, res) {
  const token = new Token({
    _userId: user._id,
    token: crypto.randomBytes(16).toString('hex')
  });

  // Save the token
  token.save((err) => {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
  });


  function outputTokenInEmail(typeOfEmail) {
    if (typeOfEmail !== 'change of password') return `/${token.token}`;
    return '';
  }

  function sendMail(senderEmail, receiverEmail, emailSubject, emailBody) {

    const data = {
      from: senderEmail,
      to: receiverEmail,
      subject: emailSubject,
      text: emailBody
    };

    mg.messages().send(data, (error, body) => {
      error ? console.log('error', error) : console.log(body);
    });
  }

  sendMail(process.env.EMAIL_ADDRESS, user.username, subjectField, `${textField}${outputTokenInEmail(emailType)}`);

}


export function validateInputs(
  formType,
  username,
  setUsernameError,
  setUsernameFeedback,
  password,
  password_confirmation,
  setPasswordConfirmationError,
  setPasswordConfirmationFeedback,
  setPasswordError,
  setPasswordFeedback,
  setDisableButton,
  setFormSuccess,
  setFormError
) {
  function getFormValidation(formType) {
    function isLoginOrRegistration() {
      const data = {
        username,
        password
      };

      const schema = {
        username: 'required|email',
        password: 'required|min:7|max:11'
      };
      const messages = {
        email: 'Make sure this is a valid email.',
        required: 'This is a required field.',
        min: 'The password is too short. Minimum 7 characters.',
        max: 'The password is too long. Maximum 11 characters.'
      };


      validateAll(data, schema, messages)
        .then(success => {
          if (success.username) {
            setUsernameError(false);
          }

          if (success.password) {
            setPasswordError(false);
          }
          if (success.username && success.password) {
            setDisableButton(true);
          }
        })
        .catch(errors => {
          if (errors[0].field === 'username') {
            setUsernameError(true);
            setUsernameFeedback(errors[0].message);
            setDisableButton(true);
            setFormSuccess(false);
          }

          if (errors[0].field === 'password') {
            setPasswordError(true);
            setPasswordFeedback(errors[0].message);
            setDisableButton(true);
            setFormSuccess(false);
          }
        });
    }

    function isForgotPassword() {
      const data = {
        username
      };

      const schema = {
        username: 'email'
      };
      const messages = {
        required: 'Make sure to enter the field value.',
        email: 'Enter valid email address.'
      };
      validate(data, schema, messages)
        .then(success => {
          if (success.username) {
            setUsernameError(false);
            setDisableButton(false);
          }
        })
        .catch(errors => {
          if (errors[0].validation === 'email') {
            const { message } = errors[0];
            setUsernameError(true);
            setUsernameFeedback(message);
          }
        });
    }

    function isUpdatePassword() {
      const data = {
        password,
        password_confirmation
      };
      const schema = {
        password: 'required|min:4|max:11|string',
        password_confirmation: 'required|min:7|max:11|string|same:password'
      };
      const messages = {
        required: 'Make sure to enter the field value.',
        min: 'The password is too short. Minimum 7 characters.',
        max: 'The password is too long. Maximum 11 characters.',
        same: 'Passwords must match.'
      };

      validateAll(data, schema, messages)
        .then(success => {
          if (success.password) {
            setPasswordError(false);
          }

          if (success.password === success.password_confirmation) {
            setPasswordError(false);
            setPasswordConfirmationError(false);
          }
        })
        .catch(errors => {
          errors.map((error) => {

            console.log("error 179", error);
            if (error.field === 'password') {
              setPasswordError(true);
              setPasswordFeedback(error.message);
              setDisableButton(true);
              setFormError(true)
            }

            if (error.field === 'password_confirmation') {
              setPasswordConfirmationError(true);
              setPasswordConfirmationFeedback(error.message);
              setDisableButton(true);
              setFormError(true)
            }
          })
        });
    }

    const Forms = {
      Login: isLoginOrRegistration,
      Registration: isLoginOrRegistration,
      ForgotPassword: isForgotPassword,
      UpdatePassword: isUpdatePassword
    };

    try {
      Forms[formType]();
    } catch (error) { console.log('Error', error) }
  }

  return getFormValidation(formType);
}







