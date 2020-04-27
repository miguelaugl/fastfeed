import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required().length(9),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      rua: Yup.string(),
      numero: Yup.string(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.string().length(9),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const { id } = req.body;

    const recipient = await Recipient.findByPk(id);

    const newRecipient = await recipient.update(req.body);

    return res.json(newRecipient);
  }
}

export default new RecipientController();
