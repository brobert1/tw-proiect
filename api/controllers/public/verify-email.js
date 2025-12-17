import { knex } from '@db';
import { error } from '@functions';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw error(400, 'Verification token is required');
  }

  const tokenRecord = await knex('email_verification_tokens')
    .first('id', 'user_id', 'expires_at')
    .where('token', '=', token);

  if (!tokenRecord) {
    throw error(404, 'Invalid or expired verification link');
  }

  if (new Date() > new Date(tokenRecord.expires_at)) {
    await knex('email_verification_tokens').where('id', '=', tokenRecord.id).del();
    throw error(410, 'Verification link has expired. Please request a new one.');
  }

  const trx = await knex.transaction();

  try {
    await trx('identities')
      .update({
        active: true,
        updated_at: knex.fn.now(),
      })
      .where('id', '=', tokenRecord.user_id);

    const identity = await trx('identities')
      .first('id', 'name', 'email', 'role')
      .where('id', '=', tokenRecord.user_id);
    await trx('email_verification_tokens').where('id', '=', tokenRecord.id).del();

    await trx.commit();

    const payload = {
      name: identity.name,
      email: identity.email,
      role: identity.role,
      me: identity.id,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '15m',
      algorithm: 'HS256',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '12h',
      algorithm: 'HS256',
    });

    const oneDay = 24 * 3600 * 1000;
    res.cookie(process.env.JWT_TOKEN_NAME, refreshToken, {
      secure: true,
      maxAge: oneDay,
      signed: true,
      httpOnly: true,
      sameSite: 'lax',
    });

    return res.status(200).json({
      message: 'Email verified successfully',
      token: accessToken,
    });
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};
