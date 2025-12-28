import conferences from '../resources/conferences';
import reviewerInvitations from '../resources/reviewer_invitations';
import conferenceReviewers from '../resources/conference_reviewers';
import {
  paperTemplatesForCompleted,
  paperTemplatesForOngoing,
  paperTemplatesForUpcoming,
} from '../resources/papers';
import paperVersions from '../resources/paper_versions';
import paperReviewers from '../resources/paper_reviewers';
import reviews from '../resources/reviews';

export async function seed(knex) {
  try {
    console.log('Planting seeds for conferences and related data');

    const allIdentities = await knex('identities').select('*');
    const organizers = allIdentities.filter((user) => user.role === 'organizer');
    const reviewerUsers = allIdentities.filter((user) => user.role === 'reviewer');
    const authors = allIdentities.filter((user) => user.role === 'author');

    if (organizers.length === 0) {
      throw new Error('No organizers found. Please run identities seed first.');
    }

    console.log(
      `Found ${organizers.length} organizers, ${reviewerUsers.length} reviewers, ${authors.length} authors.`
    );

    const conferenceSeeds = conferences(organizers[0].id);
    const seededConferences = await knex('conferences').insert(conferenceSeeds).returning('*');
    console.log(`✓ ${seededConferences.length} Conferences seeded`);

    const completedConf = seededConferences.find((c) => c.status === 'completed');
    const ongoingConf = seededConferences.find((c) => c.status === 'ongoing');
    const upcomingConf = seededConferences.find((c) => c.status === 'upcoming');

    const conferencesNeedingInvitations = [ongoingConf, upcomingConf].filter(Boolean);

    for (const conference of conferencesNeedingInvitations) {
      const invitationData = reviewerInvitations(conference.id);

      for (const inv of invitationData) {
        const { invitation_token, ...invitationToInsert } = inv;

        const [insertedInvitation] = await knex('reviewer_invitations')
          .insert(invitationToInsert)
          .returning(['id', 'email', 'status']);

        if (insertedInvitation.status === 'pending') {
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 7);

          await knex('invitation_tokens').insert({
            token: invitation_token,
            invitation_id: insertedInvitation.id,
            expires_at: expiresAt,
          });
        }
      }
    }
    console.log('✓ Reviewer invitations seeded');

    const conferencesWithReviewers = [completedConf, ongoingConf].filter(Boolean);

    for (const conference of conferencesWithReviewers) {
      for (const reviewer of reviewerUsers) {
        const existing = await knex('conference_reviewers')
          .where({ user_id: reviewer.id, conference_id: conference.id })
          .first();

        if (!existing) {
          const seeds = conferenceReviewers(reviewer.id, conference.id);
          await knex('conference_reviewers').insert(seeds);
        }
      }
    }
    console.log('✓ Conference reviewers seeded');

    let seededPapers = [];

    if (completedConf) {
      for (let i = 0; i < paperTemplatesForCompleted.length; i++) {
        const template = paperTemplatesForCompleted[i];
        const author = authors[i % authors.length];

        const [insertedPaper] = await knex('papers')
          .insert({
            ...template,
            user_id: author.id,
            conference_id: completedConf.id,
          })
          .returning('*');

        seededPapers.push(insertedPaper);

        const versionSeeds = paperVersions(insertedPaper.id);
        await knex('paper_versions').insert(versionSeeds);
      }
    }

    if (ongoingConf) {
      for (let i = 0; i < paperTemplatesForOngoing.length; i++) {
        const template = paperTemplatesForOngoing[i];
        const author = authors[(i + 3) % authors.length];

        const [insertedPaper] = await knex('papers')
          .insert({
            ...template,
            user_id: author.id,
            conference_id: ongoingConf.id,
          })
          .returning('*');

        seededPapers.push(insertedPaper);

        const versionSeeds = paperVersions(insertedPaper.id);
        await knex('paper_versions').insert(versionSeeds);
      }
    }

    if (upcomingConf) {
      for (let i = 0; i < paperTemplatesForUpcoming.length; i++) {
        const template = paperTemplatesForUpcoming[i];
        const author = authors[(i + 5) % authors.length];

        const [insertedPaper] = await knex('papers')
          .insert({
            ...template,
            user_id: author.id,
            conference_id: upcomingConf.id,
          })
          .returning('*');

        seededPapers.push(insertedPaper);

        const versionSeeds = paperVersions(insertedPaper.id);
        await knex('paper_versions').insert(versionSeeds);
      }
    }

    console.log(`✓ ${seededPapers.length} Papers seeded with versions`);

    const papersForReview = seededPapers.filter(
      (paper) => !['submitted', 'withdrawn'].includes(paper.status)
    );

    for (const paper of papersForReview) {
      const shuffledReviewers = [...reviewerUsers].sort(() => 0.5 - Math.random());
      const assignedReviewers = shuffledReviewers.slice(0, 2);

      for (const reviewer of assignedReviewers) {
        const [paperReviewer] = await knex('paper_reviewers')
          .insert(paperReviewers(paper.id, reviewer.id))
          .returning('*');

        const isCompleted = completedConf && paper.conference_id === completedConf.id;
        const shouldHaveReview = isCompleted || Math.random() > 0.3;

        if (shouldHaveReview) {
          const reviewSeeds = reviews(paperReviewer.id);
          await knex('reviews').insert(reviewSeeds);
        }
      }
    }
    console.log('✓ Reviews seeded');

    console.log('✓ All conference data seeded successfully');
  } catch (err) {
    console.warn('Error! Cannot insert conference data');
    return console.error(err);
  }
}
