import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id } = req.params;

  const deleted = await knex('conferences').where('id', '=', id).where('user_id', '=', me).del();

  if (!deleted) {
    throw error(404, 'Conference not found or you do not have permission to delete it');
  }

  return res.status(200).json({ message: 'Conference deleted successfully' });
};
