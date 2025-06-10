import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbRoute {
  path: string;
  label: string;
  isLast?: boolean;
}

const routes: Record<string, BreadcrumbRoute[]> = {
  "/trail-park-komarka": [
    { path: "/", label: "Domů" },
    { path: "/komari-vizka", label: "Komáří vížka" },
    { path: "/trail-park-komarka", label: "Trailpark Komárka", isLast: true }
  ],
  "/sporty": [
    { path: "/", label: "Domů" },
    { path: "/sporty", label: "Sportovní aktivity", isLast: true }
  ],
  "/komari-vizka": [
    { path: "/", label: "Domů" },
    { path: "/komari-vizka", label: "Komáří vížka", isLast: true }
  ],
  "/dobrovolnici": [
    { path: "/", label: "Domů" },
    { path: "/dobrovolnici", label: "Dobrovolníci & Sponzoři", isLast: true }
  ],
  "/trailpark": [
    { path: "/trailpark", label: "TPK", isLast: true }
  ],
};

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const pathRoutes = routes[location.pathname] || [];

  if (pathRoutes.length === 0) return null;

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center gap-1 text-tjk-blue hover:text-tjk-orange transition-colors">
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only md:not-sr-only">Domů</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {pathRoutes.map((route, index) => (
          <React.Fragment key={route.path}>
            {route.isLast ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{route.label}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={route.path} className="text-tjk-blue hover:text-tjk-orange transition-colors">{route.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {!route.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
