'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { getComponentsForDashboard, getComponentMainTitle, DashboardComponent } from '@/hooks/useComponentsAdmin';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [components, setComponents] = useState<DashboardComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
  };

  // Load components on mount
  useEffect(() => {
    const loadComponents = async () => {
      try {
        setLoading(true);
        const data = await getComponentsForDashboard();
        setComponents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load components');
      } finally {
        setLoading(false);
      }
    };

    loadComponents();
  }, []);

  const getTypeColor = (type: string) => {
    const colors = {
      banner: 'bg-blue-100 text-blue-800',
      info: 'bg-green-100 text-green-800', 
      items: 'bg-yellow-100 text-yellow-800',
      history: 'bg-purple-100 text-purple-800',
      text: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPositionColor = (position: string) => {
    const colors = {
      left: 'bg-orange-100 text-orange-800',
      center: 'bg-indigo-100 text-indigo-800',
      right: 'bg-pink-100 text-pink-800'
    };
    return colors[position as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  Component Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden sm:flex items-center text-sm text-gray-700">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white font-medium">
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden md:inline">{user?.user_metadata?.full_name || user?.email}</span>
                </div>
                <div className="sm:hidden">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/"
                  className="hidden sm:inline-flex text-indigo-600 hover:text-indigo-700 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                >
                  Back to Site
                </Link>
                <Link
                  href="/"
                  className="sm:hidden text-indigo-600 hover:text-indigo-700 p-1 rounded-md transition-colors"
                  title="Back to Site"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors"
                >
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden">Out</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="py-2 sm:py-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Components</h2>
                <p className="text-gray-600 mt-1">Manage your resume components</p>
              </div>
              <Link
                href="/dashboard/components/new"
                className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Component
              </Link>
            </div>

            {/* Components List */}
            <div className="bg-white shadow rounded-lg">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading components...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <div className="text-red-600 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-medium">Error loading components</p>
                  <p className="text-gray-600">{error}</p>
                </div>
              ) : components.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-medium">No components found</p>
                  <p className="text-gray-600 mb-4">Get started by creating your first component</p>
                  <Link
                    href="/dashboard/components/new"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
                  >
                    Create Component
                  </Link>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Position
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sort Order
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {components.map((component) => (
                          <tr key={component.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {getComponentMainTitle(component)}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {component.id}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(component.type)}`}>
                                {component.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPositionColor(component.position)}`}>
                                {component.position}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {component.sort}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Link
                                href={`/dashboard/components/${component.id}/edit`}
                                className="inline-flex items-center p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors"
                                title="Edit component"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="lg:hidden divide-y divide-gray-200">
                    {components.map((component) => (
                      <div key={component.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {getComponentMainTitle(component)}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 font-mono">
                              {component.id}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(component.type)}`}>
                                {component.type}
                              </span>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPositionColor(component.position)}`}>
                                {component.position}
                              </span>
                              <span className="text-xs text-gray-600">
                                #{component.sort}
                              </span>
                            </div>
                          </div>
                          <Link
                            href={`/dashboard/components/${component.id}/edit`}
                            className="flex-shrink-0 ml-4 inline-flex items-center p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors"
                            title="Edit component"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}