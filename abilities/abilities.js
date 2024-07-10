const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
  const { can,cannot, build } = new AbilityBuilder(Ability);

  if (user.email === 'admin@gmail.com') {
    can('manage', 'all');
  } else {
    cannot('manage','all')
  }

  return build();
}

module.exports = { defineAbilitiesFor };
