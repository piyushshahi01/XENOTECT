import { Check } from "lucide-react";

export function RadioItem({ 
  label, 
  checked, 
  onChange 
}: { 
  label: string; 
  checked: boolean; 
  onChange: () => void 
}) {
  return (
    <button 
      onClick={onChange}
      className="flex items-center gap-3 text-sm text-left group w-full p-2 hover:bg-white/[0.02] rounded-lg transition-colors"
    >
      <div className={`flex shrink-0 items-center justify-center w-5 h-5 rounded-full border-2 transition-colors ${
        checked ? "border-[#FF5656]" : "border-muted-foreground"
      }`}>
        {checked && <div className="w-2 h-2 rounded-full bg-[#FF5656]" />}
      </div>
      <span className={checked ? "text-white font-medium" : "text-muted-foreground"}>
        {label}
      </span>
    </button>
  );
}

export function CheckboxItem({ 
  label, 
  checked, 
  onChange 
}: { 
  label: string; 
  checked: boolean; 
  onChange: () => void 
}) {
  return (
    <button 
      onClick={onChange}
      className="flex items-center gap-3 text-sm text-left group w-full p-2 hover:bg-white/[0.02] rounded-lg transition-colors"
    >
      <div className={`flex shrink-0 items-center justify-center w-5 h-5 border-2 rounded transition-colors ${
        checked ? "border-[#FF5656] bg-[#FF5656]" : "border-muted-foreground bg-transparent"
      }`}>
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
      <span className={checked ? "text-white font-medium" : "text-muted-foreground"}>
        {label}
      </span>
    </button>
  );
}
