"use client"

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/components/ui/alert"

export default function InputWithButton() {
	const [shortUrl, setShortUrl] = React.useState("")

	const [longUrl, setLongUrl] = React.useState(null)
	const [visits, setVisits] = React.useState(null)

	async function getStats() {
		const response = await fetch(`/api/links/${shortUrl.replace('https://supr.st/', '')}`);

		const body = await response.json();
		setLongUrl(body.url)
		setVisits(body.visits)
	}
	return (
		<div className="flex flex-col space-y-2">
			<div className='flex items-center justify-center h-1/2 space-x-2'>
				<Input type="url" autoFocus placeholder="Short url" value={shortUrl} onChange={e => setShortUrl(e.target.value)} />
				<Button type="submit" onClick={e => getStats()}>Check</Button>
			</div>
			{longUrl && (
				<div className="flex space-x-2">
					<Alert>
						<AlertTitle>Url</AlertTitle>
						<AlertDescription>
							{longUrl}
						</AlertDescription>
					</Alert>
					<Alert>
						<AlertTitle>Visits</AlertTitle>
						<AlertDescription>
							{visits}
						</AlertDescription>
					</Alert>
				</div>
			)}
		</div>
	)
}