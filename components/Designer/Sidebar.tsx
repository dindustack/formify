
export function DesignerSidebar() {
  return (
    <aside
      className="
        w-[400px] 
        max-w-[400px] 
        flex 
        flex-col 
        flex-grow 
        gap-2
        border-l-2
        p-4
        bg-background
        overflow-y-auto
        h-full
        "
    >
      <div className="p-4 w-full">
        <div className="bg-background ma"></div>
      </div>
    </aside>
  );
}
