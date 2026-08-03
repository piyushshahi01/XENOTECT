import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.cmsPackage.delete({
    where: { id: "ai-agent" }
  });
  console.log("Deleted:", deleted.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
