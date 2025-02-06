import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div lang="en">
      <h1>Layout</h1>
      {/* Add your layout components like header, sidebar, etc. */}
      <Outlet />
    </div>
  );
};
