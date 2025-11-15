import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import ParticlesBackground from "../components/common/ParticlesBackground";

import INFO from "../data/user";
import SEO from "../data/seo";

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "contact");

	const contactMethods = [
		{
			icon: faMailBulk,
			title: "Email",
			value: INFO.main.email,
			link: `mailto:${INFO.main.email}`,
			color: "from-cyan-400 to-blue-400",
		},
		{
			icon: faPhone,
			title: "Phone",
			value: INFO.main.phone,
			link: `tel:${INFO.main.phone}`,
			color: "from-purple-400 to-indigo-400",
		},
		{
			icon: faLinkedin,
			title: "LinkedIn",
			value: "Connect on LinkedIn",
			link: INFO.socials.linkedin,
			color: "from-blue-400 to-cyan-400",
		},
		{
			icon: faInstagram,
			title: "Instagram",
			value: "@oscar_cardenasv",
			link: INFO.socials.instagram,
			color: "from-pink-400 to-rose-400",
		},
	];

	return (
		<div className="min-h-screen overflow-hidden">
			<Helmet>
				<title>{`Contact | ${INFO.main.title}`}</title>
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
							Let's Connect
						</h1>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							Have a project in mind or just want to chat? I'd love to hear from you!
						</p>
					</motion.div>

					<div className="max-w-2xl mx-auto">
						{/* Contact Information */}
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="space-y-6"
						>
							<div className="glass-strong rounded-3xl p-8">
								<h2 className="text-3xl font-bold gradient-text mb-6 font-mono">
									Get in Touch
								</h2>
								<p className="text-gray-300 leading-relaxed mb-8">
									I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through any of these channels!
								</p>

								<div className="space-y-4">
									{contactMethods.map((method, index) => (
										<motion.a
											key={index}
											href={method.link}
											target="_blank"
											rel="noreferrer"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.4 + index * 0.1 }}
											whileHover={{ scale: 1.02, x: 5 }}
											className="flex items-center gap-4 p-4 rounded-xl glass hover:glass-strong transition-all group"
										>
											<div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
												<FontAwesomeIcon
													icon={method.icon}
													className="text-white text-xl"
												/>
											</div>
											<div className="flex-1">
												<h3 className="text-white font-mono font-bold">
													{method.title}
												</h3>
												<p className="text-gray-400 text-sm">
													{method.value}
												</p>
											</div>
											<motion.span
												className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
											>
												→
											</motion.span>
										</motion.a>
									))}
								</div>
							</div>

							{/* Availability */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8 }}
								className="glass-strong rounded-2xl p-6"
							>
								<h3 className="text-xl font-bold text-white mb-3 font-mono">
									Response Time
								</h3>
								<p className="text-gray-300">
									I typically respond within <span className="text-cyan-400 font-bold">24 hours</span> during weekdays. For urgent matters, feel free to call!
								</p>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
