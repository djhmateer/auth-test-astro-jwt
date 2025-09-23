import type { APIRoute } from 'astro';

/**
 * LOGOUT API ENDPOINT - Handles session destruction and user logout
 *
 * LOGOUT FLOW:
 * 1. User clicks logout button/form which POSTs to /api/logout
 * 2. Check if user was actually authenticated (for logging purposes)
 * 3. Destroy the entire server-side session
 * 4. Redirect user back to homepage
 *
 * SESSION DESTRUCTION:
 * - session.destroy() removes the session file from node_modules/.astro/sessions/
 * - Browser still has the session cookie, but it now points to non-existent session
 * - Astro treats requests with invalid session IDs as unauthenticated
 * - No need to manually clear browser cookies - they become useless
 *
 * REQUESTS MADE:
 * - POST /api/logout (this endpoint)
 * - Responds with 302 redirect to / (homepage)
 * - Browser follows redirect and is now logged out
 * - Subsequent requests to protected routes will fail authentication checks
 */
export const POST: APIRoute = async ({ session }) => {
	// TypeScript guard: Prevent compiler warnings about undefined session
	if (!session) throw new Error('Session not available');

	try {
		// Check authentication status before destroying session (for logging)
		// This allows us to distinguish between legitimate logouts vs random API calls
		const wasAuthenticated = await session.get('authenticated');

		// DESTROY SESSION: This completely removes the session from server storage
		// - Deletes the session file from node_modules/.astro/sessions/[session-id]
		// - User's session cookie becomes invalid (points to non-existent session)
		// - All session data (authenticated, loginTime, etc.) is permanently lost
		await session.destroy();

		// Log the logout event (only if user was actually logged in)
		if (wasAuthenticated) {
			console.log('User logged out');
		}
	} catch (error) {
		// Log error but still redirect (graceful degradation)
		console.error('Error during logout:', error);
	}

	// Redirect to homepage
	// User is now effectively logged out and will need to re-authenticate
	// to access any protected routes
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/',
		},
	});
};