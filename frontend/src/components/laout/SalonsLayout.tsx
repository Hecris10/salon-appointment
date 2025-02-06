import { NavLink, Outlet } from "react-router";

export const SalonsLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
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
