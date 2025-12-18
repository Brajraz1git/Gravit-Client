import { useEffect, useState } from 'react';
import { adminApi } from '../../api/apiClient';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';

interface Booking {
  id: number;
  eventId: number;
  userId: number;
  quantity: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  name: string;
  email: string;
  title?: string;
  date?: string;
  location?: string;
}

export default function AdminBookings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);
    try {
      const res = await adminApi().get('/bookings');
      const data = res.data.data ?? res.data.bookings ?? res.data;
      setBookings(Array.isArray(data) ? data : []);
    } catch (e: Error | unknown) {
      console.error('Failed to load bookings', e);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-900/50 text-green-300 border-green-700';
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
      case 'cancelled':
        return 'bg-red-900/50 text-red-300 border-red-700';
      default:
        return 'bg-gray-900/50 text-gray-300 border-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-3 sm:px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900 shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 truncate">All Bookings</h1>
            </div>
            <Link
              to="/"
              className="w-full sm:w-auto text-center px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-xs sm:text-sm whitespace-nowrap shadow-md"
            >
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 bg-gray-50">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search by name, email, or event..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Filter
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600 text-lg">Loading bookings...</p>
              </div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
              <svg className="mx-auto h-20 w-20 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'No bookings have been made yet'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-4 text-gray-700 font-medium">Booking ID</th>
                      <th className="text-left py-4 px-4 text-gray-700 font-medium">Customer</th>
                      <th className="text-left py-4 px-4 text-gray-700 font-medium">Event</th>
                      <th className="text-center py-4 px-4 text-gray-700 font-medium">Tickets</th>
                      <th className="text-right py-4 px-4 text-gray-700 font-medium">Amount</th>
                      <th className="text-center py-4 px-4 text-gray-700 font-medium">Status</th>
                      <th className="text-left py-4 px-4 text-gray-700 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-4 px-4 text-gray-900 font-mono text-sm">
                          #{booking.id}
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="text-gray-900 font-medium">{booking.name}</div>
                            <div className="text-gray-500 text-sm">{booking.email}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-900">{booking.title || `Event #${booking.eventId}`}</div>
                          {booking.location && (
                            <div className="text-gray-500 text-sm">📍 {booking.location}</div>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-semibold">
                          {booking.quantity}
                        </td>
                        <td className="py-4 px-4 text-right text-blue-600 font-semibold">
                          ₹{booking.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                            {booking.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">
                          {new Date(booking.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary */}
          {!loading && filteredBookings.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="text-gray-600 text-sm">Total Bookings</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">{filteredBookings.length}</div>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="text-gray-600 text-sm">Total Tickets</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {filteredBookings.reduce((sum, b) => sum + b.quantity, 0)}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="text-gray-600 text-sm">Total Revenue</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  ₹{filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0).toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
