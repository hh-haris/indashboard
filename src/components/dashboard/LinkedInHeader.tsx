import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function LinkedInHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">in</span>
            </div>
            <div>
              <h1 className="text-2xl font-source-sans font-bold text-foreground">
                LinkedIn Growth Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional Analytics & Performance Insights
              </p>
            </div>
          </div>
        </div>

        {/* Right side - User Profile */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-base font-semibold text-foreground">John Smith</p>
            <p className="text-sm text-muted-foreground">Growth Specialist</p>
          </div>
          <Avatar className="h-12 w-12 border-2 border-border">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" 
              alt="John Smith" 
            />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">JS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}