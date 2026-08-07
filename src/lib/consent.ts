/**
 * Cookie banner and the bridge to Google Consent Mode v2.
 *
 * Two categories are enough for this site: analytics is the only thing that
 * isn't strictly necessary. The cart lives in localStorage (required for the
 * shop to work), Stripe.js is never loaded on our domain — customers are
 * redirected to Stripe Checkout — and Cloudinary sets no cookies.
 *
 * The `denied` default is set in index.html, before GTM loads. This module
 * only ever sends the `update`, on first choice and on every later page load
 * (vanilla-cookieconsent calls onConsent both times).
 *
 * `window.gtag` only exists on the live site, where the GTM snippet defines
 * it. The banner itself runs everywhere so it can be reviewed in development
 * and on preview deploys; without GTM there is simply nothing to gate.
 */
import * as CookieConsent from 'vanilla-cookieconsent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const ANALYTICS = 'analytics';

/**
 * Mirrors the current choice into Consent Mode and onto the dataLayer, so a
 * GTM trigger can react to a change without waiting for the next page load.
 */
function syncConsentMode(): void {
  const value = CookieConsent.acceptedCategory(ANALYTICS) ? 'granted' : 'denied';
  window.gtag?.('consent', 'update', { analytics_storage: value });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'cookie_consent_update', analytics_consent: value });
}

let initialised = false;

export function initCookieConsent(): void {
  if (initialised) return;
  initialised = true;

  void CookieConsent.run({
    guiOptions: {
      consentModal: { layout: 'box', position: 'bottom left', equalWeightButtons: true },
      preferencesModal: { layout: 'box', equalWeightButtons: true },
    },

    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      [ANALYTICS]: {
        // Erase the Google tag's cookies when analytics is turned back off,
        // otherwise a previously granted _ga would outlive the consent.
        autoClear: {
          cookies: [{ name: /^_ga/ }],
        },
      },
    },

    // onConsent covers both the first choice and every later page load;
    // adding onFirstConsent as well would push the event twice.
    onConsent: syncConsentMode,
    onChange: syncConsentMode,

    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: 'A quiet word about cookies',
            description:
              'We use a few cookies to understand how the shop is used, so we can make it better. Nothing is measured until you say yes, and your cart works either way.',
            acceptAllBtn: 'Accept',
            acceptNecessaryBtn: 'Decline',
            showPreferencesBtn: 'Manage',
            closeIconLabel: 'Decline and close',
            footer: '<a href="/privacy">Privacy Policy</a><a href="/cookie-policy">Cookie Policy</a>',
          },
          preferencesModal: {
            title: 'Cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save my choice',
            closeIconLabel: 'Close',
            sections: [
              {
                description:
                  'Choose which cookies Piantasia may use. You can change your mind at any time from the “Cookie settings” link in the footer.',
              },
              {
                title: 'Strictly necessary',
                description:
                  'Needed for the site to function: they remember what is in your cart and store the choice you make here. The site cannot work without them, so they cannot be switched off.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Analytics',
                description:
                  'Google Analytics, which tells us anonymously which pages and blends people look at. Off unless you turn it on.',
                linkedCategory: ANALYTICS,
                cookieTable: {
                  caption: 'Cookies set when analytics is enabled',
                  headers: {
                    name: 'Cookie',
                    domain: 'Domain',
                    duration: 'Duration',
                    description: 'Purpose',
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: 'piantasia.eu',
                      duration: '2 years',
                      description: 'Distinguishes one visitor from another.',
                    },
                    {
                      name: '_ga_TVBY8TXE8J',
                      domain: 'piantasia.eu',
                      duration: '2 years',
                      description: 'Keeps track of the current visit.',
                    },
                  ],
                },
              },
              {
                title: 'More detail',
                description:
                  'Our <a href="/cookie-policy">Cookie Policy</a> explains all of this at length, and the <a href="/privacy">Privacy Policy</a> covers everything else we do with your data.',
              },
            ],
          },
        },
      },
    },
  });
}

/** Reopens the preferences dialog. A no-op before the banner has started. */
export function openCookiePreferences(): void {
  CookieConsent.showPreferences();
}
