import { cloudflareEnv } from '@payload-config'

type SendEmailBinding = {
  send: (msg: {
    to: string
    from: { email: string; name?: string }
    replyTo?: string
    subject: string
    text: string
    html?: string
  }) => Promise<{ messageId: string }>
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Sends a notification e-mail via Cloudflare Email Service (binding "EMAIL").
 * Never throws: the form entry is already stored in the CMS either way.
 */
export async function notify({ subject, lines, replyTo }: { subject: string; lines: [string, string][]; replyTo?: string }) {
  try {
    const env = cloudflareEnv
    const email = (env as unknown as { EMAIL?: SendEmailBinding }).EMAIL
    const to = process.env.CONTACT_TO || (env as any).CONTACT_TO
    const from = process.env.CONTACT_FROM || (env as any).CONTACT_FROM
    if (!email || !to || !from) {
      console.warn('E-mail notification skipped: EMAIL binding or CONTACT_TO/CONTACT_FROM missing')
      return
    }
    const text = lines.map(([k, v]) => `${k}: ${v}`).join('\n\n')
    const html = lines
      .map(([k, v]) => `<p><strong>${escape(k)}:</strong><br>${escape(v).replace(/\n/g, '<br>')}</p>`)
      .join('')
    await email.send({ to, from: { email: from, name: 'martinferfers.de' }, replyTo, subject, text, html })
  } catch (err) {
    console.error('E-mail notification failed', err)
  }
}
