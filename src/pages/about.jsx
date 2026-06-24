import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faMailBulk, faPhone, faAward, faCode, faBriefcase, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import anime from "animejs";

import NavBar from "../components/common/navBar";

import INFO from "../data/user";
import SEO from "../data/seo";

const About = () => {
	const headerRef = useRef(null);
	const contentRef = useRef(null);
	const skillsRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		// Minimalist entrance animations
		anime({
			targets: [headerRef.current, contentRef.current, skillsRef.current],
			translateY: [50, 0],
			opacity: [0, 1],
			duration: 1000,
			easing: 'easeOutQuart',
			delay: anime.stagger(200, {start: 300})
		});
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");

	const skills = [
		{ name: "Swift/SwiftUI", level: 95 },
		{ name: "Python", level: 90 },
		{ name: "React/JavaScript", level: 85 },
		{ name: "C++", level: 80 },
		{ name: "AI/ML", level: 75 },
		{ name: "Full-Stack Dev", level: 85 },
	];

	const achievements = [
		{ icon: faAward, title: "2nd Place", desc: "Swift Challenge Fest 2026 - claRity App" },
		{ icon: faAward, title: "1st Place", desc: "Swift Challenge Fest 2025 - HeatShield App" },
		{ icon: faAward, title: "2nd Place", desc: "Credifiel Datathon - Credit Recovery Optimization" },
		{ icon: faAward, title: "3rd Place", desc: "Hackathon Iberdrola - Environmental Tech" },
		{ icon: faGraduationCap, title: "Scholarship", desc: "50% Academic Excellence Scholarship at Tecnologico de Monterrey Campus Monterrey" },
	];

	return (
		<div className="min-h-screen overflow-hidden dark:bg-[#050505] bg-[#fafafa]">
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO?.description || ""} />
				<meta name="keywords" content={currentSEO?.keywords.join(", ") || ""} />
			</Helmet>

			<NavBar />

			<div className="relative px-8 md:px-12 pt-40 pb-20 max-w-7xl mx-auto">
				
				{/* Header */}
				<div ref={headerRef} className="opacity-0 mb-20 border-b border-editorial pb-12">
					<h1 className="text-6xl md:text-8xl font-bold font-serif mb-6 text-black dark:text-white">
						My Story.
					</h1>
					<p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
						{INFO.about.title}
					</p>
				</div>

				{/* Main Content Grid */}
				<div ref={contentRef} className="opacity-0 grid lg:grid-cols-12 gap-16 mb-32">
					
					{/* Left Col - Text & Achievements */}
					<div className="lg:col-span-8 space-y-16">
						<div className="prose prose-lg dark:prose-invert max-w-none">
							<p className="text-lg md:text-xl font-light leading-relaxed text-gray-800 dark:text-gray-200">
								{INFO.about.description}
							</p>
						</div>

						{/* Achievements */}
						<div>
							<h3 className="text-sm font-bold tracking-widest uppercase text-accent mb-8">
								Milestones & Awards
							</h3>
							<div className="grid sm:grid-cols-2 gap-8">
								{achievements.map((achievement, index) => (
									<div key={index} className="border-l-2 border-accent pl-6 py-2">
										<FontAwesomeIcon icon={achievement.icon} className="text-2xl text-black dark:text-white mb-4" />
										<h4 className="text-lg font-bold font-serif text-black dark:text-white mb-2">
											{achievement.title}
										</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											{achievement.desc}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Col - Contact & Socials */}
					<div className="lg:col-span-4">
						<div className="sticky top-40 border border-editorial bg-white dark:bg-[#0a0a0a] p-8 shadow-editorial">
							<h3 className="text-2xl font-bold font-serif mb-8 text-black dark:text-white">
								Let's Connect
							</h3>
							<div className="flex flex-col space-y-6">
								{[
									{ icon: faLinkedin, link: INFO.socials.linkedin, label: "LinkedIn" },
									{ icon: faInstagram, link: INFO.socials.instagram, label: "Instagram" },
									{ icon: faMailBulk, link: `mailto:${INFO.main.email}`, label: "Email" },
									{ icon: faPhone, link: `tel:${INFO.main.phone}`, label: "Phone" },
								].map((social, index) => (
									<a
										key={index}
										href={social.link}
										target="_blank"
										rel="noreferrer"
										className="group flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300"
									>
										<span className="w-10 h-10 flex items-center justify-center border border-editorial rounded-full group-hover:border-accent transition-colors duration-300 text-black dark:text-white group-hover:text-accent">
											<FontAwesomeIcon icon={social.icon} />
										</span>
										<span className="text-sm font-bold tracking-widest uppercase">{social.label}</span>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Skills Section */}
				<div ref={skillsRef} className="opacity-0 border-t border-editorial pt-20">
					<div className="grid md:grid-cols-3 gap-12">
						<div className="md:col-span-1">
							<h2 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-4">
								Core<br/>Expertise
							</h2>
							<p className="text-gray-600 dark:text-gray-400 text-sm tracking-widest uppercase">
								Technical Skills
							</p>
						</div>
						<div className="md:col-span-2 grid sm:grid-cols-2 gap-x-12 gap-y-10">
							{skills.map((skill, index) => (
								<div key={index} className="group">
									<div className="flex justify-between items-end mb-4 border-b border-editorial pb-2">
										<span className="text-lg font-bold text-black dark:text-white">{skill.name}</span>
										<span className="text-sm font-mono text-accent">{skill.level}%</span>
									</div>
									<div className="h-1 bg-gray-200 dark:bg-gray-800 w-full overflow-hidden">
										<div 
											className="h-full bg-black dark:bg-white transform -translate-x-full transition-transform duration-1000 ease-out"
											style={{
												transform: `translateX(-${100 - skill.level}%)`
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default About;
