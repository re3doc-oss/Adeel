export type PageRoute = 'home' | 'services' | 'portfolio' | 'about' | 'contact' | 'quote' | 'admin';

export interface RouteState {
  page: PageRoute;
  params?: {
    serviceId?: string;
    projectId?: string;
  };
}
