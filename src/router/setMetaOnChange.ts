import { type NavigationGuardWithThis, type RouteRecordRaw } from 'vue-router'

type MetaTag = Record<string, string>
type RouteRecord = {
  meta?: {
    title?: string
    metaTags?: MetaTag[]
  }
} & RouteRecordRaw

/**
 * Call this before every change of route, including the initial page load.
 * 
 * https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
 */
const guard: NavigationGuardWithThis<unknown> = (to, from, next): void => {

  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle: RouteRecord | undefined = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta: RouteRecord | undefined = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  const previousNearestWithMeta: RouteRecord | undefined = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle?.meta?.title || 'Unknown'
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta?.meta?.title || 'Unknown'
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
    (el: Element): Element | undefined => el.parentNode?.removeChild(el)
  )

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  if (nearestWithMeta?.meta?.metaTags) {
    nearestWithMeta.meta.metaTags.map((tagDef: MetaTag): HTMLMetaElement => {
      const tag = document.createElement('meta')

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key])
      })

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '')

      return tag
    })
      // Add the meta tags to the document head.
      .forEach((tag: Node): Node => document.head.appendChild(tag))
  }

  next()
}

export default guard