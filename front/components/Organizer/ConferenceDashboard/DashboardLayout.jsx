import { useState } from 'react';
import classNames from '@lib/classnames';
import { BarChart3, Settings, Users, FileText } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('overview');

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
                onClick={() => setActiveTab(tab.id)}
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
