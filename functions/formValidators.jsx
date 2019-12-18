const validator = {
  // username: {
  //   rules: [
  //     {
  //       test: /^[a-z0-9_]+$/,
  //       message: 'Username must contain only alphabets-numeric lowercase characters',
  //     },
  //     {
  //       test: (value) => {
  //         return value.length > 2;
  //       },
  //       message: 'Username must be longer than two characters',
  //     },
  //   ],
  //   errors: [],
  //   valid: false,
  //   state: '',
  // },
  name: {
    rules: [
      {
        test: (value) => {
          return value.length > 2;
        },
        message: 'I believe you haven\'t filled out your full name yet',
      },
    ],
    errors: [],
    valid: false,
    state: null,
  },
  reason: {
    rules: [
      {
        test: (value) => {
          return value.length;
        },
        message: 'Where can I help you with? Let me know.',
      },
    ],
    errors: [],
    valid: false,
    state: null,
  },
  description: {
    rules: [
      {
        test: (value) => {
          return value.length;
        },
        message: 'Name must be longer than two characters',
      },
    ],
    errors: [],
    valid: false,
    state: null,
  },
  email: {
    rules: [
      {
        test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Your email doesn\'t seem to be valid'
      },
      {
        test: (value) => {
          return value.length;
        },
        message: 'I need your email address to contact you...',
      },
    ],
    errors: [],
    valid: false,
    state: null
  },
};

export default validator;
