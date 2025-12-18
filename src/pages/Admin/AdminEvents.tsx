// src/pages/Admin/AdminEvents.tsx
import { useEffect, useState } from 'react';
import { adminApi } from '../../api/apiClient';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import type { Event } from '../../types/event';

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  async function load() {
    setLoading(true);
    try {
      const res = await adminApi().get('/events');
      const payload = res.data.data ?? res.data.events ?? res.data;
      setEvents(Array.isArray(payload) ? payload : []);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to load';
      alert(errorMessage);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    load(); 
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Delete this event?')) return;
    try {
      await adminApi().delete(`/events/${id}`);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Delete failed';
      alert(errorMessage);
    }
  }

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-3 sm:px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 truncate">Manage Events</h1>
            </div>
            <Link
              to="/admin/events/new"
              className="w-full sm:w-auto text-center px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-xs sm:text-sm font-medium shadow-sm whitespace-nowrap"
            >
              + Create Event
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Search Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
            <input
              type="text"
              placeholder="Search events by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-300"
            />
          </div>

            {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600 text-lg">Loading events...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md text-center">
                  <svg 
                    className="mx-auto h-20 w-20 text-gray-400 mb-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                    />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">No Events Created</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm
                      ? 'No events match your search. Try different keywords.'
                      : 'Get started by creating your first event. Click the button below to begin!'}
                  </p>
                  <Link
                    to="/admin/events/new"
                    className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all font-medium shadow-sm"
                  >
                    Create First Event
                  </Link>
                </div>
              </div>
            ) : (
              filteredEvents.map(e => (
                <div 
                  key={e.id} 
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="font-semibold text-xl text-gray-800 mb-2">{e.title}</div>
                    <div className="text-sm text-gray-600 mb-2">
                      📍 {e.location} • 📅 {new Date(e.date).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full">
                        💺 Available: {e.availableSeats} / {e.totalSeats}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full">
                        💰 ₹{e.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <Link 
                      to={`/admin/events/${e.id}/edit`} 
                      className="flex-1 md:flex-none px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition text-center"
                    >
                      ✏️ Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(e.id)} 
                      className="flex-1 md:flex-none px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
