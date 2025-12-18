// src/pages/Admin/AdminEventForm.tsx
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../../api/apiClient';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Image as ImageIcon, 
  FileText,
  ArrowLeft,
  Save,
  Plus
} from 'lucide-react';

interface EventForm {
  title: string;
  description: string;
  location: string;
  date: string;
  totalSeats: number;
  price: number;
  image: string;
}

export default function AdminEventForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<EventForm>({
    title: '',
    description: '',
    location: '',
    date: '',
    totalSeats: 0,
    price: 0,
    image: ''
  });

  useEffect(() => {
    if (!id) return;
    
    (async () => {
      try {
        const res = await adminApi().get(`/events/${id}`);
        const event = res.data.data ?? res.data.event ?? res.data;
        console.log('Admin loading event:', event);
        setForm({
          title: event.title || '',
          description: event.description || '',
          location: event.location || '',
          date: event.date ? new Date(event.date).toISOString().slice(0, 16) : '',
          totalSeats: event.totalSeats || 0,
          price: event.price || 0,
          image: event.image || ''
        });
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Load error';
        alert(message);
      }
    })();
  }, [id]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      // Transform form data to match backend expectations
      const payload = {
        title: form.title,
        description: form.description,
        location: form.location,
        date: form.date,
        totalSeats: form.totalSeats,
        price: form.price,
        image: form.image,
        status: 'upcoming'
      };

      if (id) {
        await adminApi().put(`/events/${id}`, payload);
      } else {
        await adminApi().post('/events', payload);
      }
      navigate('/admin/events');
    } catch (err: Error | unknown) {
      const message = err instanceof Error ? err.message : 'Save failed';
      alert(message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-3">
            {id ? (
              <>
                <Save className="w-8 h-8 text-blue-400" />
                Edit Event
              </>
            ) : (
              <>
                <Plus className="w-8 h-8 text-blue-400" />
                Create New Event
              </>
            )}
          </h1>
          <p className="mt-2 text-gray-600">
            {id ? 'Update event details below' : 'Fill in the details to create a new event'}
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-600">
                Event Title *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  value={form.title} 
                  onChange={e => setForm({ ...form, title: e.target.value })} 
                  placeholder="Enter event title" 
                  required 
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all bg-gray-50" 
                />
              </div>
            </div>

            {/* Location & Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    value={form.location} 
                    onChange={e => setForm({ ...form, location: e.target.value })} 
                    placeholder="Event location" 
                    required 
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all bg-gray-50" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">
                  Date & Time
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="datetime-local" 
                    value={form.date} 
                    onChange={e => setForm({ ...form, date: e.target.value })} 
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all bg-gray-50" 
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-600">
                Description
              </label>
              <textarea 
                value={form.description} 
                onChange={e => setForm({ ...form, description: e.target.value })} 
                placeholder="Describe your event in detail..." 
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all resize-none bg-gray-50" 
              />
            </div>

            {/* Seats & Price Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">
                  Total Seats
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="number" 
                    value={form.totalSeats} 
                    onChange={e => setForm({ ...form, totalSeats: Number(e.target.value) })} 
                    placeholder="100" 
                    min="1"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all bg-gray-50" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-600">
                  Price (₹)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="number" 
                    step="0.01"
                    value={form.price} 
                    onChange={e => setForm({ ...form, price: Number(e.target.value) })} 
                    placeholder="999.00" 
                    min="0"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all bg-gray-50" 
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-600">
                Image URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  value={form.image} 
                  onChange={e => setForm({ ...form, image: e.target.value })} 
                  placeholder="https://example.com/event-image.jpg" 
                  type="url"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all bg-gray-50" 
                />
              </div>
              {form.image && (
                <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={form.image} 
                    alt="Preview" 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-gray-50 px-6 sm:px-8 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end border-t border-gray-200">
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm hover:shadow-md font-medium flex items-center justify-center gap-2"
            >
              {id ? (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
