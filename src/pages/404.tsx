import dynamic from "next/dynamic";
import CompactLayout from "src/layouts/compact";

export const NotFound = dynamic(() => import("src/sections/not-found"), {
  ssr: false
});
export default function Error() {
  return <NotFound />;
}

Error.getLayout = function getLayout(page: React.ReactElement) {
  return <CompactLayout>{page}</CompactLayout>;
};
