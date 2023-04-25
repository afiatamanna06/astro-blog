export function slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
}
  
export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      timeZone: "UTC",
    })
}

export function formatBlogPosts(posts: any, {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
} = {}) {

  const filteredPosts = posts.reduce((acc: any, post: any) => {
    const { date, draft } = post.frontmatter;
    
    if (filterOutDrafts && draft) return acc;

    
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    post.frontmatter.date = new Date(date)
    
    acc.push(post)

    return acc;
  }, [])

  
  console.log(filteredPosts)
  if (sortByDate) {
    filteredPosts.sort((a: any, b: any) => b.frontmatter.date - a.frontmatter.date)
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;

}