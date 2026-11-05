export interface AppointmentRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  garmentsCount: string;
  requirements?: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending Fitting' | 'Completed';
}

const STORAGE_KEY = 'excellent_dress_makers_appointments';

export const saveAppointment = (data: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status'>): AppointmentRecord => {
  const existing = getAppointments();
  const newRecord: AppointmentRecord = {
    ...data,
    id: `EDM-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    status: 'Confirmed'
  };
  
  const updated = [newRecord, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save appointment to localStorage', err);
  }
  return newRecord;
};

export const getAppointments = (): AppointmentRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read appointments from localStorage', err);
    return [];
  }
};
