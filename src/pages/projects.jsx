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
			// Filter by checking if project has the selected tag
			const filtered = INFO.projects.filter(project => {
				return project.tags && project.tags.includes(filter);
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
						<p className="text-xl dark:text-gray-200 text-gray-800 max-w-3xl mx-auto mb-8">
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
											? "bg-gradient-to-r from-teal-500 via-emerald-500 to-green-600 text-white"
											: "glass-strong dark:text-gray-200 text-gray-800 dark:hover:text-white hover:text-gray-900"
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
				</div>
			</div>
		</div>
	);
};

export default Projects;
