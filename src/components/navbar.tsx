'use client'

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Home, Code2Icon, Phone } from 'lucide-react';

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
				className="flex items-center gap-1 py-2 px-3 rounded-full border border-neutral-800/50 bg-neutral-900/80 backdrop-blur-2xl shadow-2xl shadow-black/50 pointer-events-auto"
				whileHover={{ scale: 1.02 }}
				transition={{ type: 'spring', stiffness: 400, damping: 25 }}
			>
				{navLinks.map((link) => {
					const isActive = pathname === link.href;
					const Icon = link.icon;
					
					return (
						<Link key={link.href} href={link.href}>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								className={cn(
									'relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300',
									isActive
										? 'text-white'
										: 'text-neutral-400 hover:text-neutral-200',
								)}
							>
								<Icon className="h-[18px] w-[18px] relative z-10" />
								{isActive && (
									<motion.div
										layoutId="activeNavIndicator"
										className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-700/80 to-neutral-800/80 border border-neutral-600/30"
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
			</motion.div>
		</motion.nav>
	);
}
