import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ session }) => {
	// Check if user was authenticated before logging out
	const wasAuthenticated = await session.get('authenticated');

	// Destroy the session (removes all session data)
	await session.destroy();

	// Log logout event
	if (wasAuthenticated) {
		console.log('User logged out');
	}

	return new Response(null, {
		status: 302,
		headers: {
			'Location': '/',
		},
	});
};