export function register(username, email, password) {
  return fetch(`${process.env.MY_TRAINER_BACKEND}/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
};

export function login(email, password) {
  return fetch(`${process.env.MY_TRAINER_BACKEND}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: email,
      password
    })
  });
};

export function googleSignIn() {
  return fetch(`${process.env.MY_TRAINER_BACKEND}/connect/google`, {
    method: "GET"
  });
}