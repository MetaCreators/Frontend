import { Button } from "../ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
function HeroSection1() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-auto md:h-80 px-4">
        <div className="text-wrap w-full md:w-1/2 text-center space-y-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>script</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-3xl md:text-5xl font-semibold leading-tight">
            Generate Compelling Scripts for Your YouTube Videos
          </div>
          <div className="font-thin text-sm md:text-lg space-y-2">
            <div>Elevate your content with our powerful AI-driven tools</div>
            <div>Effortlessly Craft Engaging Video Scripts</div>
          </div>
        </div>
        <Button className="mt-6 md:mt-8" variant="destructive">
          Try it Now
        </Button>
      </div>
      <div style={{ height: "3%", visibility: "hidden" }}>h</div>
    </>
  );
}

export default HeroSection1;
