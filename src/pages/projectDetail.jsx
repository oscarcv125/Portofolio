import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import SEO from "../data/seo";
import RingBuilder from "./ringBuilder";

import "./styles/projectDetail.css";

const ProjectDetail = () => {
	const { id } = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const project = INFO.projects.find((p) => p.id === id);

	if (!project) {
		return <Navigate to="/404" />;
	}

	const currentSEO = SEO.find((item) => item.page === "projects");

	// Project-specific data
	const projectData = {
		gategenie: {
			overview: `GateGenie is an AI-powered airline catering intelligence platform developed for HackMTY 2025.
			The application tackles a $164M industry problem by optimizing inventory management, predicting consumption patterns,
			and maximizing workforce productivity in airline catering operations.`,
			features: [
				"AI-Powered Expiration Tracking: Utilizes Google Gemini 1.5 Flash Vision API to instantly scan product labels, extracting expiration dates, LOT numbers, and quantities.",
				"Real-Time Consumption Analytics: Predictive ML models analyze flight-by-flight consumption patterns to estimate required inventory, significantly reducing food waste.",
				"Workforce Productivity Optimization: Calculates standard drawer assembly times and tracks employee performance to ensure smooth and efficient catering operations.",
				"Smart Flight Assignment System: An integrated module that matches available inventory with scheduled flights based on precise requirements.",
				"Interactive Data Visualization: Native integration of Apple's Swift Charts framework to render complex operational metrics into actionable visual insights.",
				"Offline Capability: Implements SwiftData for local persistence ensuring continuous operation even in environments with poor network connectivity."
			],
			tech: ["Swift 5.9", "SwiftUI", "Gemini 1.5 Flash API", "Swift Charts", "MVVM Architecture", "AVFoundation"],
			videos: ["https://www.youtube.com/embed/0LKZbznRNo0"],
		},
		helpdoku: {
			overview: `HelpDoku is an intelligent Sudoku puzzle assistant powered by Apple Intelligence and built with SwiftUI.
			The app leverages the Foundation Models API (LanguageModelSession) to provide AI-generated strategic hints that help users solve Sudoku puzzles.
			With real-time validation, intelligent cell highlighting, and adaptive layouts for both iPhone and iPad, HelpDoku demonstrates advanced integration
			of on-device AI capabilities with a polished user experience.`,
			features: [
				"Apple Intelligence Integration: Leverages the cutting-edge iOS 18.1 Foundation Models API (LanguageModelSession) for on-device context-aware reasoning.",
				"Interactive Sudoku Board: Custom-built SwiftUI interface offering seamless cell selection, highlighting, and intuitive touch interactions.",
				"AI-Powered Strategic Hints: Generates natural language explanations that guide the user step-by-step to the solution instead of simply giving the answer.",
				"Smart Cell Highlighting: Visually guides users to the exact row, column, or 3x3 grid the AI is referring to, enhancing the learning experience.",
				"Adaptive Responsive Layouts: Fluidly adjusts board dimensions and UI elements to provide an optimal experience across both iPhone and iPad.",
				"Real-Time Puzzle Validation: Instantly checks moves against Sudoku rules, highlighting conflicting numbers and detecting full board completion automatically."
			],
			tech: ["Swift", "SwiftUI", "Foundation Models", "Apple Intelligence", "LanguageModelSession", "Combine", "iOS 18.1+"],
			videos: ["https://www.youtube.com/embed/DYGyn__TXXk"],
		},
		heatshield: {
			overview: `HeatShield is an iOS safety application protecting users during extreme heat events.
			Built with SwiftUI and integrating OpenWeatherMap API for real-time weather data, the app provides heat alerts,
			cool zone locators, and comprehensive safety features. Won 1st place at Swift Challenge Fest for innovation and impact.`,
			features: [
				"Real-Time Heat Alerts: Connects with OpenWeatherMap API to provide instant push notifications when local temperatures exceed customizable safety thresholds.",
				"Smart Notification System: Intelligent background scheduler that reminds users to reapply sunscreen and hydrate based on current UV index and temperature.",
				"Location-Based Cool Zone Finder: Integrates Apple Maps (MapKit) to locate and route users to the nearest public cooling centers or shaded areas.",
				"Comprehensive Heat Index Calculation: Computes 'feels-like' temperature incorporating humidity, categorizing risk into 5 actionable safety levels.",
				"Advanced Weather Forecasting: Displays detailed 7-day forecasts, real-time Air Quality Index (AQI), and UV radiation levels.",
				"Award-Winning Innovation: Recognized with 1st place at Swift Challenge Fest for its immediate positive impact on public health and complete functionality."
			],
			tech: ["Swift", "SwiftUI", "OpenWeatherMap API", "Core Location", "UserNotifications", "MapKit"],
			images: [
				"/Heatshield1.png",
				"/Heatshield2.png",
				"/Heatshield3.png",
				"/Heatshield4.png",
				"/Heashield7.png",
				"/Heashield 8.png",
			],
			videos: ["/HEATSHIELDVIDEO.mov"],
		},
		wuno: {
			overview: `WUNO is a FIFA World Cup 2026 companion app built with SwiftUI and powered by Apple's Foundation Models.
			The application provides comprehensive tournament information, match tracking, and AI-powered insights using on-device intelligence.
			It features App Shortcuts integration for Siri commands and supports all World Cup 2026 matches across USA, Canada, and Mexico.`,
			features: [
				"Comprehensive World Cup 2026 Tracking: Full match schedule covering all stadiums and phases across USA, Canada, and Mexico.",
				"AI-Powered Match Insights: Uses Foundation Models to generate pre-match tactical analysis, historical context, and player-to-watch recommendations.",
				"App Shortcuts & Siri Integration: Deep integration with App Intents allowing users to query match times and results entirely via Siri voice commands.",
				"Real-Time Match Updates: Smart push notifications for live scores, phase transitions, and tournament progression.",
				"Venue Information Hub: Detailed insights, mapping, and logistics for all 16 host stadiums in North America.",
				"Personalized Recommendations: Analyzes user preferences and team affinities to suggest the best matches to watch."
			],
			tech: ["Swift", "SwiftUI", "Foundation Models", "App Intents", "Core Location", "App Shortcuts", "Combine"],
			images: [
				"/WUNO1.png",
				"/WUNO2.png",
				"/WUNO3.png",
			],
			videos: ["/WUNOVID.mov"],
		},
		kaapeh: {
			overview: `Kaapeh Mexico is an innovative iOS mobile application for coffee traceability using Blockchain technology.
			Developed in collaboration with a global team, this app ensures product quality and transparency throughout the coffee supply chain.
			By implementing blockchain-based tracking, Kaapeh allows consumers and producers to verify the authenticity and journey of their coffee from farm to cup.`,
			features: [
				"Blockchain-Based Traceability: Immutable ledger integration ensuring complete supply chain visibility from the coffee farm to the consumer's cup.",
				"SwiftData Local Persistence: Highly optimized local data management allowing fast access and offline viewing of previously loaded coffee profiles.",
				"Real-Time Quality Metrics: Tracks and displays cupping scores, fermentation processes, and organic certification validations.",
				"Global Collaborative Ecosystem: Designed and developed in conjunction with an international team of coffee producers, developers, and blockchain experts.",
				"Transparent Verification: Allows consumers to scan QR codes and instantly verify the authenticity, origin, and journey of their coffee.",
				"Secure Cryptographic Hashing: Implements CryptoKit for securing sensitive supply chain data and ensuring integrity of records."
			],
			tech: ["Swift", "SwiftUI", "SwiftData", "Blockchain", "CryptoKit", "REST APIs"],
			images: [
				"/Kaffi1.png",
				"/Kaffi2.png",
				"/Kaffi3.png",
				"/Kaffi4.png",
				"/Kaffi5.png",
			],
			videos: ["https://www.youtube.com/embed/_kFvWmLoLKA"],
			qrCode: "/QRKaffi.png",
		},
		semex: {
			overview: `Semex Traffic Simulation is an intelligent traffic light system developed in collaboration with Semex (Semáforos Mexicanos).
			This project utilizes agent-based modeling in Python with AgentPy to simulate autonomous car agents and optimize traffic light coordination.
			The simulation achieved a 35% improvement in traffic flow through smart phase management and real-time coordination.
			A Unity visualization client was integrated for real-time testing and visualization of the traffic system.`,
			features: [
				"Agent-Based Traffic Simulation: Robust Python modeling using AgentPy to simulate autonomous car behavior, acceleration, and intersection logic.",
				"Socket-Based Real-Time Communication: Custom TCP/IP architecture bridging Python backend simulation logic with a Unity frontend visualization client.",
				"Multi-Phase Traffic Light Coordination: Intelligently cycles through 7 complex phases including protected left turns and diagonal crossing lanes.",
				"Traffic Flow Optimization: Algorithmically improved vehicle throughput by 35% through dynamic signal timing adjustments.",
				"3D Unity Visualization: High-fidelity real-time rendering of the intersection, agents, and traffic light states for stakeholder presentations.",
				"Scalable Intersection Logic: Architecture supports drop-in configurations for 3-way, 4-way, and complex diagonal intersections."
			],
			tech: ["Python", "AgentPy", "Socket Programming", "Unity", "C#", "Agent-Based Modeling", "Real-time Systems"],
			images: [
				"/Semex1.png",
				"/Semex2.png",
				"/Semex3.png",
			],
			videos: ["https://www.youtube.com/embed/cczH2BlqSEc"],
		},
		credifiel: {
			overview: `The Credifiel Datathon project focused on optimizing collection strategies for credit recovery.
			Using advanced data analysis and machine learning techniques, we developed an automation model that significantly improved recovery efficiency.
			By analyzing historical data and identifying patterns, we reduced ineffective strategies from 25 to 13, increasing recovery success by 18%.
			This achievement earned us 2nd place among 100 national teams in the competition.`,
			features: [
				"Advanced Data Analysis Pipeline: Engineered comprehensive data cleaning and feature extraction utilizing Pandas and NumPy on large-scale financial datasets.",
				"Predictive Machine Learning Models: Trained and deployed Scikit-learn classifiers to predict the effectiveness of various collection strategies on specific user profiles.",
				"Strategy Optimization: Successfully identified and eliminated redundant collection methods, reducing ineffective strategies from 25 down to 13.",
				"High-Impact Results: The optimized approach led to a demonstrably higher success rate, increasing overall credit recovery by 18%.",
				"Automated Decision-Making: System programmatically assigns the highest-probability recovery strategy for any given delinquent account.",
				"Interactive Performance Dashboards: Visualized strategy performance and cohort analysis using Matplotlib and Seaborn for executive review."
			],
			tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "SQL", "Jupyter"],
		},
		awaq: {
			overview: `AWAQ is a comprehensive web platform designed to promote environmental preservation and social impact.
			The project features a full-stack implementation with a REST API backend using MySQL for data management,
			and a modern React frontend with an integrated Unity-based educational video game.
			The platform aims to raise environmental awareness and provide interactive educational content for users of all ages.`,
			features: [
				"Full-Stack Architecture: End-to-end development integrating a modern React frontend with a robust Node/Express/MySQL backend infrastructure.",
				"RESTful API Integration: Designed scalable API endpoints for user management, educational module tracking, and community post creation.",
				"Unity Educational Video Game: Seamlessly integrated a webgl-compiled Unity game into the React application to teach environmental awareness interactively.",
				"Interactive Learning Modules: Gamified environmental lessons with progress tracking and achievement unlocking systems.",
				"Social Impact Community: Built-in forum for users to organize local cleanups, share environmental news, and track communal impact.",
				"Responsive Cross-Device Design: Fully responsive CSS architecture ensuring accessibility across mobile, tablet, and desktop devices."
			],
			tech: ["React", "JavaScript", "Node.js", "Express", "MySQL", "Unity", "HTML", "CSS", "REST API"],
		},
		iberdrola: {
			overview: `The Hackathon Iberdrola project focused on delivering affordable and sustainable energy to rural Oaxaca communities.
			Our team developed innovative technology solutions for energy access that benefited over 4,500 residents in underserved areas.
			The project emphasized scalability, inclusivity, and sustainable development, addressing the critical need for reliable electricity
			in rural Mexico. This comprehensive approach earned us 3rd place out of 40 national teams.`,
			features: [
				"Scalable Energy Distribution System: Designed the software architecture for managing and monitoring micro-grids in rural communities.",
				"IoT Sensor Integration: Real-time data ingestion from solar-powered inverters and battery storage systems via lightweight MQTT protocols.",
				"Mobile Consumption Monitoring: Developed user-friendly interfaces allowing residents to track their energy usage and manage strict daily quotas.",
				"Community Energy Management: Administrative dashboard for local leaders to monitor grid health, battery levels, and distribute surplus energy.",
				"High-Impact Social Reach: The technological foundation of a project that brought reliable electricity to over 4,500 residents in rural Oaxaca.",
				"Award-Winning Implementation: Recognized with 3rd place out of 40 national teams for technical robustness and social commitment."
			],
			tech: ["React", "Node.js", "MongoDB", "IoT", "Solar Energy Systems", "Mobile Development", "Data Analytics"],
		},
		financesmart: {
			overview: `FinanceSmart is a personal financial advisor with conversational AI, developed for Banorte. 
			It combines a full-stack web dashboard with an LLM-powered coach (Fortia AI).
			The AI uses a deterministic RAG pipeline to ensure accurate, hallucination-free insights based on the user's real data and Banorte products.`,
			features: [
				"Conversational AI Coach (Fortia AI): Integrated Google's Gemini 2.5 Flash to act as a highly responsive, knowledgeable personal financial advisor.",
				"Deterministic RAG Pipeline: Implemented pgvector and HNSW indexing in PostgreSQL to retrieve precise, hallucination-free context from Banorte product manuals.",
				"Full-Stack Node/React Architecture: Scalable microservice design deployed on GCP Cloud Run, handling high-concurrency requests and state management.",
				"Propose-Then-Confirm Action Flow: Engineered a secure UX pattern where the AI drafts financial actions (e.g., transfers) requiring explicit user confirmation before execution.",
				"Interactive Financial Dashboards: Utilized Recharts to provide dynamic visualizations of user spending habits, savings goals, and income trends.",
				"Secure Authentication: Integrated Supabase Auth with enterprise-grade JWT validation to protect sensitive financial data."
			],
			tech: ["React 19", "Node.js", "Express", "PostgreSQL", "pgvector", "Gemini AI", "Supabase Auth", "Cloud Run"],
			images: ["/financesmart1.png", "/financesmart2.png", "/financesmart3.png", "/financesmart4.png", "/financesmart5.png", "/financesmart_chat1.png", "/financesmart_chat2.png", "/financesmart_chat3.png", "/financesmart_chat4.png", "/financesmart_chat5.png"],
		},
		clarity: {
			overview: `claRity (DislexIA) is an iOS application designed to assist users with dyslexia. 
			Built as a 100% on-device solution, it requires no network calls and uses Apple's native frameworks to provide real-time reading assistance, OCR, and AI-powered text simplification.`,
			features: [
				"100% On-Device Processing: Guarantees absolute user privacy and zero-latency execution by processing all OCR, AI inference, and TTS entirely on the iPhone.",
				"Custom Spanish Syllabifier: Developed a bespoke algorithm implementing strict Real Academia Española (RAE) rules to break down complex words accurately.",
				"Real-Time Vision OCR: Instantly extracts text from books, screens, or documents using Apple's Vision framework via the device camera.",
				"AI Text Simplification: Uses iOS 18+ Foundation Models to dynamically summarize and simplify complex paragraphs into easy-to-read formats for dyslexic users.",
				"Synchronized Text-to-Speech (TTS): Advanced AVFoundation integration that visually highlights words and syllables exactly as they are spoken aloud.",
				"Offline Capability: Full functionality maintained without cellular or Wi-Fi connection, ensuring accessibility anywhere."
			],
			tech: ["Swift 6", "SwiftUI", "Foundation Models", "Vision OCR", "AVFoundation TTS", "SwiftData"],
			},
		arcachurn: {
			overview: `Arca Continental Churn Analysis is a web application for data visualization and management of customer churn predictions.
			It provides interactive tools and dashboards to help the company identify at-risk clients and optimize their retention strategies effectively.`,
			features: [
				"Interactive Churn Dashboards: High-performance data visualization interface specifically tailored for Arca Continental's customer retention teams.",
				"Dynamic Data Visualization: Comprehensive implementation of Recharts to display historical churn trends, risk factors, and predictive cohort analysis.",
				"Client Management Tools: Advanced filtering, sorting, and drill-down capabilities to identify at-risk clients based on behavioral metrics.",
				"Modern React & Vite Architecture: Lightning-fast hot module replacement during development and highly optimized production builds using Vite.",
				"TailwindCSS Styling System: Consistent, responsive, and maintainable utility-first design system matching corporate branding guidelines.",
				"Client-Side CSV Parsing: Integrated PapaParse for instantaneous processing of large customer datasets directly in the browser."
			],
			tech: ["React 19", "Vite", "TailwindCSS", "Recharts", "PapaParse"],
			images: ["/arcachurn1.png", "/arcachurn2.png", "/arcachurn3.png", "/arcachurn4.png", "/arcachurn5.png"],
		},
		commonground: {
			overview: `CommonGround is a hyperlocal community exchange platform where neighbors trade skills, time, and help using Community Credits.
			It eliminates the need for money by creating a credit-based economy and uses AI to intelligently match neighbors based on their needs and offers.`,
			features: [
				"Credit-Based Community Economy: Designed a robust transactional backend where users earn and spend 'Community Credits' instead of fiat currency.",
				"AI-Powered Needs Matching: Integrates Anthropic Claude to semantically analyze user posts and instantly suggest the most compatible neighbors for a skill trade.",
				"Hyperlocal Posting System: Location-aware feed for posting granular 'Needs' (e.g., plumbing help) and 'Offers' (e.g., guitar lessons).",
				"Reputation & Rating Engine: Trust-building system tracking successful exchanges, reliability scores, and peer reviews.",
				"Full-Stack JWT Authentication: Secure session management, password hashing, and role-based access control built with Node.js and Express.",
				"PostgreSQL Relational Design: Highly normalized database architecture handling complex many-to-many relationships between users, skills, and transactions."
			],
			tech: ["React", "Node.js", "Express", "PostgreSQL", "Anthropic Claude AI"],
			images: ["/commonground1.png", "/commonground2.png", "/commonground3.png", "/commonground4.png", "/commonground5.png"],
		},
		ringbuilder: {
			overview: `Lumière 3D Ring Builder is an interactive, high-end 3D jewelry customizer. 
			Built with React Three Fiber, Vite, and Three.js, it allows users to dynamically build engagement rings in real-time. 
			Instead of static images, it seamlessly swaps and renders optimized GLB models as you customize.`,
			features: [
				"Dynamic 3D Rendering: Real-time WebGL rendering of complex jewelry models with realistic material properties (dispersion, transmission, IOR).",
				"Interactive Builder UI: A sleek, premium user interface to customize the center stone shape, metal color, and setting styles.",
				"Environment Lighting: Utilizes HDR environment maps for physically accurate diamond sparkles and reflections.",
				"Seamless Asset Loading: On-the-fly swapping of optimized GLB models as the user toggles different design features.",
				"React Three Fiber Ecosystem: Leverages @react-three/drei components for advanced camera controls and environment rendering."
			],
			tech: ["React", "React Three Fiber", "Three.js", "Vite", "WebGL", "TailwindCSS"],
		},
	};

	const data = projectData[id] || {};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${project.title} | ${INFO.main.title}`}</title>
				<meta name="description" content={project.description} />
				{currentSEO && (
					<meta
						name="keywords"
						content={currentSEO.keywords.join(", ")}
					/>
				)}
			</Helmet>

			<div className="page-content">
				<NavBar active="projects" />
				<div className="content-wrapper">
					<div className="project-detail-logo-container">
						<div className="project-detail-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="project-detail-container">
						<div className="project-detail-header">
							<h1 className="project-detail-title dark:text-white text-gray-900">{project.title}</h1>
							<p className="project-detail-subtitle dark:text-gray-200 text-gray-700">{project.description}</p>
						</div>

						{/* Overview Section */}
						<section className="project-section">
							<h2 className="section-title dark:text-white text-gray-900">Overview</h2>
							<p className="section-content dark:text-gray-200 text-gray-700">{data.overview}</p>
						</section>

						{/* Features Section */}
						{data.features && (
							<section className="project-section">
								<h2 className="section-title dark:text-white text-gray-900">Key Features</h2>
								<ul className="features-list">
									{data.features.map((feature, index) => (
										<li key={index} className="feature-item dark:text-gray-200 text-gray-700">
											{feature}
										</li>
									))}
								</ul>
							</section>
						)}

						{/* Tech Stack Section */}
						{data.tech && (
							<section className="project-section">
								<h2 className="section-title dark:text-white text-gray-900">Technology Stack</h2>
								<div className="tech-stack">
									{data.tech.map((tech, index) => (
										<span key={index} className="tech-badge">
											{tech}
										</span>
									))}
								</div>
							</section>
						)}

						{/* Interactive Simulation Section */}
						{id === 'ringbuilder' && (
							<section className="project-section" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
								<h2 className="section-title dark:text-white text-gray-900">Interactive 3D Simulation</h2>
								<div style={{ marginTop: '2rem' }}>
									<RingBuilder />
								</div>
							</section>
						)}

						{/* Screenshots Section */}
						{data.images && (
							<section className="project-section">
								<h2 className="section-title dark:text-white text-gray-900">Screenshots</h2>
								<div className="screenshots-grid">
									{data.images.map((image, index) => (
										<div key={index} className="screenshot-item">
											<img
												src={image}
												alt={`${project.title} screenshot ${index + 1}`}
												className="screenshot-image"
											/>
										</div>
									))}
								</div>
							</section>
						)}

						{/* Videos Section */}
						{data.videos && (
							<section className="project-section">
								<h2 className="section-title dark:text-white text-gray-900">Demo Videos</h2>
								<div className="videos-container">
									{data.videos.map((video, index) => (
										<div key={index} className="video-wrapper">
											{video.startsWith('http') ? (
												<iframe
													src={video}
													title={`${project.title} demo video ${index + 1}`}
													frameBorder="0"
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
													allowFullScreen
													className="video-iframe"
												></iframe>
											) : (
												<video
													controls
													className="video-iframe"
													preload="metadata"
												>
													<source src={video} type="video/quicktime" />
													<source src={video} type="video/mp4" />
													Your browser does not support the video tag.
												</video>
											)}
										</div>
									))}
								</div>
							</section>
						)}

						{/* QR Code Section */}
						{data.qrCode && (
							<section className="project-section">
								<h2 className="section-title dark:text-white text-gray-900">Try Me!</h2>
								<div className="qr-code-container">
									<p className="qr-code-description">
										Scan the QR code below to access the web app
									</p>
									<div className="qr-code-wrapper">
										<img
											src={data.qrCode}
											alt={`${project.title} QR Code`}
											className="qr-code-image"
										/>
									</div>
								</div>
							</section>
						)}

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProjectDetail;
