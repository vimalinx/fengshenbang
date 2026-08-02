import EmptyState from "@/components/EmptyState";

/** 详情页 slug 不存在时的占位（渲染在 [lang] 布局内，静态双语文案）。 */
export default function NotFound() {
  return (
    <div className="mt-10">
      <EmptyState text="条目不存在或尚未收录。 / This entry does not exist or has not been recorded yet." />
    </div>
  );
}
