import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const documentData: Prisma.DocumentCreateInput[] = [
  {
    url: "https://ikn.go.id/en",
    source: "web_article",
    content: "",
  },
  {
    url: "https://earthobservatory.nasa.gov/images/152471/nusantara-a-new-capital-city-in-the-forest",
    source: "web_article",
    content: "",
  },
  {
    url: "https://www.nytimes.com/interactive/2023/05/16/headway/indonesia-nusantara-jakarta.html",
    source: "web_article",
    content: "",
  },
  {
    url: "",
    source: "web_article",
    content: "",
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const doc of documentData) {
    const document = await prisma.document.create({
      data: doc,
    })
    console.log(`Created document with id: ${document.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })