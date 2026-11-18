import type { Rental, RentalStatus } from '../domain/entities';
import type { RentalRepository } from '../application/ports/RentalRepository';
import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';

type BookingRow = {
  id: string; booking_number: string | null; product_title: string | null; product_image_url: string | null;
  provider_business_name: string | null; start_datetime: string | null; end_datetime: string | null;
  status: string | null; total_amount: number | null; currency: string | null; pickup_address: string | null;
  delivery_address: string | null; created_at: string | null;
};

const columns = 'id,booking_number,product_title,product_image_url,provider_business_name,start_datetime,end_datetime,status,total_amount,currency,pickup_address,delivery_address,created_at';
const statusMap: Record<string, RentalStatus> = {
  requested: 'pending', pending: 'pending', approved: 'pending', booked: 'upcoming', confirmed: 'upcoming',
  active: 'ongoing', ongoing: 'ongoing', overdue: 'ongoing', returned: 'completed', completed: 'completed', cancelled: 'cancelled',
};

function mapBooking(row: BookingRow): Rental {
  const start = row.start_datetime || row.created_at || new Date(0).toISOString();
  const end = row.end_datetime || start;
  const days = Math.max(1, Math.ceil((Date.parse(end) - Date.parse(start)) / 86_400_000));
  return {
    id: row.id,
    productName: row.product_title || 'Rental item',
    productImage: row.product_image_url || '/placeholder.svg',
    providerName: row.provider_business_name || 'Rental provider',
    startDate: start,
    endDate: end,
    status: statusMap[(row.status || '').toLowerCase()] || 'pending',
    totalAmount: Number(row.total_amount || 0),
    currency: row.currency || 'INR',
    rentalTerm: `${days} ${days === 1 ? 'Day' : 'Days'}`,
    location: row.delivery_address || row.pickup_address || '',
    orderDate: row.created_at || start,
  };
}

export class SupabaseRentalRepository implements RentalRepository {
  async getForCustomer(customerId: string): Promise<Rental[]> {
    const { data, error } = await getSupabaseClient().from('bookings').select(columns)
      .eq('renter_id', customerId).order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    return ((data || []) as BookingRow[]).map(mapBooking);
  }

  async getCustomerRental(customerId: string, rentalId: string): Promise<Rental | null> {
    const { data, error } = await getSupabaseClient().from('bookings').select(columns)
      .eq('renter_id', customerId).eq('id', rentalId).maybeSingle();
    if (error) throw error;
    return data ? mapBooking(data as BookingRow) : null;
  }
}
