import { knex } from '@db';
import { error, randomHash } from '@functions';
import { sendVerificationEmail } from '@functions/email';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await knex('identities').first('id').where('email', '=', email);
  if (existingUser) {
    throw error(409, 'An account with this email already exists');
  }

  const trx = await knex.transaction();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [identity] = await trx('identities')
      .insert({
        email: email,
        name: name.trim(),
        role: 'author',
        password: hashedPassword,
        active: false,
        loginAttempts: 0,
        created_at: knex.fn.now(),
      })
      .returning(['id', 'email', 'name']);

    const verificationToken = randomHash() + randomHash();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await trx('email_verification_tokens').insert({
      token: verificationToken,
      user_id: identity.id,
      expires_at: expiresAt,
      created_at: knex.fn.now(),
    });

    await trx.commit();

    try {
      await sendVerificationEmail({
        email: identity.email,
        name: identity.name,
        token: verificationToken,
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
    }

    return res.status(201).json({});
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};
