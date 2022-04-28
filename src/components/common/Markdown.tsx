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
        p: ({ node, ...props }) => (
          <p {...props} className="whitespace-pre-line" />
        ),
        code: ({ node, ...props }) => (
          <code
            {...props}
            className="bg-indigo-500 px-2 py-1 rounded-sm text-white after:contents before:contents group-odd:p-0 group-even:p-0"
          />
        ),
        pre: ({ node, ...props }) => (
          <pre {...props} className="group bg-indigo-500 p-3 rounded-sm" />
        ),
        a: ({ node, ...props }) => (
          <a {...props} className="text-indigo-500 no-underline" />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote {...props} className="bg-zinc-800 border-l-indigo-500" />
        ),
        img: ({ node, ...props }) => (
          <>
            {props.src?.includes(process.env.NEXT_PUBLIC_IMAGE_BASE_URL!) ? (
              <Photo
                {...props}
                photo={props.src}
                size="w-full h-80"
                className="m-0"
              />
            ) : (
              <img {...props} className="w-full h-80 m-0" />
            )}
          </>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
