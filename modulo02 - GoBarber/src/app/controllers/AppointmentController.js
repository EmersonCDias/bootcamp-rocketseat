import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import { pt } from 'date-fns/locale/pt';
import * as Yup from 'yup';

import Appointments from '../models/Appointments';
import Notification from '../schemas/Notifications';
import File from '../models/File';
import User from '../models/User';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointments.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // Check if provider_id is a provider
    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers!' });
    }

    // Check for past dates
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted ' });
    }

    // Check date availability
    const checkAvailability = await Appointments.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    // Notify appointment provider
    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    if (checkAvailability) {
      return res
        .status(401)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointments.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    res.json(appointment);
  }
}

export default new AppointmentController();
