export function findUserInDatabase(credentials, searchType) {
  const users = JSON.parse(localStorage.getItem("users"));
  switch (searchType) {
    case "email": {
      const candidate = users.find((user) => user.email === credentials.email);
      return candidate;
    }
    case "allFields": {
      const existingUser = users.find(
        (user) => user.email === credentials.email && user.password === credentials.password,
      );
      return existingUser;
    }
    default:
      return null;
  }
}
