import { Button } from '@components';
import { classnames } from '@lib';
import { AlertTriangle, CheckCircle, Info, Trash2, X } from 'lucide-react';
import Modal from 'react-bootstrap/Modal';

const variants = {
  danger: {
    confirmClass: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    iconColor: 'bg-red-100 text-red-600',
    Icon: Trash2,
  },
  primary: {
    confirmClass: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    iconColor: 'bg-blue-100 text-blue-600',
    Icon: Info,
  },
  success: {
    confirmClass: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    iconColor: 'bg-green-100 text-green-600',
    Icon: CheckCircle,
  },
  warning: {
    confirmClass: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
    iconColor: 'bg-yellow-100 text-yellow-600',
    Icon: AlertTriangle,
  },
};

export const ActionFooter = ({
  cancelText = 'Cancel',
  confirmText = 'Delete',
  hide,
  isLoading,
  onConfirm = () => {},
  variant = 'danger',
}) => {
  const { confirmClass } = variants[variant] || variants['danger'];

  return (
    <div className="flex justify-end gap-3 w-full sm:w-auto">
      <Button
        className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
        onClick={hide}
      >
        {cancelText}
      </Button>
      <div className="flex items-center">
        <Button
          className={classnames(
            'px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm',
            confirmClass
          )}
          disabled={isLoading}
          onClick={onConfirm}
          type="submit"
        >
          {confirmText}
        </Button>
        {isLoading && (
          <div className="ml-2 w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
};

const ActionModal = ({
  cancelText,
  children,
  confirmText,
  hide,
  isLoading,
  isOpen,
  onConfirm,
  showFooter = true,
  title = 'Confirm operation',
  variant = 'danger',
}) => {
  const { iconColor, Icon } = variants[variant] || variants['danger'];

  return (
    <Modal
      show={isOpen}
      onHide={hide}
      backdrop="static"
      keyboard={false}
      centered
      contentClassName="rounded-lg shadow-xl border-0 overflow-hidden"
    >
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div
            className={classnames(
              'mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10',
              iconColor
            )}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              {title}
            </h3>
            <div className="mt-2">
              <div className="text-sm text-gray-500">{children}</div>
            </div>
          </div>
        </div>
      </div>
      {showFooter && (
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <ActionFooter
            cancelText={cancelText}
            confirmText={confirmText}
            hide={hide}
            isLoading={isLoading}
            onConfirm={onConfirm}
            variant={variant}
          />
        </div>
      )}
    </Modal>
  );
};

export default ActionModal;
