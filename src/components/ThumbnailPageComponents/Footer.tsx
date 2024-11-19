import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between py-12">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-8 sm:mb-0">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </div>
              </li>
              <li>
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </div>
              </li>
              <li>
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-8 sm:mb-0">
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <ul className="space-y-2">
              <li>
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  Software
                </div>
              </li>
              <li>
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  Hardware
                </div>
              </li>
              <li>
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-8 sm:mb-0">
            <h2 className="text-lg font-semibold mb-4">Resources</h2>
            <ul className="space-y-2">
              <li>
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </div>
              </li>
              <li>
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </div>
              </li>
              <li>
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4">
            <h2 className="text-lg font-semibold mb-4">Connect</h2>
            <div className="flex space-x-4">
              <div className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </div>
              <div className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </div>
              <div className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </div>
              <div className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MetaCreators. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
