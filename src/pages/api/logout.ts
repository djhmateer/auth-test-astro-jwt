import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, session }) => {
	// Get client IP for logging (with fallback)
	const clientIP = request.headers.get('x-forwarded-for') ||
					 request.headers.get('x-real-ip') ||
					 'unknown';

	// Check if user was authenticated before logging out
	const wasAuthenticated = await session.get('authenticated');

	// Destroy the session (removes all session data)
	await session.destroy();

	// Log logout event
	if (wasAuthenticated) {
		console.log(JSON.stringify({
			timestamp: new Date().toISOString(),
			event: 'AUTH_SUCCESS',
			action: 'logout',
			clientIP,
			message: 'User successfully logged out'
		}));
	}

	return new Response(null, {
		status: 302,
		headers: {
			'Location': '/',
		},
	});
};