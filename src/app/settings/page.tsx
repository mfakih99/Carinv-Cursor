'use client'

import Navigation from '@/components/layout/Navigation'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Mail,
  Building,
  Save,
  Key,
  Globe,
  DollarSign,
  FileText
} from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [savedMessage, setSavedMessage] = useState('')
  
  // Settings state
  const [settings, setSettings] = useState({
    // General
    companyName: 'Car Wholesaler Inc.',
    companyEmail: 'info@carwholesaler.com',
    companyPhone: '(555) 123-4567',
    companyAddress: '123 Main St, City, State 12345',
    timezone: 'America/New_York',
    currency: 'USD',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    lowInventoryAlert: true,
    newCustomerAlert: true,
    documentExpiryAlert: true,
    alertDaysBefore: 30,
    
    // Display
    theme: 'light',
    compactView: false,
    showProfitMargins: true,
    defaultView: 'grid',
    itemsPerPage: 20,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    requireStrongPassword: true
  })
  
  const handleSave = () => {
    // TODO: Save to backend
    console.log('Saving settings:', settings)
    setSavedMessage('Settings saved successfully!')
    setTimeout(() => setSavedMessage(''), 3000)
  }
  
  const tabs = [
    { id: 'general', label: 'General', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'customfields', label: 'Custom Fields', icon: FileText },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your application preferences and configuration</p>
        </div>
        
        {savedMessage && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
            <p className="text-sm text-green-800">{savedMessage}</p>
          </div>
        )}
        
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="flex border-b">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mx-auto mb-1" />
                  {tab.label}
                </button>
              )
            })}
          </div>
          
          <div className="p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="h-4 w-4 inline mr-1" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Company Email
                    </label>
                    <input
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => setSettings({...settings, companyEmail: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Globe className="h-4 w-4 inline mr-1" />
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="h-4 w-4 inline mr-1" />
                      Currency
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({...settings, currency: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Address
                  </label>
                  <textarea
                    value={settings.companyAddress}
                    onChange={(e) => setSettings({...settings, companyAddress: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
            
            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">Low Inventory Alerts</p>
                      <p className="text-sm text-gray-500">Get notified when inventory is running low</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.lowInventoryAlert}
                      onChange={(e) => setSettings({...settings, lowInventoryAlert: e.target.checked})}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">Document Expiry Alerts</p>
                      <p className="text-sm text-gray-500">Remind when documents are about to expire</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.documentExpiryAlert}
                      onChange={(e) => setSettings({...settings, documentExpiryAlert: e.target.checked})}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alert Days Before Expiry
                    </label>
                    <input
                      type="number"
                      value={settings.alertDaysBefore}
                      onChange={(e) => setSettings({...settings, alertDaysBefore: parseInt(e.target.value)})}
                      className="w-32 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Display Settings */}
            {activeTab === 'display' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <select
                      value={settings.theme}
                      onChange={(e) => setSettings({...settings, theme: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default View
                    </label>
                    <select
                      value={settings.defaultView}
                      onChange={(e) => setSettings({...settings, defaultView: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="grid">Grid View</option>
                      <option value="list">List View</option>
                      <option value="compact">Compact View</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Items Per Page
                    </label>
                    <input
                      type="number"
                      value={settings.itemsPerPage}
                      onChange={(e) => setSettings({...settings, itemsPerPage: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.showProfitMargins}
                      onChange={(e) => setSettings({...settings, showProfitMargins: e.target.checked})}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Show Profit Margins</p>
                      <p className="text-sm text-gray-500">Display profit information on vehicle cards</p>
                    </div>
                  </label>
                </div>
              </div>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                      className="w-32 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Expiry (days)
                    </label>
                    <input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => setSettings({...settings, passwordExpiry: parseInt(e.target.value)})}
                      className="w-32 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.requireStrongPassword}
                      onChange={(e) => setSettings({...settings, requireStrongPassword: e.target.checked})}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Require Strong Passwords</p>
                      <p className="text-sm text-gray-500">Enforce minimum password complexity requirements</p>
                    </div>
                  </label>
                </div>
                
                <div className="pt-4 space-y-3">
                  <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <Key className="h-4 w-4 inline mr-2" />
                    Change Password
                  </button>
                  <button className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                    View Login History
                  </button>
                </div>
              </div>
            )}
            
            {/* Custom Fields Settings */}
            {activeTab === 'customfields' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Fields Management</h3>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-blue-800">
                        <strong className="font-semibold">Custom Fields:</strong> Define additional fields that will be available for all vehicles in your inventory.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Custom Fields</h3>
                  <p className="text-gray-500 mb-6">Create custom fields, formula fields, and manage field definitions for your vehicles.</p>
                  <a
                    href="/settings/custom-fields"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Open Custom Fields Manager
                  </a>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-3">Available Field Types</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Text Fields</li>
                      <li>• Number Fields</li>
                      <li>• Date Fields</li>
                      <li>• Yes/No (Boolean) Fields</li>
                      <li>• Dropdown/Select Fields</li>
                      <li>• Formula/Calculated Fields</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-3">Formula Field Examples</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Total Cost: {'{purchasePrice} + {totalExpenses}'}</li>
                      <li>• Profit Margin: {'{listingPrice} - {purchasePrice} - {totalExpenses}'}</li>
                      <li>• Cost per Day: {'{totalCost} / {daysInInventory}'}</li>
                      <li>• Markup %: {'(({listingPrice} - {purchasePrice}) / {purchasePrice}) * 100'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save className="h-4 w-4 inline mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 