"use client"

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InputWithButton() {
  const [longUrl, setLongUrl] = React.useState("")

  const [shortUrl, setShortUrl] = React.useState("")

  async function shorten() {
    const data = {
      url: longUrl
    }

    const response = await fetch('/api/links', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    const body = await response.json();
    setShortUrl(`https://supr.st/${body.code}`)
  }

  function reset() {
    setShortUrl("")
    setLongUrl("")
  }

  if (shortUrl) {
    return (
      <div className='flex items-center justify-center space-x-2'>
        <Input type="url" disabled value={shortUrl} />
        <Button type="submit" onClick={e => navigator.clipboard.writeText(shortUrl)}>Copy</Button>
        <Button type="submit" onClick={e => reset()}>Another!</Button>
      </div>
    )
  } else {
    return (
      <div className='flex items-center justify-center space-x-2'>
        <Input type="url" autoFocus placeholder="Long url" value={longUrl} onChange={e => setLongUrl(e.target.value)} />
        <Button type="submit" onClick={e => shorten()}>Shorten</Button>
      </div>
    )
  }
}