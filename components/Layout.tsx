import { useRouter } from "next/router";
import { ReactElement } from "react";
import NavBar from "../components/NavBar";
import Helmet from "./Helmet";
import Banner from "./Banner";

export default function Layout({ children } : React.PropsWithChildren) : ReactElement {
  const router = useRouter();

  return (
    <>
      <Helmet
        pathname={router.pathname.slice(1, router.pathname.length)}
      ></Helmet>
      <Banner />
      <NavBar />
      <div>{children}</div>
    </>
  );
}
