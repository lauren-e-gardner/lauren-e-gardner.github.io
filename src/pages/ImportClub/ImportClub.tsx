import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImportClub: React.FC = () => {
    // Declare state for prefersDarkMode
      const [prefersDarkMode, setPrefersDarkMode] = useState(false);
      const navigate = useNavigate();
    
      useEffect(() => {
        // Check the browser's color scheme preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const updateDarkMode = (e: MediaQueryListEvent) => {
          setPrefersDarkMode(e.matches);
        };
    
        // Set the initial dark mode preference
        setPrefersDarkMode(mediaQuery.matches);
    
        // Listen for changes to the color scheme in the browser (if the user manually changes it)
        mediaQuery.addEventListener('change', updateDarkMode);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          mediaQuery.removeEventListener('change', updateDarkMode);
        };
      }, []);
    
      useEffect(() => {
        // Update the class on the document element based on prefersDarkMode state
        if (prefersDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [prefersDarkMode]);

  return (
    <div className="max-w-screen-2xl mx-auto px-5 lg:px-15 py-8">
              <button
        onClick={() => navigate(-1)}
        className="text-md xl:text-xl 2xl:text-3xl absolute top-4 left-4 px-4 py-2 z-10"
      >
        Back
      </button>
      <header className="text-center mb-12">
        <h1 className="p-6 lg:p-8 xl:p-10 2xl:p-12 text-md md:text-lg lg:text-2xl xl:text-4xl 2xl:text-6xl font-bold">Import Club Direct</h1>
        <p className="mt-2 text-md xl:text-lg 2xl:text-2xl ">
          Import Club Direct is an e-commerce platform designed for bulk buying pallets of materials and items. 
          It helps businesses set up an online store and manage their orders efficiently. 
          This website is still in production, but here are some screenshots of my personal progress so far.
        </p>
      </header>

      <section>
        <h2 className="text-md xl:text-xl 2xl:text-3xl font-semibold mb-6">Screenshots</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/ImportClub/HomePage.png"
              alt="Home Page"
              className="w-full object-cover rounded-md p-2"
            />
            <div className="p-4 xl:p-6 2xl:p-8 ">
              <h3 className="py-2 font-semibold text-md xl:text-xl 2xl:text-3xl text-gray-800">Home Page</h3>
              <p className="text-gray-600 text-sm xl:text-lg 2xl:text-xl">This is the landing page for Import Club Direct. Users who are not logged in will see login or register in the header. Users who are logged in will see a dashboard button to take them into the website.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/ImportClub/Login.png"
              alt="Login Page"
              className="w-full object-cover rounded-md p-2"
            />
            <div className="p-4 xl:p-6 2xl:p-8">
              <h3 className="py-2 font-semibold text-md xl:text-xl 2xl:text-3xl text-gray-800">Login Page</h3>
              <p className="text-gray-600 text-sm xl:text-lg 2xl:text-xl">A user can login, register, or change their password from this page. Upon login, the user type is detected. If the user is a standard buyer, they will route to the buyer dashboard. If the user is an operator, they will route to the operator dashboard.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/ImportClub/Agreement.png"
              alt="Agreement Page"
              className="w-full object-cover rounded-md p-2"
            />
            <div className="p-4 xl:p-6 2xl:p-8">
              <h3 className="py-2 font-semibold text-md xl:text-xl 2xl:text-3xl text-gray-800">Agreement Page</h3>
              <p className="text-gray-600 text-sm xl:text-lg 2xl:text-xl">Upon logging in, the buyer is prompted with a legal agreement. In order to use our application, they must agree. This pop-up only appears if the buyer has not agreed to the most recent terms.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/ImportClub/Dashboard.png"
              alt="Dashboard"
              className="w-full object-cover rounded-md p-2"
            />
            <div className="p-4 xl:p-6 2xl:p-8">
              <h3 className="py-2 font-semibold text-md xl:text-xl 2xl:text-3xl text-gray-800">Dashboard</h3>
              <p className="text-gray-600 text-sm xl:text-lg 2xl:text-xl">The buyer dashboard has sections for announcements, recent orders, and FAQ. These elements are not currently filled in on our testing database which is why they are empty. The navigation bar allows the user to easily navigate to the orders, products, cart, or profile pages.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/ImportClub/Cart.png"
              alt="Cart Page"
              className="w-full object-cover rounded-md p-2"
            />
            <div className="p-4 xl:p-6 2xl:p-8">
              <h3 className="py-2 font-semibold text-md xl:text-xl 2xl:text-3xl text-gray-800">Cart Page</h3>
              <p className="text-gray-600 text-sm xl:text-lg 2xl:text-xl">The cart updates to show the most recent additions. Furthermore, the user has the option to select or add a new address if the default is incorrect. </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/ImportClub/AddNewAddress.png"
              alt="Add New Address"
              className="w-full object-cover rounded-md p-2"
            />
            <div className="p-4 xl:p-6 2xl:p-8">
              <h3 className="py-2 font-semibold text-md xl:text-xl 2xl:text-3xl text-gray-800">Add New Address</h3>
              <p className="text-gray-600 text-sm xl:text-lg 2xl:text-xl">When adding a new address, the user is prompted for the necessary details before adding the address to the database and associating it with the user's current business.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImportClub;
