How to clear Service Worker & Cache if the bottom tab or latest UI doesn't show

If you (or users) see an old version of the site or parts missing (e.g. the bottom navigation), your browser might be serving cached assets via Service Worker or cache storage. Follow these steps to refresh:

Option A — Quick (in the browser)
1. Open DevTools (F12).
2. Application (or Storage) tab -> Service Workers -> click 'Unregister' for any service workers for this site.
3. In the same Application/Storage panel, Clear site data (or delete caches). Then reload the page (Ctrl+Shift+R / Cmd+Shift+R).

Option B — Run commands in the Console (single-line)
Open DevTools Console and paste:

(async ()=>{
  if('serviceWorker' in navigator){
    const regs = await navigator.serviceWorker.getRegistrations();
    regs.forEach(r=>r.unregister());
  }
  if('caches' in window){
    await caches.delete('tokyo-itinerary-v1');
  }
  console.log('Service workers unregistered and cache deleted. Please hard-reload.');
})();

Then hard-reload the page (Ctrl+Shift+R / Cmd+Shift+R).

Option C — On mobile (PWA) if app was installed
1. If the site was installed as a PWA on mobile, uninstall/remove the installed app and re-open the site in the browser.
2. Clear the site data via browser settings (Site settings -> Storage -> Clear site data) and reload.

Notes
- We added a defensive script to index.html that will recreate the bottom-nav if it is missing and also attempt to unregister old service workers and delete the app cache. If you still see issues after following the steps above, try opening the site in an incognito/private window to confirm whether it's a client-side cache problem.
- If you'd like, I can generate a short video (screen capture) of the exact steps for your testing device.
