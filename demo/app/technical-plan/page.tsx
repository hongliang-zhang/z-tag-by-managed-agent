import type { Metadata } from "next";
import PlanPage from "../plan-page";

export const metadata: Metadata = { title: "Z Tag 技术方案", description: "Z Tag 配置 Demo 技术方案" };
export default function TechnicalPlanPage() { return <PlanPage kind="technical" /> }
