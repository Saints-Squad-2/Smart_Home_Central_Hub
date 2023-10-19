// Written by Hpgurl08
// Updated by bwilkins96

// Initial set-up for implementing user authentication / multi-factor authentication

const { Auth } = require('@aws-amplify/auth');
const { signUp, signIn, confirmSignUp, confirmSignIn } = Auth;

// set up a basic login code and integrate this for enabling SMS
async function handleSignUp(
  username,
  password,
  phone_number,
  email
) {
  try {
    await signUp({
      username,
      password,
      options: {
        userAttributes: {
          phone_number,
          email,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}


// verify sign up
async function handleSignUpConfirmation(username, confirmationCode) {
    try {
      await confirmSignUp({ username, confirmationCode });
    } catch (error) {
      console.log(error);
    }
}

// Code to call signIn API where user provides
// confirmation code sent to their phone number.
async function handleSignIn(username, password) {
    try {
      await signIn({ username, password });
    } catch (error) {
      console.log(error);
    }
}

// call confirmSignIn with the OTP sent to user's phone.
async function handleSignInConfirmation(otpCode) {
    try {
      await confirmSignIn({ challengeResponse: otpCode });
    } catch (error) {
      console.log(error);
    }
  }