import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const documentData: Prisma.DocumentCreateInput[] = [
  {
    url: "https://ikn1.go.id/en",
    source: "web_article",
    content: "The future capital city of Indonesia, nestled in the verdant landscapes of East Kalimantan, promises to be a symbol of progress and sustainability. With its strategic location on the island of Borneo, the new capital will not only alleviate the burden on Jakarta but also serve as a beacon of balanced development across the archipelago. Planned with meticulous attention to environmental conservation and modern infrastructure, it is poised to redefine urban living in Southeast Asia.",
  },
  {
    url: "https://ikn2.go.id/en",
    source: "web_article",
    content: "As Indonesia embarks on the monumental task of constructing its new capital city, the world watches with anticipation. This ambitious endeavor signifies more than just a shift in administrative boundaries; it embodies the nation's commitment to fostering equitable growth and resilience in the face of urban challenges. With its groundbreaking urban planning strategies and forward-thinking design, the new capital city holds the promise of becoming a model for sustainable development on a global scale.",
  },
  {
    url: "https://ikn3.go.id/en",
    source: "web_article",
    content: "Set against the backdrop of lush tropical forests and winding rivers, the future capital city of Indonesia emerges as a testament to the country's rich cultural heritage and vibrant spirit of innovation. Embracing the principles of inclusivity and environmental stewardship, it seeks to harmonize modernity with tradition, creating a dynamic urban landscape that honors the past while embracing the future. With its emphasis on green spaces, pedestrian-friendly design, and efficient public transportation, the new capital city embodies Indonesia's vision of a thriving, livable metropolis.",
  },
  {
    url: "https://ikn4.go.id/en",
    source: "web_article",
    content: "The dawn of a new era beckons as Indonesia embarks on the journey to build its new capital city. Nestled amidst the pristine landscapes of East Kalimantan, this visionary project represents a bold step towards reshaping the country's urban landscape and fostering sustainable growth. From state-of-the-art infrastructure to innovative urban planning solutions, the new capital city promises to redefine the way we think about modern living in the 21st century, offering a blueprint for sustainable development that inspires nations around the world.",
  },
  {
    url: "https://ikn5.go.id/en",
    source: "web_article",
    content: "With its groundbreaking urban planning initiatives and commitment to environmental sustainability, the new capital city of Indonesia stands as a testament to the nation's ambition and foresight. Situated in the heart of Borneo's lush rainforests, this modern metropolis embodies the principles of resilience, inclusivity, and progress. From its innovative green spaces to its efficient public transportation systems, every aspect of the city is designed to enhance the quality of life for its residents while safeguarding the natural beauty of its surroundings. As Indonesia charts a course towards a brighter future, the new capital city serves as a beacon of hope and possibility for generations to come.",
  },
  {
    url: "https://quantumphysicsasal1.co.id",
    source: "web_article",
    content: "Quantum physics, a cornerstone of modern physics, delves into the fundamental nature of matter and energy at the smallest scales. At its core lies the intriguing principle of quantum superposition, wherein particles can exist in multiple states simultaneously until observed, challenging our classical intuition. Moreover, the concept of entanglement, where particles become intertwined and share correlated states regardless of distance, defies classical notions of locality and highlights the interconnectedness inherent in the quantum realm. These profound principles not only revolutionize our understanding of the universe but also underpin emerging technologies such as quantum computing and quantum communication, promising unprecedented advancements in computation and secure communication.",
  },
  {
    url: "https://quantumphysicsasal2.co.id",
    source: "web_article",
    content: "The wave-particle duality, a cornerstone of quantum physics, illuminates the dual nature of particles, presenting them as both discrete particles and waves with wave-like properties. This duality is encapsulated in the famous double-slit experiment, where particles exhibit interference patterns characteristic of waves when not observed, yet behave as distinct particles when observed. Such phenomena underscore the probabilistic nature of quantum mechanics, where the behavior of particles is described by wave functions, representing the probability amplitudes of various outcomes. This probabilistic framework not only challenges deterministic views of classical physics but also opens the door to novel interpretations of reality and the nature of existence.",
  },
  {
    url: "https://quantumphysicsasal3.co.id",
    source: "web_article",
    content: "Quantum mechanics, the theoretical framework governing the behavior of particles at the quantum scale, introduces uncertainty as a fundamental feature of nature, embodied in Heisenberg's uncertainty principle. This principle asserts that the more precisely one measures a particle's position, the less precisely one can know its momentum, and vice versa, fundamentally limiting the precision of simultaneous measurements. Furthermore, quantum mechanics unveils the concept of quantum tunneling, where particles traverse energy barriers that would be insurmountable according to classical mechanics, offering insights into phenomena ranging from nuclear fusion in stars to the operation of semiconductor devices. As we delve deeper into the enigmatic realm of quantum physics, we continue to uncover profound mysteries and unlock the potential for revolutionary breakthroughs in science and technology.",
  },
  {
    url: "https://llmasal1.co.id",
    source: "web_article",
    content: "LLMs, short for Large Language Models, represent a groundbreaking advancement in artificial intelligence research. These models, such as GPT (Generative Pre-trained Transformer), are trained on vast amounts of text data and excel at understanding and generating human-like text. Their architecture enables them to learn complex patterns and relationships in language, allowing them to perform a wide range of natural language processing tasks, from text generation and summarization to translation and sentiment analysis. With their ability to generate coherent and contextually relevant text, LLMs have the potential to revolutionize various fields, including content generation, conversational agents, and automated customer support.",
  },
  {
    url: "https://llmasal2.co.id",
    source: "web_article",
    content: "The development of LLMs has spurred significant progress in natural language understanding and generation. Through pre-training on large-scale text corpora and fine-tuning on specific tasks, these models acquire a deep understanding of language structure and semantics. This enables them to generate text that is not only grammatically correct but also contextually relevant and coherent. Additionally, LLMs have demonstrated remarkable capabilities in tasks such as question answering, language translation, and text summarization, showcasing their versatility and potential for real-world applications. As researchers continue to refine LLM architectures and training methodologies, their impact on various industries and domains is expected to grow exponentially.",
  },
  {
    url: "https://llmasal3.co.id",
    source: "web_article",
    content: "Large Language Models (LLMs) have emerged as powerful tools for natural language processing tasks, thanks to their ability to learn from vast amounts of textual data. These models employ transformer architectures, leveraging self-attention mechanisms to capture long-range dependencies in text and generate contextually coherent responses. One of the key advantages of LLMs is their ability to generalize across diverse domains and languages, making them valuable assets for multilingual and cross-domain applications. Moreover, recent advancements in model scaling and training techniques have led to the development of even larger and more powerful LLMs, capable of producing human-like text and surpassing previous benchmarks in various language understanding tasks. As LLM research continues to evolve, it holds the potential to revolutionize how we interact with and process natural language data in the digital age.",
  },
]

async function main() {
  console.log(`${new Date().toISOString()}: Start seeding documents`)
  for (const doc of documentData) {
    const document = await prisma.document.create({
      data: doc,
    })
    console.log(`${new Date().toISOString()}: Created document with id: ${document.id}`)
  }
  console.log(`${new Date().toISOString()}: Seeding documents finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(`${new Date().toISOString()}: ${e}`)
    await prisma.$disconnect()
    process.exit(1)
  })