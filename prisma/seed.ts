import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@molen.com' },
    update: {},
    create: {
      email: 'admin@molen.com',
      name: 'Administrator',
      password: 'admin123', // In production, hash this password
      role: 'admin',
      phone: '085360174288',
      address: 'Jl. Admin No. 1',
    },
  });

  // Create product
  const pisangMolen = await prisma.product.upsert({
    where: { id: 'pisang-molen-1' },
    update: {},
    create: {
      id: 'pisang-molen-1',
      name: 'Pisang Molen (1 bungkus)',
      description:
        'Pisang molen renyah dengan rasa manis yang pas, dibuat dari bahan-bahan pilihan berkualitas.',
      price: 5000,
      stock: 112,
      image: '/pisang-molen.jpg',
      category: 'Makanan Ringan',
    },
  });

  console.log('Database seeded successfully!');
  console.log('Admin user:', adminUser);
  console.log('Product:', pisangMolen);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
