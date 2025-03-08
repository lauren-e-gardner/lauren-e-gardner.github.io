import './index.css'
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from './pages/HomePage.tsx';
import Nostalgia from "./pages/Nostalgia/Nostalgia.tsx";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.10 } },
  exit: { opacity: 0, transition: { duration: 0.10 } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <HomePage />
            </motion.div>
          } 
        />
        <Route 
          path="/nostalgia" 
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Nostalgia />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return <AnimatedRoutes />;
}

export default App;
