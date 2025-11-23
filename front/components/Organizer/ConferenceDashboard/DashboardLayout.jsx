import { useEffect, useState } from 'react';
import classNames from '@lib/classnames';
import { BarChart3, Settings, Users, FileText } from 'lucide-react';
import { useRouter } from 'next/router';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Extract hash from URL, remove the '#' character
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveTab(hash);
    } else {
      setActiveTab('overview');
    }
  }, [router.asPath]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
        hash: tabId,
      },
      undefined,
      { shallow: true }
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'reviewers', label: 'Reviewers', icon: Users },
    { id: 'submissions', label: 'Submissions', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Manage Conference</h1>
      </div>
      <div className="border-b border-border-primary">
        <nav className="flex gap-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={classNames(
                  'group flex items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-text-secondary hover:border-gray-300 hover:text-text-primary'
                )}
              >
                <Icon
                  className={classNames(
                    'h-5 w-5',
                    isActive
                      ? 'text-gray-900'
                      : 'text-text-tertiary group-hover:text-text-secondary'
                  )}
                />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div>{children({ activeTab })}</div>
    </div>
  );
};

export default DashboardLayout;
