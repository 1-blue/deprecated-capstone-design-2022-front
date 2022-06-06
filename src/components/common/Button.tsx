// common-component
import Spinner from "@src/components/common/Spinner";

// util
import { combineClassNames } from "@src/libs/util";

type Props = {
  type: "submit" | "button" | "reset";
  contents: React.ReactChild;
  className?: string;
  loading?: boolean;
  loadingText?: string;
  [props: string]: any;
};

const Button = ({
  type,
  contents,
  className,
  loading,
  loadingText = "불러오는 중입니다...",
  ...props
}: Props) => {
  return (
    <button
      type={type}
      className={combineClassNames(
        className ? className : "",
        loading ? "cursor-not-allowed" : ""
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex space-x-2 justify-center">
          <span>{loadingText}</span>
          <Spinner kinds="button" />
        </div>
      ) : (
        <>{contents}</>
      )}
    </button>
  );
};

export default Button;
