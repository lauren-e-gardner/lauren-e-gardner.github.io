import './index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage.tsx';
import Nostalgia from './pages/Nostalgia/Nostalgia.tsx';
import SpaceOtterssey from './pages/Thesis/SpaceOtterssey.tsx';
import SkillsHub from './pages/SkillsHub/SkillsHub.tsx';
import Profile from './pages/SkillsHub/Profile.tsx';
import ImportClub from './pages/ImportClub/ImportClub.tsx';

// Adjusted transition for a seamless fade in and out
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/nostalgia"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Nostalgia />
            </motion.div>
          }
        />
        <Route
          path="/spaceotterssey"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SpaceOtterssey />
            </motion.div>
          }
        />
        <Route
          path="/skillshub"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SkillsHub />
            </motion.div>
          }
        />
        <Route
          path="/skillshub/profile"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Profile />
            </motion.div>
          }
        />
        <Route
          path="/importclubdemo"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ImportClub />
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
