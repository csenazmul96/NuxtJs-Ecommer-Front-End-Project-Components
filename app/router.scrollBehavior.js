export default function (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    let timeout = 0;
    const timeoutRoutes = ['category-slug', 'category-slug'];

    if (timeoutRoutes.includes(to.name) && to.name !== from.name) {
      timeout = 1500;
    }

    setTimeout(() => {
      if (to.name === 'category-slug' && from.name === 'category-slug') {
        resolve({ x: 0, y: 0 })
      } else if (to.name === 'category-slug-sub_slug' && from.name === 'category-slug-sub_slug') {
        resolve({ x: 0, y: 0 })
      }
      else if (savedPosition) {
        resolve(savedPosition)
      } else {
        resolve({ x: 0, y: 0 })
      }
    }, timeout)
  })
}
