-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DOUBLE PRECISION NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "imagenUrl" TEXT,
    "marcaId" INTEGER NOT NULL,
    "tipoProductoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoProducto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoProductoMarca" (
    "marcaId" INTEGER NOT NULL,
    "tipoProductoId" INTEGER NOT NULL,

    CONSTRAINT "TipoProductoMarca_pkey" PRIMARY KEY ("marcaId","tipoProductoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nombre_key" ON "Marca"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "TipoProducto_nombre_key" ON "TipoProducto"("nombre");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_tipoProductoId_fkey" FOREIGN KEY ("tipoProductoId") REFERENCES "TipoProducto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoProductoMarca" ADD CONSTRAINT "TipoProductoMarca_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoProductoMarca" ADD CONSTRAINT "TipoProductoMarca_tipoProductoId_fkey" FOREIGN KEY ("tipoProductoId") REFERENCES "TipoProducto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
