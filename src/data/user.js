const INFO = {
	main: {
		title: "Oscar Cardenas - Software Engineer Portfolio",
		name: "Oscar Cardenas",
		email: "oscarcv.tech@gmail.com",
		phone: "+52 667 503 4669",
		logo: "../logo.png",
	},

	socials: {
		linkedin: "https://linkedin.com/in/oscarcardenasvaldez",
		instagram: "https://instagram.com/oscar_cardenasv",
	},

	homepage: {
		title: "Computer Science Engineer — Software Development",
		description:
			"I am a Computer Science Engineering student at Tecnológico de Monterrey with expertise in Python, C++, Swift/SwiftUI, and full-stack development. I specialize in iOS development, AI integration, data analysis, and building scalable applications. With a 96/100 GPA and Academic Excellence Scholarship, I'm passionate about solving complex problems and creating innovative solutions that make a real-world impact.",
	},

	about: {
		title: "Building innovative solutions from mobile apps to AI-powered systems.",
		description:
			"I've worked on diverse projects ranging from AI-powered iOS applications to data analysis platforms and web development. My experience includes winning hackathons (1st at Swift Challenge Fest, 2nd at Credifiel Datathon, 3rd at Hackathon Iberdrola), developing blockchain-based mobile apps, creating traffic simulations with agent-based modeling, and building full-stack web applications. I'm proficient in Swift, Python, JavaScript, React, and various databases. Currently serving as IT Coordinator for SEITC (Computer Science Student Society) and mentoring students through the MAE Program.",
	},

	projects: [
		{
			id: "kaapeh",
			title: "Kaapeh Mexico - Coffee Traceability App",
			description:
				"iOS mobile app for coffee traceability using Blockchain technology. Collaborated with a global team to implement blockchain-based tracking ensuring product quality and transparency. Built with SwiftUI and SwiftData for efficient data management.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/swift/swift.png",
			linkText: "View Project",
			link: "/project/kaapeh",
			tags: ["ios", "web"],
		},

		{
			id: "semex",
			title: "Semex Traffic Simulation",
			description:
				"Intelligent traffic light system developed in collaboration with Semex (Semáforos Mexicanos). Agent-based traffic simulation in Python with AgentPy and socket communication, modeled autonomous car agents and optimized light coordination, improving simulated traffic flow by 35%. Integrated Unity visualization for real-time testing.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View Project",
			link: "/project/semex",
			tags: ["python"],
		},

		{
			id: "gategenie",
			title: "GateGenie (HackMTY 2025)",
			description:
				"AI-powered airline catering intelligence platform for iOS. Features expiration tracking with Gemini Vision API for product scanning, consumption prediction analytics, workforce productivity optimization, and smart flight assignment. Built for HackMTY 2025 addressing a $164M industry problem.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/swift/swift.png",
			linkText: "View Project",
			link: "/project/gategenie",
			tags: ["ios", "ai", "web"],
		},

		{
			id: "helpdoku",
			title: "HelpDoku - AI Sudoku Assistant",
			description:
				"Intelligent Sudoku puzzle assistant powered by Apple Intelligence. Built with SwiftUI and Foundation Models API to provide AI-generated strategic hints for solving Sudoku puzzles. Features real-time validation, cell highlighting, and adaptive layouts for iPhone and iPad with natural language puzzle guidance.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/swift/swift.png",
			linkText: "View Project",
			link: "/project/helpdoku",
			tags: ["ios", "ai"],
		},

		{
			id: "heatshield",
			title: "HeatShield (1st Place)",
			description:
				"Award-winning iOS app protecting users during extreme heat events using OpenWeatherMap and Apple Maps. Implemented alerts and shelter locator with persistent data storage. Reached 500+ active users in pilot testing. Won 1st place at Swift Challenge Fest for innovation and complete functionality.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/swift/swift.png",
			linkText: "View Project",
			link: "/project/heatshield",
			tags: ["ios"],
		},

		{
			id: "wuno",
			title: "WUNO - World Cup 2026 App",
			description:
				"FIFA World Cup 2026 companion app built with SwiftUI and SwiftData. Features match tracking, AI-powered insights using Foundation Models, App Shortcuts integration, and comprehensive tournament information for all World Cup 2026 matches across USA, Canada, and Mexico.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/swift/swift.png",
			linkText: "View Project",
			link: "/project/wuno",
			tags: ["ios", "ai"],
		},

		{
			id: "credifiel",
			title: "Credifiel Datathon (2nd Place)",
			description:
				"Data analysis and automation model optimizing credit recovery efficiency. Reduced ineffective collection strategies from 25 to 13, increasing recovery success by 18%. Ranked 2nd among 100 national teams through advanced data analysis and machine learning techniques.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View Project",
			link: "/project/credifiel",
			tags: ["python", "ai"],
		},

		{
			id: "awaq",
			title: "AWAQ - Environmental Platform",
			description:
				"Web platform promoting environmental preservation and social impact. Designed and implemented backend using REST API with MySQL integration. Built frontend with React, JavaScript, HTML, and CSS, including a Unity-based educational video game for environmental awareness.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			linkText: "View Project",
			link: "/project/awaq",
			tags: ["web"],
		},

		{
			id: "iberdrola",
			title: "Hackathon Iberdrola (3rd Place)",
			description:
				"Developed technology for delivering affordable and sustainable energy to rural Oaxaca communities. Created scalable, inclusive energy access solutions benefiting over 4,500 residents. Placed 3rd out of 40 national teams with focus on social commitment and sustainable development.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			linkText: "View Project",
			link: "/project/iberdrola",
			tags: ["web"],
		},
	],
};

export default INFO;
