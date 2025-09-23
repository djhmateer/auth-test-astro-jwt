import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, session }) => {
	const formData = await request.formData();
	const password = formData.get('password') as string;

	// Get client IP for logging (with fallback)
	const clientIP = request.headers.get('x-forwarded-for') ||
					 request.headers.get('x-real-ip') ||
					 'unknown';

	// Simple password check - change this password as needed
	if (password === 'secret123') {
		const loginTime = new Date().toISOString();

		// Set session authentication
		await session.set('authenticated', true);
		await session.set('loginTime', loginTime);

		// Log successful login
		console.log(JSON.stringify({
			timestamp: loginTime,
			event: 'AUTH_SUCCESS',
			action: 'login',
			clientIP,
			message: 'User successfully logged in'
		}));

		return new Response(null, {
			status: 302,
			headers: {
				'Location': '/projects',
			},
		});
	}

	// Log failed login attempt
	console.log(JSON.stringify({
		timestamp: new Date().toISOString(),
		event: 'AUTH_FAILURE',
		action: 'login',
		clientIP,
		message: 'Invalid password attempt'
	}));

	// Invalid password - redirect back to login with error
	return new Response(null, {
		status: 302,
		headers: {
			'Location': '/login?error=invalid',
		},
	});
};