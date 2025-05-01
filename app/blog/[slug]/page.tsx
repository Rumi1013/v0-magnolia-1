import { NotionBlogPost } from "@/components/blog/notion-blog-post"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <NotionBlogPost slug={params.slug} />
    </div>
  )
}
