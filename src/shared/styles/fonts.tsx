import React from "react";

export const Fonts: React.FC = () => {
	return (
		<style jsx global>{`
		@font-face {
			font-family: 'NunitoSans Regular';
			src: url('/fonts/NunitoSans-Regular.ttf');
			font-display: fallback; /* Define how the browser behaves during download */
		}
		@font-face {
			font-family: 'NunitoSans Bold';
			src: url('/fonts/NunitoSans-Bold.ttf');
			font-display: fallback; /* Define how the browser behaves during download */

		}
		@font-face {
			font-family: 'NunitoSans SemiBold';
			src: url('/fonts/NunitoSans-SemiBold.ttf');
			font-display: fallback; /* Define how the browser behaves during download */

		}
	`}</style>
	)
}