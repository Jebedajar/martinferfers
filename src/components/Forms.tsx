'use client'
import { useActionState, useEffect, useState } from 'react'
import { sendMessage, type FormState } from '@/lib/actions'
import { KIT, UI } from '@/content/site'
import type { Lang } from '@/lib/i18n'

const initial: FormState = { status: 'idle' }

function Guard() {
  const [started, setStarted] = useState(0)
  useEffect(() => setStarted(Date.now()), [])
  return (
    <>
      <input type="hidden" name="started" value={started} />
      <div className="hp" aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  )
}

function Status({ state }: { state: FormState }) {
  if (state.status === 'idle') return null
  return (
    <p className={`form-status form-status-${state.status}`} role="status">
      {state.message}
    </p>
  )
}

/**
 * Sign-up form for the Inspiration Newsletter. Posts to the Kit form of the page language
 * (kit.com → Landing pages & forms → "Inspiration Newsletter DE/EN"), so Kit sends its
 * double-opt-in mail and you can see in Kit which language a subscriber wants.
 * Without JavaScript the browser posts directly to Kit.
 */
export function KitForm({ lang, compact = false, withName = false }: { lang: Lang; compact?: boolean; withName?: boolean }) {
  const ui = UI[lang].form
  const formId = KIT.forms[lang]
  const action = `https://app.kit.com/forms/${formId}/subscriptions`
  const [state, setState] = useState<FormState & { pending?: boolean }>(initial)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if ((form.elements.namedItem('website') as HTMLInputElement | null)?.value) return
    setState({ status: 'idle', pending: true })
    try {
      const res = await fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      const data = (await res.json().catch(() => ({}))) as { status?: string }
      if (res.ok && data.status !== 'failed') setState({ status: 'ok', message: ui.subscribed })
      else setState({ status: 'error', message: ui.subscribeError })
    } catch {
      // e.g. blocked by a browser extension: fall back to a normal form post to Kit
      form.submit()
    }
  }

  if (state.status === 'ok') return <Status state={state} />
  return (
    <form action={action} method="post" onSubmit={onSubmit} className={compact ? 'form form-inline kit-form' : 'form kit-form'}>
      <div className="hp" aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {withName && (
        <label className="field">
          <span>{ui.firstName}</span>
          <input name="fields[first_name]" autoComplete="given-name" />
        </label>
      )}
      <label className="field">
        <span>{ui.email}</span>
        <input name="email_address" type="email" required autoComplete="email" />
      </label>
      <button className="button" type="submit" disabled={state.pending}>
        {state.pending ? ui.subscribing : ui.subscribe}
      </button>
      <Status state={state} />
      <p className="form-note">{ui.privacy}</p>
    </form>
  )
}

export function ContactForm({ lang }: { lang: Lang }) {
  const ui = UI[lang].form
  const [state, action, pending] = useActionState(sendMessage, initial)
  if (state.status === 'ok') return <Status state={state} />
  return (
    <form action={action} className="form">
      <Guard />
      <input type="hidden" name="lang" value={lang} />
      <label className="field">
        <span>{ui.name}</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label className="field">
        <span>{ui.email}</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="field">
        <span>{ui.message}</span>
        <textarea name="message" rows={6} required />
      </label>
      <button className="button" type="submit" disabled={pending}>
        {pending ? ui.sending : ui.send}
      </button>
      <Status state={state} />
    </form>
  )
}
