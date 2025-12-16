'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  Star,
  Clock,
  Truck,
  HeadphonesIcon,
} from 'lucide-react';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1,
    notes: '',
  });
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const product = {
    id: '1',
    name: 'Pisang Molen (1 bungkus)',
    description:
      'Pisang molen renyah dengan rasa manis yang pas, dibuat dari bahan-bahan pilihan berkualitas.',
    price: 5000,
    stock: 112,
    image: '/pisang-molen.jpg',
    category: 'Makanan Ringan',
  };

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...orderForm,
          productId: product.id,
          total: orderForm.quantity * product.price,
        }),
      });

      if (response.ok) {
        alert('Pesanan berhasil dikirim!');
        setOrderForm({
          name: '',
          phone: '',
          address: '',
          quantity: 1,
          notes: '',
        });
      } else {
        alert('Gagal mengirim pesanan. Silakan coba lagi.');
      }
    } catch (error) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const handleOrderWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const totalHarga = orderForm.quantity * product.price;

    const pesan = `
*PESANAN BARU PISANG MOLEN*

Produk : ${product.name}
Jumlah : ${orderForm.quantity} bungkus
Harga  : Rp ${product.price.toLocaleString('id-ID')}
Total  : Rp ${totalHarga.toLocaleString('id-ID')}

Nama   : ${orderForm.name}
No HP  : ${orderForm.phone}
Alamat : ${orderForm.address}
Catatan: ${orderForm.notes || '-'}

Terima kasih 🙏
  `.trim();

    window.open(
      `https://wa.me/6285360174288?text=${encodeURIComponent(pesan)}`,
      '_blank'
    );
  };

  const handleMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageForm),
      });

      if (response.ok) {
        alert('Pesan berhasil dikirim!');
        setMessageForm({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        alert('Gagal mengirim pesan. Silakan coba lagi.');
      }
    } catch (error) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const handleMessageWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pesan = `
*PESAN DARI WEBSITE PISANG MOLEN*

Nama   : ${messageForm.name}
Email  : ${messageForm.email}
Subjek : ${messageForm.subject}

Pesan:
${messageForm.message}

Terima kasih 🙏
  `.trim();

    window.open(
      `https://wa.me/62811669126?text=${encodeURIComponent(pesan)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.jpg"
                alt="Molen Logo"
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-orange-600">MOLEN</h1>
                <p className="text-sm text-gray-600">Delicious Snack</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a
                href="#home"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Beranda
              </a>
              <a
                href="#product"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Produk
              </a>
              <a
                href="#order"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Pesan
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Kontak
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Tentang
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-100 text-yellow-800">
                Makanan Ringan Favorit
              </Badge>
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                Pisang Molen <span className="text-orange-600">Renyah</span> &{' '}
                <span className="text-yellow-600">Nikmat</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nikmati sensasi pisang molen yang renyah di luar dan lembut di
                dalam. Dibuat dari pisang pilihan dengan resep turun temurun.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2"></div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>Siap Antar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span>Gratis Ongkir</span>
                </div>
              </div>
              <a
                href="#order"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition transform hover:scale-105"
              >
                Pesan Sekarang
              </a>
            </div>
            <div className="relative">
              <img
                src="/pisang-molen.jpg"
                alt="Pisang Molen"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-orange-600">
                  Rp 5.000
                </div>
                <div className="text-sm text-gray-600">per bungkus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Produk Unggulan Kami
            </h2>
            <p className="text-lg text-gray-600">
              Pisang molen dengan kualitas terbaik
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden hover:shadow-xl transition">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src="/pisang-molen.jpg"
                    alt={product.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <Badge className="mb-2 bg-green-100 text-green-800">
                    Tersedia
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-orange-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </div>
                    <div className="text-sm text-gray-600">
                      Stok: {product.stock} bungkus
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                  <a
                    href="#order"
                    className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition text-center block"
                  >
                    Pesan Sekarang
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Form Pemesanan
            </h2>
            <p className="text-lg text-gray-600">
              Isi form berikut untuk memesan pisang molen kami
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pesan {product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOrderWhatsApp} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama *
                    </label>
                    <Input
                      required
                      value={orderForm.name}
                      onChange={e =>
                        setOrderForm({ ...orderForm, name: e.target.value })
                      }
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      No. Telepon *
                    </label>
                    <Input
                      required
                      type="tel"
                      value={orderForm.phone}
                      onChange={e =>
                        setOrderForm({ ...orderForm, phone: e.target.value })
                      }
                      placeholder="Masukkan nomor telepon"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Pengiriman *
                  </label>
                  <Textarea
                    required
                    value={orderForm.address}
                    onChange={e =>
                      setOrderForm({ ...orderForm, address: e.target.value })
                    }
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah Pesanan *
                    </label>
                    <Input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={String(orderForm.quantity)}
                      onChange={e => {
                        const val = e.target.value;
                        setOrderForm({
                          ...orderForm,
                          quantity: val === '' ? 1 : Number(val),
                        });
                      }}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Maksimal: 10 bungkus
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Harga
                    </label>
                    <div className="text-2xl font-bold text-orange-600">
                      Rp{' '}
                      {(orderForm.quantity * product.price).toLocaleString(
                        'id-ID'
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan (Opsional)
                  </label>
                  <Textarea
                    value={orderForm.notes}
                    onChange={e =>
                      setOrderForm({ ...orderForm, notes: e.target.value })
                    }
                    placeholder="Masukkan catatan pesanan"
                    rows={2}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Pesan Sekarang
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Hubungi Kami
            </h2>
            <p className="text-lg text-gray-600">
              Ada pertanyaan? Kami siap membantu Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Kirim Pesan</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleMessageWhatsApp} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama *
                      </label>
                      <Input
                        required
                        value={messageForm.name}
                        onChange={e =>
                          setMessageForm({
                            ...messageForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Masukkan nama"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        required
                        type="email"
                        value={messageForm.email}
                        onChange={e =>
                          setMessageForm({
                            ...messageForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="Masukkan email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subjek *
                      </label>
                      <Input
                        required
                        value={messageForm.subject}
                        onChange={e =>
                          setMessageForm({
                            ...messageForm,
                            subject: e.target.value,
                          })
                        }
                        placeholder="Masukkan subjek"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pesan *
                      </label>
                      <Textarea
                        required
                        value={messageForm.message}
                        onChange={e =>
                          setMessageForm({
                            ...messageForm,
                            message: e.target.value,
                          })
                        }
                        placeholder="Masukkan pesan Anda"
                        rows={4}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Kirim Pesan
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Telepon</h3>
                      <a
                        href="sms:+6285360174288"
                        className="text-gray-600 hover:text-orange-600 underline"
                      >
                        +62 853-6017-4288
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=PisangMolen126@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-orange-600 underline"
                      >
                        PisangMolen126@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Alamat</h3>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Jl.+Kutalimbaru+Medan+Indonesia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-orange-600 underline"
                      >
                        Jl. Kutalimbaru Medan, Indonesia
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Jam Buka</h3>
                      <p className="text-gray-600">
                        Senin - Sabtu: 08:00 - 15:00
                      </p>
                      <p className="text-gray-600">Minggu: Tutup</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Tentang Kami
            </h2>
            <p className="text-lg text-gray-600">
              Mengenal lebih dekat Molen Delicious Snack
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/grobak.jpg"
                alt="Grobak Molen"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Molen Delicious Snack
              </h3>
              <p className="text-gray-600 mb-6">
                Kami adalah usaha keluarga yang telah berdiri sejak tahun 2022,
                berdedikasi untuk menyajikan pisang molen berkualitas tinggi
                dengan resep turun temurun.
              </p>
              <p className="text-gray-600 mb-6">
                Setiap bungkus pisang molen kami dibuat dengan penuh cinta,
                menggunakan pisang pilihan terbaik dan tepung berkualitas untuk
                menghasilkan rasa yang sempurna.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    3+
                  </div>
                  <div className="text-sm text-gray-600">Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    5K+
                  </div>
                  <div className="text-sm text-gray-600">Pelanggan Puas</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">100% Bahan Alami</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Tanpa Pengawet</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Halal & Bersertifikat</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Garansi Kualitas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/logo.jpg"
                  alt="Molen Logo"
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold">MOLEN</h3>
                  <p className="text-sm text-gray-400">Delicious Snack</p>
                </div>
              </div>
              <p className="text-gray-400">
                Pisang molen terenyah dan terenak di tuntungan.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#home" className="hover:text-white transition">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#product" className="hover:text-white transition">
                    Produk
                  </a>
                </li>
                <li>
                  <a href="#order" className="hover:text-white transition">
                    Pesan
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="sms:+6285360174288"
                    className="hover:text-white underline"
                  >
                    +62 853-6017-4288
                  </a>
                </li>

                <li>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=PisangMolen126@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    PisangMolen126@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Jl.+Kutalimbaru+Medan+Indonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    Jl. Kutalimbaru Medan, Indonesia
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Jam Buka</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Senin - Sabtu: 08:00 - 15:00</li>
                <li>Minggu: Tutup</li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="text-center text-gray-400">
            <p>© 2025 Molen Delicious Snack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
