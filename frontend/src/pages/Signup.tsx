import { Auth } from "../components/Auth";
import { SignupQuote } from "../components/SignupQuote";

export const Signup = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signup" />
        </div>
        <div className="hidden lg:block">
          <SignupQuote />
        </div>
      </div>
    </div>
  );
};
