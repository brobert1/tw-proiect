import AuthorMenu from './AuthorMenu';
import OrganizerMenu from './OrganizerMenu';
import PagesLoading from './PagesLoading';
import ReviewerMenu from './ReviewerMenu';

const Pages = ({ role }) => {
  switch (role) {
    case 'author':
      return <AuthorMenu />;
    case 'reviewer':
      return <ReviewerMenu />;
    case 'organizer':
      return <OrganizerMenu />;
    default:
      return <PagesLoading />;
  }
};

export default Pages;
