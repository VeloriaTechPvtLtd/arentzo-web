'use client';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';
import { createDevDraftFlow, isVerifiedDraftDev } from '../../application/devDraftFlow.mjs';

type Choice = { id: string; name: string; category_id?: string };
type Draft = {productId:string;providerId:string;categoryId:string;subcategoryId:string;title:string;description:string};
export function PrivateDraftForm({onSaved}:{onSaved:()=>void}) {
    const {user} = useAuth();
    const url = process.env.SUPABASE_URL || '';
    if (!isVerifiedDraftDev(url) || !user?.id || user.role !== 'service_provider' || !user.providerId) return null;
    // Keyed child discards stale UI updates and sensitive local form state on account switch.
    return <OwnedDraftForm key={`${user.id}:${user.providerId}`} owner={user.id} providerId={user.providerId} url={url} onSaved={onSaved}/>;
}
function OwnedDraftForm({owner,providerId,url,onSaved}:{owner:string;providerId:string;url:string;onSaved:()=>void}) {
    const [catalogue,setCatalogue]=useState<{categories:Choice[];subcategories:Choice[]} | null>(null);
    const [attempt,setAttempt]=useState(0);
    const [loadError,setLoadError]=useState(false);
    const [draft,setDraft]=useState<Draft>({productId:'',providerId,categoryId:'',subcategoryId:'',title:'',description:''});
    const [locked,setLocked]=useState(false);
    const [saving,setSaving]=useState(false);
    const [message,setMessage]=useState('');
    const [saved,setSaved]=useState(false);
    const [restored,setRestored]=useState(false);
    const alive=useRef(true);
    const inFlight=useRef(false);
    const status=useRef<HTMLParagraphElement>(null);
    const title=useRef<HTMLInputElement>(null);
    const key=`arentzo:dev-private-draft:${owner}:${providerId}`;
    useEffect(()=>{alive.current=true;return()=>{alive.current=false;};},[]);
    useEffect(()=>{
        try {
            const raw=sessionStorage.getItem(key);
            if(raw){const value=JSON.parse(raw);if(value.providerId===providerId&&typeof value.productId==='string'&&value.productId&&['title','description','categoryId','subcategoryId'].every(k=>typeof value[k]==='string')){setDraft(value);setLocked(true);setMessage('A previous save may have completed. Retry with the same details to confirm it.');}}
            setRestored(true);
        } catch {setMessage('Browser storage is unavailable. Draft saving is disabled to avoid duplicate drafts after an interrupted save.');}
    },[key,providerId]);
    useEffect(()=>{
        let active=true;setLoadError(false);setCatalogue(null);
        void createDevDraftFlow(getSupabaseClient(),url).catalogue().then(value=>{if(active)setCatalogue(value);}).catch(()=>{if(active)setLoadError(true);});
        return()=>{active=false;};
    },[url,attempt]);
    async function submit(event:React.FormEvent) {
        event.preventDefault();if(inFlight.current||saved||!restored)return;
        if(!draft.title.trim()||!draft.description.trim()||!draft.categoryId||!draft.subcategoryId){setMessage('Enter a title, description and matching category before saving.');requestAnimationFrame(()=>status.current?.focus());return;}
        inFlight.current=true;setSaving(true);setMessage('Saving private draft…');
        try {
            const value={...draft,productId:draft.productId||crypto.randomUUID()};
            // Persist identity + exact payload BEFORE any network mutation. A retry never upserts.
            sessionStorage.setItem(key,JSON.stringify(value));setDraft(value);setLocked(true);
            await createDevDraftFlow(getSupabaseClient(),url).save(value);
            if(!alive.current)return;
            setSaved(true);setMessage(`Private draft saved. ID: ${value.productId}. It is inactive and has not been submitted or published.`);
            try {sessionStorage.removeItem(key);} catch { /* Save is confirmed; recovery remains idempotent. */ }
            try {onSaved();} catch { /* Refresh failure cannot undo a confirmed save. */ }
        } catch {if(alive.current)setMessage('Save not confirmed. Keep these details and choose Retry save. An existing matching draft will be recovered rather than duplicated.');}
        finally {inFlight.current=false;if(alive.current){setSaving(false);requestAnimationFrame(()=>status.current?.focus());}}
    }
    function startAnother(){setDraft({productId:'',providerId,categoryId:'',subcategoryId:'',title:'',description:''});setLocked(false);setSaved(false);setMessage('');requestAnimationFrame(()=>title.current?.focus());}
    const inputStyle={display:'block',width:'100%',padding:'10px',border:'1px solid var(--border, #aaa)',borderRadius:'8px',background:'var(--background, white)',color:'inherit'};
    return <details className="mb-6 rounded-xl border p-4"><summary className="cursor-pointer font-semibold">Create a private draft · Dev only</summary>
        <p className="my-3 text-sm">Save the basics only. No photos, pricing, review submission or publishing. Existing listings are not changed.</p>
        {!catalogue&&!loadError?<p role="status">Loading available categories…</p>:null}
        {loadError?<p role="alert">Could not load categories. <button type="button" onClick={()=>setAttempt(v=>v+1)}>Retry categories</button></p>:null}
        <form onSubmit={submit} aria-busy={saving}>
            <fieldset disabled={locked||saving||!catalogue||!restored} className="grid gap-3 border-0 p-0">
                <label>Title<input ref={title} style={inputStyle} required maxLength={160} value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></label>
                <label>Description<textarea style={inputStyle} required maxLength={4000} rows={3} value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})}/></label>
                <label>Category<select style={inputStyle} required value={draft.categoryId} onChange={e=>setDraft({...draft,categoryId:e.target.value,subcategoryId:''})}><option value="">Select category</option>{catalogue?.categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
                <label>Subcategory<select style={inputStyle} required value={draft.subcategoryId} onChange={e=>setDraft({...draft,subcategoryId:e.target.value})}><option value="">Select subcategory</option>{catalogue?.subcategories.filter(c=>c.category_id===draft.categoryId).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
            </fieldset>
            <p ref={status} tabIndex={-1} role="status" aria-live="polite" className="my-3">{message}</p>
            {!saved?<button className="rounded-lg border px-4 py-2" type="submit" disabled={saving||!restored||!catalogue}>{saving?'Saving…':locked?'Retry save':'Save private draft'}</button>:<button className="rounded-lg border px-4 py-2" type="button" onClick={startAnother}>Create another private draft</button>}
        </form>
    </details>;
}
