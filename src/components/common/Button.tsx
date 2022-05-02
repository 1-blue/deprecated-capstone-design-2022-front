// common-component
import Spinner from "@src/components/common/Spinner";

// util
import { combineClassNames } from "@src/libs/util";

type Props = {
  type: "submit" | "button" | "reset";
  contents: React.ReactChild;
  className?: string;
  loading?: boolean;
  [props: string]: any;
};

const Button = ({ type, contents, className, loading, ...props }: Props) => {
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
      {loading ? <Spinner kinds="button" /> : <>{contents}</>}
    </button>
  );
};

export default Button;
