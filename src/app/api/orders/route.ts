import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, address, productId, quantity, total, notes } = body;

    if (!name || !phone || !address || !productId || !quantity || !total) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create or find user
    let user = await db.user.findFirst({
      where: {
        phone: phone,
      },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          name,
          phone,
          address,
          email: `${phone}@customer.com`, // Generate dummy email
        },
      });
    }

    // Create order
    const order = await db.order.create({
      data: {
        userId: user.id,
        total: parseInt(total),
        name,
        phone,
        address,
        notes,
        status: 'pending',
        orderItems: {
          create: {
            productId,
            quantity: parseInt(quantity),
            price: parseInt(total),
          },
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    // Update product stock
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: {
          decrement: parseInt(quantity),
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
