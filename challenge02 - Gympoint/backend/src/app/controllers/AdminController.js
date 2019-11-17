import Admin from '../models/Admin';

class AdminController {
  async store(req, res) {
    const { email } = req.body;

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
}

export default new AdminController();
