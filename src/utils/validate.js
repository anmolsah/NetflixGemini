export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!email.trim()) return "Email is required";
  if (!password.trim()) return "Password is required";
  if (!isEmailValid) return "Please enter a valid email address";
  if (!isPasswordValid) return "Password must be at least 8 characters with uppercase, lowercase, and number";

  return null;
};
