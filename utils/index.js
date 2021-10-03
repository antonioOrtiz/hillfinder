import { useEffect } from 'react';
import { validate, validateAll } from 'indicative/validator';
import axios from 'axios';

import crypto from 'crypto';

import Token from '../models/Token'

const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

export function nodeMailerFunc(user, subjectField, textField, emailType, res) {

  console.log("user, subjectField, textField, emailType, res ", user, subjectField, textField, emailType, res);

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
        email: 'Make sure this is a valid email',
        required: 'This is a required field.',
        min: 'The password is too short. Minimum 7 characters.',
        max: 'The password is too long. Maximum 11 characters.'
      };

      validateAll(data, schema, messages)
        .then(success => {

          console.log("success ", success);
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
        required: 'Make sure to enter the field value',
        email: 'Enter valid email address'
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
        required: 'Make sure to enter the field value',
        min: 'The password is too short. Minimum 7 characters.',
        max: 'The password is too long. Maximum 11 characters.',
        same: 'Passwords must match.'
      };

      validateAll(data, schema, messages)
        .then(success => {
          if (success.password) {
            setPasswordError(false);
            setDisableButton(false);
          }

          if (success.password === success.password_confirmation) {
            setPasswordError(false);
            setPasswordConfirmationError(false);
          }
        })
        .catch(errors => {
          if (errors[0].field === 'password') {
            setPasswordError(true);
            setPasswordFeedback(errors[0].message);
            setDisableButton(true);
          }

          if (errors[0].field === 'password_confirmation') {
            setPasswordConfirmationError(true);
            setPasswordConfirmationFeedback(errors[0].message);
            setDisableButton(true);
          }
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
    } catch (error) { }
  }

  return getFormValidation(formType);
}

export function logOutUserSession() {
  axios
    .get('/api/logout')
    .then(response => {
      if (response.status === 200) {
      }
    })
    .catch(error => { });
}

export function getUserAvatar() {
  return axios
    .get('/api/user_avatar')
    .then(response => {
      if (response.status === 200) {
        if (!response.data.hasOwnProperty('avatar_info')) {
          return '/uploads/profile-avatars/placeholder.jpg';
        }
        return response.data.avatar_info.secure_url;
      }
      if (response.status === 500) {
      }
    })
    .catch((error) => { });
}

export function Message({ state, header = '', content = '' }) {

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        const replacers = document.querySelectorAll('[data-replace]');
        for (var i = 0; i < replacers.length; i++) {
          console.log('hit here2');
          const replaceClasses = JSON.parse(replacers[i].dataset.replace.replace(/'/g, '"'));
          Object.keys(replaceClasses).forEach((key) => {
            replacers[i].classList.remove(key);
            replacers[i].classList.add(replaceClasses[key]);
          });
        }
      }, 0);
    });
  }, [])

  return (
    <>
      {{
        Waring: <div className="animate-fade-in-down my-4 py-2 p-3  text-orangeDark bg-orangeLight border border-orangeDark-300 rounded relative" role="alert">
          <strong className="font-bold">{header}</strong>
          <span className="block sm">{content}</span>

        </div>,
        Success: <div
          className="my-4 py-2 p-3  text-green-700 bg-green-100 border border-green-300 rounded relative animate-fade-in-down"
          role="alert"
        >
          <p className="font-bold">{header}</p>

          <strong className="font-bold">{content}</strong>
        </div>,
        Error: <div className="animate-fade-in-down relative my-4 py-2 pl-3 pr-10 leading-normal text-red-700 bg-red-100 border border-red-700 rounded-lg" role="alert">
          <p className="font-bold">{header}</p>

          <p>{content}</p>
        </div>

      }[state]}
    </>
  )
}






