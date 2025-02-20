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
                <BreadcrumbPage>thumbnail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-3xl md:text-5xl font-semibold leading-tight">
            Generate Stunning thumbnails for your videos
          </div>
          <div className="font-thin text-sm md:text-lg space-y-2">
            <div>
              Elevate your content with our powerful AI-driven thumbnail
              generator
            </div>
            <div>Effortlessly create eye-catching content</div>
          </div>
        </div>
        <Button className="mt-6 md:mt-8" variant="destructive">
          Try it Now
        </Button>
      </div>
      <div style={{ visibility: "hidden" }}>h</div>
    </>
  );
}

export default HeroSection1;
