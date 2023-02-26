/* eslint-disable */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GHOST_DOMAIN: string,
			GHOST_PUBLIC_API_KEY: string
		}
	}
}

declare module "react" {
	interface HTMLAttributes<T> extends DOMAttributes<T> {
		disable?: boolean
	}
}

/**
 *
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 *
 */
export { };
