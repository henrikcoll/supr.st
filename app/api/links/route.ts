import {customAlphabet} from 'nanoid';
import { kv } from '@vercel/kv';

const nanoid = customAlphabet('useandomTPXpxJACKVERYMINDBUSHWOLFGQZbfghjklqvwyzrict', 5);

export async function POST(request: Request) {
	const body = await request.json();
	const id = nanoid(5)

	kv.set(`${id}.url`, body.url)
	kv.set(`${id}.visits`, 0)

	return new Response(JSON.stringify({ code: id }), {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	});
}

export const dynamic = 'force-dynamic';