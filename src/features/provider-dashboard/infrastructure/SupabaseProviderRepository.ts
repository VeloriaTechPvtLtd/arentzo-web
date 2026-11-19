import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';
import type { ProviderRepository } from '../application/ports/ProviderRepository';
import type { Order } from './api/ordersMockData';
import type { Product } from './api/productsMockData';
import type { Offer } from './api/offersMockData';

type ProductRow = { id: string; title: string | null; name: string | null; category_id: string | null; daily_rate: number | null; currency: string | null; quantity_available: number | null; status: string | null; is_active: boolean | null; condition: string | null; average_rating: number | null; view_count: number | null; images: string[] | null; image_url: string | null; thumbnail_url: string | null; };
type BookingRow = { id: string; booking_number: string | null; renter_name: string | null; product_title: string | null; quantity: number | null; total_amount: number | null; currency: string | null; status: string | null; payment_status: string | null; delivery_method: string | null; deposit_status: string | null; start_datetime: string | null; end_datetime: string | null; product_image_url: string | null; };
type OfferRow = { id: string; title: string | null; offer_name: string | null; code: string | null; offer_code: string | null; offer_type: string | null; discount_value: number | null; discount_percentage: number | null; status: string | null; is_active: boolean | null; start_date: string | null; valid_from: string | null; end_date: string | null; valid_until: string | null; applicable_products: unknown; product_ids: unknown; current_usage_count: number | null; usage_limit_total: number | null; total_usage_limit: number | null; terms_conditions: string | null; terms_and_conditions: string | null; };

const productColumns = 'id,title,name,category_id,daily_rate,currency,quantity_available,status,is_active,condition,average_rating,view_count,images,image_url,thumbnail_url';
const bookingColumns = 'id,booking_number,renter_name,product_title,quantity,total_amount,currency,status,payment_status,delivery_method,deposit_status,start_datetime,end_datetime,product_image_url';
const offerColumns = 'id,title,offer_name,code,offer_code,offer_type,discount_value,discount_percentage,status,is_active,start_date,valid_from,end_date,valid_until,applicable_products,product_ids,current_usage_count,usage_limit_total,total_usage_limit,terms_conditions,terms_and_conditions';
const statusValues = new Set(['requested', 'approved', 'booked', 'active', 'overdue', 'returned', 'completed', 'cancelled']);

function mapProduct(row: ProductRow): Product {
  const quantity = row.quantity_available ?? 0;
  const status = (row.status || '').toLowerCase();
  const image = row.images?.[0] || row.image_url || row.thumbnail_url || '/placeholder.svg';
  const condition = (row.condition || 'good').toLowerCase();
  return { id: row.id, name: row.title || row.name || 'Listing', category: row.category_id || 'Uncategorized', price: Number(row.daily_rate || 0), currency: row.currency || 'INR', stock: quantity, status: status === 'archived' ? 'archived' : status === 'draft' || row.is_active === false ? 'draft' : quantity > 0 ? 'active' : 'out_of_stock', condition: ['new', 'like_new', 'good', 'fair'].includes(condition) ? condition as Product['condition'] : 'good', rating: Number(row.average_rating || 0), views: Number(row.view_count || 0), revenue: 0, image };
}

function mapOrder(row: BookingRow): Order {
  const rawStatus = (row.status || 'requested').toLowerCase();
  const payment = (row.payment_status || 'pending').toLowerCase();
  const deposit = (row.deposit_status || 'n/a').toLowerCase();
  const method = (row.delivery_method || 'pickup').toLowerCase();
  return {
    id: row.booking_number || row.id, customerName: row.renter_name || 'Customer', customerEmail: '',
    productName: row.product_title || 'Rental item', quantity: Number(row.quantity || 1), totalAmount: Number(row.total_amount || 0), currency: row.currency || 'INR',
    rentalStatus: statusValues.has(rawStatus) ? rawStatus as Order['rentalStatus'] : 'requested',
    paymentStatus: payment === 'paid' ? 'paid' : payment === 'refunded' ? 'refunded' : 'pending',
    deliveryMethod: method === 'delivery' ? 'delivery' : 'pickup',
    depositStatus: ['held', 'refunded', 'deducted'].includes(deposit) ? deposit as Order['depositStatus'] : 'n/a',
    startDate: row.start_datetime || '', returnDate: row.end_datetime || '', image: row.product_image_url || '/placeholder.svg',
  };
}

function stringIds(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function mapOffer(row: OfferRow): Offer {
  const startDate = row.start_date || row.valid_from || '';
  const endDate = row.end_date || row.valid_until || '';
  const raw = (row.status || '').toLowerCase();
  const status: Offer['status'] = raw === 'paused' || raw === 'draft' ? raw : !row.is_active ? 'draft' : endDate && Date.parse(endDate) < Date.now() ? 'expired' : startDate && Date.parse(startDate) > Date.now() ? 'scheduled' : 'active';
  const percentage = row.discount_percentage ?? (row.offer_type === 'percentage' ? row.discount_value : null);
  return {
    id: row.id, title: row.offer_name || row.title || 'Offer', code: row.offer_code || row.code || '',
    discountType: percentage !== null ? 'percentage' : 'fixed', discountValue: Number(percentage ?? row.discount_value ?? 0),
    status, usageCount: Number(row.current_usage_count || 0), startDate, endDate,
    applicableProductIds: stringIds(row.product_ids ?? row.applicable_products),
    termsAndConditions: row.terms_and_conditions || row.terms_conditions || undefined,
  };
}

export class SupabaseProviderRepository implements ProviderRepository {
  async getProducts(providerId: string): Promise<Product[]> {
    const rows: ProductRow[] = [];
    for (let offset = 0; ; offset += 20) {
      const { data, error } = await getSupabaseClient().from('products').select(productColumns)
        .eq('provider_id', providerId).is('deleted_at', null).order('created_at', { ascending: false }).range(offset, offset + 19);
      if (error) throw error;
      const page = (data || []) as ProductRow[];
      rows.push(...page);
      if (page.length < 20) break;
    }
    return rows.map(mapProduct);
  }
  async getOrders(providerId: string): Promise<Order[]> {
    const rows: BookingRow[] = [];
    for (let offset = 0; ; offset += 20) {
      const { data, error } = await getSupabaseClient().from('bookings').select(bookingColumns)
        .eq('provider_id', providerId).order('created_at', { ascending: false }).range(offset, offset + 19);
      if (error) throw error;
      const page = (data || []) as BookingRow[];
      rows.push(...page);
      if (page.length < 20) break;
    }
    return rows.map(mapOrder);
  }
  async getOffers(providerId: string): Promise<Offer[]> {
    const rows: OfferRow[] = [];
    for (let offset = 0; ; offset += 20) {
      const { data, error } = await getSupabaseClient().from('offers').select(offerColumns)
        .eq('provider_id', providerId).order('created_at', { ascending: false }).range(offset, offset + 19);
      if (error) throw error;
      const page = (data || []) as OfferRow[];
      rows.push(...page);
      if (page.length < 20) break;
    }
    return rows.map(mapOffer);
  }
}
