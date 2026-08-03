import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const packages = await prisma.cmsPackage.findMany({
    where: { serviceId: "ai" },
    orderBy: { order: "asc" }
  });
  console.log(JSON.stringify(packages.map(p => ({ id: p.id, title: p.title, order: p.order, priceUsd: p.priceUsd })), null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
