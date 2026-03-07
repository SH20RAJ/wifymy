'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2, Loader2, CheckCircle2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { addLink, updateLink, deleteLink, reorderLinks } from '@/app/actions/links';

type LinkItem = {
    id: string;
    title: string;
    url: string;
    isActive: boolean;
};

// Sortable Item Component
function SortableLink({ id, link, onRemove, onUpdate }: { id: string, link: LinkItem, onRemove: (id: string) => void | Promise<void>, onUpdate: (id: string, data: Partial<LinkItem>) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`bg-white/5 border border-white/10 rounded-2xl p-4 mb-3 flex gap-4 transition-all duration-300 ${isDragging ? 'opacity-70 shadow-2xl ring-2 ring-primary relative z-10 scale-[1.02]' : 'hover:bg-white/10'}`}>
      <div {...attributes} {...listeners} className="cursor-grab hover:text-white pt-2 opacity-40 hover:opacity-100 transition-opacity">
        <GripVertical className="w-5 h-5" />
      </div>
      <div className="flex-1 space-y-3">
          <input 
            type="text" 
            value={link.title} 
            onChange={(e) => onUpdate(link.id, { title: e.target.value })}
            placeholder="Link Title" 
            className="w-full text-base font-bold bg-transparent border-0 border-b border-white/5 hover:border-white/20 focus:border-primary focus:ring-0 px-0 py-1 transition-all placeholder:text-neutral-600"
          />
          <input 
            type="url" 
            value={link.url} 
            onChange={(e) => onUpdate(link.id, { url: e.target.value })}
            placeholder="URL (e.g. https://instagram.com/user)" 
            className="w-full text-sm text-neutral-400 bg-transparent border-0 border-b border-white/5 hover:border-white/20 focus:border-primary focus:ring-0 px-0 py-1 transition-all placeholder:text-neutral-700"
          />
      </div>
      <div className="flex flex-col items-center justify-between gap-4">
         <label className="relative inline-flex items-center cursor-pointer group">
            <input type="checkbox" checked={link.isActive} onChange={(e) => onUpdate(link.id, { isActive: e.target.checked })} className="sr-only peer" />
            <div className="w-10 h-5 bg-neutral-800 border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-neutral-400 after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-primary peer-checked:after:bg-white"></div>
        </label>
        <button onClick={() => onRemove(link.id)} className="text-neutral-500 hover:text-red-500 transition-all p-2 rounded-xl hover:bg-red-500/10 active:scale-95">
            <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function LinkEditor({ 
  pageId,
  initialLinks, 
  onChange 
}: { 
  pageId: string,
  initialLinks: LinkItem[], 
  onChange: (links: LinkItem[]) => void 
}) {
  const [items, setItems] = useState(initialLinks);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const pendingUpdates = useRef<Map<string, Partial<LinkItem>>>(new Map());
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Clear debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const flushUpdates = useCallback(async () => {
    if (pendingUpdates.current.size === 0) return;
    
    setSaveStatus('saving');
    const updates = Array.from(pendingUpdates.current.entries());
    pendingUpdates.current.clear();

    try {
      await Promise.all(updates.map(([id, data]) => updateLink(id, data)));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error("Failed to autosave links:", error);
      setSaveStatus('idle');
    }
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newArray = arrayMove(items, oldIndex, newIndex);
      
      setItems(newArray);
      onChange(newArray);
      
      setSaveStatus('saving');
      await reorderLinks(pageId, newArray.map(l => l.id));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleAddLink = async () => {
      const newTitle = "New Link";
      const newUrl = "https://";
      
      setIsSaving(true);
      setSaveStatus('saving');
      try {
        const result = await addLink(pageId, newTitle, newUrl);
        if (result.success && result.link) {
          const newLink: LinkItem = {
            id: result.link.id,
            title: result.link.title,
            url: result.link.url,
            isActive: result.link.isActive
          };
          const newItems = [...items, newLink];
          setItems(newItems);
          onChange(newItems);
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 3000);
        }
      } catch (error) {
        console.error("Failed to add link:", error);
        setSaveStatus('idle');
      } finally {
        setIsSaving(false);
      }
  }

  const handleRemoveLink = async (id: string) => {
      const newItems = items.filter(i => i.id !== id);
      setItems(newItems);
      onChange(newItems);
      
      setSaveStatus('saving');
      await deleteLink(id);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
  }

  const handleUpdateLink = useCallback((id: string, data: Partial<LinkItem>) => {
      // Optimistic Update
      setItems(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
      onChange(items.map(i => i.id === id ? { ...i, ...data } : i));
      
      // Queue update
      const existing = pendingUpdates.current.get(id) || {};
      pendingUpdates.current.set(id, { ...existing, ...data });

      // Debounce autosave
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(flushUpdates, 1500);
      setSaveStatus('saving');
  }, [items, onChange, flushUpdates]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button 
            onClick={() => { handleAddLink().catch(console.error); }} 
            disabled={isSaving} 
            className="flex-1 h-12 rounded-2xl bg-white text-black hover:bg-neutral-200 text-base font-bold shadow-xl transition-all active:scale-[0.98]"
        >
            {isSaving ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Adding...</>
            ) : (
                <><Plus className="w-5 h-5 mr-2" /> Add New Link</>
            )}
        </Button>

        <Button 
            onClick={() => { flushUpdates().catch(console.error); }} 
            variant="outline"
            className="h-12 w-12 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 p-0 transition-all active:scale-95 group relative"
            title="Save changes"
        >
            {saveStatus === 'saving' ? (
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
            ) : saveStatus === 'saved' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-in zoom-in duration-300" />
            ) : (
                <Save className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            )}
        </Button>
      </div>

      <div className="flex items-center justify-between px-2">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Autosave Enabled
          </div>
          {saveStatus !== 'idle' && (
              <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest transition-all duration-500",
                  saveStatus === 'saving' ? "text-primary animate-pulse" : "text-emerald-500"
              )}>
                  {saveStatus === 'saving' ? 'Syncing...' : 'All changes saved'}
              </span>
          )}
      </div>

      {items.length === 0 ? (
          <div className="bg-white/5 rounded-[2.5rem] border border-white/10 p-12 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="text-xl font-bold text-white mb-2">No links found</h3>
            <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                Add your social media, website, or portfolio to start building your profile.
            </p>
        </div>
      ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1">
                {items.map(link => (
                    <SortableLink key={link.id} id={link.id} link={link} onRemove={handleRemoveLink} onUpdate={handleUpdateLink} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
      )}
    </div>
  );
}
