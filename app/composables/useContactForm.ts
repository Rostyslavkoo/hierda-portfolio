import { ref, reactive } from 'vue'

/** Inbox that receives contact-form messages. */
const RECIPIENT = 'gerdakarlson.o@gmail.com'

export function useContactForm() {
  const submitted = ref(false)

  const fields = reactive({
    name: '',
    email: '',
    message: '',
  })

  function submit(e: Event) {
    e.preventDefault()

    // Static site — no backend. Hand the message off to the visitor's mail
    // client, pre-addressed to the studio inbox with the form data filled in.
    const subject = `Website enquiry — ${fields.name || 'New message'}`
    const body =
      `Name: ${fields.name}\n` +
      `Email: ${fields.email}\n\n` +
      `${fields.message}\n`

    const href =
      `mailto:${RECIPIENT}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    if (import.meta.client) window.location.href = href

    submitted.value = true
    fields.name = ''
    fields.email = ''
    fields.message = ''
  }

  return { fields, submitted, submit }
}
