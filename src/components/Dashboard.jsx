import React, { useState } from 'react';
import { LayoutDashboard, Compass, AlertTriangle, Gift, FileCheck, Gauge, Tag, FileText, Settings, Bell, ChevronDown, Calendar, Filter, Info } from 'lucide-react';

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');
  const [selectedView, setSelectedView] = useState('Monthly');
  const [selectedAccount, setSelectedAccount] = useState('All Accounts');

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Compass, label: 'Explorer' },
    { icon: AlertTriangle, label: 'Anomalies' },
    { icon: Gift, label: 'Showback' },
    { icon: FileCheck, label: 'Commitments' },
    { icon: Gauge, label: 'Optimization' },
    { icon: Tag, label: 'Tagging Health' },
    { icon: FileText, label: 'Reports' },
    { icon: Settings, label: 'Settings' },
    { icon: Bell, label: 'Notifications' },
  ];

  const cloudProviders = [
    { name: 'All', active: true },
    { name: 'AWS', active: false },
    { name: 'Azure', active: false },
    { name: 'GCP', active: false },
    { name: 'OCI', active: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Navigation Menu */}
        <nav className="flex-1 py-6">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              <button
                className={`w-full flex items-center justify-between px-6 py-3 text-sm transition-colors ${
                  item.active
                    ? 'text-purple-600 bg-purple-50 border-r-2 border-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <Info className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
              CS
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">Charlie S.</div>
              <div className="text-xs text-gray-500">Product manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-gray-400" />
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="text-sm text-gray-500">Last updated 15 min ago</div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            {/* Cloud Provider Filter */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              {cloudProviders.map((provider, index) => (
                <button
                  key={index}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    provider.active
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {provider.name}
                </button>
              ))}
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Period:</span>
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  {selectedPeriod}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* View Selector */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">View:</span>
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  {selectedView}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Account Selector */}
            <div className="relative flex-1 max-w-xs">
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                {selectedAccount}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-8">
          <div className="text-center text-gray-400 mt-20">
            Dashboard content goes here
          </div>
        </main>
      </div>
    </div>
  );
}
