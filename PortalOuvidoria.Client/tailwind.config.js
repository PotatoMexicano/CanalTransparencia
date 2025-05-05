const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			'color-1': 'hsl(var(--color-1))',
    			'color-2': 'hsl(var(--color-2))',
    			'color-3': 'hsl(var(--color-3))',
    			'color-4': 'hsl(var(--color-4))',
    			'color-5': 'hsl(var(--color-5))',
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		keyframes: {
    			'aurora-border': {
    				'0%, 100%': {
    					borderRadius: '37% 29% 27% 27% / 28% 25% 41% 37%'
    				},
    				'25%': {
    					borderRadius: '47% 29% 39% 49% / 61% 19% 66% 26%'
    				},
    				'50%': {
    					borderRadius: '57% 23% 47% 72% / 63% 17% 66% 33%'
    				},
    				'75%': {
    					borderRadius: '28% 49% 29% 100% / 93% 20% 64% 25%'
    				}
    			},
    			'aurora-1': {
    				'0%, 100%': {
    					top: '0',
    					right: '0'
    				},
    				'50%': {
    					top: '50%',
    					right: '25%'
    				},
    				'75%': {
    					top: '25%',
    					right: '50%'
    				}
    			},
    			'aurora-2': {
    				'0%, 100%': {
    					top: '0',
    					left: '0'
    				},
    				'60%': {
    					top: '75%',
    					left: '25%'
    				},
    				'85%': {
    					top: '50%',
    					left: '50%'
    				}
    			},
    			'aurora-3': {
    				'0%, 100%': {
    					bottom: '0',
    					left: '0'
    				},
    				'40%': {
    					bottom: '50%',
    					left: '25%'
    				},
    				'65%': {
    					bottom: '25%',
    					left: '50%'
    				}
    			},
    			'aurora-4': {
    				'0%, 100%': {
    					bottom: '0',
    					right: '0'
    				},
    				'50%': {
    					bottom: '25%',
    					right: '40%'
    				},
    				'90%': {
    					bottom: '50%',
    					right: '25%'
    				}
    			},
    			'border-beam': {
    				'100%': {
    					'offset-distance': '100%'
    				}
    			},
    			shine: {
    				'0%': {
    					'background-position': '0% 0%'
    				},
    				'50%': {
    					'background-position': '100% 100%'
    				},
    				to: {
    					'background-position': '0% 0%'
    				}
    			}
    		},
    		animation: {
    			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
    			shine: 'shine var(--duration) infinite linear'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate"),
	function ({ matchUtilities, theme }) {
		matchUtilities(
			{
				"bg-grid": (value) => ({
					backgroundImage: `url("${svgToDataUri(
						`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .25H7.75V8"/></svg>`
					)}")`,
				}),
				"bg-grid-small": (value) => ({
					backgroundImage: `url("${svgToDataUri(
						`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
					)}")`,
				}),
			},
			{ values: flattenColorPalette(theme("backgroundColor")), type: "color" }
		);
	},
	],
}