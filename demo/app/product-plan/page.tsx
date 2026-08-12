import type { Metadata } from "next";
import PlanPage from "../plan-page";

export const metadata: Metadata = { title: "Z Tag 产品方案", description: "Z Tag 配置 Demo 产品方案" };
export default function ProductPlanPage() { return <PlanPage kind="product" /> }
