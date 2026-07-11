import React, { Suspense, lazy, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import anime from "animejs";

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faGoogle, faHubspot, faGithub } from "@fortawesome/free-brands-svg-icons";

import NavBar from "../components/common/navBar";
import EchoText from "../components/common/EchoText";
import ProjectCard from "../components/projects/ProjectCard";

const Lanyard = lazy(() => import("../components/common/Lanyard"));

import INFO from "../data/user";
import SEO from "../data/seo";

const CertificationCard = ({ cert }) => {
	const imgRef = useRef(null);
	return (
		<div
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
};

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
					<div className="lg:col-span-8 space-y-8 z-50 relative pointer-events-auto">
						<div className="overflow-visible pl-10 md:pl-14">
							<h1
								ref={nameRef}
								className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
							>
								<span className="block inline-block overflow-visible pb-4">
									<EchoText text="Oscar" fontFamily="'Rubik Mono One', monospace" />
								</span>
								<br />
								<span className="block inline-block overflow-visible">
									<EchoText
										text="Cardenas."
										className="italic pr-8"
										fontFamily="'Rubik Mono One', monospace"
										topColor="text-accent"
									/>
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
							<Link to="/projects" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-accent overflow-hidden rounded-none border border-editorial">
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
										className="w-14 h-14 flex items-center justify-center border border-editorial rounded-full hover:bg-accent hover:text-white transition-colors duration-300 dark:text-white text-black"
									>
										<FontAwesomeIcon icon={social.icon} className="text-xl" />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Right Col - Interactive Lanyard */}
					<div className="lg:col-span-4 relative flex justify-end self-start overflow-visible z-40 pointer-events-none">
						<div className="relative w-full h-[850px] lg:-mt-32 lg:-mr-40 lg:-ml-24 z-40 pointer-events-none">
							<Suspense fallback={null}>
								<Lanyard position={[0, 0, 15]} frontImage="/homepage.jpeg" backImage="/homepage.jpeg" imageFit="cover" />
							</Suspense>
						</div>
					</div>
				</div>
			</section>

			{/* Interactive 3D Portfolio CTA */}
			<section className="relative py-24 md:py-32 px-8 md:px-12 bg-black text-white overflow-hidden border-y border-editorial">
				{/* Ambient background grid */}
				<div
					aria-hidden="true"
					className="absolute inset-0 opacity-[0.06] pointer-events-none"
					style={{
						backgroundImage:
							"linear-gradient(rgba(230,126,34,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(230,126,34,0.5) 1px, transparent 1px)",
						backgroundSize: "48px 48px",
					}}
				/>
				{/* Amber glow */}
				<div
					aria-hidden="true"
					className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] pointer-events-none"
					style={{
						background:
							"radial-gradient(circle, rgba(230,126,34,0.18) 0%, rgba(230,126,34,0) 60%)",
					}}
				/>

				<div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
					{/* Left: pitch + CTA */}
					<div className="lg:col-span-7">
						<p className="text-xs font-mono tracking-[0.35em] uppercase text-accent mb-6">
							// EXPERIENCE.exe · new
						</p>
						<h2 className="text-5xl md:text-7xl font-bold font-serif mb-8 leading-[0.95]">
							Or <span className="italic text-accent">explore</span> the
							<br />
							<span className="text-accent">3D</span> version.
						</h2>
						<p className="text-lg md:text-xl font-light text-gray-300 max-w-xl leading-relaxed mb-10">
							My portfolio as a fake operating system. Boot into a 3D workstation, click the monitor, drag windows around, run the terminal, play games — every project lives inside a virtual OS.
						</p>

						<div className="flex flex-wrap items-center gap-6">
							<a
								href="https://computer.oscarcv.tech"
								target="_blank"
								rel="noreferrer"
								className="group relative inline-flex items-center gap-3 px-10 py-5 font-bold text-black bg-accent overflow-hidden rounded-none border border-accent text-lg tracking-wide shadow-[0_0_30px_rgba(230,126,34,0.35)] transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(230,126,34,0.6)]"
							>
								{/* White curtain wiping up from the bottom on hover */}
								<span
									aria-hidden="true"
									className="absolute inset-0 bg-white origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"
								/>
								{/* Diagonal shine sweeping across on hover */}
								<span
									aria-hidden="true"
									className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
								/>
								<span className="relative z-10">Enter the 3D Portfolio</span>
								<span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">↗</span>
							</a>

						</div>
					</div>

					{/* Right: terminal mock */}
					<div className="lg:col-span-5">
						<div className="relative bg-[#0a0603] border border-accent/40 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(230,126,34,0.12)]">
							{/* Fake title bar */}
							<div className="flex items-center gap-2 px-3 py-2 border-b border-accent/30 bg-black/40">
								<span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
								<span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
								<span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
								<span className="ml-3 text-xs font-mono text-accent/70 tracking-widest">
									oscar@oscar-os — osh — 80×24
								</span>
							</div>
							<pre className="p-5 md:p-6 text-[11px] md:text-[13px] leading-[1.55] font-mono text-accent overflow-hidden select-none whitespace-pre">
{`$ neofetch
oscar@oscar-os
===============
OS:       oscar-os 1.0.0
Host:     oscar-system 10.0
Kernel:   1.0.0
Uptime:   A long time
Shell:    osh 0.5

$ ls /Applications
About.app       Contact.app     Notes.app
Finder.app      Skills.app      Terminal.app
Kaapeh.app      Heatshield.app  WUNO.app
HelpDoku.app    GateGenie.app   Clarity.app

$ █`}
							</pre>
							{/* CRT scanlines */}
							<div
								aria-hidden="true"
								className="absolute inset-0 pointer-events-none"
								style={{
									background:
										"repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
								}}
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

						<div className="border-l-2 border-accent pl-6 py-2 mt-12">
							<div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-2 gap-2">
								<div>
									<h4 className="text-xl font-bold font-serif text-black dark:text-white">
										Software Associate
									</h4>
									<a
										href="https://abyz.live"
										target="_blank"
										rel="noreferrer"
										className="text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-accent transition-colors"
									>
										Abyz
									</a>
								</div>
								<span className="text-sm font-mono tracking-widest uppercase text-gray-500">
									2024 — Present
								</span>
							</div>
							<p className="text-sm font-mono tracking-widest uppercase text-accent mb-4">
								Contract · Remote
							</p>
							<p className="text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
								Design & engineering studio based in Mexico City building business automation, AI systems, and full-stack software for client companies. I work on Python automations, chatbot pipelines, and AI integrations that replace manual workflows in client operations.
							</p>
						</div>
					</div>

					{/* Certifications */}
					<div>
						<h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-12">
							Certifications
						</h2>
						<div className="space-y-6">
							{[
								{ title: "GitHub Foundations", org: "Microsoft", date: "jun. 2026 — jun. 2028", id: "35A8CAB5E004E3F4", icon: faGithub },
								{ title: "Google AI Essentials", org: "Google", date: "jun. 2026", id: "6HHLC2SPRWTU", icon: faGoogle },
								{ title: "Generative AI Leader Certification", org: "Google", date: "may. 2026", id: "dd28fcf2504948d38c9b7930215c072e", icon: faGoogle },
								{ title: "Digital Marketing Certified", org: "HubSpot Academy", date: "", id: "7tbw7xg5", icon: faHubspot },
								{ title: "Introduction to Model Context Protocol", org: "Anthropic", date: "abr. 2026", id: "b6nybrgc8ge3", imgIcon: "/logos/anthropic.svg" },
								{ title: "Certificate of completion: Introduction to agent skills", org: "Anthropic", date: "abr. 2026", id: "6ivdrpdrib8c", imgIcon: "/logos/anthropic.svg" },
								{ title: "Claude Code in Action", org: "Anthropic", date: "abr. 2026", id: "ivxs3gasyu3h", imgIcon: "/logos/anthropic.svg" },
								{ title: "Building with the Claude API", org: "Anthropic", date: "abr. 2026", id: "4xq4i6qh66bu", imgIcon: "/logos/anthropic.svg" },
							].map((cert, i) => (
								<CertificationCard key={i} cert={cert} />
							))}
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
