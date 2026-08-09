const defaultUser = {
  name: 'Lucas Porto',
  job: 'Senior QA Engineer',
  email: 'lucas@example.com',
  department: 'Quality Engineering',
  active: true,
  skills: ['API Testing', 'Automation'],
  address: {
    city: 'Porto Alegre',
    country: 'Brazil',
  },
};

export function createUserPayload(overrides = {}) {
  return {
    ...defaultUser,
    ...overrides,
    skills: overrides.skills ?? [...defaultUser.skills],
    address: {
      ...defaultUser.address,
      ...overrides.address,
    },
  };
}
