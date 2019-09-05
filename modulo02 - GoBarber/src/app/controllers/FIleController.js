import File from '../models/File';

class FileController {
  async store(req, res) {
    console.log('1 ========>', req.file);
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    console.log('2 ========>', file);

    return res.json(file);
  }
}

export default new FileController();
