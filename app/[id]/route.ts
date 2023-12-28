import { kv } from '@vercel/kv';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const url = await kv.get(`${params.id}.url`)

	if (!url) {
		return new Response('Link not found', {
			status: 404,
		})
	}

	kv.incr(`${params.id}.visits`)
	
	return new Response('', {
		status: 302,
		headers: {
			'Location': url as string,
		},
	})
}

export const dynamic = 'force-dynamic';