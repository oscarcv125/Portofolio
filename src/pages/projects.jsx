import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import anime from "animejs";

import NavBar from "../components/common/navBar";
import ProjectCard from "../components/projects/ProjectCard";

import INFO from "../data/user";
import SEO from "../data/seo";

const Projects = () => {
	const [filter, setFilter] = useState("all");
	const [filteredProjects, setFilteredProjects] = useState(INFO.projects);
	
	const headerRef = useRef(null);
	const projectsRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		anime({
			targets: [headerRef.current, projectsRef.current],
			translateY: [50, 0],
			opacity: [0, 1],
			duration: 1000,
			easing: 'easeOutQuart',
			delay: anime.stagger(200, {start: 300})
		});
	}, []);

	useEffect(() => {
		if (filter === "all") {
			setFilteredProjects(INFO.projects);
		} else {
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
		<div className="min-h-screen overflow-hidden dark:bg-[#050505] bg-[#fafafa]">
			<Helmet>
				<title>{`Projects | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO?.description || ""} />
				<meta name="keywords" content={currentSEO?.keywords.join(", ") || ""} />
			</Helmet>

			<NavBar />

			<div className="relative px-8 md:px-12 pt-40 pb-20 max-w-7xl mx-auto">
				{/* Header */}
				<div ref={headerRef} className="opacity-0 mb-16 border-b border-editorial pb-12">
					<h1 className="text-6xl md:text-8xl font-bold font-serif mb-6 text-black dark:text-white">
						Selected<br/>Works.
					</h1>
					<p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-12">
						Things I've made trying to put my dent in the universe.
					</p>

					{/* Filter Buttons */}
					<div className="flex flex-wrap gap-4">
						{filters.map((item) => (
							<button
								key={item.id}
								onClick={() => setFilter(item.id)}
								className={`px-6 py-2 text-sm font-bold tracking-widest uppercase transition-all duration-300 border ${
									filter === item.id
										? "border-accent bg-accent text-white"
										: "border-editorial bg-transparent text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white"
								}`}
							>
								{item.label}
							</button>
						))}
					</div>
				</div>

				{/* Projects Grid */}
				<div ref={projectsRef} className="opacity-0 min-h-[500px]">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredProjects.map((project, index) => (
							<ProjectCard key={project.id || index} project={project} index={index} />
						))}
					</div>

					{/* No Results */}
					{filteredProjects.length === 0 && (
						<div className="text-center py-32 border border-editorial border-dashed mt-8">
							<p className="text-xl text-gray-500 font-light tracking-widest uppercase">
								No projects found with this filter
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Projects;
