import { validateAll, extend } from "indicative/validator";

import crypto from "crypto";

import Token from "models/Token";

const formData = require("form-data");

const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);

export function getLocalStorage(key, initialValue) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    return initialValue;
  }
}

export function getCurrentValueForDegree(iter, times) {
  let i = 0;

  function value() {
    while (i < iter.length * times) {
      const cur = Math.floor(i / times);
      i += 1;
      return iter[cur];
    }
  }
  return value;
}

export function getCurrentValue(values) {
  let index = -1;
  let l = values.length;

  function increment() {
    ++index;
    if (index < l) {
      return values[index];
    } else {
      index = -1;
      ++index;
      return values[index];
    }
  }

  return increment;
}

export let max = (a, f) =>
  a.reduce((m, x) => (m["topography"][f] > x["topography"][f] ? m : x));

export let min = (a, f) =>
  a.reduce((m, x) => (m["topography"][f] < x["topography"][f] ? m : x));

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  public_key: process.env.MAILGUN_PUBLIC_KEY,
});

export function nodeMailerFunc(user, subjectField, textField, emailType, res) {
  const token = new Token({
    _userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  });

  // Save the token
  token.save((err) => {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
  });

  function outputTokenInEmail(typeOfEmail) {
    if (typeOfEmail !== "change of password") return `/${token.token}`;
    return "";
  }

  function sendMail(senderEmail, receiverEmail, emailSubject, emailBody) {
    const data = {
      from: senderEmail,
      to: receiverEmail,
      subject: emailSubject,
      text: emailBody,
    };

    mg.messages
      .create(process.env.MAILGUN_DOMAIN, data)
      .then((msg) => {
        console.log("data ", data);
        console.log("msg ", msg);
        console.log("success message:", msg);
      })
      .catch((err) => console.log("failure!", err));
  }

  sendMail(
    process.env.EMAIL_ADDRESS,
    user.email,
    subjectField,
    `${textField}${outputTokenInEmail(emailType)}`
  );
}

export function IsEmptyOrWhiteSpace(str) {
  return (str.match(/^\s*$/) || []).length > 0;
}

export function validateInputs(
  formType,
  email,
  interestedActivities,
  interestedActivitiesInput,
  password,
  password_confirmation,
  profileDisplayName,
  profileEmail,
  search,
  setEmailError,
  setEmailFeedback,
  setDisableButton,
  setFormSuccess,
  setFormError,
  setInterestedActivitiesError,
  setInterestedActivitiesFeedback,
  setPasswordConfirmationError,
  setPasswordConfirmationFeedback,
  setPasswordError,
  setPasswordFeedback,
  setProfileDisplayNameFeedback,
  setProfileDisplayNameError
) {
  function getFormValidation(formType) {
    function isUpdateProfile() {
      extend("inputNotInSearch", {
        async: true,

        compile(args) {
          return args;
        },
        async validate(data, field, args, config) {
          if (
            (search.indexOf(data.original.interestedActivitiesInput) !== -1) ==
              false &&
            IsEmptyOrWhiteSpace(data.original.interestedActivitiesInput) ===
              false
          ) {
            return false;
          }
          return true;
        },
      });

      console.log("124 interestedActivitiesInput", interestedActivitiesInput);

      const data = {
        profileDisplayName,
        profileEmail,
        interestedActivitiesInput,
      };

      const rules = {
        profileDisplayName: "required|alpha|min:2|max:15",
        profileEmail: "required|email",
        interestedActivitiesInput: "inputNotInSearch",
      };

      const messages = {
        alpha: 'No special characters allowed. e.g. "$, !, *"',
        required: "Make sure to enter the field value.",
        email: "Enter valid email address.",
        min: "The value is too small. Minimum two characters.",
        max: "The value is too big. Maximum eleven characters.",
        inputNotInSearch: "This value does not appear in our list.",
      };

      validateAll(data, rules, messages)
        .then((success) => {
          if (success.profileEmail) {
            setEmailError(false);
          }
          if (success.profileDisplayName) {
            setProfileDisplayNameError(false);
          }

          if (success.interestedActivitiesInput) {
            setInterestedActivitiesError(false);
          }

          if (
            success.profileDisplayName &&
            success.profileEmail &&
            IsEmptyOrWhiteSpace(success.interestedActivitiesInput)
          ) {
            setFormError(false);
            setFormSuccess(true);
          }
        })
        .catch((errors) => {
          Array.isArray(errors) &&
            errors.map((error) => {
              if (error.field === "profileDisplayName") {
                setProfileDisplayNameFeedback(error.message);
                setProfileDisplayNameError(true);
                setFormError(true);
                setFormSuccess(false);
              }

              if (error.field === "profileEmail") {
                setEmailFeedback(error.message);
                setEmailError(true);
                setFormError(true);
                setFormSuccess(false);
              }

              if (error.field === "interestedActivitiesInput") {
                setInterestedActivitiesFeedback(error.message);
                setInterestedActivitiesError(true);
                setFormError(true);
                setFormSuccess(false);
              }
            });
        });
    }

    function isLoginOrRegistration() {
      const rules = {
        email: "required|email",
        password: "required|min:7|max:11",
      };

      const data = {
        email,
        password,
      };

      const messages = {
        required: "Make sure to enter the field value.",
        email: "Enter valid email address.",
        min: "The value is too small. Minimum seven characters.",
        max: "The value is too big. Minimum eleven characters.",
      };

      validateAll(data, rules, messages)
        .then((success) => {
          if (success.email) {
            setEmailError(false);
          }

          if (success.password) {
            setPasswordError(false);
          }

          if (success.email && success.password) {
            setFormError(false);
            setFormSuccess(true);
            setDisableButton(true);
          }
        })
        .catch((errors) => {
          Array.isArray(errors) &&
            errors.map((error) => {
              if (error.field === "email") {
                setEmailFeedback(error.message);
                setEmailError(true);
                setFormError(true);
                setFormSuccess(false);
              }

              if (error.field === "password") {
                setPasswordFeedback(error.message);
                setPasswordError(true);
                setFormError(true);
                setFormSuccess(false);
              }
            });
        });
    }

    function isForgotPassword() {
      const data = {
        email,
      };

      const rules = {
        email: "required|email",
      };

      const messages = {
        required: "Make sure to enter the field value.",
        email: "Enter valid email address.",
      };

      validateAll(data, rules, messages)
        .then((success) => {
          success;
          if (success.email) {
            setEmailError(false);
            setFormError(false);
            setFormSuccess(true);
            setDisableButton(true);
          }
        })
        .catch((errors) => {
          Array.isArray(errors) &&
            errors.map((error) => {
              if (error.field === "email") {
                setEmailFeedback(error.message);
                setEmailError(true);
                setFormError(true);
                setFormSuccess(false);
              }
            });
        });
    }

    function isUpdatePassword() {
      const schema = {
        password: "required|min:4|max:11|string|confirmed",
      };

      const data = {
        password,
        password_confirmation,
      };

      const messages = {
        confirmed: "Please confirm your new password below.",
        required: "Make sure to enter the field value.",
        min: "The password is too short. Minimum 7 characters.",
        max: "The password is too long. Maximum 11 characters.",
      };

      validateAll(data, schema, messages)
        .then((success) => {
          if (success.password) {
            setPasswordError(false);
          }

          if (success.password_confirmation) {
            setPasswordConfirmationError(false);
          }

          if (success.password === success.password_confirmation) {
            setFormError(false);
            setFormSuccess(true);
            setDisableButton(true);
          }
        })
        .catch((errors) => {
          Array.isArray(errors) &&
            errors.map((error) => {
              if (error.field === "password") {
                setPasswordFeedback(error.message);
                setPasswordError(true);
                setFormError(true);
                setFormSuccess(false);
              }

              if (error.field === "password_confirmation") {
                setPasswordConfirmationFeedback(error.message);
                setPasswordConfirmationError(true);
                setFormError(true);
                setFormSuccess(false);
              }
            });
        });
    }

    const Forms = {
      Profile: isUpdateProfile,
      Login: isLoginOrRegistration,
      Register: isLoginOrRegistration,
      ForgotPassword: isForgotPassword,
      UpdatePassword: isUpdatePassword,
    };

    try {
      Forms[formType]();
    } catch (error) {
      console.log("Error", error);
    }
  }

  return getFormValidation(formType);
}

export function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }
  return false;
}

export async function isLoggedIn() {
  const { isLoggedIn } = (await getLocalStorage("user")) || {};
  return isLoggedIn;
}

export function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (errors) {
    console.log(errors);
  }
}
