import { TodayError, TodayPage } from "@/components/today-page";
import { getToday } from "@/lib/today";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data } = await getToday();
  return data ? <TodayPage data={data} /> : <TodayError />;
}
