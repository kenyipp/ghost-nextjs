export const getGridSize = (index: number) => {
	if (index < 1) {
		return {
			xs: 12,
			sm: 12,
			md: 12,
			lg: 12
		};
	}
	if (index < 4) {
		return {
			xs: 12,
			sm: 12,
			md: 6,
			lg: 4
		};
	}
	if (index < 7) {
		return {
			xs: 12,
			sm: 12,
			md: 6,
			lg: 6
		};
	}
	return {
		xs: 12,
		sm: 12,
		md: 6,
		lg: 4
	};
};
