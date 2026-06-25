import { getRevenueOverview } from "@/lib/actions/booking";
import { getUserSession } from "@/lib/core/session";
import RevenueOverview from './RevenueOverview'

const RevenueOverviewDashboardPage = async () => {
  const user = await getUserSession();

  const revenueData =
    await getRevenueOverview(user.email);


  return (
    <RevenueOverview data={revenueData} />
  );
};

export default RevenueOverviewDashboardPage;