"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Loader from "./Loader";
import Cursor from "./Cursor";
import Nav from "./Nav";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Signature from "./Signature";
import Story from "./Story";
import Reveal from "./Reveal";
import Anatomy from "./Anatomy";
import Method from "./Method";
import Spices from "./Spices";
import Menu from "./Menu";
import Tandoor from "./Tandoor";
import Statement from "./Statement";
import Visit from "./Visit";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const [go, setGo] = useState(false); // becomes true when the loader has finished

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    (window as any).__lenis = lenis;
    lenis.stop(); // locked until loader is done
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 600);
    window.addEventListener("load", refresh);
    (document as any).fonts?.ready.then(refresh);

    return () => {
      clearTimeout(t1);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  const onLoaded = () => {
    (window as any).__lenis?.start();
    setGo(true);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Loader onDone={onLoaded} />
      <Nav go={go} />
      <main>
        <Hero go={go} />
        <Marquee />
        <Signature />
        <Story />
        <Reveal />
        <Anatomy />
        <Method />
        <Spices />
        <Menu />
        <Tandoor />
        <Statement />
        <Visit />
      </main>
    </>
  );
}
