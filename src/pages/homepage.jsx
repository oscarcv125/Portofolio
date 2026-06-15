import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import anime from "animejs";

import { faMailBulk, faPhone, faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faGoogle, faHubspot } from "@fortawesome/free-brands-svg-icons";

import NavBar from "../components/common/navBar";
import ProjectCard from "../components/projects/ProjectCard";

import INFO from "../data/user";
import SEO from "../data/seo";

const Homepage = () => {
	const heroRef = useRef(null);
	const nameRef = useRef(null);
	const descRef = useRef(null);
	const linksRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		// Anime.js Timeline for Editorial Entrance
		const tl = anime.timeline({
			easing: 'easeOutExpo',
			duration: 1500
		});

		tl.add({
			targets: nameRef.current.children,
			translateY: [100, 0],
			opacity: [0, 1],
			delay: anime.stagger(100),
		})
		.add({
			targets: descRef.current,
			translateY: [20, 0],
			opacity: [0, 1],
		}, '-=800')
		.add({
			targets: linksRef.current.children,
			translateY: [20, 0],
			opacity: [0, 1],
			delay: anime.stagger(100)
		}, '-=1000');

	}, []);

	const currentSEO = SEO.find((item) => item.page === "home");

	return (
		<div className="min-h-screen overflow-hidden dark:bg-[#050505] bg-[#fafafa]">
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO?.description || ""} />
				<meta name="keywords" content={currentSEO?.keywords.join(", ") || ""} />
			</Helmet>

			<NavBar />

			{/* Hero Section - Minimalist Editorial */}
			<section
				ref={heroRef}
				className="relative min-h-screen flex flex-col justify-center px-8 md:px-12 pt-32 pb-20"
			>
				<div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
					
					{/* Left Col - Massive Typography */}
					<div className="lg:col-span-8 space-y-8 z-10">
						<div className="overflow-hidden">
							<h1 
								ref={nameRef}
								className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight"
							>
								<span className="block inline-block overflow-hidden pb-4">
									<span className="inline-block">Oscar</span>
								</span>
								<br />
								<span className="block inline-block overflow-hidden">
									<span className="inline-block text-accent italic pr-8">Cardenas.</span>
								</span>
							</h1>
						</div>

						<div ref={descRef} className="max-w-2xl opacity-0">
							<p className="text-xl md:text-2xl font-light dark:text-gray-300 text-gray-600 leading-relaxed font-sans">
								{INFO.homepage.description}
							</p>
						</div>

						{/* Links & CTA */}
						<div ref={linksRef} className="flex flex-wrap items-center gap-6 pt-8 opacity-0">
							<Link to="/projects" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-accent overflow-hidden rounded-none border-editorial">
								<span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">Selected Works</span>
								<div className="absolute inset-0 bg-black dark:bg-white transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
								<span className="absolute z-10 transition-transform duration-300 translate-y-12 group-hover:-translate-y-1 text-white dark:text-black">Selected Works</span>
							</Link>

							<div className="flex gap-4">
								{[
									{ icon: faLinkedin, link: INFO.socials.linkedin },
									{ icon: faInstagram, link: INFO.socials.instagram },
									{ icon: faMailBulk, link: `mailto:${INFO.main.email}` },
								].map((social, index) => (
									<a
										key={index}
										href={social.link}
										target="_blank"
										rel="noreferrer"
										className="w-14 h-14 flex items-center justify-center border-editorial rounded-full hover:bg-accent hover:text-white transition-colors duration-300 dark:text-white text-black"
									>
										<FontAwesomeIcon icon={social.icon} className="text-xl" />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Right Col - Structural Image */}
					<div className="lg:col-span-4 relative flex justify-end">
						<div className="relative w-full aspect-[3/4] max-w-sm">
							<div className="absolute inset-0 border-editorial translate-x-4 translate-y-4"></div>
							<img
								src="/homepage.jpeg"
								alt={INFO.main.name}
								className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-[filter] duration-700"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Experience & Certifications */}
			<section className="relative py-32 px-8 md:px-12 border-t border-editorial">
				<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
					
					{/* Experience */}
					<div>
						<h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-12">
							Experience
						</h2>
						<div className="border-l-2 border-accent pl-6 py-2">
							<div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-2 gap-2">
								<div>
									<h4 className="text-xl font-bold font-serif text-black dark:text-white">
										Software Engineer / DevOps
									</h4>
									<p className="text-lg font-bold text-gray-800 dark:text-gray-200">
										Nolu.AI
									</p>
								</div>
								<span className="text-sm font-mono tracking-widest uppercase text-gray-500">
									2025 — Present
								</span>
							</div>
							<p className="text-sm font-mono tracking-widest uppercase text-accent mb-4">
								Contract · Remote
							</p>
							<p className="text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
								Contract software engineering & DevOps — I designed, developed, and deployed products with AI integrations for client companies like Pied and Happymile.
							</p>
							<ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
								<li>Designed the requirements and developed for an AI-assisted operations CRM (FastAPI + MongoDB, React 19) — OpenAI-powered task auto-classification, auto-assignment, and insights — and led a team of developers delivering it on GCP Cloud Run + Firebase.</li>
							</ul>
						</div>
					</div>

					{/* Certifications */}
					<div>
						<h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-12">
							Certifications
						</h2>
						<div className="space-y-6">
							{[
								{ title: "Google AI Essentials", org: "Google", date: "jun. 2026", id: "6HHLC2SPRWTU", icon: faGoogle },
								{ title: "Generative AI Leader Certification", org: "Google", date: "may. 2026", id: "dd28fcf2504948d38c9b7930215c072e", icon: faGoogle },
								{ title: "Digital Marketing Certified", org: "HubSpot Academy", date: "", id: "7tbw7xg5", icon: faHubspot },
								{ title: "Introduction to Model Context Protocol", org: "Anthropic", date: "abr. 2026", id: "b6nybrgc8ge3", imgIcon: "/logos/anthropic.svg" },
								{ title: "Certificate of completion: Introduction to agent skills", org: "Anthropic", date: "abr. 2026", id: "6ivdrpdrib8c", imgIcon: "/logos/anthropic.svg" },
								{ title: "Claude Code in Action", org: "Anthropic", date: "abr. 2026", id: "ivxs3gasyu3h", imgIcon: "/logos/anthropic.svg" },
								{ title: "Building with the Claude API", org: "Anthropic", date: "abr. 2026", id: "4xq4i6qh66bu", imgIcon: "/logos/anthropic.svg" },
							].map((cert, i) => {
								const imgRef = React.createRef();
								return (
								<div
									key={i}
									className="flex gap-4 items-start border border-editorial p-4 hover:border-accent transition-colors duration-300 group"
									onMouseEnter={() => { if (imgRef.current) imgRef.current.style.filter = 'none'; }}
									onMouseLeave={() => { if (imgRef.current) imgRef.current.style.filter = 'brightness(0)'; }}
								>
									<div className="flex items-center justify-center shrink-0 w-8 h-8 text-xl text-black dark:text-white group-hover:text-accent transition-colors">
										{cert.imgIcon ? (
											<img
												ref={imgRef}
												src={cert.imgIcon}
												alt={cert.org}
												className="w-full h-full object-contain transition-all duration-300"
												style={{ filter: 'brightness(0)' }}
											/>
										) : (
											<FontAwesomeIcon icon={cert.icon} />
										)}
									</div>
									<div>
										<h4 className="text-base font-bold font-serif text-black dark:text-white leading-snug mb-1">
											{cert.title}
										</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400 font-bold mb-1">
											{cert.org} {cert.date && <span className="font-light">· {cert.date}</span>}
										</p>
										<p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest break-all">
											ID: {cert.id}
										</p>
									</div>
								</div>
								);
							})}
						</div>
					</div>

				</div>
			</section>

			{/* Featured Projects Section */}
			<section className="relative py-32 px-8 md:px-12 border-t border-editorial">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-between items-end mb-16">
						<div>
							<h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-4">
								Portfolio
							</h2>
							<h3 className="text-4xl md:text-6xl font-bold">
								Featured Work
							</h3>
						</div>
						<Link to="/projects" className="hidden md:inline-block text-lg border-b border-black dark:border-white pb-1 hover:text-accent hover:border-accent transition-colors">
							View All Projects
						</Link>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{INFO.projects.slice(0, 6).map((project, index) => (
							<ProjectCard key={project.id} project={project} index={index} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Homepage;
