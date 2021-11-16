import { vhNoSidebarLayout } from "./no-sidebar";
import { vhNoneLayout } from "./none";
import { vhSidebarLayout } from "./sidebar";

export { vhNoSidebarLayout, vhSidebarLayout, vhNoneLayout };
export const Layout: any = {
    NoSidebar: vhNoSidebarLayout as any,
    Sidebar: vhSidebarLayout as any,
    None: vhNoneLayout as any
};