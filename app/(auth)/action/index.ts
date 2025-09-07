"use server";

import { createClient } from "@/lib/supabase/server";

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirm: string;
}) {
  const defaultRole = "user";
  try {
    const supabase = await createClient();
    const result = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { role: defaultRole },
      },
    });

    const { error, data: userdata } = result;

    if (error === null) {
      console.log(result);
      return { user: userdata, error: null };
    } else {
      console.error(result.error);
      return { user: null, error: error.message };
    }
  } catch (error) {
    console.log(error);
  }
}
export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const { email, password } = data;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error === null) {
      return { user: data, error: null };
    } else {
      console.error(error);
      return { user: null, error: error.message };
    }
  } catch (error) {}
}
