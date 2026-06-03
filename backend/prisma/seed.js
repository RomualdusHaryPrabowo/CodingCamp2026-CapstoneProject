import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create database adapter with SSL config for cloud databases
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const pool = new pg.Pool(poolConfig);
const adapter = new PrismaPg(pool);

// Create Prisma Client
const { PrismaClient } = pkg;
const prisma = new PrismaClient({
  adapter,
  errorFormat: 'pretty',
});

const dummyDiscussions = [
  {
    authorId: 'john.doe@example.com',
    authorName: 'John Doe',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    content: 'Halo semua! Saya baru saja lulus bootcamp dan ingin fokus di bidang Software Engineering. Ada yang bisa share pengalaman mereka di industri? Tips dan trik apa yang paling membantu? 😊',
    hashtags: ['SoftwareEngineering', 'CareerPath', 'Bootcamp'],
    likesCount: 12,
    dislikesCount: 0,
  },
  {
    authorId: 'sarah.smith@example.com',
    authorName: 'Sarah Smith',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content: 'Aku tertarik banget sama Data & AI tapi masih bingung mulai dari mana. Python udah agak familiar, tapi statistik masih lemah. Apakah bisa dikuatin sambil belajar ML? Atau harus master statistik dulu?',
    hashtags: ['DataScience', 'AI', 'Learning', 'Python'],
    likesCount: 25,
    dislikesCount: 2,
  },
  {
    authorId: 'mike.johnson@example.com',
    authorName: 'Mike Johnson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    content: 'Infrastructure & Security adalah passion saya. Kalau kalian sedang setup CI/CD pipeline, jangan lupa implement security best practices dari awal. Kesalahan di tahap awal bisa mahal banget untuk diperbaiki. Sharing template Dockerfile dan GitHub Actions workflow saya di repo ini: https://github.com/example/secure-cicd 🔐',
    hashtags: ['Infrastructure', 'Security', 'DevOps', 'CICD'],
    likesCount: 18,
    dislikesCount: 0,
  },
  {
    authorId: 'emma.wilson@example.com',
    authorName: 'Emma Wilson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    content: 'Management & Analysis rolenya keren! Tapi ternyata bukan hanya tentang technical skills. Soft skills seperti komunikasi, leadership, dan strategic thinking sangat crucial. Sekarang sedang belajar Agile & Scrum. Siapa di sini yang udah certified? Rekomendasi course mana yang worth it? 💼',
    hashtags: ['Management', 'ProductManagement', 'Agile', 'Leadership'],
    likesCount: 14,
    dislikesCount: 1,
  },
  {
    authorId: 'alex.kumar@example.com',
    authorName: 'Alex Kumar',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    content: 'Support & Design track ini sangat underrated! UX/UI skills combined dengan technical knowledge adalah kombinasi emas. Aku baru switch dari pure dev ke UX Engineering dan lifecycle-nya lebih meaningful. Ada yang tertarik sama design system development? 🎨',
    hashtags: ['UXDesign', 'Support', 'TechnicalSupport', 'DesignSystem'],
    likesCount: 9,
    dislikesCount: 0,
  },
  {
    authorId: 'david.lee@example.com',
    authorName: 'David Lee',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    content: 'Gimana caranya balance antara deep specialization dan breadth of knowledge di tech industry? Fokus ke satu stack atau general knowledge dulu? Minta advice dari senior dev di sini 🤔',
    hashtags: ['CareerAdvice', 'TechStack', 'Specialization'],
    likesCount: 31,
    dislikesCount: 1,
  },
  {
    authorId: 'lisa.chen@example.com',
    authorName: 'Lisa Chen',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    content: 'Baru mulai journey di Software Engineering. Framework mana yang sebaiknya dipelajari dulu? React atau Vue? Next.js atau Nuxt? Banyak pilihan dan bingung prioritas 😅 Input dari community sangat diapresiasi!',
    hashtags: ['Frontend', 'JavaScript', 'Framework', 'WebDevelopment'],
    likesCount: 22,
    dislikesCount: 0,
  },
];

const dummyComments = [
  {
    discussionIndex: 0,
    authorId: 'mentor@company.com',
    authorName: 'Tech Mentor',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mentor',
    content: 'Congrats on finishing bootcamp! Tips saya: 1) Build projects yang real. 2) Contribute ke open source. 3) Network dengan developer lain. 4) Terus belajar teknologi baru. Good luck! 🚀',
  },
  {
    discussionIndex: 1,
    authorId: 'ds.expert@company.com',
    authorName: 'Data Science Expert',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DSExpert',
    content: 'Statistik penting tapi jangan takut. Banyak online course yang teach-by-doing. Coba Kaggle competitions untuk praktik real-world problems. Learning curve steep awalnya tapi worth it!',
  },
  {
    discussionIndex: 1,
    authorId: 'python.dev@company.com',
    authorName: 'Python Dev',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PythonDev',
    content: 'Totally agree. Plus, implementasi Pandas dan NumPy akan bantu kamu understand statistik lebih in-depth. Practice dengan real datasets!',
  },
  {
    discussionIndex: 5,
    authorId: 'senior.dev@company.com',
    authorName: 'Senior Dev',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SeniorDev',
    content: 'Menurut saya sih deep specialization dulu, terus expand gradually. Menjadi expert di satu area buka banyak opportunities dan respected dalam community. After mastery, explore lain lebih mudah.',
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data
    console.log('🧹 Clearing existing discussions and comments...');
    await prisma.comment.deleteMany({});
    await prisma.reaction.deleteMany({});
    await prisma.discussion.deleteMany({});

    // Create discussions
    console.log('📝 Creating dummy discussions...');
    const discussions = await Promise.all(
      dummyDiscussions.map((discussion) =>
        prisma.discussion.create({
          data: discussion,
        })
      )
    );
    console.log(`✅ Created ${discussions.length} discussions`);

    // Create comments
    console.log('💬 Creating dummy comments...');
    const comments = await Promise.all(
      dummyComments.map((comment) => {
        const discussionId = discussions[comment.discussionIndex].id;
        return prisma.comment.create({
          data: {
            discussionId,
            authorId: comment.authorId,
            authorName: comment.authorName,
            authorAvatar: comment.authorAvatar,
            content: comment.content,
          },
        });
      })
    );
    console.log(`✅ Created ${comments.length} comments`);

    // Create reactions
    console.log('👍 Creating dummy reactions...');
    const reactions = [];

    // Add likes to first discussion
    reactions.push(
      prisma.reaction.create({
        data: {
          userId: 'user1@example.com',
          discussionId: discussions[0].id,
          type: 'LIKE',
        },
      }),
      prisma.reaction.create({
        data: {
          userId: 'user2@example.com',
          discussionId: discussions[0].id,
          type: 'LIKE',
        },
      })
    );

    // Add likes and dislikes to second discussion
    reactions.push(
      prisma.reaction.create({
        data: {
          userId: 'user3@example.com',
          discussionId: discussions[1].id,
          type: 'LIKE',
        },
      }),
      prisma.reaction.create({
        data: {
          userId: 'user4@example.com',
          discussionId: discussions[1].id,
          type: 'DISLIKE',
        },
      })
    );

    await Promise.all(reactions);
    console.log(`✅ Created ${reactions.length} reactions`);

    console.log('\n✨ Database seeding completed successfully! ✨\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
