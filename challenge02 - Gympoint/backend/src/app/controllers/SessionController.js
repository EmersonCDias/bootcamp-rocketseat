import jwt from 'jsonwebtoken';

import Admin from '../models/Admin';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, adminPassword } = req.body;

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!(await admin.checkPassword(adminPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = admin;
    const { secret, expiresIn } = authConfig;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, secret, { expiresIn }),
    });
  }
}

export default new SessionController();
