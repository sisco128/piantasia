import { useEffect } from 'react';
import { trackPageView } from './analytics';

/**
 * Sets the page title, then reports the page view.
 *
 * The order matters. GA4's automatic SPA tracking fires on the browser history
 * event, which happens before React re-renders, so it would always report the
 * *previous* page's title. Automatic page views are therefore switched off in
 * GA4 and sent from here instead, once the new title is in place.
 *
 * Pass null while a page is still resolving its data (an article being looked
 * up, say) to hold the event back until the real title is known.
 */
export function useDocumentTitle(title: string | null): void {
  useEffect(() => {
    if (!title) return;
    document.title = title;
    trackPageView(title);
  }, [title]);
}
