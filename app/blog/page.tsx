import { NotionBlogList } from "@/components/blog/notion-blog-list"

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-[#FAF3E0] mb-4">Our Blog</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Insights, tutorials, and stories from the Midnight Magnolia team.
        </p>
      </div>

      <NotionBlogList />
    </div>
  )
}
