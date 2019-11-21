import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

class EnrollmentController {
  async index(_, res) {
    const allEnrollments = await Enrollment.findAll({
      attributes: [
        'id',
        'studentId',
        'planId',
        'startDate',
        'endDate',
        'price',
      ],
    });

    return res.json(allEnrollments);
  }

  async store(req, res) {
    const { studentId, planId } = req.body;

    // Check if Student exists
    const studentExists = await Enrollment.findOne({
      include: [
        {
          model: Student,
          where: { id: studentId },
        },
      ],
    });

    if (studentExists === null) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const { startDate, endDate, price } = await Enrollment.create(req.body);

    return res.json({
      studentId,
      planId,
      startDate,
      endDate,
      price,
    });
  }
}

export default new EnrollmentController();
