import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import useCounterStore from "../../store/counterstore";
import { useEffect } from "react";
import GradientText from "../GradientText/GradientText";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase";

function Navbar() {
  const {
    loadingCredits,
    credit,
    creditFetchError,
    get_user_credits: fetchCredit,
    users_id,
  } = useCounterStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // const memoizedFetchCredit = useCallback(() => {
  //   fetchCredit(users_id);
  // }, [fetchCredit, users_id]);

  // useEffect(() => {
  //   memoizedFetchCredit();
  // }, [memoizedFetchCredit]);

  useEffect(() => {
    console.log(loadingCredits);
    fetchCredit(users_id);
    console.log(loadingCredits);
  }, [users_id, fetchCredit]);

  // if (creditFetchError) {
  //   return <p>{creditFetchError}</p>;
  // }

  const reRoute = (value: string) => {
    navigate(`/${value}`);
  };
  return (
    <div className="flex justify-between items-center px-10 py-4 sticky top-0 bg-white border border-b">
      <div className="text-2xl font-bold text-[#1a237e] w-1/4">
        <img src="/logo.png" alt="logo" className="h-12 w-12" />
      </div>
      {!creditFetchError ? (
        <div className="items-center flex w-[10vw]">
          {!loadingCredits ? (
            <div className="flex">
              <GradientText
                colors={["#ef5350", "#261FB3", "#ef5350", "#261FB3", "#ef5350"]}
                animationSpeed={5}
                showBorder={true}
                className="w-fit h-fit py-2 px-6 bg-white"
              >
                Credits: {credit}
              </GradientText>
              {/* <Button variant="outline" className="rounded-full py-2">
              <GradientText
                colors={["#BF3131", "#261FB3", "#40ffaa", "#261FB3", "#BF3131"]}
                animationSpeed={5}
                showBorder={false}
                className="w-fit h-fit py-2 px-6 bg-white"
              >
                Upgrade
              </GradientText>
            </Button> */}
            </div>
          ) : (
            <GradientText
              colors={["#BF3131", "#261FB3", "#261FB3", "#261FB3", "#BF3131"]}
              animationSpeed={5}
              showBorder={false}
              className=""
            >
              Loading Credits...
            </GradientText>
          )}
        </div>
      ) : (
        <GradientText
          colors={["#BF3131", "#261FB3", "#261FB3", "#261FB3", "#BF3131"]}
          animationSpeed={5}
          showBorder={false}
          className=""
        >
          Unable to fetch credits, please try again later.
        </GradientText>
      )}
      <div className="flex items-center space-x-3 font-medium text-slate-500">
        <div>About</div>
        <div>Contact</div>
        <Select onValueChange={reRoute}>
          <SelectTrigger className="border-none shadow-none">
            <SelectValue placeholder="Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thumbnail">Thumbnail generator</SelectItem>
            <SelectItem value="script">Script generator</SelectItem>
            <SelectItem value="description">Description generator</SelectItem>
            <SelectItem value="VirtualHouse">Virtual House</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
