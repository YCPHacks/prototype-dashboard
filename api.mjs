import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import { ManagementClient } from 'auth0';

const api = express();

api.use(express.json());
api.use(bodyParser.urlencoded({ extended: true }));

const management = new ManagementClient({
  domain: process.env.DOMAIN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scope: 'read:role_members create:role_members delete:role_members'
});

function get_users(req, res) {
  const params = {
    search_engine: 'v3'
  };

  management.getUsers(params, (err, users) => {
    if (err) {
      res.status(err.statusCode).send({ error: err });
    } else {
      res.json(users);
    }
  });
}

function get_user_roles(req, res) {
  const params = { id: req.params.user_id, ...req.query };

  management.getUserRoles(params, (err, roles) => {
    if (err) {
      res.status(err.statusCode).send({ error: err });
    } else {
      res.json(roles);
    }
  });
}

function assign_roles_to_user(req, res) {
  const user_id = req.params.user_id;

  const data = { roles: [ req.query.roles ]};

  console.log(data);

  management.assignRolestoUser({ id: user_id }, data, (err) => {
    if (err) {
      res.status(err.statusCode).send({ error: err });
    } else {
      res.end();
    }
  });
}

function remove_roles_from_user(req, res) {
  const user_id = req.params.user_id;
  const data    = req.body;

  management.removeRolesFromUser({ id: user_id }, data, (err) => {
    if (err) {
      res.status(err.statusCode).send({ error: err });
    } else {
      res.end();
    }
  });
}

api.use(cors());

api.route('/api/users')
  .get(get_users)

api.route('/api/users/:user_id/roles')
 .get(get_user_roles)
 .post(assign_roles_to_user)
 .delete(remove_roles_from_user);

export { api }
