import * as React from 'react';

type MultiTabsPanelProps = {
	label?: string;
	children: React.ReactNode;
};

type MultiTabsProps = {
	children: React.ReactNode;
	className?: string;
	defaultIndex?: number;
};

type PanelElement = React.ReactElement<MultiTabsPanelProps>;

const MultiTabsPanel: React.FC<MultiTabsPanelProps> = ({ children }) => {
	return <>{children}</>;
};

const clampIndex = (index: number, panelCount: number) => {
	if (panelCount <= 0) {
		return 0;
	}

	if (index < 0) {
		return 0;
	}

	if (index >= panelCount) {
		return panelCount - 1;
	}

	return index;
};

const MultiTabs: React.FC<MultiTabsProps> & { Panel: React.FC<MultiTabsPanelProps> } = ({
	children,
	className = '',
	defaultIndex = 0,
}) => {
	const panels = React.Children.toArray(children).filter(React.isValidElement) as PanelElement[];
	const safeDefaultIndex = clampIndex(defaultIndex, panels.length);
	const [activeIndex, setActiveIndex] = React.useState(safeDefaultIndex);

	React.useEffect(() => {
		setActiveIndex((currentIndex) => clampIndex(currentIndex, panels.length));
	}, [panels.length]);

	if (!panels.length) {
		return null;
	}

	const activePanel = panels[activeIndex];

	return (
		<div className={['w-full rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.35),0_0_40px_rgba(99,102,241,0.15)]', className].filter(Boolean).join(' ')}>
			<div className="rounded-t-xl bg-[#1c1c4e] px-3 pt-3 sm:px-5 md:px-7 md:pt-4">
				<div className="flex items-end gap-3 overflow-x-auto pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					{panels.map((panel, index) => {
						const isActive = index === activeIndex;
						const label = panel.props.label || 'Tab ' + (index + 1);

						return (
							<button
								key={label + '-' + index}
								type="button"
								onClick={() => setActiveIndex(index)}
								className={[
									'relative -mb-px shrink-0 rounded-t-xl border-4 border-b-0 border-transparent px-5 py-2.5 text-base transition-all duration-150 sm:px-6 sm:text-lg',
									'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1c4e]',
									isActive
										? 'border-[#1c1c4e] bg-[#182034] font-semibold text-white'
										: 'bg-transparent font-medium text-white hover:bg-white/10 hover:text-white/90',
								].join(' ')}
								role="tab"
								aria-selected={isActive}
								aria-controls={'multi-tabs-panel-' + index}
								id={'multi-tabs-tab-' + index}
							>
								<span className="relative z-[1] block whitespace-nowrap">{label}</span>
							</button>
						);
					})}
				</div>
			</div>

			<div className="rounded-b-xl bg-[#1c1c4e] px-1 pb-1">
				<div
					className="rounded-b-xl border-4 border-[#1c1c4e] border-t-0 bg-[#182034] p-5 pb-6 text-base text-slate-900 sm:p-6"
					role="tabpanel"
					id={'multi-tabs-panel-' + activeIndex}
					aria-labelledby={'multi-tabs-tab-' + activeIndex}
				>
					<div className="animate-[fadeIn_0.25s_ease-out]">{activePanel.props.children}</div>
				</div>
			</div>
		</div>
	);
};

MultiTabs.Panel = MultiTabsPanel;

export default MultiTabs;
