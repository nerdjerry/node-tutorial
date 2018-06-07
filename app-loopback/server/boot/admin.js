'use strict';

module.exports = function(app) {
  var Customer = app.models.Customer;
  Customer.findOrCreate({
    username: 'Admin',
  }, {
    username: 'Admin',
    email: 'admin@app.com',
    password: 'password',
  }, (err, user, created) => {
    if (err) throw (err);

    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    Role.findOrCreate({
      name: 'admin',
    }, {
      name: 'admin',
    }, (err, role, created) => {
      if (err) throw (err);
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: user.id,
      });
    });
  });
};
