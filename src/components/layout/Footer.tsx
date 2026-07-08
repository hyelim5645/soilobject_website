import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SITE_NAME, SITE_NAME_KO } from "@/lib/utils/constants";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper-dim py-12 text-ink">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Image
            src="/logo/soil-logo-full.png"
            alt={SITE_NAME}
            width={2387}
            height={2784}
            className="h-24 w-auto"
          />
          <p className="mt-4 text-sm text-mist-500">
            © {new Date().getFullYear()} {SITE_NAME_KO}. All rights reserved.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="label-uppercase text-xs text-mist-500">Address</p>
            <p className="mt-2 leading-relaxed">
              서울특별시 성동구 이패원로 54길 58
              <br />
              소일 스튜디오
            </p>
          </div>
          <div>
            <p className="label-uppercase text-xs text-mist-500">Contact</p>
            <p className="mt-2 leading-relaxed">
              +82 10 1234 5678
              <br />
              hello@soilstudio.co.kr
            </p>
          </div>
          <div>
            <p className="label-uppercase text-xs text-mist-500">Follow</p>
            <div className="mt-2 flex flex-col gap-1">
              <Link href="#" className="hover:text-wood-600">
                Instagram
              </Link>
              <Link href="/journal" className="hover:text-wood-600">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
