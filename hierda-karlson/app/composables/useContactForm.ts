import { ref, reactive } from 'vue'

export function useContactForm() {
  const submitted = ref(false)

  const fields = reactive({
    name: '',
    email: '',
    message: '',
  })

  function submit(e: Event) {
    e.preventDefault()
    // Static site — no backend. Show thank-you state.
    submitted.value = true
    fields.name = ''
    fields.email = ''
    fields.message = ''
  }

  return { fields, submitted, submit }
}
