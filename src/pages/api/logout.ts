import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ session }) => {
	// Destroy the session (removes all session data)
	await session.destroy();

	return new Response(null, {
		status: 302,
		headers: {
			'Location': '/',
		},
	});
};