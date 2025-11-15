import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMailBulk, faPhone, faAward, faCode, faBriefcase, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import ParticlesBackground from "../components/common/ParticlesBackground";
import ImageCarousel from "../components/common/ImageCarousel";

import INFO from "../data/user";
import SEO from "../data/seo";

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");

	// Carousel images
	const carouselImages = [
		'/carrousel/carr1.jpg',
		'/carrousel/carr2.jpg',
		'/carrousel/carr3.jpg',
		'/carrousel/carr4.jpg',
		'/carrousel/carr5.jpg',
		'/carrousel/carr6.jpg',
	];

	const skills = [
		{ name: "Swift/SwiftUI", level: 95, color: "from-cyan-400 to-blue-400" },
		{ name: "Python", level: 90, color: "from-purple-400 to-indigo-400" },
		{ name: "React/JavaScript", level: 85, color: "from-pink-400 to-rose-400" },
		{ name: "C++", level: 80, color: "from-cyan-400 to-teal-400" },
		{ name: "AI/ML", level: 75, color: "from-purple-400 to-fuchsia-400" },
		{ name: "Full-Stack Dev", level: 85, color: "from-pink-400 to-orange-400" },
	];

	const achievements = [
		{ icon: faAward, title: "1st Place", desc: "Swift Challenge Fest - HeatShield App" },
		{ icon: faAward, title: "2nd Place", desc: "Credifiel Datathon - Credit Recovery Optimization" },
		{ icon: faAward, title: "3rd Place", desc: "Hackathon Iberdrola - Environmental Tech" },
		{ icon: faGraduationCap, title: "96/100 GPA", desc: "Academic Excellence Scholarship" },
	];

	return (
		<div className="min-h-screen overflow-hidden">
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO?.description || ""} />
				<meta name="keywords" content={currentSEO?.keywords.join(", ") || ""} />
			</Helmet>

			<ParticlesBackground />
			<NavBar />

			<div className="relative px-8 md:px-6 pt-32 pb-20">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center mb-16"
					>
						<h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
							About Me
						</h1>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							{INFO.about.title}
						</p>
					</motion.div>

					{/* Main Content Grid */}
					<div className="grid md:grid-cols-2 gap-12 mb-20">
						{/* Left - Image & Quick Info */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
							className="space-y-8"
						>
							<div className="glass-strong rounded-3xl p-2 glow-effect">
								<div className="w-full h-96 rounded-2xl overflow-hidden">
									<ImageCarousel images={carouselImages} autoPlayInterval={4000} />
								</div>
							</div>

							{/* Social Links */}
							<div className="glass-strong rounded-2xl p-6">
								<h3 className="text-2xl font-bold text-white mb-4 font-mono">
									Let's Connect
								</h3>
								<div className="grid grid-cols-2 gap-4">
									{[
										{ icon: faLinkedin, link: INFO.socials.linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
										{ icon: faInstagram, link: INFO.socials.instagram, label: "Instagram", color: "hover:text-pink-400" },
										{ icon: faMailBulk, link: `mailto:${INFO.main.email}`, label: "Email", color: "hover:text-cyan-400" },
										{ icon: faPhone, link: `tel:${INFO.main.phone}`, label: "Phone", color: "hover:text-purple-400" },
									].map((social, index) => (
										<motion.a
											key={index}
											href={social.link}
											target="_blank"
											rel="noreferrer"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className={`flex items-center gap-3 px-4 py-3 rounded-lg glass hover:glass-strong transition-all ${social.color}`}
										>
											<FontAwesomeIcon icon={social.icon} className="text-xl" />
											<span className="font-mono text-sm">{social.label}</span>
										</motion.a>
									))}
								</div>
							</div>
						</motion.div>

						{/* Right - About Text */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
							className="space-y-6"
						>
							<div className="glass-strong rounded-2xl p-8">
								<h2 className="text-3xl font-bold gradient-text mb-4 font-mono">
									My Story
								</h2>
								<p className="text-gray-300 leading-relaxed text-lg">
									{INFO.about.description}
								</p>
							</div>

							{/* Achievements Grid */}
							<div className="grid grid-cols-2 gap-4">
								{achievements.map((achievement, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.4 + index * 0.1 }}
										whileHover={{ scale: 1.05 }}
										className="glass-strong rounded-xl p-4 text-center"
									>
										<FontAwesomeIcon
											icon={achievement.icon}
											className="text-3xl gradient-text mb-2"
										/>
										<h4 className="text-white font-bold mb-1 font-mono text-sm">
											{achievement.title}
										</h4>
										<p className="text-gray-400 text-xs">{achievement.desc}</p>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>

					{/* Skills Section */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="glass-strong rounded-3xl p-8 md:p-12"
					>
						<h2 className="text-4xl font-bold gradient-text mb-8 text-center font-mono">
							Technical Skills
						</h2>
						<div className="grid md:grid-cols-2 gap-6">
							{skills.map((skill, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.6 + index * 0.1 }}
								>
									<div className="flex justify-between mb-2">
										<span className="text-white font-mono font-bold">{skill.name}</span>
										<span className="text-gray-400 font-mono">{skill.level}%</span>
									</div>
									<div className="h-3 bg-gray-800 rounded-full overflow-hidden">
										<motion.div
											initial={{ width: 0 }}
											animate={{ width: `${skill.level}%` }}
											transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
											className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
										/>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default About;
