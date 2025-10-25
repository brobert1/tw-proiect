import bcryptjs from 'bcryptjs';

export default () => {
  return [
    {
      email: 'michael@email.com',
      name: 'Michael Scott',
      role: 'organizer',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
    {
      email: 'jim@email.com',
      name: 'Jim Halpert',
      role: 'reviewer',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
    {
      email: 'pam@email.com',
      name: 'Pam Beesly',
      role: 'author',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
  ];
};
