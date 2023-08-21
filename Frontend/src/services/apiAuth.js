import { genrateResponse } from "../utils/helper";

export async function registerUser(registerData, requestUrl) {
  const url = `/${requestUrl}SignUp`;

  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    return genrateResponse(response);
  } catch (err) {
    throw err;
  }
}

export async function loginUser(loginData, requestUrl) {
  const url = `/${requestUrl}SignIn`;

  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    return genrateResponse(response);
  } catch (err) {
    throw err;
  }
}

export async function logoutUser() {
  try {
    const response = await fetch("/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return genrateResponse(response);
  } catch (err) {
    console.log(`${err.message}💥💥💥💥💥💥`);
  }
}

export async function resetPassword(resetPasswordData) {
  try {
    const response = await fetch(`/resetPassword`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetPasswordData),
    });
    return genrateResponse(response);
  } catch (err) {
    console.log(`${err.message}💥💥💥💥💥💥`);
  }
}

export async function resetEmail(resetEmailData) {
  try {
    const response = await fetch(`/resetEmail`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetEmailData),
    });
    return genrateResponse(response);
  } catch (err) {
    console.log(`${err.message}💥💥💥💥💥💥`);
  }
}
