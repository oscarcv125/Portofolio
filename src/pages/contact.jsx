import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";
import anime from "animejs";

import NavBar from "../components/common/navBar";

import INFO from "../data/user";
import SEO from "../data/seo";

const Contact = () => {
	const headerRef = useRef(null);
	const contentRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		anime({
			targets: [headerRef.current, contentRef.current],
			translateY: [50, 0],
			opacity: [0, 1],
			duration: 1000,
			easing: 'easeOutQuart',
			delay: anime.stagger(200, {start: 300})
		});
	}, []);

	const currentSEO = SEO.find((item) => item.page === "contact");

	const contactMethods = [
		{
			icon: faMailBulk,
			title: "Email",
			value: INFO.main.email,
			link: `mailto:${INFO.main.email}`,
		},
		{
			icon: faPhone,
			title: "Phone",
			value: INFO.main.phone,
			link: `tel:${INFO.main.phone}`,
		},
		{
			icon: faLinkedin,
			title: "LinkedIn",
			value: "Connect on LinkedIn",
			link: INFO.socials.linkedin,
		},
		{
			icon: faInstagram,
			title: "Instagram",
			value: "@oscar_cardenasv",
			link: INFO.socials.instagram,
		},
	];

	return (
		<div className="min-h-screen overflow-hidden dark:bg-[#050505] bg-[#fafafa]">
			<Helmet>
				<title>{`Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO?.description || ""} />
				<meta name="keywords" content={currentSEO?.keywords.join(", ") || ""} />
			</Helmet>

			<NavBar />

			<div className="relative px-8 md:px-12 pt-40 pb-20 max-w-4xl mx-auto">
				{/* Header */}
				<div ref={headerRef} className="opacity-0 mb-16 pb-12">
					<h1 className="text-6xl md:text-8xl font-bold font-serif mb-6 text-black dark:text-white">
						Let's<br/>Connect.
					</h1>
					<p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
						Have a project in mind or just want to chat? I'd love to hear from you!
					</p>
				</div>

				<div ref={contentRef} className="opacity-0 max-w-2xl">
					{/* Contact Information */}
					<div className="space-y-12">
						<div className="prose prose-lg dark:prose-invert">
							<p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-200">
								I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through any of these channels!
							</p>
						</div>

						<div className="flex flex-col space-y-8">
							{contactMethods.map((method, index) => (
								<a
									key={index}
									href={method.link}
									target="_blank"
									rel="noreferrer"
									className="group flex items-center gap-6 text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300"
								>
									<span className="w-16 h-16 flex items-center justify-center border border-editorial rounded-full group-hover:border-accent transition-colors duration-300 text-black dark:text-white group-hover:text-accent text-2xl">
										<FontAwesomeIcon icon={method.icon} />
									</span>
									<div className="flex flex-col">
										<span className="text-sm font-bold tracking-widest uppercase mb-1 text-black dark:text-white group-hover:text-accent transition-colors duration-300">
											{method.title}
										</span>
										<span className="text-lg font-light">
											{method.value}
										</span>
									</div>
								</a>
							))}
						</div>

						{/* Availability */}
						<div className="border-t border-editorial pt-12 mt-12">
							<h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-accent">
								Response Time
							</h3>
							<p className="text-lg font-light text-gray-800 dark:text-gray-200">
								I typically respond within <span className="font-bold text-black dark:text-white border-b-2 border-accent">24 hours</span> during weekdays. For urgent matters, feel free to call!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
