import { NavLink, Outlet, useLocation, useParams } from "react-router";

export const MainLayout = () => {
  const { salonId } = useParams();
  const location = useLocation();

  const isOnPageUrl = (url: string) => location.pathname.includes(url);

  const linkClasses = (url: string) =>
    `text-purple-600 hover:text-purple-800 font-medium ${
      isOnPageUrl(url) ? "text-purple-800 font-bold" : ""
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow w-full fixed top-0 z-10">
        <nav className="container flex justify-between mx-auto px-4 py-4">
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to={`/dashboard/${salonId}`}
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/appointments/${salonId}`}
                className={linkClasses("appointments")}
              >
                Appointments
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/clients"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Clients
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to={`/services/${salonId}`}
                className={linkClasses("services")}
              >
                Services
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/staff"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Staff
              </NavLink>
            </li> */}
          </ul>
          <NavLink
            className=" hover:text-purple-800 text-purple-800 font-bold"
            to="/"
          >
            Salons
          </NavLink>
        </nav>
      </header>
      <main className="flex-grow mt-16">
        <Outlet />
      </main>
      <footer className="bg-purple-800 text-white py-8 w-full">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>123 Salon Street</p>
              <p>Beauty City, ST 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@beautysalon.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <p>Monday - Friday: 9am - 7pm</p>
              <p>Saturday: 10am - 6pm</p>
              <p>Sunday: Closed</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <NavLink to="#" className="hover:text-purple-300">
                  Facebook
                </NavLink>
                <NavLink to="#" className="hover:text-purple-300">
                  Instagram
                </NavLink>
                <NavLink to="#" className="hover:text-purple-300">
                  Twitter
                </NavLink>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 Beauty Salon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
