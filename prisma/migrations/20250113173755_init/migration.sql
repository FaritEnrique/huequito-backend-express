-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "dni" VARCHAR(9) NOT NULL,
    "direccion" VARCHAR(100) NOT NULL,
    "celular" VARCHAR(13) NOT NULL,
    "correo" VARCHAR(50) NOT NULL,
    "condicion" VARCHAR(20) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ideas" (
    "id" SERIAL NOT NULL,
    "foto" VARCHAR(255) NOT NULL,

    CONSTRAINT "ideas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensajes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "celular" VARCHAR(13) NOT NULL,
    "correo" VARCHAR(50) NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comunicacion" VARCHAR(30) NOT NULL,
    "mensaje" TEXT NOT NULL,

    CONSTRAINT "mensajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preguntas" (
    "id" SERIAL NOT NULL,
    "pregunta" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,

    CONSTRAINT "preguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promociones" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_termino" DATE NOT NULL,
    "imagen_url" VARCHAR(255) NOT NULL,
    "creado_en" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creado_por" VARCHAR(100) NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "actualizado_en" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promociones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_dni_key" ON "clientes"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_celular_key" ON "clientes"("celular");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_correo_key" ON "clientes"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "mensajes_celular_key" ON "mensajes"("celular");

-- CreateIndex
CREATE UNIQUE INDEX "mensajes_correo_key" ON "mensajes"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "promociones_titulo_key" ON "promociones"("titulo");
