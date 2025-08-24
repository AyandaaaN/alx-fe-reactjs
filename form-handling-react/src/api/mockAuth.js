export function registerUser({ username, email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username || !email || !password) {
        reject(new Error('All fields are required.'));
      } else if (email.toLowerCase() === 'taken@alx.io') {
        reject(new Error('Email already registered.'));
      } else {
        resolve({ id: Date.now(), username, email });
      }
    }, 700);
  });
}
