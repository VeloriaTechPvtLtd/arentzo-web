(() => {
  const route = document.body.dataset.legacyRoute;
  const routeConfig = {
    product: { legacyPrefix: '/product/', canonicalPath: '/product/' },
    'my-rentals': { legacyPrefix: '/my-rentals/', canonicalPath: '/my-rentals/' },
  }[route];

  const showInvalidPath = () => {
    document.title = 'Link unavailable | Arentzo';
    const main = document.querySelector('main');
    const message = document.createElement('p');
    message.setAttribute('role', 'alert');
    message.textContent = 'This link is invalid or unavailable.';
    main.replaceChildren(message);
  };

  if (!routeConfig) return showInvalidPath();

  const current = new URL(window.location.href);
  if (!current.pathname.startsWith(routeConfig.legacyPrefix)) return showInvalidPath();

  const encodedId = current.pathname.slice(routeConfig.legacyPrefix.length);
  let id;
  try {
    id = decodeURIComponent(encodedId);
  } catch {
    return showInvalidPath();
  }

  if (!/^[A-Za-z0-9_-]{1,128}$/.test(id)) return showInvalidPath();

  const destination = new URL(routeConfig.canonicalPath, window.location.origin);
  destination.search = current.search;
  destination.searchParams.delete('id');
  destination.searchParams.delete('next');
  destination.searchParams.set('id', id);
  destination.hash = current.hash;
  window.location.replace(destination.href);
})();
