import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { products } from '@/data/products';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceKey) return NextResponse.json({ error: 'Order service is not configured.' }, { status: 503 });

  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return NextResponse.json({ error: 'Sign in before placing an order.' }, { status: 401 });
  const authClient = createClient(url, anonKey);
  const { data: authData, error: authError } = await authClient.auth.getUser(token);
  if (authError || !authData.user) return NextResponse.json({ error: 'Your session has expired. Sign in again.' }, { status: 401 });

  const body = await request.json().catch(() => null) as { items?: { productId: string; quantity: number }[]; shippingAddress?: Record<string, string> } | null;
  if (!body || !Array.isArray(body.items) || body.items.length === 0 || body.items.length > 30 || !body.shippingAddress) {
    return NextResponse.json({ error: 'Invalid order details.' }, { status: 400 });
  }
  const lines = [] as { product_name: string; unit_price_paise: number; quantity: number }[];
  for (const item of body.items) {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product || !product.inStock || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) {
      return NextResponse.json({ error: 'One or more products are unavailable or have an invalid quantity.' }, { status: 400 });
    }
    lines.push({ product_name: product.name, unit_price_paise: product.price * 100, quantity: item.quantity });
  }
  const subtotal = lines.reduce((sum, line) => sum + line.unit_price_paise * line.quantity, 0);
  const shipping = subtotal > 49900 ? 0 : 4900;
  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: order, error: orderError } = await admin.from('orders').insert({
    user_id: authData.user.id, status: 'pending', subtotal_paise: subtotal,
    shipping_paise: shipping, tax_paise: 0, total_paise: subtotal + shipping,
    shipping_address: body.shippingAddress,
  }).select('id').single();
  if (orderError || !order) return NextResponse.json({ error: 'Could not create your order. Please try again.' }, { status: 500 });
  const { error: itemsError } = await admin.from('order_items').insert(lines.map((line) => ({ ...line, order_id: order.id })));
  if (itemsError) {
    await admin.from('orders').delete().eq('id', order.id);
    return NextResponse.json({ error: 'Could not save order items. Please try again.' }, { status: 500 });
  }
  return NextResponse.json({ orderId: order.id, totalPaise: subtotal + shipping }, { status: 201 });
}
