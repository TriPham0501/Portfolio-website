// import * as React from 'react';

// type GlowCardProps = {
// 	title?: string;
// 	imageUrl?: string;
// 	imageAlt?: string;
// 	children?: React.ReactNode;
// 	className?: string;
// };

// const GlowCard: React.FC<GlowCardProps> = ({
// 	title = 'Magic Card',
// 	imageUrl,
// 	imageAlt,
// 	children,
// 	className = '',
// }) => {
// 	return (
// 		<div
// 			className={[
// 				'group relative z-[1] w-full max-w-[190px] rounded-2xl p-[5px]',
// 				'bg-gradient-to-l from-[#f7ba2b] to-[#ea5358]',
// 				className,
// 			]
// 				.filter(Boolean)
// 				.join(' ')}
// 		>
// 			<div
// 				aria-hidden="true"
// 				className={[
// 					'pointer-events-none absolute inset-x-0 top-[30px] -z-[1] h-full w-full scale-90',
// 					'bg-gradient-to-l from-[#f7ba2b] to-[#ea5358] blur-[25px]',
// 					'transition-opacity duration-500 group-hover:opacity-0',
// 				].join(' ')}
// 			/>

// 			<div
// 				className={[
// 					'flex min-h-[254px] w-full items-center justify-center overflow-hidden rounded-xl',
// 					'bg-[#181818] px-4 py-6 text-[#181818] transition-colors duration-1000',
// 					'group-hover:text-[#f7ba2b]',
// 					'sm:min-h-[254px]',
// 				].join(' ')}
// 			>
// 				{children ||
// 					(imageUrl ? (
// 						<img
// 							src={imageUrl}
// 							alt={imageAlt || title}
// 							className="h-full max-h-[240px] w-full rounded-lg object-cover"
// 						/>
// 					) : (
// 						<p className="text-center text-base font-bold tracking-[0.1em]">{title}</p>
// 					))}
// 			</div>
// 		</div>
// 	);
// };

// export default GlowCard;
