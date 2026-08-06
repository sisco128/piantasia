/**
 * Client for piantapi. Requests go to the same origin (/api/*) and are
 * proxied to the backend by vercel.json in production and the Vite dev
 * proxy locally, so no CORS is involved.
 */

export class CheckoutError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'CheckoutError';
    this.code = code;
  }
}

interface CheckoutResponse {
  url: string;
  orderId: string;
}

export async function createCheckoutSession(
  items: Array<{ productId: string; quantity: number }>,
  country: string
): Promise<CheckoutResponse> {
  let response: Response;
  try {
    response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, country }),
    });
  } catch {
    throw new CheckoutError('network', 'Could not reach the checkout service');
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // Non-JSON response (e.g. proxy failure page) — handled below.
  }

  if (!response.ok) {
    const error = (body as { error?: { code?: string; message?: string } } | null)?.error;
    throw new CheckoutError(
      error?.code ?? 'unknown',
      error?.message ?? 'Unable to start checkout'
    );
  }

  const data = body as Partial<CheckoutResponse> | null;
  if (!data?.url || !data.orderId) {
    throw new CheckoutError('invalid_response', 'Unable to start checkout');
  }
  return { url: data.url, orderId: data.orderId };
}
