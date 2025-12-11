// Firebase Authentication Error Messages
const AUTH_ERROR_MESSAGES = {
  "Firebase: Error (auth/email-already-in-use).": "Email already in use",
  "Firebase: Error (auth/weak-password).":
    "Password should be at least 6 characters",
  "Firebase: Error (auth/invalid-email).": "Invalid email",
  "Firebase: Error (auth/invalid-credential).": "Invalid email or password",
  "Firebase: Error (auth/user-not-found).": "User not found",
  "Firebase: Error (auth/missing-email).": "Email is required",
  "Firebase: Error (auth/wrong-password).": "Incorrect password",
  "Firebase: Error (auth/too-many-requests).":
    "Too many attempts. Please try again later.",
}

export const getAuthErrorMessage = (error) => {
  return (
    AUTH_ERROR_MESSAGES[error?.message] ||
    "An error occurred. Please try again."
  )
}
