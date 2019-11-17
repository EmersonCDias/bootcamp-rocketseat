import * as Yup from 'yup';

import Admin from '../models/Admin';

class AdminController {
  async index(_, res) {
    const allAdmins = await Admin.findAll({
      attributes: ['id', 'name', 'email'],
    });

    res.json(allAdmins);
  }

  async store(req, res) {
    const { email } = req.body;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      adminPassword: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const adminExists = await Admin.findOne({ where: { email } });

    if (adminExists) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const admin = await Admin.create(req.body);

    const { id, name } = admin;

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldAdminPassword: Yup.string().min(6),
      adminPassword: Yup.string()
        .min(6)
        .when('oldAdminPassword', (oldAdminPassword, field) => {
          return oldAdminPassword ? field.required() : field;
        }),
      confirmAdminPassword: Yup.string().when(
        'adminPassword',
        (adminPassword, field) => {
          return adminPassword
            ? field.required().oneOf([Yup.ref('adminPassword')])
            : field;
        }
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { oldAdminPassword, adminPassword } = req.body;
    const admin = await Admin.findByPk(req.adminId);

    if (req.body.email && req.body.email !== admin.email) {
      const adminExists = await Admin.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (adminExists) {
        return res.status(400).json({ error: 'Admin already exists' });
      }
    }

    if (!oldAdminPassword && adminPassword) {
      return res
        .status(400)
        .json({ error: 'Please, inform previous password' });
    }

    if (oldAdminPassword && !(await admin.checkPassword(oldAdminPassword))) {
      return res
        .status(400)
        .json({ error: 'Previous password does not match' });
    }

    const { id, name, email } = await admin.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new AdminController();
