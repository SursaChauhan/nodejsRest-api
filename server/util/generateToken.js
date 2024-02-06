import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, 'sursa', {
    expiresIn: '1h',
  });
};

export default generateToken;
