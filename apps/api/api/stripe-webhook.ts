import Stripe from 'stripe';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { OrderConfirmationEmail } from '../emails/order-confirmation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export async function POST(request: Request): Promise<Response> {

  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error('Missing Stripe signature or STRIPE_WEBHOOK_SECRET');
    return new Response('Webhook configuration error', { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Stripe webhook signature verification failed:', message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const customerEmail = session.customer_email ?? session.customer_details?.email;
  if (!customerEmail) {
    console.error('No customer email in checkout.session.completed');
    return new Response('No customer email', { status: 400 });
  }

  const lineItems = session.line_items?.data ?? [];
  const productNames = lineItems
    .map((li) => (li.description || li.price?.nickname || 'Item'))
    .filter(Boolean);
  const amountTotal = session.amount_total != null ? session.amount_total / 100 : 0;
  const currency = (session.currency ?? 'eur').toUpperCase();

  const html = await render(
    OrderConfirmationEmail({
      customerEmail,
      productNames: productNames.length > 0 ? productNames : ['Your order'],
      amountTotal,
      currency,
    })
  );

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: customerEmail,
      subject: 'Order confirmed — Piantasia',
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    console.error('Failed to send confirmation email:', err);
    return new Response('Failed to send email', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
