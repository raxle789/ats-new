'use server';

export async function formatToRupiah(value) {
  if (!isNaN(value)) {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    const rupiahValue = formatter.format(value);

    return rupiahValue;
  }

  return value;
}
