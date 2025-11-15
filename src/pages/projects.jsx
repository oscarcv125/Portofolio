import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import NavBar from "../components/common/navBar";
import ProjectCard from "../components/projects/ProjectCard";
import ParticlesBackground from "../components/common/ParticlesBackground";

import INFO from "../data/user";
import SEO from "../data/seo";

const Projects = () => {
	const [filter, setFilter] = useState("all");
	const [filteredProjects, setFilteredProjects] = useState(INFO.projects);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (filter === "all") {
			setFilteredProjects(INFO.projects);
		} else {
			// Simple filter by checking if description contains certain keywords
			const filtered = INFO.projects.filter(project => {
				const desc = project.description.toLowerCase();
				if (filter === "ios") return desc.includes("ios") || desc.includes("swift");
				if (filter === "ai") return desc.includes("ai") || desc.includes("ml") || desc.includes("intelligence");
				if (filter === "web") return desc.includes("web") || desc.includes("react") || desc.includes("javascript");
				if (filter === "python") return desc.includes("python") || desc.includes("data");
				return true;
			});
			setFilteredProjects(filtered);
		}
	}, [filter]);

	const currentSEO = SEO.find((item) => item.page === "projects");

	const filters = [
		{ id: "all", label: "All Projects" },
		{ id: "ios", label: "iOS" },
		{ id: "ai", label: "AI/ML" },
		{ id: "web", label: "Web" },
		{ id: "python", label: "Python" },
	];

	return (
		<div className="min-h-screen overflow-hidden">
			<Helmet>
				<title>{`Projects | ${INFO.main.title}`}</title>
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
						className="text-center mb-12"
					>
						<h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
							My Projects
						</h1>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
							Things I've made trying to put my dent in the universe.
						</p>

						{/* Filter Buttons */}
						<div className="flex flex-wrap justify-center gap-4">
							{filters.map((item) => (
								<motion.button
									key={item.id}
									onClick={() => setFilter(item.id)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className={`px-6 py-3 rounded-full font-mono font-bold transition-all duration-300 ${
										filter === item.id
											? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white"
											: "glass-strong text-gray-300 hover:text-white"
									}`}
								>
									{item.label}
								</motion.button>
							))}
						</div>
					</motion.div>

					{/* Projects Grid */}
					<motion.div
						layout
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						{filteredProjects.map((project, index) => (
							<ProjectCard key={project.id} project={project} index={index} />
						))}
					</motion.div>

					{/* No Results */}
					{filteredProjects.length === 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-20"
						>
							<p className="text-2xl text-gray-400 font-mono">
								No projects found with this filter
							</p>
						</motion.div>
					)}

					{/* Stats */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
					>
						{[
							{ number: INFO.projects.length, label: "Projects Completed" },
							{ number: "3", label: "Hackathon Wins" },
							{ number: "500+", label: "App Downloads" },
							{ number: "96/100", label: "GPA" },
						].map((stat, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.6 + index * 0.1 }}
								className="glass-strong rounded-2xl p-6 text-center"
							>
								<h3 className="text-4xl font-bold gradient-text mb-2 font-mono">
									{stat.number}
								</h3>
								<p className="text-gray-400 text-sm">{stat.label}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Projects;
