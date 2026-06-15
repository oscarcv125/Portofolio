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

	articles: {
		title: "I'm passionate about pushing the boundaries of what's possible and inspiring the next generation of innovators.",
		description:
			"Chronological collection of my long-form thoughts on programming, leadership, product design, and more.",
	},

	projects: [{
			id: "clarity",
			mainLogo: "/logos/clarity.png",
			title: "claRity (DislexIA)",
			description:
				"100% On-device iOS application designed to assist users with dyslexia. Built entirely in Swift 6 and SwiftUI, it leverages Apple's Foundation Models for on-device AI, Vision framework for OCR, and custom TTS synchronization to provide real-time reading assistance without requiring network calls.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"],
			linkText: "View Project",
			link: "/project/clarity",
			tags: ["ios", "ai"],
		},

		{
			id: "financesmart",
			mainLogo: "/logos/financesmart.svg",
			title: "FinanceSmart — Fortia AI",
			description:
				"Personal financial advisor with conversational AI, developed for Banorte. Full-stack web application combining a financial dashboard with an LLM-powered coach that uses a deterministic RAG pipeline to provide accurate insights based on real user data and Banorte products.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"],
			linkText: "View Project",
			link: "/project/financesmart",
			tags: ["web", "ai", "python"],
		},

		{
			id: "kaapeh",
			mainLogo: "/logos/kaapeh.png",
			title: "Kaapeh Mexico - Coffee Traceability App",
			description:
				"iOS mobile app for coffee traceability using Blockchain technology. Collaborated with a global team to implement blockchain-based tracking ensuring product quality and transparency. Built with SwiftUI and SwiftData for efficient data management.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"],
			linkText: "View Project",
			link: "/project/kaapeh",
			tags: ["ios", "web"],
		},

		{
			id: "heatshield",
			mainLogo: "/logos/heatshield.jpg",
			title: "HeatShield (1st Place)",
			description:
				"Award-winning iOS app protecting users during extreme heat events using OpenWeatherMap and Apple Maps. Implemented alerts and shelter locator with persistent data storage. Reached 500+ active users in pilot testing. Won 1st place at Swift Challenge Fest for innovation and complete functionality.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"],
			linkText: "View Project",
			link: "/project/heatshield",
			tags: ["ios"],
		},

		{
			id: "credifiel",
			mainLogo: "/logos/credifiel.svg",
			title: "Credifiel Datathon (2nd Place)",
			description:
				"Data analysis and automation model optimizing credit recovery efficiency. Reduced ineffective collection strategies from 25 to 13, increasing recovery success by 18%. Ranked 2nd among 100 national teams through advanced data analysis and machine learning techniques.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg"],
			linkText: "View Project",
			link: "/project/credifiel",
			tags: ["python", "ai"],
		},

		{
			id: "iberdrola",
			mainLogo: "/logos/iberdrola.svg",
			title: "Hackathon Iberdrola (3rd Place)",
			description:
				"Developed technology for delivering affordable and sustainable energy to rural Oaxaca communities. Created scalable, inclusive energy access solutions benefiting over 4,500 residents. Placed 3rd out of 40 national teams with focus on social commitment and sustainable development.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"],
			linkText: "View Project",
			link: "/project/iberdrola",
			tags: ["web"],
		},

		{
			id: "gategenie",
			mainLogo: "/logos/gategenius.svg",
			title: "GateGenie (HackMTY 2025)",
			description:
				"AI-powered airline catering intelligence platform for iOS. Features expiration tracking with Gemini Vision API for product scanning, consumption prediction analytics, workforce productivity optimization, and smart flight assignment. Built for HackMTY 2025 addressing a $164M industry problem.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg"],
			linkText: "View Project",
			link: "/project/gategenie",
			tags: ["ios", "ai", "web"],
		},

		{
			id: "wuno",
			mainLogo: "/logos/wuno.png",
			title: "WUNO - World Cup 2026 App",
			description:
				"FIFA World Cup 2026 companion app built with SwiftUI and SwiftData. Features match tracking, AI-powered insights using Foundation Models, App Shortcuts integration, and comprehensive tournament information for all World Cup 2026 matches across USA, Canada, and Mexico.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"],
			linkText: "View Project",
			link: "/project/wuno",
			tags: ["ios", "ai"],
		},

		{
			id: "helpdoku",
			mainLogo: "/logos/helpdoku.png",
			title: "HelpDoku - AI Sudoku Assistant",
			description:
				"Intelligent Sudoku puzzle assistant powered by Apple Intelligence. Built with SwiftUI and Foundation Models API to provide AI-generated strategic hints for solving Sudoku puzzles. Features real-time validation, cell highlighting, and adaptive layouts for iPhone and iPad with natural language puzzle guidance.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"],
			linkText: "View Project",
			link: "/project/helpdoku",
			tags: ["ios", "ai"],
		},

		{
			id: "semex",
			mainLogo: "/logos/semex.png",
			title: "Semex Traffic Simulation",
			description:
				"Intelligent traffic light system developed in collaboration with Semex (Semáforos Mexicanos). Agent-based traffic simulation in Python with AgentPy and socket communication, modeled autonomous car agents and optimized light coordination, improving simulated traffic flow by 35%. Integrated Unity visualization for real-time testing.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg"],
			linkText: "View Project",
			link: "/project/semex",
			tags: ["python"],
		},

		{
			id: "awaq",
			mainLogo: "/logos/awaq.png",
			title: "AWAQ - Environmental Platform",
			description:
				"Web platform promoting environmental preservation and social impact. Designed and implemented backend using REST API with MySQL integration. Built frontend with React, JavaScript, HTML, and CSS, including a Unity-based educational video game for environmental awareness.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg"],
			linkText: "View Project",
			link: "/project/awaq",
			tags: ["web"],
		},

		{
			id: "arcachurn",
			mainLogo: "/logos/arcachurn.png",
			title: "Arca Continental Churn Analysis",
			description:
				"Web application for data visualization and management of customer churn predictions for Arca Continental. Built with React, Vite, and Recharts, it features interactive dashboards and analytics tools to help identify at-risk clients and optimize retention strategies.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"],
			linkText: "View Project",
			link: "/project/arcachurn",
			tags: ["web"],
		},

		{
			id: "commonground",
			mainLogo: "/logos/commonground.png",
			title: "CommonGround - Community Exchange",
			description:
				"Hyperlocal community exchange platform where neighbors trade skills and time using Community Credits. Full-stack application with a React frontend and Node/PostgreSQL backend. Features an intelligent AI matching system powered by Anthropic Claude to surface compatible needs and offers.",
			logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"],
			linkText: "View Project",
			link: "/project/commonground",
			tags: ["web", "ai"],
		}
	],
};

export default INFO;
