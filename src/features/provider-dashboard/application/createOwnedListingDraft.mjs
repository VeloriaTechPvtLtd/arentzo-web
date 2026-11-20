const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const columns = 'id,provider_id,title,description,category_id,subcategory_id,status,verification_status,visibility,is_active';
/** Local candidate, NOT wired to UI. Retain productId across uncertain outcomes. Never upsert. */
export async function createOwnedListingDraft(client, input, { enabled = false } = {}) {
    if (!enabled) throw new Error('Draft creation is awaiting Dev acceptance.');
    const { productId, providerId, categoryId, subcategoryId, title, description } = input;
    if (![productId, providerId, categoryId, subcategoryId].every(v => typeof v === 'string' && uuid.test(v))) throw new Error('Valid draft and catalogue identities are required.');
    if (![title, description].every(v => typeof v === 'string' && v.trim())) throw new Error('Title and description are required.');
    if (Object.keys(input).some(k => !['productId','providerId','categoryId','subcategoryId','title','description'].includes(k))) throw new Error('Unsupported draft field.');
    const { data: auth, error: authError } = await client.auth.getUser();
    if (authError) throw authError;
    if (!auth?.user?.id) throw new Error('Sign in before saving a draft.');
    const { data: provider, error: providerError } = await client.from('service_providers').select('id').eq('id', providerId).eq('user_id', auth.user.id).maybeSingle();
    if (providerError) throw providerError;
    if (!provider) throw new Error('Owned provider profile is required.');
    const { data: subcategory, error: subError } = await client.from('subcategories').select('id,category_id').eq('id', subcategoryId).eq('category_id', categoryId).eq('is_active', true).maybeSingle();
    if (subError) throw subError;
    const { data: category, error: catError } = await client.from('categories').select('id').eq('id', categoryId).eq('is_active', true).maybeSingle();
    if (catError) throw catError;
    if (!subcategory || !category) throw new Error('Select an available category and matching subcategory.');
    const payload = { id: productId, provider_id: providerId, category_id: categoryId, subcategory_id: subcategoryId, title: title.trim(), description: description.trim(), status: 'draft', verification_status: 'draft', visibility: 'private', is_active: false };
    function confirm(row) {
        if (!row || Object.entries(payload).some(([k,v]) => row[k] !== v)) throw new Error('Draft save is not confirmed. Reload before retrying.');
        return row;
    }
    const { data: existing, error: readError } = await client.from('products').select(columns).eq('id', productId).eq('provider_id', providerId).is('deleted_at', null).maybeSingle();
    if (readError) throw readError;
    if (existing) return confirm(existing);
    const current = await client.auth.getUser();
    if (current.error || current.data?.user?.id !== auth.user.id) throw new Error('Your account changed. Reload before saving.');
    const { data, error } = await client.from('products').insert(payload).select(columns).single();
    // Any uncertain write must retain the same productId; next attempt reads it first.
    if (error) throw error;
    return confirm(data);
}
