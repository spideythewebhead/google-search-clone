import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { ViewGridIcon } from "@heroicons/react/solid";
import nextjsResponse from "../nextjs-response";

import { SearchInput } from "@components/search-input";
import { Avatar } from "@components/avatar";
import {
  SearchResultItem,
  SearchResultWiget,
} from "@components/search/search-result-item";
import { ThemeToggle } from "@components/theme-toggle";

function SearchOption({
  text,
  isActive = false,
  setSelected,
  id,
  getRef,
}: {
  id: string;
  text: string;
  isActive?: boolean;
  setSelected: (id: string) => void;
  getRef: (node: HTMLElement, transition?: boolean) => void;
}) {
  const ref = useRef();

  useEffect(() => {
    if (isActive) {
      getRef(ref.current, true);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      function onResize() {
        getRef(ref.current);
      }

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  }, [isActive]);

  return (
    <div
      className={`text-xs ${
        isActive ? "text-blue-500" : "text-gray-500"
      } cursor-pointer select-none`}
      ref={ref}
      onClick={(e) => {
        setSelected(id);
      }}
    >
      {text}
    </div>
  );
}

function SearchOptionsContainer() {
  const router = useRouter();

  const [category, setCategory] = useState(router.query.category ?? "all");

  const [rect, setRect] = useState<{
    left: string;
    width: string;
    top: string;
    transition?: string;
  }>();

  const selectedItemRef = useCallback(
    (node: HTMLElement, transition = false) => {
      if (node) {
        setRect({
          left: `${node.offsetLeft}px`,
          width: `${node.offsetWidth}px`,
          top: `${node.offsetTop + node.offsetHeight}px`,
          transition: transition ? "all 300ms ease-in-out" : "",
        });
      }
    },
    []
  );

  useEffect(() => {
    if (category && router.query.category !== category) {
      router.push({
        query: {
          ...router.query,
          category,
        },
      });
    }
  }, [category]);

  return (
    <div className="relative overflow-x-auto">
      <div className="flex flex-row justify-center sm:justify-start gap-4 pl-4 sm:pl-44 mt-4 mb-1">
        <SearchOption
          id="all"
          text="All"
          isActive={category === "all"}
          setSelected={setCategory}
          getRef={selectedItemRef}
        />
        <SearchOption
          id="news"
          text="News"
          isActive={category === "news"}
          setSelected={setCategory}
          getRef={selectedItemRef}
        />
        <SearchOption
          id="images"
          text="Images"
          isActive={category === "images"}
          setSelected={setCategory}
          getRef={selectedItemRef}
        />
        <SearchOption
          id="videos"
          text="Videos"
          isActive={category === "videos"}
          setSelected={setCategory}
          getRef={selectedItemRef}
        />
        <SearchOption
          id="maps"
          text="Maps"
          isActive={category === "maps"}
          setSelected={setCategory}
          getRef={selectedItemRef}
        />
        <SearchOption
          id="more"
          text="More"
          isActive={category === "more"}
          setSelected={setCategory}
          getRef={selectedItemRef}
        />
        <SearchOption
          id="settings"
          text="Settings"
          isActive={category === "settings"}
          setSelected={setCategory}
          getRef={selectedItemRef}
        />
        <SearchOption
          id="tools"
          text="Tools"
          isActive={category === "tools"}
          setSelected={setCategory}
          getRef={selectedItemRef}
        />
      </div>

      <div className="absolute h-0.5 bg-blue-500" style={rect}></div>
    </div>
  );
}

interface SearchPageProps {
  results: Array<SearchResultItem>;
}

export default function SearchPage({ results }: SearchPageProps) {
  const router = useRouter();

  const topRight = (
    <>
      <ThemeToggle />
      <ViewGridIcon className="h-5 w-5 text-gray-500" />
      <Avatar />
    </>
  );

  return (
    <div className="h-screen ">
      <Head>
        <title>Search Page</title>
      </Head>
      <div className="h-full flex flex-col dark:bg-bgBlack">
        {/* App Bar */}
        <div className="px-4 border-b flex flex-col w-full">
          {/* Top Portion */}
          <div className="py-2 flex flex-col items-stretch sm:flex-row w-full">
            <div className="flex flex-row justify-between items-center mb-2 sm:mb-0">
              <img
                src="https://www.google.com/logos/doodles/2021/vera-gedroits-151st-birthday-6753651837108356.3-l.png"
                width="120"
                className="sm:mr-8"
              />

              <div className="flex-row items-center space-x-3 flex justify-end sm:hidden">
                {topRight}
              </div>
            </div>

            <SearchInput
              onSearch={(query) => {
                router.push({
                  pathname: "/search",
                  query: {
                    ...router.query,
                    q: query,
                  },
                });
              }}
              rootClassName="max-w-full flex-grow flex-shrink-0 px-1 self-stretch sm:max-w-lg sm:mr-4"
            />

            <div className="hidden flex-row items-center space-x-3 sm:flex flex-1 justify-end">
              {topRight}
            </div>
          </div>

          {/* Bottom Portion - Categories */}

          <SearchOptionsContainer />
        </div>

        <div className="pl-2 md:pl-44 overflow-hidden -ml-2 ">
          <div className="overflow-y-auto h-full w-full py-2 pl-4 pr-4">
            <div className="flex flex-col max-w-screen-sm">
              {results &&
                results.length !== 0 &&
                results.map((item) => {
                  return <SearchResultWiget key={item.link} item={item} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(process.env.NODE_ENV);

  // TODO: uncomment this to get real results
  return {
    props: { results: nextjsResponse },
  };

  const q = context.query.q as string;

  const { SEARCH_ENGINE_KEY, GOOGLE_SEARCH_KEY } = process.env;

  let items: SearchResultItem[] = [];

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${q}&cx=${SEARCH_ENGINE_KEY}&key=${GOOGLE_SEARCH_KEY}`
    );

    items = (await response.json()).items as SearchResultItem[];
  } catch (e) {}

  return {
    props: {
      results: items ?? [],
    }, // will be passed to the page component as props
  };
}
