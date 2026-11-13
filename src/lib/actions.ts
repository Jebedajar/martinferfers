'use server'
import config from '@payload-config'
import { getPayload } from 'payload'
import { notify } from '@/lib/notify'

export type FormState = { status: 'idle' | 'ok' | 'error'; message?: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TEXT = {
  de: {
    missing: 'Bitte gib Deinen Namen, Deine E-Mail-Adresse und eine Nachricht ein.',
    sent: 'Danke! Deine Nachricht ist angekommen.',
    failed: 'Das hat leider nicht geklappt. Bitte versuch es gleich noch einmal.',
  },
  en: {
    missing: 'Please fill in your name, email address and message.',
    sent: 'Thank you! Your message has been sent.',
    failed: 'That did not work. Please try again in a moment.',
  },
}

function isSpam(form: FormData) {
  // Honeypot: real visitors never fill the hidden "website" field
  if (String(form.get('website') || '').trim()) return true
  // Bots submit instantly; people need at least two seconds
  const started = Number(form.get('started') || 0)
  return started > 0 && Date.now() - started < 2000
}

export async function sendMessage(_prev: FormState, form: FormData): Promise<FormState> {
  const t = form.get('lang') === 'en' ? TEXT.en : TEXT.de
  const name = String(form.get('name') || '').trim()
  const email = String(form.get('email') || '').trim()
  const message = String(form.get('message') || '').trim()
  if (!name || !EMAIL.test(email) || !message) return { status: 'error', message: t.missing }
  if (isSpam(form)) return { status: 'ok', message: t.sent }
  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'messages',
      data: { name: name.slice(0, 200), email: email.slice(0, 200), message: message.slice(0, 5000) },
      overrideAccess: true,
    })
    await notify({
      subject: `martinferfers.de – Nachricht von ${name.slice(0, 80)}`,
      lines: [['Name', name], ['E-Mail', email], ['Nachricht', message]],
      replyTo: email,
    })
    return { status: 'ok', message: t.sent }
  } catch (err) {
    console.error('sendMessage failed', err)
    return { status: 'error', message: t.failed }
  }
}
