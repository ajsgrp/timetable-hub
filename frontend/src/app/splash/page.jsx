"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";
import { supabase } from "../lib/supabase";

export default function SplashPage() {

  const router = useRouter();

  const [finished, setFinished] = useState(false);

  useEffect(() => {

    if (!finished) return;

    async function checkUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {

        router.replace("/dashboard");

      } else {

        router.replace("/");

      }

    }

    checkUser();

  }, [finished, router]);

  return (

    <SplashScreen
      onFinish={() => setFinished(true)}
    />

  );

}