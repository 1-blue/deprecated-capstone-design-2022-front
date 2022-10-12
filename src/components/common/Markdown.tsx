import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// common-component
import Photo from "@src/components/common/Photo";

type Props = {
  markdown: string;
};

const Markdown = ({ markdown }: Props) => {
  return (
    <ReactMarkdown
      className="py-4 px-8 prose dark:prose-invert whitespace-normal max-w-full"
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node, ...props }) => {
          // <img />를 렌더링 하는 경우에 <p>내부에서 렌더링 되지 않도록 하기 위함
          if (typeof props.children[0] === "object") {
            const element: any = props.children[0];
            return element.type.name === "img" ? (
              { ...element }
            ) : (
              <p {...props} />
            );
          }
          return <p {...props} className="whitespace-pre-line" />;
        },
        code: ({ node, inline, ...props }) => (
          <code
            {...props}
            className="bg-indigo-700 px-2 py-1 rounded-sm text-white after:contents before:contents group-odd:p-0 group-even:p-0 group-odd:bg-transparent group-even:bg-transparent"
          />
        ),
        pre: ({ node, ...props }) => (
          <pre {...props} className="group bg-indigo-500 p-3 rounded-sm" />
        ),
        a: ({ node, ...props }) => (
          <a {...props} className="text-indigo-500 no-underline" />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            {...props}
            className="bg-zinc-300 dark:bg-zinc-800 border-l-indigo-500"
          />
        ),
        img: ({ node, ...props }) => (
          <div>
            <>
              {props.src?.includes(process.env.NEXT_PUBLIC_PHOTO_BASE_URL) ? (
                <Photo
                  {...props}
                  photo={props.src}
                  className="mx-auto my-4 h-[200px] md:h-[300px] lg:h-[400px]"
                />
              ) : (
                <img
                  {...props}
                  className="mx-auto my-4 h-[200px] md:h-[300px] lg:h-[400px]"
                />
              )}
            </>
          </div>
        ),
        h1: ({ node, ...props }) => (
          <h1 id={props.children?.[0]?.toString()} {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 id={props.children?.[0]?.toString()} {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 id={props.children?.[0]?.toString()} {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 id={props.children?.[0]?.toString()} {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 id={props.children?.[0]?.toString()} {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 id={props.children?.[0]?.toString()} {...props} />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
