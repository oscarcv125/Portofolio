import React from "react";
import { motion } from "framer-motion";

const ECHO_COUNT = 7;
const REST_STEP_X = 5;
const REST_STEP_Y = 3;
const HOVER_STEP_X = 3;
const HOVER_STEP_Y = 2;

const transition = { type: "spring", bounce: 0.6, duration: 0.45 };

const Letter = ({ char, topColor }) => (
	<motion.span
		className="relative inline-block text-black"
		initial="rest"
		whileHover="hover"
		animate="rest"
	>
		<span className="relative invisible">{char}</span>

		{Array.from({ length: ECHO_COUNT }, (_, i) => {
			const restX = -(ECHO_COUNT - i) * REST_STEP_X;
			const hoverX = restX + i * HOVER_STEP_X;
			const restY = (ECHO_COUNT - i) * REST_STEP_Y;
			const hoverY = restY - i * HOVER_STEP_Y;
			const variants = {
				rest: { x: restX, y: restY, transition },
				hover: { x: hoverX, y: hoverY, transition },
			};
			return (
				<motion.span
					key={`echo-${i}`}
					aria-hidden="true"
					className="absolute top-0 left-0 pointer-events-none select-none text-black"
					style={{ zIndex: 1 }}
					variants={variants}
				>
					{char}
				</motion.span>
			);
		})}

		<motion.span
			aria-hidden="true"
			className={`absolute top-0 left-0 pointer-events-none select-none ${topColor}`}
			style={{
				WebkitTextStroke: "2px black",
				paintOrder: "stroke fill",
				zIndex: 50,
			}}
			variants={{
				rest: { x: 0, y: 0, transition },
				hover: { x: ECHO_COUNT * HOVER_STEP_X, y: -ECHO_COUNT * HOVER_STEP_Y, transition },
			}}
		>
			{char}
		</motion.span>
	</motion.span>
);

const EchoText = ({ text, className = "", fontFamily, topColor = "text-white" }) => (
	<span
		className={`inline-block ${className}`}
		aria-label={text}
		style={fontFamily ? { fontFamily } : undefined}
	>
		{text.split("").map((char, i) =>
			char === " " ? (
				<span key={i} className="inline-block">&nbsp;</span>
			) : (
				<Letter key={i} char={char} topColor={topColor} />
			),
		)}
	</span>
);

export default EchoText;
