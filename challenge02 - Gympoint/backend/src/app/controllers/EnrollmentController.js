import Enrollment from '../models/Enrollment';

class EnrollmentController {
  async store(req, res) {
    // const {
    //   studentId,
    //   planId,
    //   startDate,
    //   endDate,
    //   price,
    // } = req.body;

    const {
      studentId,
      planId,
      startDate,
      endDate,
      price,
    } = await Enrollment.create(req.body);

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
