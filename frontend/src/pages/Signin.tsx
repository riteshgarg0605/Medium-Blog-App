import { Auth } from "../components/Auth";
import { SignupQuote } from "../components/SignupQuote";

export const Signin = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signin" />
        </div>
        <div className="hidden lg:block">
          <SignupQuote />
        </div>
      </div>
    </div>
  );
};
