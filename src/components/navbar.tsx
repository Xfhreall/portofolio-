'use client'

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Home, Code2Icon, Phone } from 'lucide-react';
import { ThemeSwitcher } from './theme-switcher';

const navLinks = [
	{ icon: Home, href: '/', label: 'Home' },
	{ icon: Code2Icon, href: '/project', label: 'Projects' },
	{ icon: Phone, href: '/contact', label: 'Contact' },
];

export function FloatingNavbar() {
	const pathname = usePathname();

	return (
		<motion.nav
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
				delay: 0.5
			}}
			className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
		>
			<motion.div
				className="relative flex items-center gap-1 py-2 px-3 rounded-full pointer-events-auto overflow-hidden"
				whileHover={{ scale: 1.02 }}
				transition={{ type: 'spring', stiffness: 400, damping: 25 }}
			>
				{/* Liquid Glass Background */}
				<div className="absolute inset-0 rounded-full bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl" />

				{/* Gradient Overlay */}
				<div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-white/20 dark:from-white/10 dark:via-transparent dark:to-white/5" />

				{/* Inner Glow Top */}
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent" />

				{/* Inner Glow Bottom */}
				<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-400/50 dark:via-neutral-600/30 to-transparent" />

				{/* Subtle Border */}
				<div className="absolute inset-0 rounded-full border border-neutral-300/80 dark:border-white/10 shadow-lg shadow-neutral-200/50 dark:shadow-black/20" />

				{/* Outer Shadow Glow */}
				<div className="absolute -inset-1 rounded-full bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 blur-xl opacity-50 dark:opacity-30 -z-10" />
				{navLinks.map((link) => {
					const isActive = pathname === link.href;
					const Icon = link.icon;

					return (
						<Link key={link.href} href={link.href}>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								className={cn(
									'relative z-10 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300',
									isActive
										? 'text-neutral-900 dark:text-white'
										: 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200',
								)}
							>
								<Icon className="h-[18px] w-[18px] relative z-10" />
								{isActive && (
									<motion.div
										layoutId="activeNavIndicator"
										className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-200/80 to-neutral-300/80 dark:from-neutral-700/80 dark:to-neutral-800/80 border border-neutral-300/50 dark:border-neutral-600/30"
										transition={{
											type: 'spring',
											stiffness: 400,
											damping: 30,
										}}
									/>
								)}
							</motion.div>
						</Link>
					);
				})}

				{/* Divider */}
				<div className="relative z-10 w-px h-6 bg-neutral-300/70 dark:bg-neutral-600/50 mx-1" />

				{/* Theme Switcher */}
				<div className="relative z-10">
					<ThemeSwitcher />
				</div>
			</motion.div>
		</motion.nav>
	);
}
