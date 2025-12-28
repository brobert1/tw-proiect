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
      email: 'dwight@email.com',
      name: 'Dwight Schrute',
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
      email: 'angela@email.com',
      name: 'Angela Martin',
      role: 'reviewer',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
    {
      email: 'oscar@email.com',
      name: 'Oscar Martinez',
      role: 'reviewer',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
    {
      email: 'kevin@email.com',
      name: 'Kevin Malone',
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
    {
      email: 'phyllis@email.com',
      name: 'Phyllis Lapin',
      role: 'author',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
    {
      email: 'stanley@email.com',
      name: 'Stanley Hudson',
      role: 'author',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
    {
      email: 'kelly@email.com',
      name: 'Kelly Kapoor',
      role: 'author',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
    {
      email: 'ryan@email.com',
      name: 'Ryan Howard',
      role: 'author',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
    {
      email: 'toby@email.com',
      name: 'Toby Flenderson',
      role: 'author',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
    {
      email: 'creed@email.com',
      name: 'Creed Bratton',
      role: 'author',
      password: bcryptjs.hashSync('supersecretpassword'),
      active: true,
    },
  ];
};
