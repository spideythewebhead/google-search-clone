import Link from "next/link";

export interface SearchResultItem {
  title: string;
  htmlTitle: string;
  snippet: string;
  htmlSnippet: string;
  link: string;
  formattedUrl: string;
}

export function SearchResultWiget({ item }: { item: SearchResultItem }) {
  return (
    <div className="flex flex-col select-none transition-colors ease-in-out hover:shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 rounded py-2 pl-2 pr-4">
      <div
        className="text-xs dark:text-gray-400 text-gray-600 w-full overflow-hidden truncate"
        dangerouslySetInnerHTML={{ __html: item.formattedUrl }}
      ></div>
      <Link href={item.link}>
        <a
          className="text-sm dark:text-blue-200 text-blue-700 hover:underline"
          dangerouslySetInnerHTML={{ __html: item.htmlTitle }}
        ></a>
      </Link>

      <div className="mt-1 dark:text-gray-400 text-xs text-gray-700">
        <span dangerouslySetInnerHTML={{ __html: item.htmlSnippet }} />
      </div>
    </div>
  );
}
