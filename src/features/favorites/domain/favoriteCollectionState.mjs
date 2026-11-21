export function beginFavoritesLoad(current, userId) {
  return {
    userId,
    items: current.userId === userId ? current.items : [],
    loading: true,
    loadError: false,
    mutationError: false,
  };
}

export function completeFavoritesLoad(userId, items) {
  return { userId, items, loading: false, loadError: false, mutationError: false };
}

export function failFavoritesLoad(current, userId) {
  return { ...current, userId, loading: false, loadError: true };
}

export function completeFavoriteRemoval(current, userId, productId) {
  if (current.userId !== userId) return current;
  return { ...current, items: current.items.filter((item) => item.id !== productId) };
}

export function failFavoriteMutation(current, userId) {
  if (current.userId !== userId) return current;
  return { ...current, mutationError: true };
}
