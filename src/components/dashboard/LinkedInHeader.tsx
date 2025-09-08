import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function LinkedInHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-3 sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/LinkedIn.svg" 
              alt="LinkedIn" 
              className="h-8 w-8 text-primary" 
            />
            <div>
              <h1 className="text-xl font-source-sans font-semibold text-foreground">
                LinkedIn Growth Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional Analytics & Insights
              </p>
            </div>
          </div>
        </div>

        {/* Right side - User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">John Smith</p>
            <p className="text-xs text-muted-foreground">Growth Specialist</p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              alt="John Smith" 
            />
            <AvatarFallback className="bg-primary text-primary-foreground">JS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}