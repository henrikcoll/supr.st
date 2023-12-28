import { kv } from '@vercel/kv';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const url = await kv.get(`${params.id}.url`)

	if (!url) {
		return new Response('Link not found', {
			status: 404,
		})
	}

	const visits = await kv.get(`${params.id}.visits`)

	return new Response(JSON.stringify({ url, visits }), {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	})
}

export const dynamic = 'force-dynamic';