import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const packages = await prisma.cmsPackage.findMany({
    where: { serviceId: "ai" }
  });
  console.log(JSON.stringify(packages.map(p => ({ id: p.id, title: p.title, priceInr: p.priceInr })), null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
