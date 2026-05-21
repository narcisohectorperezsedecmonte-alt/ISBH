const users = [];

const passwordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireDigit: true,
};

function validatePassword(password) {
  if (password.length < passwordPolicy.minLength) {
    return `La contraseña debe tener al menos ${passwordPolicy.minLength} caracteres.`;
  }
  if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
    return 'La contraseña debe incluir al menos una letra mayúscula.';
  }
  if (passwordPolicy.requireLowercase && !/[a-z]/.test(password)) {
    return 'La contraseña debe incluir al menos una letra minúscula.';
  }
  if (passwordPolicy.requireDigit && !/\d/.test(password)) {
    return 'La contraseña debe incluir al menos un número.';
  }
  return null;
}

function isUsernameTaken(username) {
  return users.some(user => user.username === username);
}

function createUser({ username, email, password, role }) {
  if (!username || !email || !password || !role) {
    return {
      success: false,
      message: 'Faltan datos obligatorios: username, email, password o role.',
    };
  }

  if (isUsernameTaken(username)) {
    return {
      success: false,
      message: 'El nombre de usuario ya está en uso.',
    };
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return {
      success: false,
      message: passwordError,
    };
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password, // En producción no guardes la contraseña en texto plano.
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  return {
    success: true,
    message: 'Usuario creado correctamente.',
    user: { ...newUser, password: undefined },
  };
}

// Ejemplos de uso
console.log(createUser({
  username: 'admin',
  email: 'admin@ejemplo.com',
  password: 'Abc12345',
  role: 'administrador',
}));

console.log(createUser({
  username: 'admin',
  email: 'otro@ejemplo.com',
  password: 'Abc12345',
  role: 'usuario',
}));

console.log(createUser({
  username: 'usuario1',
  email: '',
  password: 'Abc12345',
  role: 'usuario',
}));

console.log(createUser({
  username: 'usuario2',
  email: 'user2@ejemplo.com',
  password: '1234',
  role: 'usuario',
}));