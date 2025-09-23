import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, session }) => {
	const formData = await request.formData();
	const password = formData.get('password') as string;

	// Simple password check - change this password as needed
	if (password === 'secret123') {
		// Set session authentication
		await session.set('authenticated', true);
		await session.set('loginTime', new Date().toISOString());

		return new Response(null, {
			status: 302,
			headers: {
				'Location': '/projects',
			},
		});
	}

	// Invalid password - redirect back to login with error
	return new Response(null, {
		status: 302,
		headers: {
			'Location': '/login?error=invalid',
		},
	});
};