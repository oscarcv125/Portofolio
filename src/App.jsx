import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ReactGA from "react-ga4";

import Homepage from "./pages/homepage";
import About from "./pages/about";
import Projects from "./pages/projects";
import ProjectDetail from "./pages/projectDetail";
import Contact from "./pages/contact";
import Notfound from "./pages/404";
import CustomCursor from "./components/common/CustomCursor";
import ScrollProgressIndicator from "./components/common/ScrollProgressIndicator";

import { TRACKING_ID } from "./data/tracking";

function App() {
	const location = useLocation();

	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.initialize(TRACKING_ID);
		}
	}, []);

	// Page transition variants
	const pageVariants = {
		initial: {
			opacity: 0,
			y: 20,
		},
		animate: {
			opacity: 1,
			y: 0,
		},
		exit: {
			opacity: 0,
			y: -20,
		},
	};

	const pageTransition = {
		type: "tween",
		ease: "anticipate",
		duration: 0.5,
	};

	return (
		<div className="App min-h-screen">
			<CustomCursor />
			<ScrollProgressIndicator />

			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					<Route
						path="/"
						element={
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={pageVariants}
								transition={pageTransition}
							>
								<Homepage />
							</motion.div>
						}
					/>
					<Route
						path="/about"
						element={
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={pageVariants}
								transition={pageTransition}
							>
								<About />
							</motion.div>
						}
					/>
					<Route
						path="/projects"
						element={
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={pageVariants}
								transition={pageTransition}
							>
								<Projects />
							</motion.div>
						}
					/>
					<Route
						path="/project/:id"
						element={
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={pageVariants}
								transition={pageTransition}
							>
								<ProjectDetail />
							</motion.div>
						}
					/>
					<Route
						path="/contact"
						element={
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={pageVariants}
								transition={pageTransition}
							>
								<Contact />
							</motion.div>
						}
					/>
					<Route
						path="*"
						element={
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={pageVariants}
								transition={pageTransition}
							>
								<Notfound />
							</motion.div>
						}
					/>
				</Routes>
			</AnimatePresence>
		</div>
	);
}

export default App;
