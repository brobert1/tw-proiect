import conferences from '../resources/conferences';
import reviewerInvitations from '../resources/reviewer_invitations';
import conferenceReviewers from '../resources/conference_reviewers';
import papers from '../resources/papers';
import paperVersions from '../resources/paper_versions';
import paperReviewers from '../resources/paper_reviewers';
import reviews from '../resources/reviews';

export async function seed(knex) {
  try {
    console.log('Planting seeds for conferences and related data');

    // Get the organizer
    const organizer = await knex('identities').where('email', 'michael@email.com').first();
    if (!organizer) {
      throw new Error('Organizer not found. Please run identities seed first.');
    }

    // Insert conference
    const conferenceSeeds = conferences(organizer.id);
    const [conference] = await knex('conferences').insert(conferenceSeeds).returning('*');
    console.log('✓ Conferences seeded');

    // Insert reviewer invitations
    const invitationSeeds = reviewerInvitations(conference.id);
    await knex('reviewer_invitations').insert(invitationSeeds);
    console.log('✓ Reviewer invitations seeded');

    // Get the reviewer
    const reviewer = await knex('identities').where('email', 'jim@email.com').first();
    if (reviewer) {
      // Insert conference reviewer
      const conferenceReviewerSeeds = conferenceReviewers(reviewer.id, conference.id);
      await knex('conference_reviewers').insert(conferenceReviewerSeeds).returning('*');
      console.log('✓ Conference reviewers seeded');

      // Get the author
      const author = await knex('identities').where('email', 'pam@email.com').first();
      if (author) {
        // Insert papers
        const paperSeeds = papers(author.id, conference.id);
        const insertedPapers = await knex('papers').insert(paperSeeds).returning('*');
        console.log('✓ Papers seeded');

        // Insert paper version for first paper
        const paperVersionSeeds = paperVersions(insertedPapers[0].id);
        await knex('paper_versions').insert(paperVersionSeeds);
        console.log('✓ Paper versions seeded');

        // Insert paper reviewer assignment
        const paperReviewerSeeds = paperReviewers(insertedPapers[0].id, reviewer.id);
        const [paperReviewer] = await knex('paper_reviewers').insert(paperReviewerSeeds).returning('*');
        console.log('✓ Paper reviewers seeded');

        // Insert review
        const reviewSeeds = reviews(paperReviewer.id);
        await knex('reviews').insert(reviewSeeds);
        console.log('✓ Reviews seeded');
      }
    }

    console.log('✓ All conference data seeded successfully');
  } catch (err) {
    console.warn('Error! Cannot insert conference data');
    return console.error(err);
  }
}
