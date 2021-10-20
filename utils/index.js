import { validate, validateAll } from 'indicative/validator';


import crypto from 'crypto';

import Token from '../models/Token'

const formData = require('form-data');

const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);


const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  public_key: process.env.MAILGUN_PUBLIC_KEY
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

  sendMail(process.env.EMAIL_ADDRESS, user.email, subjectField, `${textField}${outputTokenInEmail(emailType)}`);

}

export function validateInputs(
  form,
  email,
  setEmailError,
  setEmailFeedback,
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

  function getFormValidation(form) {
    function isLoginOrRegistration() {
      const rules = {
        email: 'required|email',
        password: 'required|min:7|max:11'
      };

      const data = {
        email,
        password
      };

      const messages = {
        required: 'Make sure to enter the field value.',
        email: 'Enter valid email address.',
        min: 'The value is too small. Minimum seven characters.',
        max: 'The value is too big. Minimum eleven characters.',
      }

      validate(data, rules, messages)
        .then(success => {
          console.log("success ", success);
          if (success.email) {
            setEmailError(false);
            setFormError(false)
          }

          if (success.password) {
            setPasswordError(false);
          }
          if (success.email && success.password) {
            setDisableButton(true);
          }
        })
        .catch(errors => {
          const formattedErrors = {}

          errors.forEach(error => formattedErrors[error.field] = error.message)

          console.log("errors ", errors);

          if (errors[0].field === 'email') {
            setEmailError(() => true);
            setEmailFeedback(errors[0].message);
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
        email
      };

      const schema = {
        email
      };
      const messages = {
        required: 'Make sure to enter the field value.',
        email: 'Enter valid email address.'
      };
      validate(data, schema, messages)
        .then(success => {
          if (success.email) {
            setEmailError(false);
            setDisableButton(false);
          }
        })
        .catch(errors => {
          if (errors[0].validation === 'email') {
            const { message } = errors[0];
            setEmailError(true);
            setEmailFeedback(message);
          }
        });
    }

    function isUpdatePassword() {
      const data = {
        password,
        password_confirmation
      };
      const schema = {
        password: 'required|min:4|max:11|string|confirmed',
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

          // console.log("success.password === success.password_confirmation ", success.password === success.password_confirmation);
          // console.log("success ", success);
          if (success.password) {
            setPasswordError(false);
          }
          if (success.password_confirmation) {
            setPasswordConfirmationError(false);
          }

          if (success.password === success.password_confirmation) {
            setPasswordError(false);
            setPasswordConfirmationError(false);
            setFormError(false)
          }
        })
        .catch(errors => {
          errors.map((error) => {
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
      Register: isLoginOrRegistration,
      ForgotPassword: isForgotPassword,
      UpdatePassword: isUpdatePassword
    };

    try {

      console.log("formType utils 267 ", form);
      Forms[form]();
    } catch (error) { console.log('Error', error) }
  }

  return getFormValidation(form);
}







