import getDaysUntil from './get-days-until';

/**
 * Determine conference status badge and message based on current state
 * @param {Object} conference - Conference data with status and deadline fields
 * @returns {Object} Status info with badge, color, and subtitle
 */
const getConferenceStatus = (conference) => {
  const { status, submission_deadline, review_deadline } = conference;
  const daysUntilSubmission = getDaysUntil(submission_deadline);
  const daysUntilReview = getDaysUntil(review_deadline);

  // Conference has ended
  if (status === 'completed') {
    return {
      badge: 'Completed',
      badgeColor: 'gray',
      subtitle: 'This conference has ended',
    };
  }

  // Conference is currently happening
  if (status === 'ongoing') {
    // Check if we're in review phase
    if (daysUntilReview !== null && daysUntilReview >= 0) {
      return {
        badge: 'In Review',
        badgeColor: 'yellow',
        subtitle:
          daysUntilReview > 0
            ? `Review deadline in ${daysUntilReview} day${daysUntilReview !== 1 ? 's' : ''}`
            : 'Review deadline is today',
      };
    }

    return {
      badge: 'Ongoing',
      badgeColor: 'yellow',
      subtitle: 'Conference is in progress',
    };
  }

  // Conference is upcoming - check submission phase
  if (daysUntilSubmission !== null) {
    if (daysUntilSubmission > 7) {
      return {
        badge: 'Open for Submissions',
        badgeColor: 'green',
        subtitle: `${daysUntilSubmission} days remaining`,
      };
    } else if (daysUntilSubmission > 0) {
      return {
        badge: 'Closing Soon',
        badgeColor: 'yellow',
        subtitle: `Only ${daysUntilSubmission} day${daysUntilSubmission !== 1 ? 's' : ''} left to submit`,
      };
    } else if (daysUntilSubmission === 0) {
      return {
        badge: 'Last Day',
        badgeColor: 'yellow',
        subtitle: 'Submissions close today!',
      };
    } else {
      return {
        badge: 'Submissions Closed',
        badgeColor: 'gray',
        subtitle: 'Submission deadline has passed',
      };
    }
  }

  // Default upcoming state
  return {
    badge: 'Upcoming',
    badgeColor: 'gray',
    subtitle: 'Conference is being prepared',
  };
};

export default getConferenceStatus;
