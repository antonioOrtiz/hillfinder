import { validate, validateAll } from 'indicative/validator';
import axios from 'axios';
import crypto from 'crypto';
import mailgun from 'mailgun-js';

import Token from '../models/Token'

mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

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

    function outputTokenInEmail(emailType) {
      if (emailType !== 'change of password') return `/${token.token}`;
      return '';
    }

    const sendMail = function (senderEmail, receiverEmail, emailSubject, emailBody) {
      const data = {
        from: senderEmail,
        to: receiverEmail,
        subject: emailSubject,
        text: emailBody
      };

      mailgun.messages().send(data, (error, body) => {
        if (error) console.log(error);
        else console.log(body);
      });
    };

    const senderEmail = process.env.EMAIL_ADDRESS;
    const receiverEmail = `${user.username}`;
    const emailSubject = subjectField;
    const emailBody = `${textField}${outputTokenInEmail(emailType)}`;

    // User-defined function to send email
    sendMail(senderEmail, receiverEmail, emailSubject, emailBody);
  });
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

export function Message({ state, header, content = '' }) {
  return (
    <>
      {{
        Waring: <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
          <p className="font-bold">{header}</p>
          <p>{content}</p>
        </div>,
        Success: <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">{content}</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-teal-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
          Error: <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" />,
          <strong className="font-bold">{content}</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>

      }[state] || null}
    </>
  )
}






