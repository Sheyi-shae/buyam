
interface HomeTitleHeaderProps {
    title?: string;
    desc?: string;
    
}

export default function HomeTitleHeader({ title, desc }: HomeTitleHeaderProps) {
  return (
   
                    <div className="relative mb-8 flex w-full items-center">
  {/* Left Title Block */}
  <div className="relative z-10 flex items-center gap-3 bg-white pr-5">
    
    {/* Accent */}
    <div className="h-10 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-amber-400" />

    <div>
      
          {title && (<p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
            {title}
          </p>)}
      <h2 className="cat-heading text-xs md:text-base  font-light text-slate-700">
        {desc}
      </h2>
    </div>
  </div>

  {/* Animated Line */}
  <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-slate-400">
    <div className="absolute inset-y-0 left-0 w-40 animate-pulse rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-transparent" />
  </div>
</div>

              
              
  )
}
