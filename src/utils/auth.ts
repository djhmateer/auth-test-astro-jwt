import type { AstroGlobal } from 'astro';

/**
 * Authentication utility for Astro session-based authentication
 * Handles session validation, expiration detection, and redirects
 */

export interface AuthResult {
	isAuthenticated: boolean;
	loginTime?: string;
	currentTime: string;
}

export async function checkAuthentication(Astro: AstroGlobal): Promise<AuthResult | Response> {
	// TypeScript guard: Prevent compiler warnings about undefined session
	if (!Astro.session) throw new Error('Session not available');

	// Check authentication using session
	const isAuthenticated = await Astro.session.get('authenticated');

	// Get session ID from cookie to detect expired sessions
	const sessionCookie = Astro.request.headers.get('cookie');
	const hasSessionCookie = sessionCookie && sessionCookie.includes('astro-session');

	if (!isAuthenticated) {
		if (hasSessionCookie) {
			// User has session cookie but session.get() returned null = expired session
			console.log('User has a session cookie but session.get() returned null so session expired - redirecting to login');
		} else {
			// No session cookie = first visit or no login attempt
			console.log('No session found - redirecting to login');
		}

		// Store the current URL for redirect after login
		const currentPath = Astro.url.pathname;
		const loginUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;

		return Astro.redirect(loginUrl, 302);
	}

	// Get login time from session
	const loginTime = await Astro.session.get('loginTime');
	const currentTime = new Date().toLocaleString();

	return {
		isAuthenticated: true,
		loginTime,
		currentTime
	};
}