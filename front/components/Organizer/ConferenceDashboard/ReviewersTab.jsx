const ReviewersTab = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
        <h3 className="mb-4 text-base font-semibold text-text-primary md:mb-6">
          Invite New Reviewer
        </h3>

        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
          <div className="flex-1">
            <label htmlFor="reviewerEmail" className="block text-sm font-medium text-text-primary">
              Reviewer Email
            </label>
            <input
              type="email"
              id="reviewerEmail"
              placeholder="prof@example.com"
              className="form-input mt-2 block w-full rounded-md border border-border-primary px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
          <div className="flex md:items-end">
            <button
              type="button"
              className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 md:w-auto"
            >
              Send Invitation
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
        <h3 className="mb-4 text-base font-semibold text-text-primary md:mb-6">
          Pending & Declined Invitations
        </h3>
        <div className="-mx-4 overflow-x-auto md:mx-0">
          <table className="min-w-full divide-y divide-border-primary">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Invited On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary bg-white">
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-primary">
                  dr.smith@uni.edu
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span className="inline-flex items-center rounded-md border border-yellow-200 bg-yellow-50 px-2.5 py-0.5 text-xs font-medium uppercase text-yellow-700">
                    PENDING
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                  Oct 24, 2024
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <button
                    type="button"
                    className="rounded-md border border-border-primary bg-white px-3 py-1.5 text-sm font-medium text-text-primary hover:bg-gray-50"
                  >
                    Resend
                  </button>
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-primary">
                  dr.jones@web.com
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span className="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium uppercase text-red-700">
                    DECLINED
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                  Oct 23, 2024
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
        <h3 className="mb-4 text-base font-semibold text-text-primary md:mb-6">
          Accepted Reviewers (Program Committee)
        </h3>
        <div className="-mx-4 overflow-x-auto md:mx-0">
          <table className="min-w-full divide-y divide-border-primary">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Expertise Topics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary bg-white">
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-text-primary">
                  Dr. Ada Lovelace
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                  ada@compute.org
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center rounded-md border border-border-primary bg-gray-50 px-2 py-0.5 text-xs text-text-primary">
                      AI
                    </span>
                    <span className="inline-flex items-center rounded-md border border-border-primary bg-gray-50 px-2 py-0.5 text-xs text-text-primary">
                      NLP
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <button
                    type="button"
                    className="rounded-md border border-border-primary bg-white px-3 py-1.5 text-sm font-medium text-text-primary hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-text-primary">
                  Dr. Alan Turing
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                  alan@ai.dev
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center rounded-md border border-border-primary bg-gray-50 px-2 py-0.5 text-xs text-text-primary">
                      AI
                    </span>
                    <span className="inline-flex items-center rounded-md border border-border-primary bg-gray-50 px-2 py-0.5 text-xs text-text-primary">
                      Web Assembly
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <button
                    type="button"
                    className="rounded-md border border-border-primary bg-white px-3 py-1.5 text-sm font-medium text-text-primary hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewersTab;
