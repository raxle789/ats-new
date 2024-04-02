## Erajaya ATS System - 2024

See the timeline [here](https://docs.google.com/spreadsheets/d/12jSYs7mVIssOY1iyGkwIB7xP7d3tJvxNGkDeasjgg7s/edit#gid=0).

##### Development Rules

1. Struktur Folder

   - Tempatkan semua route didalam direktori `./src/app` (file-based routing)
   - Tempatkan semua komponen didalam direktori `./src/components`
   - Tempatkan semua hal seperti function, library instances, dummy data didalam direktori `./src/utils`
   - Tempatkan semua custom hooks pada didalam direktori `./src/hooks`

   > Note : Selalu buat terapkan grouping untuk setiap komponen, utils, ataupun custom hooks (e.g `./src/components/interviews`)
   >
2. Penamaan Folder dan File

   - Gunakan jamak (`s`) untuk nama folder ataupun route segment (e.g untuk membuat folder atau route segment `interview` akan menjadi `interviews`)
   - Nama file harus detail atau di sesuaikan dengan parent direktori, gunakan (`-`) sebagai tanda penghubung spasi (e.g `get-valid-efpk`)

##### Github Branch

- `main`
  Branch utama ketika segala fitur/kode tidak terdapat masalah
- `dev`
  Development branch, untuk fitur yang dikembangkan. Setelah mengubah atau menambahkan beberapa fitur atau kode, _commit_ disini.

##### Commit Message Rules

Gunakan `conventional commits` dengan format berikut `<type>: <description>`. Perhatikan setiap tipe berikut:

1. `feat`
   Gunakan tipe ini ketika telah menambahkan sebuah fitur.
2. `fix`
   Gunakan tipe ini ketika telah memperbaiki sebuah bug/masalah.
3. `chore`
   Gunakan tipe ini ketika hanya merubah tambahan informasi comment, readme, atau hal lain yang tidak mempengaruhi perilaku/fungsionalitas kode
4. `build`
   Gunakan tipe ini ketika melakukan penambahan atau update versi dependencies/library.
5. `refactor`
   Gunakan tipe ini ketika merubah kode untuk meningkatkan kualitas kode tanpa mengubah atau mempengaruhi fungsionalitas kode.

Contoh _commit message_

> `git commit -m 'fix: reminder candidate for user interview via calendar'`
