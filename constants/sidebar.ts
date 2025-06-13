// lib/constants.ts
import {
    LayoutDashboard,
    Package,
    Users,
    User,
    Map,
    BarChart,
    Settings,
    LogOut
  } from 'lucide-react';
  
  export const SIDEBAR_LINKS = [
    { label: 'Resumen', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Productos', href: '/dashboard/productos', icon: Package },
    { label: 'Vendedores', href: '/dashboard/vendedores', icon: Users },
    { label: 'Clientes', href: '/dashboard/clientes', icon: User },
    { label: 'Territorios', href: '/dashboard/territorios', icon: Map },
    { label: 'Frecuencia', href: '/dashboard/frecuencia', icon: BarChart },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];
  
  export const SIDEBAR_BOTTOM_LINK = {
    label: 'Cerrar sesión',
    href: '/logout',
    icon: LogOut,
  };
  