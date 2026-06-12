import AOS from 'aos'
import 'aos/dist/aos.css'

/**
 * Animate-On-Scroll, tuned to the Gerda design language.
 *
 * AOS ships with bouncy easings and short durations that clash with the brand's
 * "slow and cinematic only" rule, so we lock it to editorial timing here and
 * override its easing curve in aos-overrides.css to match --ease-editorial.
 *
 * Init is deferred until the preloader lifts: AOS measures element offsets on
 * init, and while the curtain is up the page is visually frozen — measuring then
 * would mis-trigger reveals. The preloader emits `preloader:done` when it hides;
 * we also keep a timeout fallback so animations never get stranded.
 */
export default defineNuxtPlugin(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  function init() {
    AOS.init({
      duration: 900,            // ms — matches the cinematic --dur-* range
      easing: 'ease-editorial', // custom curve, see aos-overrides.css
      once: true,               // reveal once; no replay on scroll-up
      offset: 80,               // trigger slightly before the element enters
      anchorPlacement: 'top-bottom',
    })
    // Recalculate after fonts/images settle so offsets stay accurate.
    window.addEventListener('load', () => AOS.refresh())
  }

  let started = false
  const start = () => {
    if (started) return
    started = true
    init()
  }

  // Gate on shared preloader state rather than a one-shot event: in production
  // the preloader can emit `preloader:done` before this plugin's listener is
  // wired up, leaving AOS uninitialised and every [data-aos] section stuck at
  // opacity:0. Watching state (with immediate) catches an already-done flag.
  const { done } = usePreloaderDone()
  watch(done, (v) => { if (v) start() }, { immediate: true })
  // Fallback: if the preloader is absent or stalls, start anyway.
  setTimeout(start, 8500)
})
