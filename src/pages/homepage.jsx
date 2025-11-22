import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

import { faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import NavBar from "../components/common/navBar";
import ProjectCard from "../components/projects/ProjectCard";
import ParticlesBackground from "../components/common/ParticlesBackground";

import INFO from "../data/user";
import SEO from "../data/seo";

const Homepage = () => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 300], [0, -50]);

	const roles = [
		"Software Engineer",
		"iOS Developer",
		"Full-Stack Developer",
		"AI Enthusiast",
		"Problem Solver"
	];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Typewriter effect
	useEffect(() => {
		const currentRole = roles[currentRoleIndex];
		let currentIndex = 0;
		let isDeleting = false;
		let timeout;

		const typeWriter = () => {
			if (!isDeleting && currentIndex <= currentRole.length) {
				setDisplayedText(currentRole.substring(0, currentIndex));
				currentIndex++;
				timeout = setTimeout(typeWriter, 100);
			} else if (!isDeleting && currentIndex > currentRole.length) {
				timeout = setTimeout(() => {
					isDeleting = true;
					typeWriter();
				}, 2000);
			} else if (isDeleting && currentIndex > 0) {
				currentIndex--;
				setDisplayedText(currentRole.substring(0, currentIndex));
				timeout = setTimeout(typeWriter, 50);
			} else if (isDeleting && currentIndex === 0) {
				isDeleting = false;
				setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
			}
		};

		typeWriter();
		return () => clearTimeout(timeout);
	}, [currentRoleIndex]);

	const currentSEO = SEO.find((item) => item.page === "home");

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2
			}
		}
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1
		}
	};

	return (
		<div className="min-h-screen overflow-hidden">
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO?.description || ""} />
				<meta name="keywords" content={currentSEO?.keywords.join(", ") || ""} />
			</Helmet>

			<ParticlesBackground />
			<NavBar />

			{/* Hero Section */}
			<motion.section
				style={{ y }}
				className="relative min-h-screen flex items-center justify-center px-8 md:px-6 pt-32 pb-20"
			>
				<div className="max-w-6xl mx-auto w-full">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid md:grid-cols-2 gap-12 items-center"
					>
						{/* Left Side - Text Content */}
						<motion.div variants={itemVariants} className="space-y-6">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className="space-y-2"
							>
								<h2 className="text-2xl md:text-3xl font-mono dark:text-emerald-400 text-teal-600">
									Hi, I'm
								</h2>
								<h1 className="text-5xl md:text-7xl font-bold gradient-text">
									{INFO.main.name}
								</h1>
								<div className="h-16 md:h-20">
									<h2 className="text-3xl md:text-4xl font-mono dark:text-lime-300 text-lime-600">
										{displayedText}
										<motion.span
											animate={{ opacity: [1, 0, 1] }}
											transition={{ duration: 0.8, repeat: Infinity }}
											className="inline-block w-1 h-8 md:h-10 dark:bg-lime-400 bg-lime-600 ml-1"
										/>
									</h2>
								</div>
							</motion.div>

							<motion.p
								variants={itemVariants}
								className="text-lg md:text-xl dark:text-gray-200 text-gray-800 leading-relaxed"
							>
								{INFO.homepage.description.substring(0, 200)}...
							</motion.p>

							{/* Social Icons */}
							<motion.div variants={itemVariants} className="flex gap-4 pt-4">
								{[
									{ icon: faLinkedin, link: INFO.socials.linkedin, color: "hover:text-emerald-400" },
									{ icon: faInstagram, link: INFO.socials.instagram, color: "hover:text-amber-400" },
									{ icon: faMailBulk, link: `mailto:${INFO.main.email}`, color: "hover:text-green-400" },
									{ icon: faPhone, link: `tel:${INFO.main.phone}`, color: "hover:text-lime-400" },
								].map((social, index) => (
									<motion.a
										key={index}
										href={social.link}
										target="_blank"
										rel="noreferrer"
										whileHover={{ scale: 1.2, rotate: 5 }}
										whileTap={{ scale: 0.9 }}
										className={`w-14 h-14 rounded-full glass flex items-center justify-center dark:text-gray-200 text-gray-800 ${social.color} transition-all duration-300`}
									>
										<FontAwesomeIcon icon={social.icon} className="text-2xl" />
									</motion.a>
								))}
							</motion.div>

							{/* CTA Buttons */}
							<motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
								<Link to="/projects">
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="px-8 py-4 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-600 rounded-full font-mono font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300"
									>
										View My Work
									</motion.button>
								</Link>
								<Link to="/contact">
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="px-8 py-4 glass-strong rounded-full font-mono font-bold dark:text-white text-gray-900 hover:bg-white/20 transition-all duration-300"
									>
										Get In Touch
									</motion.button>
								</Link>
							</motion.div>
						</motion.div>

						{/* Right Side - Animated Image */}
						<motion.div
							variants={itemVariants}
							className="relative flex items-center justify-center"
						>
							<motion.div
								animate={{
									rotate: [0, 5, -5, 0],
								}}
								transition={{
									duration: 5,
									repeat: Infinity,
									ease: "easeInOut"
								}}
								className="relative"
							>
								<div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
								<div className="relative glass-strong rounded-3xl p-2 glow-effect">
									<img
										src="/homepage.jpeg"
										alt={INFO.main.name}
										className="rounded-2xl w-full max-w-md object-cover"
									/>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>

				{/* Scroll Indicator */}
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 1.5, repeat: Infinity }}
					className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
				>
					<div className="w-6 h-10 border-2 dark:border-white/30 border-gray-400/50 rounded-full flex justify-center p-2">
						<motion.div
							animate={{ y: [0, 12, 0] }}
							transition={{ duration: 1.5, repeat: Infinity }}
							className="w-1 h-2 dark:bg-white/50 bg-gray-600 rounded-full"
						/>
					</div>
				</motion.div>
			</motion.section>

			{/* Featured Projects Section */}
			<section className="relative py-20 px-8 md:px-6">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
							Featured Projects
						</h2>
						<p className="text-xl dark:text-gray-200 text-gray-800 font-mono">
							Check out some of my recent work
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{INFO.projects.slice(0, 6).map((project, index) => (
							<ProjectCard key={project.id} project={project} index={index} />
						))}
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-center mt-12"
					>
						<Link to="/projects">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-8 py-4 glass-strong rounded-full font-mono font-bold dark:text-white text-gray-900 hover:bg-white/20 transition-all duration-300"
							>
								View All Projects →
							</motion.button>
						</Link>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default Homepage;
