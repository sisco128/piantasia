import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

const brandGreen = '#2B5142';
const background = '#F5F2ED';
const muted = '#2B5142';

export interface OrderConfirmationEmailProps {
  customerEmail: string;
  productNames: string[];
  amountTotal: number;
  currency: string;
}

export function OrderConfirmationEmail({
  productNames,
  amountTotal,
  currency,
}: OrderConfirmationEmailProps) {
  const formattedAmount = new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: currency.toLowerCase() === 'eur' ? 'EUR' : currency,
  }).format(amountTotal);

  return (
    <Html>
      <Head />
      <Preview>Your Piantasia order is confirmed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>Piantasia</Heading>
          </Section>
          <Section style={content}>
            <Text style={title}>Order confirmed</Text>
            <Text style={paragraph}>
              Thank you for your order. We&apos;ve received your payment and will prepare your
              blend with care.
            </Text>
            <Hr style={hr} />
            <Text style={label}>Items</Text>
            {productNames.map((name, i) => (
              <Text key={i} style={item}>
                {name}
              </Text>
            ))}
            <Text style={total}>
              Total — {formattedAmount}
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              Hand-crafted from selected dried plants. Made in Berlin.
            </Text>
            <Text style={footerMuted}>
              Questions? Reply to this email or reach out on Instagram @Piantasia.eu
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: background,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '24px',
  maxWidth: '560px',
};

const header = {
  marginBottom: '24px',
};

const heading = {
  color: brandGreen,
  fontSize: '24px',
  fontWeight: 600,
  margin: 0,
};

const content = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '32px',
};

const title = {
  color: brandGreen,
  fontSize: '20px',
  fontWeight: 600,
  margin: '0 0 16px',
};

const paragraph = {
  color: muted,
  fontSize: '16px',
  lineHeight: 1.6,
  margin: '0 0 20px',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '20px 0',
};

const label = {
  color: muted,
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 8px',
};

const item = {
  color: muted,
  fontSize: '15px',
  margin: '4px 0',
};

const total = {
  color: brandGreen,
  fontSize: '16px',
  fontWeight: 600,
  margin: '12px 0 0',
};

const footer = {
  color: muted,
  fontSize: '14px',
  lineHeight: 1.5,
  margin: '24px 0 0',
};

const footerMuted = {
  color: '#888',
  fontSize: '13px',
  margin: '8px 0 0',
};
