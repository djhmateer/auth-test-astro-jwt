import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, session }) => {
	const formData = await request.formData();
	const password = formData.get('password') as string;

	// Simple password check - change this password as needed
	if (password === '1') {
		const loginTime = new Date().toISOString();

		// Set session authentication
		await session.set('authenticated', true);
		await session.set('loginTime', loginTime);

		console.log('User successfully logged in');

		return new Response(null, {
			status: 302,
			headers: {
				'Location': '/projects',
			},
		});
	}

	console.log('Invalid password attempt');

	// Invalid password - redirect back to login with error
	return new Response(null, {
		status: 302,
		headers: {
			'Location': '/login?error=invalid',
		},
	});
};