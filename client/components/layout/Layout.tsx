import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  MapPin,
  Compass,
  CalendarClock,
  UserCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function Header() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[#7b61ff] to-[#ff9ad6]" />
          <span className="font-extrabold text-xl tracking-tight">Guidely</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavItem to="/quiz" label="Quiz" />
          <NavItem to="/career-map" label="Career Maps" />
          <NavItem to="/colleges" label="Colleges" />
          <NavItem to="/timeline" label="Timeline" />
          <NavItem to="/resources" label="Resources" />
          <NavItem to="/profile" label="Profile" />
        </nav>
        <div className="flex items-center gap-2">
          {pathname !== "/quiz" && (
            <Button
              asChild
              className="hidden sm:inline-flex rounded-full px-5 font-semibold"
            >
              <Link to="/quiz">Take Quiz</Link>
            </Button>
          )}
          <Button asChild variant="outline" className="rounded-full px-4">
            <Link to="/onboarding">Get Started</Link>
          </Button>
        </div>
      </div>
      {/* Mobile nav */}
      <div className="md:hidden border-t bg-white/90">
        <div className="container grid grid-cols-5 py-2 text-xs">
          <MobileNavItem to="/" icon={<Compass />} label="Home" />
          <MobileNavItem to="/quiz" icon={<GraduationCap />} label="Quiz" />
          <MobileNavItem to="/colleges" icon={<MapPin />} label="Colleges" />
          <MobileNavItem
            to="/timeline"
            icon={<CalendarClock />}
            label="Timeline"
          />
          <MobileNavItem to="/profile" icon={<UserCircle2 />} label="Me" />
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "text-muted-foreground hover:text-foreground",
          isActive && "text-foreground font-semibold",
        )
      }
    >
      {label}
    </NavLink>
  );
}

function MobileNavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-1 text-muted-foreground",
          isActive && "text-foreground font-semibold",
        )
      }
    >
      <div className="[&_svg]:h-5 [&_svg]:w-5">{icon}</div>
      <span>{label}</span>
    </NavLink>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white/60">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Guidely — Helping students choose with
        confidence.
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
