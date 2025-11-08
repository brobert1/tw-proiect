import { useState } from 'react';
import classNames from '@lib/classnames';
import { Search } from 'lucide-react';
import useDisclosure from '@hooks/use-disclosure';
import PaperDetailsModal from './PaperDetailsModal';

const SubmissionsTab = () => {
  const { isOpen, show, hide } = useDisclosure();
  const [selectedPaper, setSelectedPaper] = useState(null);

  const getStatusConfig = (status) => {
    const configs = {
      submitted: {
        className: 'bg-gray-50 text-gray-700 border-gray-200',
        text: 'SUBMITTED',
      },
      under_review: {
        className: 'bg-blue-50 text-blue-700 border-blue-200',
        text: 'UNDER_REVIEW',
      },
      accepted: {
        className: 'bg-green-50 text-green-700 border-green-200',
        text: 'ACCEPTED',
      },
    };

    return configs[status] || configs.submitted;
  };

  const handleManageClick = (submission) => {
    // Get full paper details (in real app, this would fetch from API)
    const paperDetails = {
      ...submission,
      abstract:
        'This paper explores the transformative impact of artificial intelligence on modern web development practices. We present a comprehensive analysis of AI-driven tools and frameworks that are reshaping how developers build, test, and deploy web applications. Our research includes case studies from industry leaders and proposes a framework for integrating AI capabilities into existing web development workflows.',
      mainAuthor: submission.author,
      coAuthors: [
        { name: 'Dr. Smith', email: 'smith@university.edu' },
        { name: 'Prof. Johnson', email: 'johnson@research.org' },
      ],
      assignedReviewers: [
        {
          name: 'Dr. Sarah Mitchell',
          email: 's.mitchell@university.edu',
          assignedDate: 'Oct 15, 2024',
          status: 'accepted',
        },
        {
          name: 'Prof. James Chen',
          email: 'j.chen@research.org',
          assignedDate: 'Oct 18, 2024',
          status: 'pending',
        },
        {
          name: 'Dr. Emily Rodriguez',
          email: 'e.rodriguez@tech.edu',
          assignedDate: 'Oct 16, 2024',
          status: 'declined',
        },
      ],
      submittedReviews: [
        {
          reviewerName: 'Dr. Sarah Mitchell',
          submittedDate: 'Oct 22, 2024',
          score: 8,
          strengths:
            'Novel approach to the problem. Well-written and structured paper with clear methodology.',
          weaknesses:
            'Some experimental results could be expanded. Limited comparison with recent work.',
          comments:
            'This paper presents a solid contribution to the field. I recommend acceptance with minor revisions to address the experimental section.',
          recommendation: 'ACCEPT',
        },
      ],
    };

    setSelectedPaper(paperDetails);
    show();
  };

  const submissions = [
    {
      id: 1,
      title: 'The Role of AI in Modern Web',
      author: 'Dr. Author',
      status: 'submitted',
      submittedAt: 'Oct 20, 2024',
    },
    {
      id: 2,
      title: 'Web Assembly Frontiers',
      author: 'Prof. Writer',
      status: 'under_review',
      submittedAt: 'Oct 19, 2024',
    },
    {
      id: 3,
      title: 'Scalable Web Architectures',
      author: 'Dr. Coder',
      status: 'accepted',
      submittedAt: 'Oct 18, 2024',
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search papers..."
            className="form-input block w-full rounded-md border border-border-primary py-2 pl-10 pr-3 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <select className="form-select w-full rounded-md border border-border-primary px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 md:w-auto">
          <option>All</option>
          <option>Submitted</option>
          <option>Under Review</option>
          <option>Accepted</option>
          <option>Rejected</option>
        </select>
      </div>
      <div className="rounded-lg border border-border-primary bg-white">
        <div className="-mx-4 overflow-x-auto md:mx-0 md:overflow-x-visible">
          <table className="min-w-full divide-y divide-border-primary">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Main Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Submitted At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary bg-white">
              {submissions.map((submission) => {
                const statusConfig = getStatusConfig(submission.status);
                return (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">
                      {submission.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                      {submission.author}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={classNames(
                          'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium uppercase',
                          statusConfig.className
                        )}
                      >
                        {statusConfig.text}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                      {submission.submittedAt}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <button
                        type="button"
                        onClick={() => handleManageClick(submission)}
                        className="rounded-md border border-border-primary bg-white px-3 py-1.5 text-sm font-medium text-text-primary hover:bg-gray-50"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <PaperDetailsModal open={isOpen} onClose={hide} paper={selectedPaper} />
    </div>
  );
};

export default SubmissionsTab;
