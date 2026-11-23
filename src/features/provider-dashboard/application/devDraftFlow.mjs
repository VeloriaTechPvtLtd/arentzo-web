import { createOwnedListingDraft } from './createOwnedListingDraft.mjs';
export function isVerifiedDraftDev(url) {
    try { const parsed = new URL(url); return parsed.origin === 'https://astiltnwyoxtcisedcyx.supabase.co' && parsed.pathname === '/' && !parsed.search && !parsed.hash && !parsed.username && !parsed.password; } catch { return false; }
}
export function createDevDraftFlow(client, url, timeoutMs = 20000) {
    async function bounded(operation) {
        let timer;
        try { return await Promise.race([Promise.resolve().then(operation), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Request timed out. Retry using the same draft identity.')), timeoutMs); })]); }
        finally { clearTimeout(timer); }
    }
    const guard = () => { if (!isVerifiedDraftDev(url)) throw new Error('Private draft creation is available only in verified Rental Dev.'); };
    return {
        async catalogue() {
            guard();
            async function read(table, columns) {
                const rows = [];
                for (let offset = 0; offset < 10000; offset += 100) {
                    const { data, error } = await bounded(() => client.from(table).select(columns).eq('is_active', true).order('id').range(offset, offset + 99));
                    if (error) throw error;
                    rows.push(...(data || []));
                    if ((data || []).length < 100) return rows.filter(row => typeof row.name === 'string' && row.name.trim());
                }
                throw new Error('Catalogue is too large. Please try again later.');
            }
            const [categories, subcategories] = await Promise.all([read('categories','id,name'), read('subcategories','id,name,category_id')]);
            return { categories, subcategories };
        },
        async save(input) {
            guard();
            const actor = await bounded(() => client.auth.getUser());
            if (actor.error || !actor.data?.user?.id) throw new Error('Sign in before saving.');
            const result = await bounded(() => createOwnedListingDraft(client, input, {enabled:true}));
            const current = await bounded(() => client.auth.getUser());
            if (current.error || current.data?.user?.id !== actor.data.user.id) throw new Error('Your account changed. Reload before continuing.');
            return result;
        },
    };
}
