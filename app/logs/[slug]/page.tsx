import LogPostPage from "../../src/frontend/logs/[slug]/page";

export default function Page(props: { params: Promise<{ slug: string }> }) {
  return <LogPostPage {...props} />;
}