'use client';

import { useState } from 'react';
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
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type LinkItem = {
    id: string;
    title: string;
    url: string;
    isActive: boolean;
};

// Sortable Item Component
function SortableLink({ id, link, onRemove, onUpdate }: { id: string, link: LinkItem, onRemove: (id: string) => void, onUpdate: (id: string, data: Partial<LinkItem>) => void }) {
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
    <div ref={setNodeRef} style={style} className={`bg-card border border-border rounded-xl p-4 mb-3 flex gap-4 ${isDragging ? 'opacity-70 shadow-lg ring-2 ring-primary relative z-10' : ''}`}>
      <div {...attributes} {...listeners} className="cursor-grab hover:text-primary pt-2">
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 space-y-3">
          <input 
            type="text" 
            value={link.title} 
            onChange={(e) => onUpdate(link.id, { title: e.target.value })}
            placeholder="Link Title" 
            className="w-full text-sm font-semibold bg-transparent border-0 border-b border-transparent hover:border-border focus:border-primary focus:ring-0 px-0 py-1 transition-colors"
          />
          <input 
            type="url" 
            value={link.url} 
            onChange={(e) => onUpdate(link.id, { url: e.target.value })}
            placeholder="URL (e.g. https://instagram.com/user)" 
            className="w-full text-sm text-muted-foreground bg-transparent border-0 border-b border-transparent hover:border-border focus:border-primary focus:ring-0 px-0 py-1 transition-colors"
          />
      </div>
      <div className="flex flex-col items-center justify-between">
         <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={link.isActive} onChange={(e) => onUpdate(link.id, { isActive: e.target.checked })} className="sr-only peer" />
            <div className="w-9 h-5 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
        </label>
        <button onClick={() => onRemove(link.id)} className="text-muted-foreground hover:text-red-500 transition-colors p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function LinkEditor({ 
  initialLinks, 
  onChange 
}: { 
  initialLinks: LinkItem[], 
  onChange: (links: LinkItem[]) => void 
}) {
  const [items, setItems] = useState(initialLinks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        onChange(newArray);
        return newArray;
      });
    }
  };

  const addLink = () => {
      const newLink = { id: Date.now().toString(), title: '', url: '', isActive: true };
      const newItems = [newLink, ...items];
      setItems(newItems);
      onChange(newItems);
  }

  const removeLink = (id: string) => {
      const newItems = items.filter(i => i.id !== id);
      setItems(newItems);
      onChange(newItems);
  }

  const updateLink = (id: string, data: Partial<LinkItem>) => {
      const newItems = items.map(i => i.id === id ? { ...i, ...data } : i);
      setItems(newItems);
      onChange(newItems);
  }

  return (
    <div className="space-y-6">
      <Button onClick={addLink} className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold shadow-sm">
          <Plus className="w-5 h-5 mr-2" /> Add New Link
      </Button>

      {items.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-10 text-center shadow-sm">
            <h3 className="text-lg font-medium text-card-foreground mb-2">You don&apos;t have any links yet</h3>
            <p className="text-muted-foreground text-sm text-balance max-w-sm mx-auto">
                Add your first social media link or website to start building your Wify smart profile.
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
              {items.map(link => (
                <SortableLink key={link.id} id={link.id} link={link} onRemove={removeLink} onUpdate={updateLink} />
              ))}
            </SortableContext>
          </DndContext>
      )}
    </div>
  );
}
