import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ReactGA from "react-ga4";

import Homepage from "./pages/homepage";
import ScrollProgressIndicator from "./components/common/ScrollProgressIndicator";

import { TRACKING_ID } from "./data/tracking";

const About = lazy(() => import("./pages/about"));
const Projects = lazy(() => import("./pages/projects"));
const ProjectDetail = lazy(() => import("./pages/projectDetail"));
const Contact = lazy(() => import("./pages/contact"));
const Notfound = lazy(() => import("./pages/404"));
const Articles = lazy(() => import("./pages/articles"));
const ReadArticle = lazy(() => import("./pages/readArticle"));
const RingBuilder = lazy(() => import("./pages/ringBuilder"));

const pageVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

const pageTransition = {
	type: "tween",
	ease: "anticipate",
	duration: 0.5,
};

const PageTransition = ({ children }) => (
	<motion.div
		initial="initial"
		animate="animate"
		exit="exit"
		variants={pageVariants}
		transition={pageTransition}
	>
		{children}
	</motion.div>
);

function App() {
	const location = useLocation();

	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.initialize(TRACKING_ID);
		}
	}, []);

	return (
		<div className="App min-h-screen">
			<ScrollProgressIndicator />

			<AnimatePresence mode="wait">
				<Suspense fallback={null}>
					<Routes location={location} key={location.pathname}>
						<Route path="/" element={<PageTransition><Homepage /></PageTransition>} />
						<Route path="/about" element={<PageTransition><About /></PageTransition>} />
						<Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
						<Route path="/ring-builder" element={<PageTransition><RingBuilder /></PageTransition>} />
						<Route path="/project/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
						<Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
						<Route path="/articles" element={<PageTransition><Articles /></PageTransition>} />
						<Route path="/article/:slug" element={<PageTransition><ReadArticle /></PageTransition>} />
						<Route path="*" element={<PageTransition><Notfound /></PageTransition>} />
					</Routes>
				</Suspense>
			</AnimatePresence>
		</div>
	);
}

export default App;
