import React, { useState } from 'react';
import { Bell, X, Settings } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state: { notifications } } = useDashboard();
  const [selectedTab, setSelectedTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'important', label: 'Important' }
  ];

  const filteredNotifications = notifications?.filter(notification => {
    if (selectedTab === 'unread') return !notification.read;
    if (selectedTab === 'important') return notification.important;
    return true;
  });

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {notifications?.some(n => !n.read) && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => {/* Open settings */}} 
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 py-3 text-sm font-medium ${
                  selectedTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {filteredNotifications?.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications to display
              </div>
            ) : (
              filteredNotifications?.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <button
              onClick={() => {/* Mark all as read */}}
              className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Notification Item Component
const NotificationItem = ({ notification }) => {
  const { actions } = useDashboard();

  const handleClick = () => {
    if (!notification.read) {
      actions.markNotificationAsRead(notification.id);
    }
    // Handle notification click (e.g., navigation)
  };

  return (
    <div 
      onClick={handleClick}
      className={`p-4 hover:bg-gray-50 cursor-pointer flex items-start space-x-3 ${
        !notification.read ? 'bg-blue-50' : ''
      }`}
    >
      <div className={`p-2 rounded-lg ${
        notification.type === 'success' ? 'bg-green-100 text-green-600' :
        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
        notification.type === 'error' ? 'bg-red-100 text-red-600' :
        'bg-blue-100 text-blue-600'
      }`}>
        {notification.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            {notification.title}
          </h3>
          <span className="text-xs text-gray-500">
            {notification.time}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {notification.message}
        </p>
        {notification.action && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              notification.action.onClick();
            }}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {notification.action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;